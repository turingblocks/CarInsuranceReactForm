import React, { useState } from 'react';
import axios from 'axios';

const CarInsuranceForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [coverageOption, setCoverageOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/quote', {
        firstName,
        lastName,
        age,
        vehicleMake,
        vehicleModel,
        coverageOption
      });

      setQuote(response.data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Car Insurance</h1>
      <div className="container">
        <div className="form-container">
          <h2>Get a Quote</h2>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </label>
            <label>
              Last Name:
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </label>
            <label>
              Age:
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            </label>
            <label>
              Vehicle Make:
              <input type="text" value={vehicleMake} onChange={(e) => setVehicleMake(e.target.value)} required />
            </label>
            <label>
              Vehicle Model:
              <input type="text" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} required />
            </label>
            <label>
              Coverage Option:
              <select value={coverageOption} onChange={(e) => setCoverageOption(e.target.value)} required>
                <option value="">Select Coverage</option>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </label>
            <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Get a Quote'}</button>
          </form>
        </div>
        <div className="quote-container">
          {quote && (
            <div>
              <h2>Your Quote</h2>
              <p>First Name: {quote.firstName}</p>
              <p>Last Name: {quote.lastName}</p>
              <p>Age: {quote.age}</p>
              <p>Vehicle Make: {quote.vehicleMake}</p>
              <p>Vehicle Model: {quote.vehicleModel}</p>
              <p>Coverage Option: {quote.coverageOption}</p>
              <p>Price: ${quote.price}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarInsuranceForm;
