const express = require("express");

const {
  getAllCars,
  createCar,
  updateCar,
  getSingleCar,
  deleteCar
} = require("../controller/car.controller");
const validate = require("../middleware/validate");
const { createCarSchema } = require("../schema/car.schema");

const router = express.Router();

router.get("/", getAllCars);
router.post("/", validate(createCarSchema), createCar);
router.patch("/:id", updateCar);
router.get("/:id", getSingleCar);
router.delete("/:id", deleteCar);

module.exports = router;
