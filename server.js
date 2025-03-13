const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
require('./config/connection');

mongoose.connect('mongodb://localhost/social_network_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 3001;

console.log(`Server running on port ${PORT}`);

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/thoughts', reactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
