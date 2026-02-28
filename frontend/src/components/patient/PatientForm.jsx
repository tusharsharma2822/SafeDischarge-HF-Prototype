import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function PatientForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    diagnosis: "",
    vitals: "",
    labs: "",
    clinicalNotes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.age || !formData.gender || !formData.diagnosis) {
      alert("Age, Gender and Diagnosis are required.");
      return;
    }

    onGenerate(formData);
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-6 text-gray-900">
        Patient Information
      </h2>

      {/* Age + Gender */}
      <div className="grid grid-cols-1 gap-4">
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="diagnosis"
          placeholder="Primary Diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Vitals */}
      <div className="mt-4">
        <textarea
          name="vitals"
          placeholder="Vitals (BP, HR, Temperature...)"
          value={formData.vitals}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Labs */}
      <div className="mt-4">
        <textarea
          name="labs"
          placeholder="Lab Results"
          value={formData.labs}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Clinical Notes */}
      <div className="mt-4">
        <textarea
          name="clinicalNotes"
          placeholder="Clinical Notes"
          value={formData.clinicalNotes}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Button */}
      <div className="mt-6 flex justify-center">
        <Button onClick={handleSubmit}>
          Generate Clinical Summary
        </Button>
      </div>
    </Card>
  );
}

export default PatientForm;