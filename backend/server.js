const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());


// Import routes

const expertRoutes =
require("./routes/expertRoutes");

const bookingRoutes =
require("./routes/bookingRoutes");


// Use routes

app.use("/experts", expertRoutes);

app.use("/bookings", bookingRoutes);


app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});