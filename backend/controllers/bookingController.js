const bookings = [];


// CREATE booking

const createBooking =
(req, res) => {

try{
  if (

  !req.body.name ||

  !req.body.email ||

  !req.body.date ||

  !req.body.time

) {

  return res.status(400).json({

    message:
      "Please fill all required fields"

  });

}

  // Check existing bookings
  const existingBooking =
    bookings.find(

      (b) =>

        b.expertId === req.body.expertId &&

        b.date === req.body.date &&

        b.time === req.body.time
    );


  // Prevent double booking

  if (existingBooking) {

    return res.status(400).json({

      message:
        "Slot already booked"

    });

  }


  // Create booking

  const booking = {

    id: bookings.length + 1,

    ...req.body,

    status: "Pending"

  };


  bookings.push(booking);


  res.json({

    message:
      "Booking Created",

    booking

  });

}
 catch (error) {

    res.status(500).json({

      message:
        "Internal Server Error"

    });

  }

};

// UPDATE booking status

const updateBookingStatus =
(req, res) => {

    try{
  const booking =
    bookings.find(
      (b) => b.id == req.params.id
    );

  if (!booking) {

    return res.status(404).json({
      message: "Booking not found"
    });

  }

  booking.status =
    req.body.status;

  res.json({

    message:
      "Status Updated",

    booking

  });

}
catch (error) {

    res.status(500).json({

      message:
        "Internal Server Error"

    });

  }

};


// GET bookings by email

const getBookings =
(req, res) => {
try{
  const email =
    req.query.email;

  const filteredBookings =
    bookings.filter(
      (b) => b.email === email
    );

  res.json(filteredBookings);

}
catch (error) {

    res.status(500).json({

      message:
        "Internal Server Error"

    });

  }

};


module.exports = {

  createBooking,

  updateBookingStatus,

  getBookings

};