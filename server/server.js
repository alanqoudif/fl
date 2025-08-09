// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import EventModel from "./models/Event.js";
import TrainingModel from "./models/Training.js";

const app = express();
app.use(cors());
app.use(express.json());


const conStr = "mongodb+srv://admin:1234@cluster0.an7htvl.mongodb.net/eventsDB?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(conStr);

// GET all events
app.get("/events", async (req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "فشل في جلب الفعاليات" });
  }
});


// POST new event
app.post("/events", async (req, res) => {
  try {
    const {
      title,
      ministry,
      date,
      time,
      location,
      maxVolunteers,
      leader,
      description,
      image
    } = req.body;

    const event = new EventModel({
      title,
      ministry,
      date: date ? new Date(date) : undefined,             // ✅ تحويل التاريخ
      time,
      location,
      maxVolunteers: Number(maxVolunteers),                 // ✅ تأكيد أنه رقم
      volunteers: 0,
      leader,
      description,
      image: image || '',                                   // ✅ تأكيد أن الصورة ليست undefined
      status: 'active',
    });

    const saved = await event.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ خطأ فعلي أثناء حفظ الفعالية:", err.message); // ✅ إظهار الخطأ في الطرفية
    res.status(500).json({ error: "فشل في إضافة الفعالية", message: err.message });
  }
});



// server.js
app.put("/events/:id", async (req, res) => {
  try {
    const updated = await EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "فشل في تحديث الفعالية", message: err.message });
  }
});

// DELETE event
app.delete("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await EventModel.findByIdAndDelete(id);
    res.json({ message: "تم حذف الفعالية" });
  } catch (err) {
    res.status(500).json({ error: "فشل في حذف الفعالية" });
  }
});

// app.get("/tranings", async (req, res) => {
//   try {
//     const tranings = await TrainingModel.find();
//     res.json(tranings);
//   } catch (err) {
//     res.status(500).json({ error: "فشل التدريبات" });
//   }
// });
app.get('/trainings', async (req, res) => {
  try {
    const trainings = await TrainingModel.find();
    res.json(trainings);
  } catch (err) {
    console.error('❌ خطأ في جلب التدريبات:', err);
    res.status(500).json({ error: 'فشل في جلب التدريبات' });
  }
});

// POST new training
// app.post("/tranings", async (req, res) => {
//   try {
//     const {
//       title,
//       ministry,
//       date,
//       time,
//       location,
//       maxVolunteers,
//       leader,
//       description,
//       image
//     } = req.body;

//     const event = new EventModel({
//       title,
//       ministry,
//       date: date ? new Date(date) : undefined,             // ✅ تحويل التاريخ
//       time,
//       location,
//       maxVolunteers: Number(maxVolunteers),                 // ✅ تأكيد أنه رقم
//       volunteers: 0,
//       leader,
//       description,
//       image: image || '',                                   // ✅ تأكيد أن الصورة ليست undefined
//       status: 'active',
//     });

//     const saved = await event.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error("❌ خطأ فعلي أثناء حفظ التدريب:", err.message); // ✅ إظهار الخطأ في الطرفية
//     res.status(500).json({ error: "فشل في إضافة التدريب", message: err.message });
//   }
// });
app.post('/trainings', async (req, res) => {
  try {
    const {
      title,
      ministry,
      date,
      time,
      location,
      maxParticipants,
      instructor,
      level,
      duration,
      description,
      image,
      category,
    } = req.body;

    const training = new TrainingModel({
      title,
      ministry,
      date: new Date(date),                    // تحويل التاريخ
      time,
      location,
      participants: 0,                          // يبدأ من الصفر
      maxParticipants: Number(maxParticipants), // تأكيد أنه رقم
      instructor,
      level,
      duration,
      description,
      image: image || '',                       // افتراضيًا سلسلة فارغة
      category,
    });

    const saved = await training.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ خطأ أثناء إضافة التدريب:', err);
    res.status(500).json({ error: 'فشل في إضافة التدريب', message: err.message });
  }
});

//update
// app.put("/tranings/:id", async (req, res) => {
//   try {
//     const updated = await EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "فشل في تحديث التدريب", message: err.message });
//   }
// });
app.put('/trainings/:id', async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.date) updates.date = new Date(updates.date);
    if (updates.maxParticipants) updates.maxParticipants = Number(updates.maxParticipants);

    const updated = await TrainingModel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('❌ خطأ أثناء تحديث التدريب:', err);
    res.status(500).json({ error: 'فشل في تحديث التدريب', message: err.message });
  }
});

// DELETE training
// app.delete("/tranings/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await TrainingModel.findByIdAndDelete(id);
//     res.json({ message: "تم حذف التدريب" });
//   } catch (err) {
//     res.status(500).json({ error: "فشل في حذف التدريب" });
//   }
// });

app.delete('/trainings/:id', async (req, res) => {
  try {
    await TrainingModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'تم حذف التدريب' });
  } catch (err) {
    console.error('❌ خطأ أثناء حذف التدريب:', err);
    res.status(500).json({ error: 'فشل في حذف التدريب' });
  }
});

app.listen("3005", () => {
  console.log(`Server is Works`);
});
