import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  clearToken,
  createSection,
  createTeacher,
  deleteSection,
  deleteTeacher,
  deleteTeacherPhoto,
  fetchAdminFaculty,
  reorderSections,
  reorderTeachers,
  updateSection,
  updateTeacher,
  uploadTeacherPhoto,
} from '../../api/admin';
import './Admin.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('');
  const [newTeacherPhoto, setNewTeacherPhoto] = useState(null);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState('');
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState({ name: '', subject: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingTeacherId, setUploadingTeacherId] = useState(null);
  const [draggingSectionId, setDraggingSectionId] = useState(null);
  const [dragOverSectionId, setDragOverSectionId] = useState(null);
  const [draggingTeacherId, setDraggingTeacherId] = useState(null);
  const [dragOverTeacherId, setDragOverTeacherId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadFaculty = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAdminFaculty();
      const nextSections = data.sections || [];
      setSections(nextSections);
      setSelectedSectionId((current) => {
        if (current && nextSections.some((s) => s.id === current)) return current;
        return nextSections[0]?.id || '';
      });
    } catch (err) {
      if (err.status === 401) {
        clearToken();
        navigate('/admin/login', { replace: true });
        return;
      }
      setError(err.message || 'Failed to load faculty');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadFaculty();
  }, [loadFaculty]);

  const selectedSection = sections.find((section) => section.id === selectedSectionId) || null;

  const handleLogout = () => {
    clearToken();
    navigate('/admin/login', { replace: true });
  };

  const handleCreateSection = async (event) => {
    event.preventDefault();
    if (!sectionTitle.trim()) return;
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const created = await createSection(sectionTitle.trim());
      setSectionTitle('');
      setMessage(`Section “${created.title}” created.`);
      await loadFaculty();
      setSelectedSectionId(created.id);
    } catch (err) {
      setError(err.message || 'Failed to create section');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSection = async (sectionId) => {
    if (!editingSectionTitle.trim()) return;
    setSaving(true);
    setError('');
    try {
      await updateSection(sectionId, { title: editingSectionTitle.trim() });
      setEditingSectionId(null);
      setMessage('Section updated.');
      await loadFaculty();
    } catch (err) {
      setError(err.message || 'Failed to update section');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (section) => {
    const confirmed = window.confirm(
      `Delete section “${section.title}” and all teachers inside it?`,
    );
    if (!confirmed) return;
    setSaving(true);
    setError('');
    try {
      await deleteSection(section.id);
      setMessage(`Section “${section.title}” deleted.`);
      await loadFaculty();
    } catch (err) {
      setError(err.message || 'Failed to delete section');
    } finally {
      setSaving(false);
    }
  };

  const persistSectionOrder = async (nextSections) => {
    const previous = sections;
    setSections(nextSections);
    setSaving(true);
    setError('');
    try {
      const data = await reorderSections(nextSections.map((section) => section.id));
      setSections(data.sections || nextSections);
      setMessage('Section order saved.');
    } catch (err) {
      setSections(previous);
      setError(err.message || 'Failed to save section order');
    } finally {
      setSaving(false);
      setDraggingSectionId(null);
      setDragOverSectionId(null);
    }
  };

  const handleSectionDragStart = (event, sectionId) => {
    if (editingSectionId) return;
    setDraggingSectionId(sectionId);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', sectionId);
  };

  const handleSectionDragOver = (event, sectionId) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    if (sectionId !== dragOverSectionId) {
      setDragOverSectionId(sectionId);
    }
  };

  const handleSectionDrop = async (event, targetSectionId) => {
    event.preventDefault();
    const sourceId = draggingSectionId || event.dataTransfer.getData('text/plain');
    if (!sourceId || sourceId === targetSectionId) {
      setDraggingSectionId(null);
      setDragOverSectionId(null);
      return;
    }

    const fromIndex = sections.findIndex((section) => section.id === sourceId);
    const toIndex = sections.findIndex((section) => section.id === targetSectionId);
    if (fromIndex < 0 || toIndex < 0) return;

    const nextSections = [...sections];
    const [moved] = nextSections.splice(fromIndex, 1);
    nextSections.splice(toIndex, 0, moved);
    await persistSectionOrder(nextSections);
  };

  const handleSectionDragEnd = () => {
    setDraggingSectionId(null);
    setDragOverSectionId(null);
  };

  const persistTeacherOrder = async (nextTeachers) => {
    if (!selectedSectionId) return;
    const previous = sections;
    const nextSections = sections.map((section) =>
      section.id === selectedSectionId ? { ...section, teachers: nextTeachers } : section,
    );
    setSections(nextSections);
    setSaving(true);
    setError('');
    try {
      const data = await reorderTeachers(
        selectedSectionId,
        nextTeachers.map((teacher) => teacher.id),
      );
      setSections(data.sections || nextSections);
      setMessage('Teacher order saved.');
    } catch (err) {
      setSections(previous);
      setError(err.message || 'Failed to save teacher order');
    } finally {
      setSaving(false);
      setDraggingTeacherId(null);
      setDragOverTeacherId(null);
    }
  };

  const handleTeacherDragStart = (event, teacherId) => {
    if (editingTeacherId) return;
    setDraggingTeacherId(teacherId);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', teacherId);
  };

  const handleTeacherDragOver = (event, teacherId) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    if (teacherId !== dragOverTeacherId) {
      setDragOverTeacherId(teacherId);
    }
  };

  const handleTeacherDrop = async (event, targetTeacherId) => {
    event.preventDefault();
    const sourceId = draggingTeacherId || event.dataTransfer.getData('text/plain');
    const teachers = selectedSection?.teachers || [];
    if (!sourceId || sourceId === targetTeacherId) {
      setDraggingTeacherId(null);
      setDragOverTeacherId(null);
      return;
    }

    const fromIndex = teachers.findIndex((teacher) => teacher.id === sourceId);
    const toIndex = teachers.findIndex((teacher) => teacher.id === targetTeacherId);
    if (fromIndex < 0 || toIndex < 0) return;

    const nextTeachers = [...teachers];
    const [moved] = nextTeachers.splice(fromIndex, 1);
    nextTeachers.splice(toIndex, 0, moved);
    await persistTeacherOrder(nextTeachers);
  };

  const handleTeacherDragEnd = () => {
    setDraggingTeacherId(null);
    setDragOverTeacherId(null);
  };

  const handleCreateTeacher = async (event) => {
    event.preventDefault();
    if (!selectedSectionId || !teacherName.trim() || !teacherSubject.trim()) return;
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const created = await createTeacher({
        sectionId: selectedSectionId,
        name: teacherName.trim(),
        subject: teacherSubject.trim(),
      });

      if (newTeacherPhoto) {
        setUploadingTeacherId(created.id);
        await uploadTeacherPhoto(created.id, newTeacherPhoto);
      }

      setTeacherName('');
      setTeacherSubject('');
      setNewTeacherPhoto(null);
      setMessage('Teacher added.');
      await loadFaculty();
    } catch (err) {
      setError(err.message || 'Failed to add teacher');
    } finally {
      setUploadingTeacherId(null);
      setSaving(false);
    }
  };

  const handleSaveTeacher = async (teacherId) => {
    if (!editingTeacher.name.trim() || !editingTeacher.subject.trim()) return;
    setSaving(true);
    setError('');
    try {
      await updateTeacher(teacherId, {
        name: editingTeacher.name.trim(),
        subject: editingTeacher.subject.trim(),
      });
      setEditingTeacherId(null);
      setMessage('Teacher updated.');
      await loadFaculty();
    } catch (err) {
      setError(err.message || 'Failed to update teacher');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTeacher = async (teacher) => {
    const confirmed = window.confirm(`Delete teacher “${teacher.name}”?`);
    if (!confirmed) return;
    setSaving(true);
    setError('');
    try {
      await deleteTeacher(teacher.id);
      setMessage(`Teacher “${teacher.name}” deleted.`);
      await loadFaculty();
    } catch (err) {
      setError(err.message || 'Failed to delete teacher');
    } finally {
      setSaving(false);
    }
  };

  const handleUploadPhoto = async (teacherId, file) => {
    if (!file) return;
    setUploadingTeacherId(teacherId);
    setError('');
    setMessage('');
    try {
      await uploadTeacherPhoto(teacherId, file);
      setMessage('Photo uploaded and compressed.');
      await loadFaculty();
    } catch (err) {
      setError(err.message || 'Failed to upload photo');
    } finally {
      setUploadingTeacherId(null);
    }
  };

  const handleRemovePhoto = async (teacher) => {
    const confirmed = window.confirm(`Remove photo for “${teacher.name}”?`);
    if (!confirmed) return;
    setUploadingTeacherId(teacher.id);
    setError('');
    try {
      await deleteTeacherPhoto(teacher.id);
      setMessage('Photo removed.');
      await loadFaculty();
    } catch (err) {
      setError(err.message || 'Failed to remove photo');
    } finally {
      setUploadingTeacherId(null);
    }
  };

  return (
    <div className="admin-page admin-dashboard">
      <header className="admin-topbar">
        <div>
          <p className="admin-eyebrow">ETC Admin</p>
          <h1>Teachers CMS</h1>
        </div>
        <div className="admin-topbar-actions">
          <Link to="/classes" className="admin-link">
            View Classes page
          </Link>
          <button type="button" className="admin-btn ghost" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {error ? <div className="admin-alert">{error}</div> : null}
      {message ? <div className="admin-success">{message}</div> : null}

      {loading ? (
        <p className="admin-loading">Loading faculty…</p>
      ) : (
        <div className="admin-layout">
          <section className="admin-panel">
            <h2>Sections</h2>
            <p className="admin-help">
              Create groups like Mathematics or Coordination &amp; Admin. Drag the handle to change order.
            </p>

            <form className="admin-inline-form" onSubmit={handleCreateSection}>
              <input
                type="text"
                placeholder="New section title"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                required
              />
              <button className="admin-btn primary" type="submit" disabled={saving}>
                Add section
              </button>
            </form>

            <ul className="admin-list">
              {sections.map((section) => (
                <li
                  key={section.id}
                  className={`admin-list-item ${selectedSectionId === section.id ? 'active' : ''} ${
                    draggingSectionId === section.id ? 'dragging' : ''
                  } ${dragOverSectionId === section.id ? 'drag-over' : ''}`}
                  onDragOver={(event) => handleSectionDragOver(event, section.id)}
                  onDrop={(event) => handleSectionDrop(event, section.id)}
                  onDragEnd={handleSectionDragEnd}
                >
                  {editingSectionId === section.id ? (
                    <div className="admin-edit-row">
                      <input
                        type="text"
                        value={editingSectionTitle}
                        onChange={(e) => setEditingSectionTitle(e.target.value)}
                      />
                      <button
                        type="button"
                        className="admin-btn primary small"
                        disabled={saving}
                        onClick={() => handleSaveSection(section.id)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="admin-btn ghost small"
                        onClick={() => setEditingSectionId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="admin-drag-handle"
                        draggable
                        title="Drag to reorder"
                        aria-label={`Drag to reorder ${section.title}`}
                        onDragStart={(event) => handleSectionDragStart(event, section.id)}
                        onClick={(event) => event.preventDefault()}
                      >
                        ⋮⋮
                      </button>
                      <button
                        type="button"
                        className="admin-select-btn"
                        onClick={() => setSelectedSectionId(section.id)}
                      >
                        <strong>{section.title}</strong>
                        <span>{section.teachers?.length || 0} teachers</span>
                      </button>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-btn ghost small"
                          onClick={() => {
                            setEditingSectionId(section.id);
                            setEditingSectionTitle(section.title);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-btn danger small"
                          disabled={saving}
                          onClick={() => handleDeleteSection(section)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="admin-panel">
            <h2>Teachers</h2>
            {selectedSection ? (
              <>
                <p className="admin-help">
                  Adding to <strong>{selectedSection.title}</strong>. Drag the handle to change teacher order.
                </p>

                <form className="admin-teacher-form" onSubmit={handleCreateTeacher}>
                  <input
                    type="text"
                    placeholder="Teacher name"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Role / subject"
                    value={teacherSubject}
                    onChange={(e) => setTeacherSubject(e.target.value)}
                    required
                  />
                  <label className="admin-file-field">
                    <span>Photo (optional, compressed on upload)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewTeacherPhoto(e.target.files?.[0] || null)}
                    />
                  </label>
                  <button className="admin-btn primary" type="submit" disabled={saving}>
                    Add teacher
                  </button>
                </form>

                <ul className="admin-list">
                  {(selectedSection.teachers || []).map((teacher) => (
                    <li
                      key={teacher.id}
                      className={`admin-list-item teacher-row ${
                        draggingTeacherId === teacher.id ? 'dragging' : ''
                      } ${dragOverTeacherId === teacher.id ? 'drag-over' : ''}`}
                      onDragOver={(event) => handleTeacherDragOver(event, teacher.id)}
                      onDrop={(event) => handleTeacherDrop(event, teacher.id)}
                      onDragEnd={handleTeacherDragEnd}
                    >
                      {editingTeacherId === teacher.id ? (
                        <div className="admin-edit-row stacked">
                          <input
                            type="text"
                            value={editingTeacher.name}
                            onChange={(e) =>
                              setEditingTeacher((prev) => ({ ...prev, name: e.target.value }))
                            }
                          />
                          <input
                            type="text"
                            value={editingTeacher.subject}
                            onChange={(e) =>
                              setEditingTeacher((prev) => ({ ...prev, subject: e.target.value }))
                            }
                          />
                          <div className="admin-row-actions">
                            <button
                              type="button"
                              className="admin-btn primary small"
                              disabled={saving}
                              onClick={() => handleSaveTeacher(teacher.id)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="admin-btn ghost small"
                              onClick={() => setEditingTeacherId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="admin-teacher-row">
                          <button
                            type="button"
                            className="admin-drag-handle"
                            draggable
                            title="Drag to reorder"
                            aria-label={`Drag to reorder ${teacher.name}`}
                            onDragStart={(event) => handleTeacherDragStart(event, teacher.id)}
                            onClick={(event) => event.preventDefault()}
                          >
                            ⋮⋮
                          </button>
                          <div className="admin-teacher-body">
                            <div className="admin-teacher-main">
                              <div className="admin-teacher-photo">
                                {teacher.photo ? (
                                  <img src={teacher.photo} alt={teacher.name} />
                                ) : (
                                  <div className="admin-teacher-photo-empty" aria-hidden />
                                )}
                              </div>
                              <div className="admin-teacher-meta">
                                <strong>{teacher.name}</strong>
                                <span>{teacher.subject}</span>
                              </div>
                              <div className="admin-row-actions admin-teacher-core-actions">
                                <button
                                  type="button"
                                  className="admin-btn ghost small"
                                  onClick={() => {
                                    setEditingTeacherId(teacher.id);
                                    setEditingTeacher({
                                      name: teacher.name,
                                      subject: teacher.subject,
                                    });
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="admin-btn danger small"
                                  disabled={saving}
                                  onClick={() => handleDeleteTeacher(teacher)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <div className="admin-teacher-photo-actions">
                              <label className="admin-btn ghost small admin-file-btn">
                                {uploadingTeacherId === teacher.id ? 'Uploading…' : 'Upload photo'}
                                <input
                                  type="file"
                                  accept="image/*"
                                  hidden
                                  disabled={uploadingTeacherId === teacher.id || saving}
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    e.target.value = '';
                                    handleUploadPhoto(teacher.id, file);
                                  }}
                                />
                              </label>
                              {teacher.photo ? (
                                <button
                                  type="button"
                                  className="admin-btn ghost small"
                                  disabled={uploadingTeacherId === teacher.id || saving}
                                  onClick={() => handleRemovePhoto(teacher)}
                                >
                                  Remove photo
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                  {(selectedSection.teachers || []).length === 0 ? (
                    <li className="admin-empty">No teachers in this section yet.</li>
                  ) : null}
                </ul>
              </>
            ) : (
              <p className="admin-empty">Create a section first, then add teachers.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
