

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
const FreeFaculty = () => {
  const [timetables, setTimetables] = useState([]);
  // faculties: { [blockName]: string[] }  -> array of original (first-seen) display names
  const [faculties, setFaculties] = useState({});
  // freeFaculties: { [blockName]: string[] } -> array of original display names (from faculties)
  const [freeFaculties, setFreeFaculties] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // --- Name Normalization ---
  // 1) lowercase
  // 2) remove common titles/honorifics
  // 3) remove dots and collapse spaces
  // 4) trim
  const normalizeName = (name) => {
    if (!name) return "";

    let s = name.toLowerCase();

    // Remove common honorifics/titles (add more as needed)
    // using word boundary to avoid partial removals (e.g., 'ram' not cut by 'ra')
    const titles = [
      "sri",
      "smt",
      "dr",
      "mr",
      "mrs",
      "ms",
      "prof",
      "ch",
      "shri",
      "sr(i)?", // to be safe, but word boundary will handle
    ];
    // Strip dotted variants by first removing dots (we also remove dots below globally)
    // Remove titles as standalone words (with optional trailing dot)
    const titleRegex = new RegExp(`\\b(${titles.join("|")})\\.?\\b`, "g");
    s = s.replace(titleRegex, " ");

    // Remove dots and other stray punctuation except spaces and slashes (slashes are used to split multiple names)
    s = s.replace(/[.,]/g, " ");

    // Collapse multiple spaces
    s = s.replace(/\s+/g, " ").trim();

    return s;
  };

  // Splits a faculty field (possibly "A / B / C") and safely adds to a Set of normalized names,
  // while also preserving a map from normalized -> first-seen original display name.
  const addFacultiesToSet = (facultyField, normSet, normToOriginalMap) => {
    if (!facultyField) return;
    facultyField.split("/").forEach((raw) => {
      const display = raw.trim();
      if (!display || display === "-") return;

      const normalized = normalizeName(display);
      if (!normalized) return;

      if (!normToOriginalMap[normalized]) {
        // preserve first seen original for UI
        normToOriginalMap[normalized] = display;
      }
      normSet.add(normalized);
    });
  };

  useEffect(() => {
    fetchTimetables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // IMPORTANT: run only once on mount

  const fetchTimetables = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://dr-backend-32ec.onrender.com/periods/fetchBlocksTimetables"
      );
      setTimetables(res.data);

      // Build block-wise unique faculty lists using normalized names
      const blockWiseNorm = {}; // { blockName: Set<normalized> }
      const normToOriginal = {}; // { normalized: originalDisplayName (first seen) }

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

      // Convert normalized sets to display arrays using the preserved original names
      const blockWiseDisplay = {};
      Object.keys(blockWiseNorm).forEach((blockName) => {
        blockWiseDisplay[blockName] = Array.from(blockWiseNorm[blockName]).map(
          (norm) => normToOriginal[norm]
        );
        // Optional: sort alphabetically by normalized for stable UI
        blockWiseDisplay[blockName].sort((a, b) =>
          normalizeName(a).localeCompare(normalizeName(b))
        );
      });

      setFaculties(blockWiseDisplay);
      setFreeFaculties({}); // reset any previous results
      setExpandedBlock(null);
    } catch (err) {
      console.error("Error fetching timetables", err);
    } finally {
      setLoading(false);
    }
  };

  // Time overlap helper
  const isOverlapping = (start1, end1, start2, end2) => {
    const toMinutes = (t) => {
      if (!t) return null;
      const [time, modifier] = t.split(" ");
      if (!time || !modifier) return null;
      let [hours, minutes] = time.split(":").map(Number);
      if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
      const mod = modifier.toUpperCase();
      if (mod === "PM" && hours !== 12) hours += 12;
      if (mod === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const s1 = toMinutes(start1);
    const e1 = toMinutes(end1);
    const s2 = toMinutes(start2);
    const e2 = toMinutes(end2);
    if (s1 == null || e1 == null || s2 == null || e2 == null) return false;

    return s1 < e2 && s2 < e1;
  };

  const checkFreeFaculties = () => {
    if (!startTime || !endTime) return;

    // Build block-wise sets of BUSY normalized names for the chosen time range
    const blockWiseBusyNorm = {}; // { [blockName]: Set<normalized> }

    timetables.forEach((block) => {
      if (!blockWiseBusyNorm[block.blockName]) {
        blockWiseBusyNorm[block.blockName] = new Set();
      }

      block.rooms.forEach((room) => {
        room.timetableData.forEach((day) => {
          day.periods.forEach((period) => {
            if (
              isOverlapping(startTime, endTime, period.startTime, period.endTime)
            ) {
              // add all faculty on this period to busy set (normalized)
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
    });

    // Compute FREE = faculties (display array) filtered by not in busy normalized set
    const blockWiseFreeDisplay = {};
    Object.keys(faculties).forEach((blockName) => {
      blockWiseFreeDisplay[blockName] = faculties[blockName].filter((disp) => {
        const norm = normalizeName(disp);
        return !blockWiseBusyNorm[blockName]?.has(norm);
      });
    });

    setFreeFaculties(blockWiseFreeDisplay);
  };

  // Filter by search (search against normalized strings so typos like dots/case don't matter)
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

  return (
    <>
      {/* Header Section */}
          <div
          className="d-flex justify-content-between align-items-center mb-4 p-3 shadow-sm"
          style={{ backgroundColor: "#0d6efd", color: "white", width: "100%" }}
        >
          <h2 className="mb-0">🎓 Free Faculty</h2>
          <button
            className="btn btn-light btn-sm"
            onClick={() => window.history.back()}
          >
            ⬅ Back
          </button>
        </div>


  <div className="container mt-4">
      {/* Input Section */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Start Time (e.g. 10:00 AM)"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="End Time (e.g. 11:00 AM)"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search faculty (e.g. d. prakash, sri d prakash)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary flex-fill"
                onClick={checkFreeFaculties}
                disabled={loading}
              >
                {loading ? "Loading..." : "Check Free"}
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={fetchTimetables}
                disabled={loading}
                title="Reload timetables"
              >
                ↻
              </button>
            </div>
          </div>
        </div>
        <small className="text-muted mt-2 d-block">
          Tip: Titles and punctuation don’t matter. Try searching “sri d.
          prakash”, “D Prakash”, etc.
        </small>
      </div>

      {/* Free Faculties */}
      <div>
        <h5>Available Faculties by Block</h5>
        {Object.keys(filteredFree).length > 0 &&
        Object.values(filteredFree).some((arr) => arr.length > 0) ? (
          Object.keys(filteredFree).map((blockName) => (
            <div key={blockName} className="card mb-3 shadow-sm">
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
                  🏢 <strong>{blockName} Block</strong> —{" "}
                  {filteredFree[blockName]?.length || 0} free
                </span>
                <span>{expandedBlock === blockName ? "▲" : "▼"}</span>
              </div>

              {expandedBlock === blockName && (
                <div className="card-body">
                  {filteredFree[blockName]?.length > 0 ? (
                    <ul className="list-group">
                      {filteredFree[blockName].map((faculty, idx) => (
                        <li key={idx} className="list-group-item">
                          {faculty}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No free faculty here.</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-muted">
            Check a time slot to see free faculties. Use search to match across
            variants like “Sri/Smt/Dr”, dots, and spacing differences.
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default FreeFaculty;
