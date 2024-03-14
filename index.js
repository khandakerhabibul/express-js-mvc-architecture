require('dotenv').config(); // This is important to read .env file
const connectDb = require('./dbHelper/connectDb');

const app = require('./app');

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  await connectDb();
});
