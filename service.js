const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

app.use(expressLayout);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', './layouts/layout');

mongoose.connect(process.env.MONGODB_URI)
  .catch(err => console.error('Initial connection error:', err));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});