const express = require('express');
const app = express();
const port = 3000;

// Parameter missing and formatting error
const validateNumbers = (req, res, next) => {
  const { num1, num2 } = req.query;

  // ensure parameter existing
  if (num1 === undefined || num2 === undefined) {
    return res.status(400).json({
      status: 400,
      message: "Missing required parameters: 'num1' and 'num2'"
    });
  }

  // ensure valid
  if (isNaN(num1)) {
    return res.status(400).json({
      status: 400,
      message: `Invalid input: 'num1' is not a valid number (received '${num1}')`
    });
  }
  if (isNaN(num2)) {
    return res.status(400).json({
      status: 400,
      message: `Invalid input: 'num2' is not a valid number (received '${num2}')`
    });
  }

  // change form and deliver
  req.num1 = parseFloat(num1);
  req.num2 = parseFloat(num2);
  next();
};

// caculating endpoint
app.get('/add', validateNumbers, (req, res) => {
  res.json({ result: req.num1 + req.num2 });
});

app.get('/subtract', validateNumbers, (req, res) => {
  res.json({ result: req.num1 - req.num2 });
});

app.get('/multiply', validateNumbers, (req, res) => {
  res.json({ result: req.num1 * req.num2 });
});

app.get('/divide', validateNumbers, (req, res) => {
  if (req.num2 === 0) {
    return res.status(422).json({  // use 422 Unprocessable Entity
      status: 422,
      message: "Division by zero is not allowed"
    });
  }
  res.json({ result: req.num1 / req.num2 });
});

// not found
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Endpoint not found. Valid endpoints: /add, /subtract, /multiply, /divide"
  });
});

// Start service
app.listen(port, () => {
  console.log(`Calculator service running at http://localhost:${port}`);
});