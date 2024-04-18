import mongoose from 'mongoose';

// Define the schema for the patient data
const patientSchema = new mongoose.Schema({
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
  }
//   ,
//   soundFilePath: {
//     type: String,
//     required: true
//   }
});

// Custom validation logic for patient age
patientSchema.path('patientAge').validate(function(value) {
    return value >= 0; // Age must be a non-negative number
  }, 'Age must be a non-negative number');

// Custom method to save patient data
patientSchema.methods.customSave = async function() {
    try {
      const savedPatient = await this.save();
      console.log('Patient data saved successfully:', savedPatient);
      return savedPatient;
    } catch (error) {
      console.error('Error saving patient data:', error);
      throw error;
    }
  };  
// Create the Mongoose model for the patient
const PatientModel = mongoose.model('Patient', patientSchema);
// var Patient=mongoose.model('MedicalRecords');


export default PatientModel;
