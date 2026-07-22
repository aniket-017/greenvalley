const TOKEN_KEY = 'gmsetc_admin_token';

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  if (!isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(path, {
    ...options,
    headers,
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }
  }

  if (!res.ok) {
    const message = data?.error || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  return data;
}

export function login(username, password) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export function fetchPublicFaculty() {
  return request('/api/classes/faculty');
}

export function fetchAdminFaculty() {
  return request('/api/admin/faculty');
}

export function createSection(title) {
  return request('/api/admin/sections', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

export function updateSection(id, payload) {
  return request(`/api/admin/sections/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteSection(id) {
  return request(`/api/admin/sections/${id}`, { method: 'DELETE' });
}

export function reorderSections(orderedIds) {
  return request('/api/admin/sections/reorder', {
    method: 'PUT',
    body: JSON.stringify({ orderedIds }),
  });
}

export function reorderTeachers(sectionId, orderedIds) {
  return request('/api/admin/teachers/reorder', {
    method: 'PUT',
    body: JSON.stringify({ sectionId, orderedIds }),
  });
}

export function createTeacher(payload) {
  return request('/api/admin/teachers', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateTeacher(id, payload) {
  return request(`/api/admin/teachers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteTeacher(id) {
  return request(`/api/admin/teachers/${id}`, { method: 'DELETE' });
}

export function uploadTeacherPhoto(id, file) {
  const formData = new FormData();
  formData.append('photo', file);
  return request(`/api/admin/teachers/${id}/photo`, {
    method: 'POST',
    body: formData,
  });
}

export function deleteTeacherPhoto(id) {
  return request(`/api/admin/teachers/${id}/photo`, { method: 'DELETE' });
}
