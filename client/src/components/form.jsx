import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addRecord, getRecord } from '../service/api';
// import jwt_decode from "jwt-decode";
const Table = styled.table`
  border-collapse: collapse;
  width: 75%;
  margin: 50px auto;
`;

const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  background-color: black;
  color: white;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  background-color:#D3D3D3;
  
`;

const StyledForm = styled.form`
  max-width: 50%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color:#CCE5EE;
  // margin: 50px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #37436C;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size:20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Form = () => {
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [recordingDate, setRecordingDate] = useState('');
  const [filename, setFilename] = useState('');
  const [soundFile, setSoundFile] = useState(null);
  const [addRecordCompleted, setAddRecordCompleted] = useState(false);

  const [records, setRecords] = useState([]);
  // Your other state variables

  useEffect(() => {
    const fetchData = async () => {
      if (addRecordCompleted) {
        const response = await getRecord();
        setRecords(response);
      }
      else {
        console.log("wait");
      }
    };
    fetchData();
  }, [addRecordCompleted]); // Fetch data on component mount



  const handleSubmit = async (event) => {
    setAddRecordCompleted(false);
    event.preventDefault();
    // Create the data object
    const data = {
      doctorName: doctorName,
      patientName: patientName,
      patientAge: patientAge,
      recordingDate: recordingDate,
      fileName: filename,
      soundFile: soundFile
    };
    // console.log(filename);
    // console.log(soundFile)

    // Call the addRecord function with the formatted data
    await addRecord(data);
    setAddRecordCompleted(true);
    // Reset form fields after submission
    setDoctorName('');
    setPatientName('');
    setPatientAge('');
    setRecordingDate('');
    setSoundFile(null);
    setFilename('');
    const fileInput = document.getElementById('soundFile');
    if (fileInput) {
      fileInput.value = '';
    }
  

  };

  // console.log(fileName);
  const base64encode = (e) => {
    setFilename(e.target.files[0].name);

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    // console.log(reader.result);
    reader.onload = () => {
      // console.log(reader.result);
      setSoundFile(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    }
    // setSoundFile(file);
  };

  return (
    <>
    <h1>Patient Enrollment Form</h1>
      <StyledForm onSubmit={handleSubmit} encType='multipart/form-data'>
        <FormGroup>
          <Label htmlFor="doctorName">Doctor's Name:</Label>
          <Input type="text" id="doctorName" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="patientName">Patient's Name:</Label>
          <Input type="text" id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="patientAge">Patient's Age:</Label>
          <Input type="number" id="patientAge" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="recordingDate">Date of Recording:</Label>
          <Input type="date" id="recordingDate" value={recordingDate} onChange={(e) => setRecordingDate(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="soundFile">Upload Sound File:</Label>
          <Input type="file" id="soundFile" onChange={base64encode} accept="audio/*" required />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </StyledForm>
      <Table>
        <thead>
          <tr>
            <Th>Doctor's Name</Th>
            <Th>Patient's Name</Th>
            <Th>Patient's Age</Th>
            <Th>Recording Date</Th>
            <Th>Audio</Th>
          </tr>
        </thead>
        <tbody>
          {
            records.map((record, index) => {
              // Decode base64 data
              const temp = record.soundFile;
              const trimmedData = temp.split(',')[1];
              const binaryData = atob(trimmedData);

              // Convert binary string to ArrayBuffer
              const arrayBuffer = new ArrayBuffer(binaryData.length);
              const uint8Array = new Uint8Array(arrayBuffer);
              for (let i = 0; i < binaryData.length; i++) {
                uint8Array[i] = binaryData.charCodeAt(i);
              }

              // Create Blob from ArrayBuffer
              const blob = new Blob([uint8Array], { type: 'audio/mpeg' }); // Adjust MIME type as per your audio file type

              // Create object URL from Blob
              const objectURL = URL.createObjectURL(blob);
              
              return (
                <tr key={index}>
                  <Td>{record.doctorName}</Td>
                  <Td>{record.patientName}</Td>
                  <Td>{record.patientAge}</Td>
                  <Td>{record.recordingDate}</Td>
                  <Td>
                    <audio controls>
                      <source src={objectURL} type="audio/mpeg" />
                      {record.fileName}
                    </audio>
                  </Td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </>
  );
};

export default Form;
