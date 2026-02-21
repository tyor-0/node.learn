const CarModel = require("../model/cars");

const cars = [
  { id: 1, name: "Car 1", description: "Description 1" },
  { id: 2, name: "Car 2", description: "Description 2" },
  { id: 3, name: "Car 3", description: "Description 3" },
];

async function getAllCars(req, res) {
  
  try {
    let filter = {}
    const {search} = req.query

    if(search){
      filter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } }
    ]
      }
    }

    console.log(search)
    const cars = await CarModel.find(filter);
    res.json({ allCars: cars });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function createCar(req, res) {
  try {
    const newCar = await CarModel.create(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function updateCar(req, res) {
  try {
    const car = await CarModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ mesage: "car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

async function getSingleCar(req, res) {
  try {
    const car = await CarModel.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ mesage: "car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

async function deleteCar(req, res) {
  try {
    const car = await CarModel.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({ mesage: "car not found" });
    }

    return res.status(200).send("car deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

module.exports = {
  getAllCars,
  createCar,
  updateCar,
  getSingleCar,
  deleteCar
};
