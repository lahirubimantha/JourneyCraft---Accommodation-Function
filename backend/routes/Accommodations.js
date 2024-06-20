const router = require("express").Router();
const Accommodation = require("../models/Accommodation");

// Add
router.route("/add").post((req, res) => {
    const { name, date, accommodation, location, estprice, notes } = req.body;

    const newAccommodation = new Accommodation({
        name,
        date,
        accommodation,
        location,
        estprice,
        notes
    });

    newAccommodation.save()
        .then(() => {
            res.json("Accommodation added successfully!");
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Error adding accommodation" });
        });
});

// View Accommodation details
router.route("/accommodationDashboard").get((req, res) => {
    Accommodation.find()
        .then((accommodations) => {
            res.json(accommodations);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Error fetching accommodations" });
        });
});

// Update Accommodation details
router.route("/update/:id").put((req, res) => {
    const { name, date, accommodation, location, estprice, notes } = req.body;
    const accommodationID = req.params.id;

    const updateAccommodation = {
        name,
        date,
        accommodation,
        location,
        estprice,
        notes
    };

    Accommodation.findByIdAndUpdate(accommodationID, updateAccommodation)
        .then(() => {
            res.status(200).json({ status: "Accommodation updated" });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Error updating accommodation" });
        });
});

// Delete Accommodation details
router.route("/delete/:id").delete((req, res) => {
    const accommodationID = req.params.id;

    Accommodation.findByIdAndDelete(accommodationID)
        .then(() => {
            res.status(200).json({ status: "Accommodation deleted" });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Error deleting accommodation" });
        });
});

// View details of a single Accommodation
router.route("/get/:id").get((req, res) => {
    const accommodationID = req.params.id;

    Accommodation.findById(accommodationID)
        .then((accommodation) => {
            res.status(200).json({ status: "Accommodation fetched", data: accommodation });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Error fetching accommodation" });
        });
});

module.exports = router;
