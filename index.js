  require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const blogRoutes = require('./src/routes/blog.route');
const carRoutes = require('./src/routes/car.route');
const userRoutes = require('./src/routes/user.route');
const productRoutes = require('./src/routes/product.route');

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api/v1/', productRoutes);

app.use('/api/v1/blogs', blogRoutes);

app.use('/api/v1/cars', carRoutes);

app.use('/api/v1/auth', userRoutes)

app.use('/api/v1/products', productRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to the Product API');
});

//not found page

app.use((req, res) => {
  res.status(404).send("Page Not Found");
})



const port = 3000;

//commit



const start = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  };

};

start();



// mongodb+srv://sqi:sqitest@cluster0.ziwtgfi.mongodb.net/?appName=Cluster0


//username xfigures6_db_user


//password DLuKUbKjlJiaGbev

// mongodb+srv://<db_username>:<db_password>@cluster0.ziwtgfi.mongodb.net/?appName=Cluster0

// mongodb+srv://xfigures6_db_user:DLuKUbKjlJiaGbev@cluster0.ziwtgfi.mongodb.net/jan-learn

// busayo 

// mongodb+srv://busayoadebayo280_db_user:<db_password>@cluster0.usrxdnr.mongodb.net/?appName=Cluster0