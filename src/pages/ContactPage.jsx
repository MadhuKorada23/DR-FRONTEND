import React from "react";
import { Link } from "react-router-dom"; // ✅ use Link for navbar

const Contact = () => {
  return (
    <>
      {/* Custom CSS */}
      <style>
        {`
          /* Make team images square and fit inside the card */
          .team-img {
            width: 100%;
            height: 250px;  /* fixed height */
            object-fit: cover; /* ensures image fills box without distortion */
            border-radius: 8px; /* small rounded corners instead of circle */
            margin-bottom: 15px;
          }

          /* Fix card size */
          .team-card {
            width: 100%;
            max-width: 320px; /* same size for all cards */
            height: 420px; /* fixed height */
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            margin: 0 auto;
          }
        `}
      </style>

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand" to="/">AITAM Digital Rooms</Link>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-5 text-center bg-light">
        <div className="container">
          <h1 className="display-5 fw-bold">Contact Our Team</h1>
          <p className="lead mt-3">
            We’re passionate developers who built the AITAM Digital Room
            Management Portal. Feel free to reach out to us or send your
            valuable feedback below. 🚀
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Team</h2>
          <div className="row g-4 justify-content-center text-center">
            {/* Member 1 */}
            <div className="col-md-4 d-flex justify-content-center">
              <div className="card shadow-sm p-3 team-card">
                <img src="images/madhu.jpg" alt="Sri.K.V.ChandraSekhar" className="team-img" />
                <h5 className="fw-bold">Sri.K.V.ChandraSekhar,Asst.Prof</h5>
                <p className="text-muted">Web-Administration</p>
                <a href="mailto:madhu@example.com" className="btn btn-outline-dark btn-sm mt-auto">
                  Email
                </a>
              </div>
            </div>

            {/* Member 2 */}
            <div className="col-md-4 d-flex justify-content-center">
              <div className="card shadow-sm p-3 team-card">
                <img src="/bharath.webp" alt="Kurasa.Bharath" className="team-img" />
                <h5 className="fw-bold">Member 2</h5>
                <p className="text-muted">FullStack Developer</p>
                <a href="mailto:member2@example.com" className="btn btn-outline-dark btn-sm mt-auto">
                  Email
                </a>
              </div>
            </div>

            {/* Member 3 */}
            <div className="col-md-4 d-flex justify-content-center">
              <div className="card shadow-sm p-3 team-card">
                <img src="/jagga.webp" alt="Dasari.Jagadeesh" className="team-img" />
                <h5 className="fw-bold">Member 3</h5>
                <p className="text-muted">FullStack Developer</p>
                <a href="mailto:member3@example.com" className="btn btn-outline-dark btn-sm mt-auto">
                  Email
                </a>
              </div>
            </div>

            {/* Member 4 */}
            <div className="col-md-4 d-flex justify-content-center">
              <div className="card shadow-sm p-3 team-card">
                <img src="/blazzerpic1.webp" alt="Mahesh Babu" className="team-img" />
                <h5 className="fw-bold">FullStack Developer</h5>
                <p className="text-muted">UI/UX Designer</p>
                <a href="mailto:member4@example.com" className="btn btn-outline-dark btn-sm mt-auto">
                  Email
                </a>
              </div>
            </div>

            {/* Member 5 */}
            <div className="col-md-4 d-flex justify-content-center">
              <div className="card shadow-sm p-3 team-card">
                <img src="/madhu.webp" alt="Madhu Korada" className="team-img" />
                <h5 className="fw-bold">Member 5</h5>
                <p className="text-muted">FullStack Developer</p>
                <a href="mailto:member5@example.com" className="btn btn-outline-dark btn-sm mt-auto">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-4">Send Us Your Feedback</h2>
            <form
              action="https://formspree.io/f/xrbbnlgw"
              method="POST"
              className="w-75 mx-auto"
              onSubmit={(e) => {
                setTimeout(() => e.target.reset(), 500); // clears form after submit
              }}
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input type="text" name="name" className="form-control" id="name" placeholder="Enter your name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input type="email" name="email" className="form-control" id="email" placeholder="Enter your email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Your Feedback</label>
                <textarea name="message" className="form-control" id="message" rows="4" placeholder="Write your feedback here..." required></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-dark px-4">Send Feedback</button>
              </div>
            </form>
          </div>
        </section>



      {/* Footer */}
      {/* <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">© 2025 AITAM DRM | Developed by Our Team</p>
      </footer> */}
    </>
  );
};

export default Contact;
