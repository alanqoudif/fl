import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: String,
  ministry: String,
  date: Date,
  time: String,
  location: String,
  maxVolunteers: Number,
  volunteers: Number,
  leader: String,
  description: String,
  status: String,
  image: String,
});

const EventModel = mongoose.model("Event", eventSchema);
export default EventModel;


