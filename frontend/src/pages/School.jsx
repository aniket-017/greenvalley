import { useEffect, useMemo, useState } from "react";
import logoGms from "../assets/gms.jpeg";
import "./School.css";

const activityImagesMap = import.meta.glob("../assets/activities/*.{png,jpg,jpeg,webp,gif,svg}", {
  eager: true,
  import: "default",
});

const activityImages = Object.entries(activityImagesMap)
  .map(([path, url]) => {
    const match = path.match(/(\d+)\.[a-zA-Z0-9]+$/);
    return { url, num: match ? Number(match[1]) : Number.MAX_SAFE_INTEGER };
  })
  .sort((a, b) => a.num - b.num)
  .map((item) => item.url);

const teacherPhotosMap = import.meta.glob("../assets/teachers/*.{jpg,jpeg,png,webp,gif}", {
  eager: true,
  import: "default",
});

const teacherPhotoByKey = Object.fromEntries(
  Object.entries(teacherPhotosMap).map(([path, url]) => {
    const filename = path.split("/").pop() || "";
    const key = filename.replace(/\.[^.]+$/, "");
    return [key, url];
  }),
);

const stripMamOrSirSuffix = (value) => value.replace(/(Mam|Sir)$/i, "");
const splitCamelCase = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/\s+/)
    .filter(Boolean);

const inferNameFromFileKey = (fileKey) => splitCamelCase(stripMamOrSirSuffix(fileKey)).join(" ");

const getInitials = (name) => {
  const tokens = name.trim().split(/\s+/).filter(Boolean);
  if (tokens.length >= 2) return `${tokens[0][0]}${tokens[1][0]}`.toUpperCase();
  if (tokens.length === 1) return tokens[0].slice(0, 2).toUpperCase();
  return "";
};

const bgPalette = [
  "var(--green-mid)",
  "var(--terracotta)",
  "var(--sky)",
  "var(--gold)",
  "#8b5cf6",
  "#6366f1",
  "#ec4899",
  "#14b8a6",
  "#d97706",
  "#f97316",
];

const pickBgForKey = (key) => {
  const hash = key.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return bgPalette[hash % bgPalette.length];
};

const languagesHumanitiesBaseTeachers = [
  {
    id: "Antra Bera",
    name: "Antra Bera",
    subject: "English",
    initials: "AB",
    avatarBg: "var(--green-mid)",
    photoKey: "AntraMam",
  },
  {
    id: "Dipti Atre",
    name: "Dipti Atre",
    subject: "Marathi",
    initials: "DA",
    avatarBg: "var(--terracotta)",
    photoKey: "DiptiAtreMam",
  },
  {
    id: "Ekta Bais",
    name: "Ekta Bais",
    subject: "English",
    initials: "EB",
    avatarBg: "var(--green-mid)",
  },
  {
    id: "Jayshri Patil",
    name: "Jayshri Patil",
    subject: "Marathi",
    initials: "JP",
    avatarBg: "var(--terracotta)",
    photoKey: "JayshreePatilMam",
  },
  {
    id: "Jayshri Shirshat",
    name: "Jayshri Shirshat",
    subject: "Hindi",
    initials: "JS",
    avatarBg: "var(--sky)",
  },
  {
    id: "Jyoti Sant",
    name: "Jyoti Sant",
    subject: "Marathi",
    initials: "JSa",
    avatarBg: "var(--terracotta)",
    photoKey: "JyotiMam",
  },
  {
    id: "Khushbu Shekhawat",
    name: "Khushbu Shekhawat",
    subject: "English",
    initials: "KS",
    avatarBg: "var(--green-mid)",
    photoKey: "KhushbuMam",
  },
  {
    id: "Sonu Pooniya",
    name: "Sonu Pooniya",
    subject: "Hindi",
    initials: "SP",
    avatarBg: "var(--sky)",
    photoKey: "SonuPooniyaMam",
  },
  {
    id: "Saroj Kanwar",
    name: "Saroj Kanwar",
    subject: "Hindi",
    initials: "SK",
    avatarBg: "var(--sky)",
    photoKey: "SarojMam",
  },
  {
    id: "Yogeshwar Hegde",
    name: "Yogeshwar Hegde",
    subject: "Sanskrit",
    initials: "YH",
    avatarBg: "#8b5cf6",
  },
];

