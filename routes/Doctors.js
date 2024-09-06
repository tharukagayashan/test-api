const doctorRoute = require('express').Router();

var doctors = [];

doctorRoute.get("/", (req, res) => {
    res.json(doctors.filter(Boolean)); // Filter out null values
});

doctorRoute.post("/", (req, res) => {
    var length = doctors.length;

    const doctor = req.body;
    doctor.id = (length + 1).toString();
    
    console.log("Received Doctor Data: ", doctor);  // Debug log
    if (doctor && doctor.id) {
        doctors.push(doctor);
        res.json(doctor);
    } else {
        res.status(400).json({ message: "Invalid doctor data" });
    }
});

doctorRoute.get("/:id", (req, res) => {
    const id = req.params.id;
    const doctor = doctors.find(doctor => doctor?.id === id);
    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ message: "Doctor not found" });
    }
});

doctorRoute.put("/:id", (req, res) => {
    const id = req.params.id;
    const newDoctor = req.body;
    const doctorIndex = doctors.findIndex(doctor => doctor?.id === id);
    if (doctorIndex !== -1) {
        doctors[doctorIndex] = newDoctor;
        res.json(newDoctor);
    } else {
        res.status(404).json({ message: "Doctor not found" });
    }
});

doctorRoute.delete("/:id", (req, res) => {
    const id = req.params.id;
    const doctorIndex = doctors.findIndex(doctor => doctor?.id === id);
    if (doctorIndex !== -1) {
        doctors.splice(doctorIndex, 1);
        res.json({ message: "Doctor deleted" });
    } else {
        res.status(404).json({ message: "Doctor not found" });
    }
});

module.exports = doctorRoute;