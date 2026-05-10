import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expert, setExpert] = useState(null);
  const [slots, setSlots] = useState([]);

  const fetchExpert = async () => {
    try {
      const res = await fetch(`http://localhost:5000/experts/${id}`);
      const data = await res.json();

      setExpert(data);
      setSlots(data.slots || []);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchExpert();

    const interval = setInterval(fetchExpert, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (!expert) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>{expert.name}</h2>

      <h3>Available Slots</h3>

      {slots.length === 0 ? (
        <p>No Slots Available</p>
      ) : (
        slots.map((time) => (
          <button
            key={time}
            style={{ margin: "10px" }}
            onClick={() =>
              navigate("/booking", {
                state: {
                  expert,
                  time
                }
              })
            }
          >
            {time}
          </button>
        ))
      )}
    </div>
  );
}

export default Detail;