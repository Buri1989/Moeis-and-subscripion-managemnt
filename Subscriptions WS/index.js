const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
//const membersRouter = require('./routers/membersRouter');
const moviesRouter = require('./routers/moviesRouter')


const app = express();
const port = 8888;

connectDB()

app.use(cors());
app.use(express.json());

/*Routers */
//app.use('/members', membersRouter);
app.use('/movies', moviesRouter);


app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
});