const languagesHumanitiesTeachers = (() => {
  const baseNameSet = new Set(
    languagesHumanitiesBaseTeachers.map((t) => t.name.trim().toLowerCase().replace(/\s+/g, " ")),
  );

  const photoKeys = Object.keys(teacherPhotoByKey);
  const compactToken = (token) => token.replace(/[aeiou]/g, "");
  const tokenMatches = (a, b) => {
    const aa = a.trim().toLowerCase();
    const bb = b.trim().toLowerCase();
    if (!aa || !bb) return false;
    return aa === bb || compactToken(aa) === compactToken(bb);
  };

  const usedPhotoKeys = new Set();
  const baseWithPhotos = languagesHumanitiesBaseTeachers.map((t) => {
    let matchedPhotoKey = t.photoKey;
    let photoUrl = matchedPhotoKey ? teacherPhotoByKey[matchedPhotoKey] : undefined;

    if (!photoUrl) {
      const teacherTokens = t.name.trim().toLowerCase().split(/\s+/).filter(Boolean);

      matchedPhotoKey = photoKeys
        .filter((key) => !usedPhotoKeys.has(key))
        .map((photoKey) => {
          const fileTokens = splitCamelCase(stripMamOrSirSuffix(photoKey))
            .map((token) => token.toLowerCase())
            .filter(Boolean);

          const overlap = teacherTokens.reduce((acc, tt) => {
            const hasMatch = fileTokens.some((ft) => tokenMatches(tt, ft));
            return acc + (hasMatch ? 1 : 0);
          }, 0);

          if (overlap === 0) return { photoKey, score: 0 };

          const firstTokenBoost =
            fileTokens.length > 0 && teacherTokens.length > 0 && tokenMatches(teacherTokens[0], fileTokens[0]) ? 5 : 0;

          return { photoKey, score: overlap * 10 + firstTokenBoost };
        })
        .sort((a, b) => b.score - a.score)[0]?.photoKey;

      photoUrl = matchedPhotoKey ? teacherPhotoByKey[matchedPhotoKey] : undefined;
    }

    if (photoUrl && matchedPhotoKey) usedPhotoKeys.add(matchedPhotoKey);
    return { ...t, photoUrl, photoKey: matchedPhotoKey };
  });

  const newTeachers = Object.entries(teacherPhotoByKey)
    .filter(([photoKey]) => !usedPhotoKeys.has(photoKey))
    .map(([photoKey, url]) => {
      const name = inferNameFromFileKey(photoKey) || photoKey;
      const normalized = name.trim().toLowerCase().replace(/\s+/g, " ");
      if (baseNameSet.has(normalized)) return null;

      return {
        id: photoKey,
        name,
        subject: undefined,
        initials: getInitials(name),
        avatarBg: pickBgForKey(photoKey),
        photoKey,
        photoUrl: url,
      };
    })
    .filter(Boolean);

  return [...baseWithPhotos, ...newTeachers];
})();

