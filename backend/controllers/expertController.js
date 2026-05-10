


const experts = [

  {
    id: 1,
    name: "Aman Sharma",
    category: "Frontend",
    experience: "4 Years",
    rating: 4.5,
    slots: [

      "10:00 AM",

      "11:00 AM",

      "12:00 PM"

    ]
  },

  {
    id: 2,
    name: "Neha Singh",
    category: "Backend",
    experience: "5 Years",
    rating: 4.8,

    slots: [

      "2:00 PM",

      "3:00 PM"

    ]
  },


   {
      id: 3,
      name: "Rahul Verma",
      category: "Frontend",
      experience: "3 Years",
      rating: 4.2,
       slots: [
                "10:30 AM", 
                "4:00 PM"
       ]
    },



    {
      id: 4,
      name: "Priya Jain",
      category: "UI/UX",
      experience: "6 Years",
      rating: 4.9,
       slots: [
                "2:30 AM", 
                "5:00 PM"
       ]
    },

];


// GET experts
const getExperts =
(req, res) => {

  try {

    res.json(experts);

  }

  catch (error) {

    res.status(500).json({

      message:
        "Internal Server Error"

    });

  }

};


// GET expert by id

const getExpertById = (req, res) => {
  const expert = experts.find(
    (e) => e.id == req.params.id
  );

  res.json(expert);
};


module.exports = {

  getExperts,

  getExpertById

};