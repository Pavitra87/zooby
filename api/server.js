const express = require('express');
const { connectDB } = require('./db/db');
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
const path = require("path");
const fs = require('fs');

dotenv.config()

const port = process.env.PORT || 5000;
connectDB();

app.use(express.json())
app.use(cors())

const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}


app.use('/uploads', express.static(uploadsPath));



app.use('/api/auth', require('./controller/userCtrl'))
app.use('/api/animalcategory', require('./routes/animalRoutes/categoryRoutes'))
app.use('/api/animals', require('./routes/animalRoutes/animalRoutes'))
app.use('/api/songcategory', require('./routes/songRoutes/songCategoryRoutes'))
app.use('/api/songs', require('./routes/songRoutes/songRoutes'))

app.listen(port, () => {
    console.log(`Server is running port ${port} `)
})