export default function School() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTeacher, setActiveTeacher] = useState(null);

  const totalActivities = activityImages.length;
  const canAutoPlay = totalActivities > 1;

  // Auto-advance the carousel
  useEffect(() => {
    if (!canAutoPlay || isPaused) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalActivities);
    }, 2500);

    return () => window.clearInterval(id);
  }, [canAutoPlay, isPaused, totalActivities]);

  const goPrev = () => {
    if (!canAutoPlay) return;
    setActiveIndex((prev) => (prev - 1 + totalActivities) % totalActivities);
  };

  const goNext = () => {
    if (!canAutoPlay) return;
    setActiveIndex((prev) => (prev + 1) % totalActivities);
  };

  const activeAlt = useMemo(() => `Activity ${activeIndex + 1}`, [activeIndex]);
  const directorImage =
    teacherPhotoByKey.AntraMaM ||
    teacherPhotoByKey.KiranMam ||
    teacherPhotoByKey["AkshitaMam-removebg-preview"] ||
    teacherPhotoByKey.AkshitaMam;
  const principalImage =
    teacherPhotoByKey.AkshitaMam ||
    teacherPhotoByKey.NamrataMam ||
    teacherPhotoByKey["AntraMam-removebg-preview"];

  return (
    <div className="school-page">
      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-item">
            <div className="icon">📞</div>+91 8055314123 &nbsp;|&nbsp; 0240-2954039
          </div>
          <div className="topbar-item">
            <div className="icon">✉</div>
            <a href="mailto:gmsprincipal01@gmail.com">gmsprincipal01@gmail.com</a>
          </div>
          <div className="topbar-item">
            <div className="icon">🕐</div>Mon – Sat &nbsp;7 AM – 8 PM
          </div>
          <div className="topbar-item">
            <div className="icon">📍</div>372, Near Datta Mandir, Behind A.S. Club, Chhatrapati Sambhajinagar
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a href="#home" className="logo">
            <img src={logoGms} alt="GMS Logo" className="logo-emblem" />
            <div className="logo-text">
              <div className="name">Greenvalley Montessori</div>
              <div className="tagline">Where Learning is Fun</div>
            </div>
          </a>
          <ul className="nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#vision">Vision &amp; Mission</a>
            </li>
            <li>
              <a href="#messages">Messages</a>
            </li>
            <li>
              <a href="#teachers">Faculty</a>
            </li>
            <li>
              <a href="#contact" className="nav-cta">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg-pattern" />
        <div className="hero-shapes" />
        <div className="hero-arc" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-label">⭐ Est. 2011 · Chhatrapati Sambhajinagar</div>
            <h1>
              Welcome to <em>Green Valley</em> Montessori School
            </h1>
            <p className="hero-desc">
              We pride ourselves on the quality of our educational programmes, the professionalism of our staff, and the
              enthusiasm of our students. A school community where every child thrives.
            </p>
            <div className="hero-btns">
              <a href="#about" className="btn-primary">
                Discover Our School
              </a>
              <a href="#contact" className="btn-outline">
                Enrol Now
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="num">374+</span>
                <span className="lbl">Students</span>
              </div>
              <div className="hero-stat">
                <span className="num">12+</span>
                <span className="lbl">Classes</span>
              </div>
              <div className="hero-stat">
                <span className="num">25+</span>
                <span className="lbl">Faculty</span>
              </div>
              <div className="hero-stat">
                <span className="num">14+</span>
                <span className="lbl">Years</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-logo-display">
              <div className="hero-img-glow" />
              {/* <div className="hero-stat-badge">
                <span className="sb-num">374+</span>
                <span className="sb-lbl">Students</span>
              </div> */}
              <img
                src="https://res.cloudinary.com/dokdo82g5/image/upload/v1773130073/image-removebg-preview_11_hh1c27.png"
                alt="Greenvalley Montessori School building"
                className="hero-logo-img"
              />
              {/* <div className="hero-logo-float1">
                <span className="float-card-label">🎓 Pre-Primary</span>
                <div className="float-card-value">2 dedicated preschool groups</div>
              </div>
              <div className="hero-logo-float2">
                <span className="float-card-label">📚 Grade XII</span>
                <div className="float-card-value">Full school permission since 2018</div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-text reveal">
              <div className="section-label">Our Story</div>
              <h2 className="section-title">
                A School Built on <em>Community &amp; Care</em>
              </h2>
              <div className="section-line" />
              <p>
                Greenvalley Montessori School commenced on the 12th February, 2011 with just 3 pre-primary classes and
                52 students, officially opening on the 11th June, 2012. Since then, we have grown into a thriving
                institution with 12 classes and two preschool groups, serving approximately 374 enrolled students.
              </p>
              <p>
                We are one of three primary schools serving the rural area and are continually growing. Our priority
                enrolment area covers Mhada and Cidco Mahanagar regions. In 2018, we received permission through Grade
                XII and commenced evening classes.
              </p>
              <p>
                The Front Office is open 7:00 am – 8 pm, Monday to Saturday, and serves as the main contact point for
                all visitors, parents, enrolments, uniforms, and general enquiries.
              </p>
            </div>
            <div className="about-visual reveal">
              <div className="highlight-card">
                <div className="hc-icon">📖</div>
                <div className="hc-title">Quality Programmes</div>
                <div className="hc-text">Comprehensive curriculum from pre-primary to Grade XII</div>
              </div>
              <div className="highlight-card">
                <div className="hc-icon">👨‍🏫</div>
                <div className="hc-title">Expert Faculty</div>
                <div className="hc-text">Dedicated, professional teachers passionate about learning</div>
              </div>
              <div className="highlight-card">
                <div className="hc-icon">🤝</div>
                <div className="hc-title">Open Community</div>
                <div className="hc-text">Active participation from parents and community members</div>
              </div>
              <div className="highlight-card">
                <div className="hc-icon">🌱</div>
                <div className="hc-title">Holistic Growth</div>
                <div className="hc-text">Focus on academics, values, arts, sports and more</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES CAROUSEL */}
      <section className="activities-carousel" id="activities">
        <div className="section-inner">
          <div className="activities-head reveal">
            <div className="section-label">Activities</div>
            <h2 className="section-title">
              Moments from <em>School Life</em>
            </h2>
            <div className="section-line" style={{ margin: "0 auto" }} />
          </div>

          <div
            className="carousel-outer reveal"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="carousel-viewport">
              <div
                className="carousel-track"
                style={{
                  "--slide-count": activityImages.length,
                  transform: `translateX(-${activeIndex * (100 / activityImages.length)}%)`,
                }}
                aria-live="polite"
                aria-label={activeAlt}
              >
                {activityImages.map((src, i) => (
                  <div className="carousel-slide" key={src + i} style={{ "--slide-count": activityImages.length }}>
                    <img className="carousel-img" src={src} alt={`Activity ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-btn left" type="button" onClick={goPrev} aria-label="Previous slide">
              ‹
            </button>
            <button className="carousel-btn right" type="button" onClick={goNext} aria-label="Next slide">
              ›
            </button>

            <div className="carousel-dots" role="tablist" aria-label="Activity slides">
              {activityImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel-dot ${i === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="vision-mission" id="vision">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <div className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}>
              Our Purpose
            </div>
            <h2 className="section-title" style={{ color: "#fff" }}>
              Guided by <em style={{ color: "var(--gold-light)" }}>Vision &amp; Mission</em>
            </h2>
            <div className="section-line" style={{ margin: "0 auto" }} />
          </div>
          <div className="vm-grid">
            <div className="vm-card reveal">
              {/* <span className="vm-icon">🔭</span> */}
              <div className="vm-type">Our Vision</div>
              <div className="vm-title">Prepare for Tomorrow</div>
              <p className="vm-text">
                To prepare and motivate our students for a rapidly changing world by instilling critical thinking
                skills, a global perspective, and respect for core values of honesty, loyalty, perseverance, and
                compassion. Students will have success for today and be prepared for tomorrow.
              </p>
            </div>
            <div className="vm-card reveal">
              {/* <span className="vm-icon">🎯</span> */}
              <div className="vm-type">Our Mission</div>
              <div className="vm-title">Empower Every Child</div>
              <p className="vm-text">
                To provide a safe haven where everyone is valued and respected. All staff members, in partnership with
                parents and families, are fully committed to students&apos; college and career readiness. Students are
                empowered to develop social awareness, civic responsibility, and personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTOR & PRINCIPAL MESSAGES */}
      <section className="messages" id="messages">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal">
            <div className="section-label">Leadership</div>
            <h2 className="section-title">
              Words from Our <em>Leaders</em>
            </h2>
            <div className="section-line" style={{ margin: "0 auto" }} />
          </div>
          <div className="messages-grid">
            <div className="message-card reveal">
              <div className="message-header">
                {/* <div className="message-avatar">👨‍💼</div> */}
                <div className="message-person">
                  <div className="person-name">Kunwar Dayal Singh</div>
                  <div className="person-title">Director, Greenvalley School Chhatrapati Sambhajinagar</div>
                </div>
              </div>
              <div className="message-body">
                <div className="message-body-main">
                  <div className="message-text">
                    <span className="quote-mark">"</span>
                    <p>
                      I firmly believe that an educational institute is not just about bricks, mortar and concrete, but
                      about building character, enriching minds and enriching experiences that last a lifetime. My
                      mission is to create a niche where learning will not be just a series of instructions but a
                      passion, going beyond books and learning horizons.
                    </p>
                    {/* <p style={{ marginTop: "1rem" }}>
                      We are continuously working to develop an environment with a sense of discipline and good moral
                      character — where all students will inculcate values of tolerance, fair play, compassion,
                      integrity and fortitude. In Greenvalley, our teachers collaborate as family members.
                    </p> */}
                  </div>
                  {directorImage && (
                    <div className="message-photo-wrap">
                      <img src={directorImage} alt="Director Kunwar Dayal Singh" className="message-photo" />
                    </div>
                  )}
                </div>
                <div className="message-quote">&quot;Be a fool for a minute rather than a whole life.&quot;</div>
              </div>
            </div>
            <div className="message-card reveal">
              <div className="message-header">
                {/* <div className="message-avatar">👩‍💼</div> */}
                <div className="message-person">
                  <div className="person-name">Urmila Kanwar Shekhawat</div>
                  <div className="person-title">Principal, Greenvalley School Chhatrapati Sambhajinagar</div>
                </div>
              </div>
              <div className="message-body">
                <div className="message-body-main">
                  <div className="message-text">
                    <span className="quote-mark">"</span>
                    <p>
                      Education of the 21st century is relevant, real-life and project-based. We need to develop value
                      education in the modern world — education that develops the head, hand and the heart. Our
                      teachers function as facilitators who coach, prompt, mediate and help students develop their
                      understanding.
                    </p>
                    {/* <p style={{ marginTop: "1rem" }}>
                      In about 11 years our school, like a sapling sprouting with branches, has flourished promoting
                      quality and value-based education. By focusing on child-centred education, we are moulding our
                      future citizens into &quot;nation builders&quot;.
                    </p> */}
                  </div>
                  {principalImage && (
                    <div className="message-photo-wrap">
                      <img src={principalImage} alt="Principal Urmila Kanwar Shekhawat" className="message-photo" />
                    </div>
                  )}
                </div>
                <div className="message-quote">
                  &quot;If your plan is for a hundred years — Educate children.&quot; — Confucius
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section className="teachers" id="teachers">
        <div className="section-inner">
          <div className="teachers-intro reveal">
            <div className="section-label">Our Faculty</div>
            <h2 className="section-title">
              Meet Our <em>Dedicated Teachers</em>
            </h2>
            <div className="section-line" style={{ margin: "0 auto 1rem" }} />
            <p>
              Our talented and passionate teachers bring expertise, creativity, and warmth to every classroom —
              inspiring students to reach their full potential each day.
            </p>
          </div>

          <div className="dept-section reveal">
            <div className="dept-title">
              <span className="dept-icon">📚</span> Languages &amp; Humanities
            </div>

            <div className="teachers-grid">
              {languagesHumanitiesTeachers.map((teacher, i) => {
                const isActive = activeTeacher === teacher.id;
                return (
                  <div
                    key={teacher.id}
                    className={`teacher-card ${teacher.ribbonLight ? "ribbon-light" : ""} ${isActive ? "active" : ""}`}
                    style={{ animationDelay: `${(i + 1) * 0.04}s` }}
                    onClick={() => setActiveTeacher(isActive ? null : teacher.id)}
                  >
                    <div className="teacher-photo-zone">
                      {teacher.photoUrl ? (
                        <img src={teacher.photoUrl} alt={teacher.name} />
                      ) : (
                        <div className="teacher-initials">{teacher.initials}</div>
                      )}
                    </div>

                    <div className="teacher-badge">
                      <svg viewBox="0 0 14 14">
                        <polyline points="2,7 6,11 12,3" />
                      </svg>
                    </div>

                    <div className="teacher-ribbon">
                      <div className="teacher-name">{teacher.name}</div>
                      {teacher.subject && <div className="teacher-subject">{teacher.subject}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="dept-section reveal">
            <div className="dept-title">
              <span className="dept-icon">🔬</span> Science &amp; Mathematics
            </div>
            <div className="teachers-grid">
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "#0ea5e9" }}>
                  NG
                </div>
                <div className="teacher-name">Namrata Gedam</div>
                <div className="teacher-subject">Science</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "#0ea5e9" }}>
                  JS
                </div>
                <div className="teacher-name">Javed Shaikh</div>
                <div className="teacher-subject">Science</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "var(--gold)" }}>
                  SS
                </div>
                <div className="teacher-name">Sonali Shahane</div>
                <div className="teacher-subject">Maths</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "var(--gold)" }}>
                  TK
                </div>
                <div className="teacher-name">Trupti Komte</div>
                <div className="teacher-subject">Maths</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "#6366f1" }}>
                  SwS
                </div>
                <div className="teacher-name">Swati Shekhawat</div>
                <div className="teacher-subject">Social Science</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "#6366f1" }}>
                  MP
                </div>
                <div className="teacher-name">Mahesh Patil</div>
                <div className="teacher-subject">Social Science</div>
              </div>
            </div>
          </div>

          <div className="dept-section reveal">
            <div className="dept-title">
              <span className="dept-icon">🎨</span> Arts, Music &amp; Technology
            </div>
            <div className="teachers-grid">
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "#ec4899" }}>
                  JR
                </div>
                <div className="teacher-name">Jyotsna Raut</div>
                <div className="teacher-subject">Art &amp; Craft</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "#8b5cf6" }}>
                  ShP
                </div>
                <div className="teacher-name">Shriram Potdar</div>
                <div className="teacher-subject">Music</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "#f97316" }}>
                  ShPa
                </div>
                <div className="teacher-name">Shyam Pawar</div>
                <div className="teacher-subject">Dance</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "#14b8a6" }}>
                  DF
                </div>
                <div className="teacher-name">Deepak Fuse</div>
                <div className="teacher-subject">Computer</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "#14b8a6" }}>
                  ShPe
                </div>
                <div className="teacher-name">Shubham Pere</div>
                <div className="teacher-subject">Computer</div>
              </div>
            </div>
          </div>

          <div className="dept-section reveal">
            <div className="dept-title">
              <span className="dept-icon">🌸</span> Pre-Primary Section
            </div>
            <div className="teachers-grid">
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "var(--green-mid)" }}>
                  KD
                </div>
                <div className="teacher-name">Kalyani Danane</div>
                <div className="teacher-subject">Pre Primary</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "var(--green-mid)" }}>
                  KG
                </div>
                <div className="teacher-name">Kanchya Ghyar</div>
                <div className="teacher-subject">Pre Primary</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "var(--green-mid)" }}>
                  SaN
                </div>
                <div className="teacher-name">Sarika Nikam</div>
                <div className="teacher-subject">Pre Primary</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "var(--green-mid)" }}>
                  SG
                </div>
                <div className="teacher-name">Sheetal Gore</div>
                <div className="teacher-subject">Pre Primary</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "#d97706" }}>
                  SD
                </div>
                <div className="teacher-name">Sangeeta Das</div>
                <div className="teacher-subject">Helper</div>
              </div>
              <div className="teacher-card">
                <div className="teacher-avatar" style={{ background: "#d97706" }}>
                  SaK
                </div>
                <div className="teacher-name">Sarika Kapure</div>
                <div className="teacher-subject">Helper</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="section-inner">
          <div className="contact-inner-grid">
            <div className="contact-info reveal">
              <div className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}>
                Get in Touch
              </div>
              <h2 className="section-title">
                We&apos;d Love to <em style={{ color: "var(--gold-light)" }}>Hear from You</em>
              </h2>
              <div className="section-line" />
              <p className="contact-desc">
                Whether you&apos;d like to enrol your child, ask about our programmes, or simply learn more about
                Greenvalley Montessori School — our front office team is here to help.
              </p>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-item-icon">📞</div>
                  <div>
                    <div className="contact-item-label">Phone</div>
                    <div className="contact-item-value">
                      +91 8055314123
                      <br />
                      0240-2954039
                    </div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">✉️</div>
                  <div>
                    <div className="contact-item-label">Email</div>
                    <div className="contact-item-value">
                      <a href="mailto:gmsprincipal01@gmail.com">gmsprincipal01@gmail.com</a>
                    </div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">🕐</div>
                  <div>
                    <div className="contact-item-label">Office Hours</div>
                    <div className="contact-item-value">Monday to Saturday, 7:00 AM – 8:00 PM</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">📍</div>
                  <div>
                    <div className="contact-item-label">Address</div>
                    <div className="contact-item-value">
                      372, Near Datta Mandir, Behind A.S. Club, Chhatrapati Sambhajinagar
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form reveal">
              <div className="form-title">Send a Message</div>
              <div className="form-subtitle">We&apos;ll get back to you within one working day.</div>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Enquiry Type</label>
                <select style={{ appearance: "none" }}>
                  <option value="">Select an option</option>
                  <option>Admissions / Enrolment</option>
                  <option>Academic Programmes</option>
                  <option>Fee Information</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Write your message here..." />
              </div>
              <button className="btn-submit" type="button">
                Send Message →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="fb-name">Greenvalley Montessori School</div>
              <div className="fb-tag">Where Learning is Fun 🌿</div>
              <p className="fb-desc">
                Providing quality, value-based education in Chhatrapati Sambhajinagar since 2011. Nurturing young minds
                and building tomorrow&apos;s leaders through Montessori excellence.
              </p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#vision">Vision &amp; Mission</a>
                </li>
                <li>
                  <a href="#messages">Director&apos;s Message</a>
                </li>
                <li>
                  <a href="#messages">Principal&apos;s Message</a>
                </li>
                <li>
                  <a href="#teachers">Our Teachers</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Info</h4>
              <ul>
                <li>
                  <a href="tel:+918055314123">+91 8055314123</a>
                </li>
                <li>
                  <a href="tel:02402954039">0240-2954039</a>
                </li>
                <li>
                  <a href="mailto:gmsprincipal01@gmail.com">gmsprincipal01@gmail.com</a>
                </li>
                <li>
                  <a href="#">372, Near Datta Mandir</a>
                </li>
                <li>
                  <a href="#">Behind A.S. Club, Chhatrapati Sambhajinagar</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2025 Greenvalley Montessori School. All rights reserved.</div>
            <div className="est-badge">Est. 2011 · Chhatrapati Sambhajinagar</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
