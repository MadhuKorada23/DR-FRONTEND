
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";


const FreeFaculty = () => {
  const [timetables, setTimetables] = useState([]);
  const [faculties, setFaculties] = useState({});
  const [freeFaculties, setFreeFaculties] = useState({});
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPeriods, setSelectedPeriods] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Monday");


  const periodsList = [1, 2, 3, 4, 5, 6, 7];
  const daysList = [

    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  const normalizeName = (name) => {
    if (!name) return "";
    let s = name.toLowerCase();
    const titles = ["sri", "smt", "dr", "mr", "mrs", "ms", "prof", "ch", "shri"];
    const titleRegex = new RegExp(`\\b(${titles.join("|")})\\.?\\b`, "g");
    s = s.replace(titleRegex, " ");
    s = s.replace(/[.,]/g, " ");
    s = s.replace(/\s+/g, " ").trim();
    return s;
  };


  const addFacultiesToSet = (facultyField, normSet, normToOriginalMap) => {
    if (!facultyField) return;
    facultyField.split("/").forEach((raw) => {
      const display = raw.trim();
      if (!display || display === "-") return;
      const normalized = normalizeName(display);
      if (!normalized) return;
      if (!normToOriginalMap[normalized]) {
        normToOriginalMap[normalized] = display;
      }
      normSet.add(normalized);
    });
  };


  useEffect(() => {
    fetchTimetables();
  }, []);


const fetchTimetables = async () => {
  try {
    setLoading(true);
    const res = await axios.get(
      "https://dr-backend-32ec.onrender.com/periods/fetchBlocksTimetables"
    );
    setTimetables(res.data);


    const blockWiseNorm = {};
    const normToOriginal = {};


    res.data.forEach((block) => {
      if (!blockWiseNorm[block.blockName]) {
        blockWiseNorm[block.blockName] = new Set();
      }
      block.rooms.forEach((room) => {
        room.timetableData.forEach((day) => {
          day.periods.forEach((period) => {
            addFacultiesToSet(
              period.faculty,
              blockWiseNorm[block.blockName],
              normToOriginal
            );
          });
        });
      });
    });


    const blockWiseDisplay = {};
    Object.keys(blockWiseNorm).forEach((blockName) => {
      blockWiseDisplay[blockName] = Array.from(blockWiseNorm[blockName]).map(
        (norm) => normToOriginal[norm]
      );
      blockWiseDisplay[blockName].sort((a, b) =>
        normalizeName(a).localeCompare(normalizeName(b))
      );
    });


    setFaculties(blockWiseDisplay);
    setFreeFaculties({});
    setExpandedBlock(null);
    setSearch("");


    // ✅ RESET selections on reload
    setSelectedPeriods([]);
    const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
    setSelectedDay(todayName);
  } catch (err) {
    console.error("Error fetching timetables", err);
  } finally {
    setLoading(false);
  }
};




  const checkFreeFaculties = () => {
    if (!selectedDay || selectedPeriods.length === 0) return;


    const blockWiseBusyNorm = {};


    timetables.forEach((block) => {
      if (!blockWiseBusyNorm[block.blockName]) {
        blockWiseBusyNorm[block.blockName] = new Set();
      }


      block.rooms.forEach((room) => {
        const dayData = room.timetableData.find(
          (d) => d.dayName.toLowerCase() === selectedDay.toLowerCase()
        );
        if (!dayData) return;


        dayData.periods.forEach((period) => {
          if (selectedPeriods.includes(period.periodNumber)) {
            if (period.faculty) {
              period.faculty.split("/").forEach((raw) => {
                const display = raw.trim();
                if (!display || display === "-") return;
                const norm = normalizeName(display);
                if (norm) blockWiseBusyNorm[block.blockName].add(norm);
              });
            }
          }
        });
      });
    });


    const blockWiseFreeDisplay = {};
    Object.keys(faculties).forEach((blockName) => {
      blockWiseFreeDisplay[blockName] = faculties[blockName].filter((disp) => {
        const norm = normalizeName(disp);
        return !blockWiseBusyNorm[blockName]?.has(norm);
      });
    });


    setFreeFaculties(blockWiseFreeDisplay);
  };


  const filteredFree = useMemo(() => {
    const q = normalizeName(search);
    if (!q) return freeFaculties;
    const out = {};
    Object.keys(freeFaculties).forEach((blockName) => {
      out[blockName] = freeFaculties[blockName].filter((disp) =>
        normalizeName(disp).includes(q)
      );
    });
    return out;
  }, [freeFaculties, search]);


  const togglePeriod = (periodNumber) => {
    setSelectedPeriods((prev) =>
      prev.includes(periodNumber)
        ? prev.filter((p) => p !== periodNumber)
        : [...prev, periodNumber]
    );
  };


  useEffect(() => {
    checkFreeFaculties();
  }, [selectedPeriods, selectedDay]);


  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center mb-4 p-3 shadow-sm"
        style={{ backgroundColor: "#0d6efd", color: "white", width: "100%" }}
      >
        <h2 className="mb-0">Free Faculty</h2>
        <div>
          <button
            className="btn btn-light btn-sm me-2"
            onClick={() => window.history.back()}
          >
          Back
          </button>
          {/* <button
            className="btn btn-light btn-sm"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button> */}
        </div>
      </div>


      <div className="container mt-4">
        <div className="card shadow-sm p-4 mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Select Day</label>
              <select
                className="form-select"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {daysList.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>


            <div className="col-md-8">
              <label className="form-label">Select Periods</label>
              <div className="d-flex gap-2 flex-wrap">
                {periodsList.map((p) => (
                  <button
                    key={p}
                    className={`btn ${
                      selectedPeriods.includes(p)
                        ? "btn-primary"
                        : "btn-outline-primary"
                    } btn-sm`}
                    onClick={() => togglePeriod(p)}
                  >
                    Period {p}
                  </button>
                ))}
              </div>
            </div>
          </div>


          <div className="mt-4">
            <label className="form-label">Search Faculty</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. d. prakash, sri d prakash"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <small className="text-muted">
              Tip: Search ignores titles, punctuation, and spacing.
            </small>
          </div>


          <div className="text-end mt-3">
            <button
              className="btn btn-outline-secondary"
              onClick={fetchTimetables}
              disabled={loading}
              title="Reload timetables"
            >
              ↻ Reload
            </button>
          </div>
        </div>


        {/* <div>
          <h5>Available Faculties by Block</h5>
          {Object.keys(filteredFree).length > 0 &&
          Object.values(filteredFree).some((arr) => arr.length > 0) ? (
            Object.keys(filteredFree).map((blockName) => (
              <div key={blockName} className="card mb-3 shadow-sm rounded">
                <div
                  className="card-header d-flex justify-content-between align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setExpandedBlock(
                      expandedBlock === blockName ? null : blockName
                    )
                  }
                >
                  <span>
                    <strong>{blockName} Block</strong> —{" "}
                    {filteredFree[blockName]?.length || 0} free
                  </span>
                  <span>{expandedBlock === blockName ? "▲" : "▼"}</span>
                </div>


                {expandedBlock === blockName && (
                  <div className="card-body">
                    {filteredFree[blockName]?.length > 0 ? (
                      <div className="d-flex flex-wrap gap-2">
                        {filteredFree[blockName].map((faculty, idx) => (
                          <span
                            key={idx}
                            className="badge bg-success text-white p-2"
                          >
                            {faculty}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No free faculty here.</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted">
              Select day and periods above to see available faculties. Use
              search to match across variants like “Sri/Smt/Dr”, dots, and
              spacing.
            </p>
          )}
        </div> */}
        <div>
  <h5 className="mb-3 text-secondary">Available Faculties by Block</h5>
  {Object.keys(filteredFree).length > 0 &&
  Object.values(filteredFree).some((arr) => arr.length > 0) ? (
    Object.keys(filteredFree).map((blockName) => (
      <div
        key={blockName}
        className="card mb-3 border-0 shadow-sm rounded"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div
          className="card-header d-flex justify-content-between align-items-center"
          style={{
            cursor: "pointer",
            backgroundColor: "#f1f3f5",
            borderBottom: "1px solid #dee2e6",
          }}
          onClick={() =>
            setExpandedBlock(expandedBlock === blockName ? null : blockName)
          }
        >
          <div>
            <span className="fw-bold text-dark">{blockName} Block</span>{" "}
            <span className="badge bg-light text-dark border">
              {filteredFree[blockName]?.length || 0} free
            </span>
          </div>
          <div style={{ fontSize: "1rem", color: "#495057" }}>
            {expandedBlock === blockName ? "▲" : "▼"}
          </div>
        </div>


        {expandedBlock === blockName && (
          <div className="card-body">
            {filteredFree[blockName]?.length > 0 ? (
              <div className="d-flex flex-wrap gap-2">
                {filteredFree[blockName].map((faculty, idx) => (
                  <span
                    key={idx}
                    className="badge rounded-pill"
                    style={{
                      backgroundColor: "#e9ecef",
                      color: "#343a40",
                      padding: "0.5rem 0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    {faculty}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted mb-0">No free faculty in this block.</p>
            )}
          </div>
        )}
      </div>
    ))
  ) : (
    <p className="text-muted">
      Select day and periods above to see available faculties.
    </p>
  )}
</div>




      </div>
    </>
  );
};


export default FreeFaculty;