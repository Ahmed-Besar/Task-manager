const express = require('express');

const app = express();
const dotenv = require('dotenv');
const tasks = require('./routes/tasksRoutes');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

dotenv.config({ path: './config.env' });
// middleware
app.use(express.static('./public'));
app.use(express.json());

// routess
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const DB = process.env.MONGO_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const start = async () => {
  try {
    await connectDB(DB);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
