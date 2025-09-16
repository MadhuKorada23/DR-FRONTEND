import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link

const AboutPage = () => {
  return (
    <>
      {/* Navbar */}
     <nav 
  className="navbar navbar-light" 
  style={{ backgroundColor: "#1c92f3ff" }}
>
  <div className="container d-flex justify-content-between align-items-center">
    <Link className="nav-link text-white fw-semibold" to="/">AITAM Digital Rooms</Link>
    <ul className="navbar-nav flex-row">
      <li className="nav-item mx-2">
        <Link className="nav-link text-white fw-semibold" to="/">Home</Link>
      </li>
      <li className="nav-item mx-2">
        <Link className="nav-link text-white fw-semibold" to="/Contact">Contact</Link>
      </li>
      <li className="nav-item mx-2">
              <Link className="nav-link text-white fw-semibold" to="/Team">Team</Link>
      </li>
    </ul>
  </div>
</nav>



      {/* Hero Section */}
      <section className="py-5 text-center bg-light">
        <div className="container">
          <h1 className="display-5 fw-bold">
            About Our Digital Room Management Portal
          </h1>
          <p className="lead mt-3">
            AITAM’s Digital Room Management Portal is a smart, fast, and
            reliable solution for managing classrooms, labs, and faculty rooms
            efficiently.
          </p>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Why This Portal?</h2>
          <p className="text-center text-muted">
            Managing classrooms manually can be time-consuming and error-prone.
            Our system provides a <b>centralized digital platform</b> to handle
            room availability, scheduling, and occupancy in real-time.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Key Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center p-3">
                <h5>📊 Real-time Room Status</h5>
                <p className="text-muted">
                  View available and occupied rooms instantly with live updates.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center p-3">
                <h5>🔑 Role-based Access</h5>
                <p className="text-muted">
                  Admins can add, edit, or delete blocks and rooms, while
                  students can view only.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center p-3">
                <h5>📅 Smart Scheduling</h5>
                <p className="text-muted">
                  Timetable integration ensures no double-booking of rooms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">How It Works</h2>
          <div className="row text-center">
            <div className="col-md-3">
              <div className="p-3">
                <h5>1️⃣ Create Blocks</h5>
                <p>Admins add academic blocks and floors.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3">
                <h5>2️⃣ Add Rooms</h5>
                <p>Teaching & faculty rooms with seat capacity.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3">
                <h5>3️⃣ Assign Timetables</h5>
                <p>Upload or edit schedules for each room.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3">
                <h5>4️⃣ Monitor Usage</h5>
                <p>Check live occupancy and optimize usage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Enhancements */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Future Enhancements</h2>
          <ul className="list-group list-group-flush w-75 mx-auto">
            <li className="list-group-item">AI-based room allocation</li>
            <li className="list-group-item">Mobile app integration</li>
            <li className="list-group-item">
              Analytics dashboard for usage reports
            </li>
          </ul>
        </div>
      </section>
           
           
            {/* Faculty Guidance Section */}
            {/* Faculty Guidance Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Under the Guidance of</h2>
          <div className="row justify-content-center align-items-center">
            
            {/* Faculty Image */}
            <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
              <img
                src="/HODSIR.webp" // <-- replace with your image (e.g. bharath.webp)
                alt="Faculty"
                className="img-fluid rounded shadow-lg"
                style={{
                  width: "100%",
                  maxWidth: "250px", // keeps it large but not oversized
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Faculty Info */}
            <div className="col-md-6">
              <h4 className="fw-bold">Dr. Y. Ramesh</h4>
              <p className="text-muted mb-1">
                Professor & Head of Department, CSE
              </p>
              <p className="mb-3">
                Aditya Institute of Technology and Management, Tekkali
              </p>
              <p className="lead">
                We sincerely express our gratitude to our faculty mentor for
                their constant <b>Guidance, Support, and Encouragement</b>{" "}
                throughout the development of this project. Their insights and
                expertise have been invaluable in shaping this work and ensuring
                its success.
              </p>
            </div>
          </div>
           {/* Additional Faculty Section */}
          <div className="row mt-5 text-center">
        <div className="col-md-6 mb-4">
          <img
            src="/chandusir.webp"
            alt="Sri. K.V. Chandra Sekhar"
            className="img-fluid shadow-sm mb-3"
            style={{ 
              width: "180px", 
              height: "200px", 
              objectFit: "cover", 
              borderRadius: "12px"  // 🔹 Rounded box effect
            }}
          />
          <h5 className="fw-bold">Sri. K.V. Chandra Sekhar</h5>
          <p className="text-muted mb-1">Assistant Professor, CSE</p>
          <p className="small text-muted">
            For his valuable guidance, support, and encouragement throughout the project.
          </p>
        </div>

        <div className="col-md-6 mb-4">
          <img
            src="/challusir.webp"
            alt="Sri. T. Chalapathi Rao"
            className="img-fluid shadow-sm mb-3"
            style={{ 
              width: "180px", 
              height: "200px", 
              objectFit: "cover", 
              borderRadius: "12px"  // 🔹 Rounded box effect
            }}
          />
          <h5 className="fw-bold">Sri. T. Chalapathi Rao</h5>
          <p className="text-muted mb-1">Assistant Professor, CSE</p>
          <p className="small text-muted">
            For his valuable guidance, timely suggestions, and technical assistance.
          </p>
        </div>
          </div>


        </div>
      </section>



      {/* Footer */}
      {/* <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">© 2025 AITAM DRM | Developed by Team</p>
      </footer> */}
    </>
  );
};

export default AboutPage;
