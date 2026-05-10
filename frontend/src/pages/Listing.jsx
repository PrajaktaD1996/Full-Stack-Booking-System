import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Listing() {
   const navigate = useNavigate();

  const expertsData = [
    {
      id: 1,
      name: "Aman Sharma",
      category: "Frontend",
      experience: "4 Years",
      rating: 4.5,

       slots: {
    "10 May 2026": ["10:00 AM", "11:00 AM"],
    "11 May 2026": ["2:00 PM", "4:00 PM"]
  }
    },
    {
      id: 2,
      name: "Neha Singh",
      category: "Backend",
      experience: "5 Years",
      rating: 4.8,

       slots: {
    "10 May 2026": ["10:00 AM", "11:00 AM"],
    "11 May 2026": ["2:00 PM", "4:00 PM"]
  }
    },
    {
      id: 3,
      name: "Rahul Verma",
      category: "Frontend",
      experience: "3 Years",
      rating: 4.2,
       slots: {
    "10 May 2026": ["10:00 AM", "11:00 AM"],
    "11 May 2026": ["2:00 PM", "4:00 PM"]
  }
    },
    {
      id: 4,
      name: "Priya Jain",
      category: "UI/UX",
      experience: "6 Years",
      rating: 4.9,
       slots: {
    "10 May 2026": ["10:00 AM", "11:00 AM"],
    "11 May 2026": ["2:00 PM", "4:00 PM"]
  }
    },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading] = useState(false);
  const [error] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const expertsPerPage = 2;

  // Filter Logic
  const filteredExperts = expertsData.filter((expert) => {

    const matchesSearch =
      expert.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || expert.category === category;

    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const indexOfLast = currentPage * expertsPerPage;
  const indexOfFirst = indexOfLast - expertsPerPage;

  const currentExperts =
    filteredExperts.slice(indexOfFirst, indexOfLast);

  // Loading state
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Error state
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>Expert Listing</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="UI/UX">UI/UX</option>
      </select>

      {/* Expert Cards */}
      {currentExperts.map((expert) => (

        <div
          key={expert.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h2>{expert.name}</h2>

          <p>Category: {expert.category}</p>

          <p>Experience: {expert.experience}</p>

          <p>Rating: {expert.rating}</p>

        <button
  onClick={() => navigate(`/detail/${expert.id}`)}
>
  View Details
</button>
        </div>
      ))}

      {/* Pagination */}
      <div>

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "10px" }}>
          Page {currentPage}
        </span>

        <button
          disabled={
            indexOfLast >= filteredExperts.length
          }
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Listing;