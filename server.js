const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const { connect } = require('mongoose');
const connectDb = require('./config/dbConnection');

connectDb();
const PORT = process.env.PORT || 5001;

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server is running on Port - ${PORT}`);
});