import React from 'react';
import { FaEnvelope, FaIdBadge } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const teamData = [
  {
    name: 'Madhu',
    branch: 'CSE',
    roll: '22A51A05F5',
    email: 'madhukorada23@gmail.com',
    img: process.env.PUBLIC_URL + '/madhu.webp',
    portfolio: 'https://madhu-portfolio-m9yv.onrender.com/',
  },
  {
    name: 'Mahesh',
    branch: 'CSE',
    roll: '22A51A05F4',
    email: 'mahesh20104@gmail.com.com',
    img: process.env.PUBLIC_URL + '/blazzerpic1.webp',
    portfolio: 'https://mahesh5f4.github.io/myportfolio/',
  },
  {
    name: 'Jagadeesh',
    branch: 'CSE',
    roll: '22A51A05D9',
    email: 'dasarijagadeesh442@gmail.com',
    img: process.env.PUBLIC_URL + '/jagga.webp',
    portfolio: 'https://jagadeesh.me',
  },
  {
    name: 'Bharath',
    branch: 'CSE',
    roll: '22A51A05F7',
    email: 'bharathkurasa@gmail.com',
    img: process.env.PUBLIC_URL + '/bharath.webp',
    portfolio: 'https://rahulverma.io',
  },
];

const Team = () => {
  return (
    <div>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: '#1c92f3ff' }}
      >
        <div className="container">
           <h1 className="nav-link text-white fw-semibold" to="/">AITAM Digital Rooms</h1>
          <div className="collapse navbar-collapse d-flex justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item mx-2">
                <Link className="nav-link text-white fw-semibold" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-white fw-semibold" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-white fw-semibold" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Team Section */}
      <div className="container mt-5 mb-5">
       <h3 className="text-center mb-4 fw-bold">🌟 Meet Our Team 🌟</h3>

        <div className="row g-4">
          {teamData.map((member, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div
                className="card shadow-lg border-0 rounded-4 h-100"
                style={{
                  transition: 'transform 0.3s ease-in-out',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.03)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1)')
                }
              >
                <img
                  src={member.img}
                  className="card-img-top rounded-top"
                  alt={member.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold text-primary">
                    {member.name}
                  </h5>
                  <span className="badge bg-info mb-2">{member.branch}</span>
                  <p className="card-text mb-2 text-secondary">
                    <FaIdBadge className="me-1 text-dark" />
                    {member.roll}
                  </p>
                  <p className="card-text mb-2 text-secondary">
                    <FaEnvelope className="me-1 text-dark" />
                    <a
                      href={`mailto:${member.email}`}
                      className="text-decoration-none"
                    >
                      {member.email}
                    </a>
                  </p>
                  <a
                    href={member.portfolio}
                    className="btn btn-outline-primary btn-sm mt-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    🔗 View Portfolio
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
