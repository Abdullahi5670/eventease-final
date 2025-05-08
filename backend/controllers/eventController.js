const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      image: req.body.image,
      createdBy: req.user._id
    });
    await event.save();
    res.status(201).json(event);
  } catch {
    res.status(500).json({ error: "Failed to create event" });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch {
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.createdBy.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};
