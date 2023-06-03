const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const membersRouter = require('./routers/membersRouter')

const app = express();
const port = 8000;

connectDB()

app.use(cors());
app.use(express.json());

/*Routers */
app.use('/members', membersRouter)

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
});
