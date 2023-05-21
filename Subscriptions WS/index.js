const express = require(express);
const cors = require('cors');
const connectDB = require('./configs/db');

const app = express();
const port = 3000();

connectDB()

app.use(cors());
app.use(express.json());




app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
});
