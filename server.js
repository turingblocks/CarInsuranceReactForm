const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/api/quote', (req, res) => {
  // Perform necessary calculations based on req.body data
  // Customize this logic to calculate the premium based on your specific requirements
  const { firstName, lastName, age, vehicleMake, vehicleModel, coverageOption } = req.body;

  // Example premium calculation
  const baseRate = 500;
  let premium = baseRate;

  if (coverageOption === 'basic') {
    premium *= 1.2;
  } else if (coverageOption === 'standard') {
    premium *= 1.5;
  } else if (coverageOption === 'premium') {
    premium *= 1.8;
  }

  const quote = {
    firstName,
    lastName,
    age,
    vehicleMake,
    vehicleModel,
    coverageOption,
    price: premium.toFixed(2),
  };

  res.json(quote);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
