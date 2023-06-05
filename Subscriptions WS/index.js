const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const moviesRouter = require('./routers/moviesRouter')


const app = express();
const port = 8888;

connectDB()

app.use(cors());
app.use(express.json());

/*Routers */

app.use('/movies', moviesRouter);


app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
});
