import { useLocation } from "react-router-dom";
import { useState } from "react";

function Booking() {
  const location = useLocation();

  const expert = location.state?.expert;
  const date = location.state?.date;
  const time = location.state?.time;

  const [status, setStatus] = useState("Pending");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  if (!expert) {
    return <h3>No booking data found. Please select a slot again.</h3>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Pending");
    console.log("FINAL PAYLOAD:", {
  expertId: expert?.id,
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  time
});

    const payload = {
      expertId: expert.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes,
      date,
      time
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Confirmed");
        alert("Booking Successful!");
      } else {
        setStatus("Failed");
        alert(data.message);
      }

    } catch (err) {
      setStatus("Error");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Booking Status: {status}</h3>

      <h2>{expert.name}</h2>
      <p>Date: {date}</p>
      <p>Time Slot: {time}</p>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Enter Name" onChange={handleChange} required />
        <br /><br />

        <input name="email" placeholder="Enter Email" onChange={handleChange} required />
        <br /><br />

        <input name="phone" placeholder="Enter Phone" onChange={handleChange} required />
        <br /><br />

        <textarea name="notes" placeholder="Additional Notes" onChange={handleChange} />
        <br /><br />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default Booking;