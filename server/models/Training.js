import mongoose from "mongoose";

const TrainingSchema = mongoose.Schema({
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

const TrainingModel = mongoose.model("Training", TrainingSchema);
export default TrainingModel;
