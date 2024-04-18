import mongoose from "mongoose";


const recordingSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  patientAge: {
    type: Number,
    required: true
  },
  recordingDate: {
    type: Date,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  soundFile: {
    type: String, // You might store the file path here
    required: true
  }
});

const Recording = mongoose.model('Recording', recordingSchema);

export default Recording;
