import "./Classes.css";

export default function Classes() {
  return (
    <div className="classes-page">
      <nav className="etc-nav">
        <a href="#hero" className="logo">
          <img
            src="https://www.gmsetc.in/assets/img/logo_etc.png"
            alt="Expert Tutorial Center Logo"
            style={{ height: "52px", width: "52px", objectFit: "contain", borderRadius: "8px", background: "#fff", padding: "3px" }}
          />
          <div className="logo-text">
            <strong>Expert Tutorial Center</strong>
            <span>Est. 2011 - Aurangabad</span>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#facilities">Facilities</a></li>
          <li><a href="#teachers">Teachers</a></li>
          <li><a href="#results">Results</a></li>
          <li><a href="#courses">Courses</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Enroll Now</a>
      </nav>

      <section id="hero">
        <div className="hero-content">
          <div className="hero-badge">Trusted Since 2011 | 14+ Years of Excellence</div>
          <h1 className="hero-title">
            Where Learning Is <span className="highlight">Fun</span>
            <br />
            &amp; Success Is <span className="highlight">Guaranteed</span>
          </h1>
          <p className="hero-sub">
            <strong>22 Classrooms</strong> • <strong>27 Expert Teachers</strong> • <strong>Thousands of Toppers</strong>
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">Enroll Now</a>
            <a href="#contact" className="btn-outline">Book Free Demo</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item"><span className="stat-num">22</span><span className="stat-label">Smart Classrooms</span></div>
            <div className="stat-item"><span className="stat-num">27+</span><span className="stat-label">Expert Teachers</span></div>
            <div className="stat-item"><span className="stat-num">14+</span><span className="stat-label">Years Experience</span></div>
            <div className="stat-item"><span className="stat-num">95%</span><span className="stat-label">Distinction 2024</span></div>
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
          <p className="section-sub">You're not alone. These are common challenges, and we have the right support system.</p>
        </div>
        <div className="problems-grid">
          <div className="problems-list">
            {[
              "Memory & Retention Issues",
              "Poor Time Management",
              "Exam Stress & Anxiety",
              "Low Confidence",
              "Weak Fundamentals",
            ].map((item) => (
              <div className="problem-item" key={item}>
                <div><h4>{item}</h4><p>Personal guidance and structured practice to improve results consistently.</p></div>
              </div>
            ))}
          </div>
          <div className="solution-box">
            <h3>Our Solution</h3>
            <p>Concept-based teaching, regular revision, and personal attention for each student.</p>
            <ul className="solution-list">
              <li>Concept-first approach</li>
              <li>Chapter-wise tests</li>
              <li>Daily doubt clearing</li>
              <li>Motivational counselling</li>
              <li>Exam simulation practice</li>
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
          {["CCTV Surveillance", "Biometric Attendance", "Wi-Fi Campus", "Smart Classrooms", "Daily Online Tests", "Study Material", "Chapter-wise Tests", "MCQ Practice", "Timely Completion", "Peaceful Environment"].map((label) => (
            <div className="facility-card" key={label}>
              <div className="fc-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="teachers">
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
      </section>

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

      <section id="media">
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
      </section>

      <section id="testimonials">
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
      </section>

      <section id="cta">
        <h2 className="section-title">
          Give Your Child the Right Guidance for a <span className="highlight">Bright Future</span>
        </h2>
        <div className="gold-line" />
        <p className="section-sub">Join thousands of successful students. Book your free demo class today.</p>
        <div className="hero-btns">
          <a href="#contact" className="btn-primary">Contact Now</a>
          <a href="#contact" className="btn-outline">Enroll Today</a>
        </div>
      </section>

      <section id="contact">
        <div className="center">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Contact &amp; Inquiry</h2>
          <div className="gold-line" />
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Find Us Here</h3>
            <p>Expert Tuition Center, Near ABC Chowk, Aurangabad, Maharashtra - 431001</p>
            <p>+91 98765 43210</p>
            <p>Mon - Sat: 7:00 AM - 9:00 PM</p>
          </div>
          <div className="inquiry-form">
            <h3>Book Your Free Demo Class</h3>
            <div className="form-group"><label>Student's Name</label><input type="text" placeholder="Enter full name" /></div>
            <div className="form-group"><label>Phone Number</label><input type="tel" placeholder="+91 XXXXX XXXXX" /></div>
            <div className="form-group"><label>Current Standard</label><input type="text" placeholder="8th / 9th / 10th / 11th / 12th" /></div>
            <div className="form-group"><label>Message</label><textarea placeholder="Write your query..." /></div>
            <button className="btn-submit" type="button">Submit Inquiry &amp; Book Free Demo</button>
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

