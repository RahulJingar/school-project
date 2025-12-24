const mongoose=require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  thumbnail: String,
  price: Number,
  grade: String,
  subject: String,
  totalLectures: Number,
  totalDurationInMinutes: Number,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  isPublished: { type: Boolean, default: false },
  studentsEnrolled: [{     // ✅ NEW: Student enrollment tracking
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student'
  }],
  purchases: [{            // ✅ NEW: Purchase history
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    purchaseDate: { type: Date, default: Date.now },
    pricePaid: Number
  }]
}, { timestamps: true });
