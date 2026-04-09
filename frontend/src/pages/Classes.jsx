import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Classes.css";
import etc from "../assets/etc.png";

export default function Classes() {
  const heroStats = [
    { value: 22, suffix: "", label: "Smart Classrooms" },
    { value: 27, suffix: "+", label: "Expert Teachers" },
    { value: 14, suffix: "+", label: "Years Experience" },
    { value: 95, suffix: "%", label: "Distinction 2024" },
  ];
  const [animatedHeroStats, setAnimatedHeroStats] = useState(heroStats.map(() => 0));

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();
    let rafId;

    const tick = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      setAnimatedHeroStats(heroStats.map((stat) => Math.floor(stat.value * progress)));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="classes-page">
      <nav className="etc-nav">
        <a href="#hero" className="logo">
          <img
            src={etc}
            alt="Expert Tutorial Center Logo"
            style={{ height: "52px", width: "52px", objectFit: "contain", borderRadius: "8px", background: "#fff", padding: "3px" }}
          />
          <div className="logo-text">
            <strong>Expert Tutorial Center</strong>
            <span>Est. 2011 - Aurangabad</span>
          </div>
        </a>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li><a href="#about">About</a></li>
          <li><a href="#facilities">Facilities</a></li>
          {/* <li><a href="#teachers">Teachers</a></li> */}
          <li><a href="#results">Results</a></li>
          <li><a href="#courses">Courses</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="classes-nav-cta">Enroll Now</a>
      </nav>

      <section id="hero">
        <div className="hero-content">
          <div className="hero-badge">Trusted Since 2011 | 16+ Years of Excellence</div>
          <h1 className="hero-title">
            Where Learning Is <span className="highlight">Fun</span>
            <br />
            &amp; Success Is <span className="highlight">Guaranteed</span>
          </h1>
          <p className="hero-sub">
            <strong>22 Classrooms</strong> • <strong>27 Expert Teachers</strong> • <strong>Thousands of Toppers</strong>
          </p>
          <div className="hero-btns">
            <a href="#contact" className="classes-btn-primary">Enroll Now</a>
            <a href="#contact" className="classes-btn-outline">Book Free Demo</a>
          </div>
          <div className="hero-stats">
            {heroStats.map((stat, index) => (
              <div className="stat-item" key={stat.label}>
                <span className="stat-num">
                  {animatedHeroStats[index]}
                  {stat.suffix}
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about">
        <div className="center">
          <span className="section-tag">Our Story</span>
          <h2 className="section-title">About Expert Tuition Center</h2>
          <div className="gold-line" />
        </div>
        <div className="about-grid">
          <div className="about-story">
            <p><strong>Expert Tuition Center</strong> was founded in 2011 with a simple but powerful belief - every student deserves quality education in a stress-free environment.</p>
            <p>We began with just <strong>4 classrooms</strong> and a dedicated team of <strong>3 passionate teachers</strong>. Over the past 14 years, we have grown into one of the most trusted tuition centers in the region, now featuring <strong>22 modern smart classrooms</strong> and a team of <strong>27 highly qualified educators</strong>.</p>
            <p>Our mission is to make learning simple, enjoyable, and effective - building not just academic excellence, but the confidence every student needs to face any challenge.</p>
            <p>We have guided <strong>thousands of students</strong> to achieve distinctions in board exams and beyond, making families proud year after year.</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card"><span className="emoji">👨‍🏫</span><span className="num">27+</span><span className="lbl">Qualified Teachers</span></div>
            <div className="stat-card"><span className="emoji">🏫</span><span className="num">22</span><span className="lbl">Smart Classrooms</span></div>
            <div className="stat-card"><span className="emoji">📅</span><span className="num">14+</span><span className="lbl">Years Experience</span></div>
            <div className="stat-card"><span className="emoji">🎓</span><span className="num">5000+</span><span className="lbl">Successful Students</span></div>
          </div>
        </div>
      </section>

      <section id="problems">
        <div className="center">
          <span className="section-tag">We Understand</span>
          <h2 className="section-title">Struggling With Studies?</h2>
          <div className="gold-line" />
          <p className="section-sub">You're not alone. These are common challenges, and we have the solution.</p>
        </div>
        <div className="problems-grid">
          <div className="problems-list">
            {[
              { icon: "🧠", title: "Memory & Retention Issues", desc: "Difficulty remembering formulas, dates, and concepts even after repeated reading." },
              { icon: "⏱️", title: "Poor Time Management", desc: "Unable to complete syllabus on time or balance multiple subjects effectively." },
              { icon: "😰", title: "Exam Stress & Anxiety", desc: "Nervousness before exams that affects performance despite knowing the material." },
              { icon: "📉", title: "Low Confidence", desc: "Feeling behind peers and losing motivation to study and improve grades." },
              { icon: "📚", title: "Weak Fundamentals", desc: "Gaps in basic concepts making it hard to understand advanced topics." },
            ].map((item) => (
              <div className="problem-item" key={item.title}>
                <span className="problem-icon" aria-hidden="true">{item.icon}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="solution-box">
            <h3>Our Solution ✅</h3>
            <p>
              At Expert Tuition Center, we go beyond rote learning. We identify each student&apos;s weak spots and build
              a solid foundation through concept-based, stress-free teaching.
            </p>
            <ul className="solution-list">
              <li>Concept-first approach</li>
              <li>Chapter-wise tests &amp; regular revision</li>
              <li>Doubt-clearing sessions every day</li>
              <li>Motivational counselling for confidence</li>
              <li>Structured timetable for time management</li>
              <li>Exam simulation with MCQ practice</li>
              <li>Personal attention from expert teachers</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="facilities">
        <div className="center">
          <span className="section-tag">Infrastructure</span>
          <h2 className="section-title">Our Advanced Facilities</h2>
          <div className="gold-line" />
          <p className="section-sub">State-of-the-art infrastructure designed for the best learning experience.</p>
        </div>
        <div className="facilities-grid">
          {[
            { icon: "📹", label: "CCTV Surveillance" },
            { icon: "🧍", label: "Biometric Attendance" },
            { icon: "📶", label: "Wi-Fi Campus" },
            { icon: "🖥️", label: "Smart Classrooms" },
            { icon: "📝", label: "Daily Online Tests" },
            { icon: "📚", label: "Study Material" },
            { icon: "📊", label: "Chapter-wise Tests" },
            { icon: "🧠", label: "MCQ Practice" },
            { icon: "⏳", label: "Timely Completion" },
            { icon: "🌿", label: "Peaceful Environment" },
          ].map((item) => (
            <div className="facility-card" key={item.label}>
              <div className="fc-icon" aria-hidden="true">{item.icon}</div>
              <div className="fc-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* <section id="teachers">
        <div className="center">
          <span className="section-tag">Our Team</span>
          <h2 className="section-title">Meet Our Expert Teachers</h2>
          <div className="gold-line" />
          <p className="section-sub">27+ highly qualified educators dedicated to your child's success.</p>
        </div>
        <div className="teachers-grid">
          {[
            "Mr. Rajesh Kumar",
            "Mrs. Priya Sharma",
            "Mr. Amit Patil",
            "Mrs. Sunita Desai",
            "Mr. Suresh Jadhav",
            "Mrs. Kavita Mehta",
            "Mr. Dinesh Kulkarni",
            "Mrs. Anjali More",
          ].map((name) => (
            <div className="teacher-card" key={name}>
              <img src="https://img.freepik.com/free-photo/front-view-business-woman-suit_23-2148603018.jpg?semt=ais_hybrid&w=740&q=80" alt={name} />
              <div className="teacher-info">
                <div className="teacher-name">{name}</div>
                <div className="teacher-subject">Subject Specialist</div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      <section id="results">
        <div className="center">
          <span className="section-tag">Achievements</span>
          <h2 className="section-title">Our Year-Wise Results</h2>
          <div className="gold-line" />
        </div>
        <div className="results-grid">
          <div className="result-card"><div className="result-year">2024 Board Exam</div><span className="result-pct">95%</span><div className="result-label">Distinction Results</div></div>
          <div className="result-card"><div className="result-year">2023 Board Exam</div><span className="result-pct">92%</span><div className="result-label">Distinction Results</div></div>
          <div className="result-card"><div className="result-year">2022 Board Exam</div><span className="result-pct">90%</span><div className="result-label">Distinction Results</div></div>
        </div>
      </section>

      <section id="courses">
        <div className="center">
          <span className="section-tag">Programs</span>
          <h2 className="section-title">Courses We Offer</h2>
          <div className="gold-line" />
        </div>
        <div className="courses-grid">
          {["8th Standard", "9th Standard", "10th Standard (SSC)", "Science Stream", "Commerce Stream", "Board Exam Prep"].map((course) => (
            <div className="course-card" key={course}>
              <h3>{course}</h3>
              <p>Comprehensive coaching with regular tests, revision, and concept-based teaching.</p>
            </div>
          ))}
        </div>
      </section>

      {/* <section id="media">
        <div className="center">
          <span className="section-tag">Recognition</span>
          <h2 className="section-title">Featured In Newspapers &amp; Media</h2>
          <div className="gold-line" />
        </div>
        <div className="media-grid">
          {["Maharashtra Times", "Education Excellence Award", "Local TV Feature", "Community Recognition"].map((item) => (
            <div className="media-card" key={item}>
              <h4>{item}</h4>
              <p>Recognized for excellence and contribution to student success.</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* <section id="testimonials">
        <div className="center">
          <span className="section-tag">Success Stories</span>
          <h2 className="section-title">What Parents &amp; Students Say</h2>
          <div className="gold-line" />
        </div>
        <div className="testimonials-grid">
          {[
            "Teachers build real understanding. Best decision for our child.",
            "My confidence and marks improved drastically after joining.",
            "Very professional system with regular updates to parents.",
          ].map((text, i) => (
            <div className="testi-card" key={i}>
              <div className="stars">★★★★★</div>
              <p className="testi-text">{text}</p>
            </div>
          ))}
        </div>
      </section> */}

      <section id="cta">
        <h2 className="section-title">
          Give Your Child the Right Guidance for a <span className="highlight">Bright Future</span>
        </h2>
        <div className="gold-line" />
        <p className="section-sub">Join thousands of successful students. Book your free demo class today.</p>
        <div className="hero-btns">
          <a href="#contact" className="classes-btn-primary">Contact Now</a>
          <a href="#contact" className="classes-btn-outline">Enroll Today</a>
        </div>
      </section>

      <section id="contact">
        <div className="center">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Contact &amp; Inquiry</h2>
          <div className="gold-line" />
          <p className="section-sub">
            Visit us, call us, or fill out the form — we&apos;ll get back to you within hours.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Find Us Here</h3>
            <ul className="contact-items">
              <li className="contact-item">
                <span className="contact-item-icon" aria-hidden="true">📍</span>
                <div>
                  <span className="contact-item-label">Address</span>
                  <p className="contact-item-value">
                    Expert Tuition Center, Mhada Colony, Behind A S. Club,Chhatrapati Sambhajinagar, Maharashtra 431136
                  </p>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-item-icon" aria-hidden="true">📞</span>
                <div>
                  <span className="contact-item-label">Phone</span>
                  <p className="contact-item-value">
                    <a href="tel:+919876543210">+91 8055314123</a>
                  </p>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-item-icon" aria-hidden="true">💬</span>
                <div>
                  <span className="contact-item-label">WhatsApp</span>
                  <p className="contact-item-value">
                    <a href="https://wa.me/918055314123" target="_blank" rel="noopener noreferrer">
                      +91 8055314123
                    </a>
                  </p>
                  <span className="contact-item-hint">Message us anytime!</span>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-item-icon" aria-hidden="true">✉️</span>
                <div>
                  <span className="contact-item-label">Email</span>
                  <p className="contact-item-value">
                    <a href="mailto:dayalgms@gmail.com">dayalgms@gmail.com</a>
                  </p>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-item-icon" aria-hidden="true">🕐</span>
                <div>
  <span className="contact-item-label">Timings</span>
  <div className="contact-item-value">
    <p>Mon – Sat</p>
    <p>8:00 AM – 2:00 PM</p>
    <p>5:00 PM – 8:00 PM</p>
    <p>Sunday: Holiday</p>
  </div>
</div>
              </li>
            </ul>
            <div className="contact-map-placeholder" aria-label="Google map location">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49849.92854319811!2d75.17901177085746!3d19.830246296628726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb999fe55ed6f5%3A0xc7de108dd6c87e34!2sGreenvalley%20Montessori%20School!5e0!3m2!1sen!2sin!4v1774428397813!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Greenvalley Montessori School - Google Map"
              />
            </div>
          </div>
          <div className="inquiry-form">
            <h3>Book Your Free Demo Class</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="etc-student-name">Student&apos;s Name</label>
                <input id="etc-student-name" type="text" name="studentName" autoComplete="name" placeholder="Enter full name" />
              </div>
              <div className="form-group">
                <label htmlFor="etc-parent-name">Parent&apos;s Name</label>
                <input id="etc-parent-name" type="text" name="parentName" autoComplete="name" placeholder="Enter parent name" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="etc-phone">Phone Number</label>
                <input id="etc-phone" type="tel" name="phone" autoComplete="tel" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label htmlFor="etc-whatsapp">WhatsApp Number</label>
                <input id="etc-whatsapp" type="tel" name="whatsapp" autoComplete="tel" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="etc-standard">Current Standard</label>
                <select id="etc-standard" name="standard" defaultValue="10th">
                  <option value="8th">8th Standard</option>
                  <option value="9th">9th Standard</option>
                  <option value="10th">10th Standard (SSC)</option>
                  <option value="11th">11th Standard</option>
                  <option value="12th">12th Standard</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="etc-stream">Stream</label>
                <select id="etc-stream" name="stream" defaultValue="">
                  <option value="" disabled>
                    Select Stream
                  </option>
                  <option value="science">Science</option>
                  <option value="commerce">Commerce</option>
                  <option value="arts">Arts / Vocational</option>
                  <option value="general">General (8th–10th)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="etc-subject">Subject of Interest</label>
              <input
                id="etc-subject"
                type="text"
                name="subject"
                placeholder="e.g. Mathematics, Science, All Subjects"
              />
            </div>
            <div className="form-group">
              <label htmlFor="etc-message">Message / Query</label>
              <textarea
                id="etc-message"
                name="message"
                rows={4}
                placeholder="Write your query or anything you&apos;d like us to know..."
              />
            </div>
            <button className="btn-submit" type="button">
              Submit Inquiry &amp; Book Free Demo
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <a href="#hero" className="logo footer-logo">
            <img
              src="https://www.gmsetc.in/assets/img/logo_etc.png"
              alt="Expert Tutorial Center Logo"
              style={{ height: "48px", width: "48px", objectFit: "contain", borderRadius: "8px", background: "#fff", padding: "3px" }}
            />
            <div className="logo-text">
              <strong>Expert Tutorial Center</strong>
              <span>Where Learning Is Fun</span>
            </div>
          </a>
          <nav className="footer-links">
            <a href="#about">About</a>
            <a href="#facilities">Facilities</a>
            <a href="#teachers">Teachers</a>
            <a href="#results">Results</a>
            <a href="#courses">Courses</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© 2011-2026 Expert Tutorial Center</p>
        </div>
      </footer>
    </div>
  );
}

