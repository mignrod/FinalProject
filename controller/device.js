
const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllDevices = async (req, res) => {
  //#swagger.tags=['devices']
  try {

    const result = await mongodb.getDb().db().collection("devices").find();
    const devices = await result.toArray();
    res.status(200).json(devices);
  } catch (error) {
    console.error('Error to get devices', error);
    res.status(500).json({ message: 'Error in server to get devices.' });
  }
};

const getSingleDevice = async (req, res) => {
  //#swagger.tags=['devices']
  try {
    if (!ObjectId.isValid(req.params.id)) {

      res.status(400).json("Must use a valid contact id to find a devices.");
    }

    const deviceId = ObjectId.createFromHexString(req.params.id);
    const device = await mongodb
      .getDb()
      .db()
      .collection("devices")
      .findOne({ _id: deviceId });

    if (!device) {
      res.status(404).json({ message: "Device no found" });
      return;
    }
    res.status(200).json(device);
  } catch (error) {
    console.error("Error to get device:", error);

    res.status(500).json({ message: "Error Server to get device" });
  }
};

const createDevice = async (req, res) => {
  //#swagger.tags=['devices']
  try {
    if (
      !req.body.name ||
      !req.body.type ||
      !req.body.brand ||
      !req.body.model ||
      !req.body.specifications ||
      !req.body.price ||
      !req.body.releaseDate
    ) {
      return res
        .status(400)
        .json({
          message:
            " name, type, brand, model, specifications, price, realeaseDate are necesary. something was wrong",
        });
    }
    const device = {
      name: req.body.name,
      type: req.body.type,
      brand: req.body.brand,
      model: req.body.model,
      specifications: req.body.specifications,
      price: req.body.price,
      releaseDate: req.body.releaseDate,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("devices")
      .insertOne(device);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Device created successfully",
        classId: response.insertedId, // Return the ID of the newly created device
      });
    } else {
      res.status(500).json({
        message:
          "Failed to create device: Operation not acknowledged by database.",
      });
    }
  } catch (error) {
    console.error("Error creating device:", error);

    res.status(500).json({
      message:
        error.message ||
        "An unexpected error occurred while creating the device.",
    });
  }
};

const updateDevice = async (req, res) => {
  //#swagger.tags=['devices']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to find a devices.");
    }

    const deviceId = ObjectId.createFromHexString(req.params.id);
   
     if (
      !req.body.name ||
      !req.body.type ||
      !req.body.brand ||
      !req.body.model ||
      !req.body.specifications ||
      !req.body.price ||
      !req.body.releaseDate
    ) {
      return res
        .status(400)
        .json({
          message:
            " name, type, brand, model, specifications, price, realeaseDate are necesary. something was wrong",
        });
    }
    const device = {
      name: req.body.name,
      type: req.body.type,
      brand: req.body.brand,
      model: req.body.model,
      specifications: req.body.specifications,
      price: req.body.price,
      releaseDate: req.body.releaseDate,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("devices")
      .replaceOne({ _id: deviceId }, device);
    if (response.modifiedCount > 0) {
      res.status(200).json({
        message: "Device update successfully",
        deviceId: deviceId, //  as
      });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the device");
    }
  } catch (error) {
    console.error("Error updating the device:", error); // Log the actual error for debugging

    // Generic catch-all for other unexpected errors
    res
      .status(500)
      .json({
        message:
          error.message ||
          "An unexpected error occurred while updating the device.",
      });
  }
};

const deleteDevice = async (req, res) => {
  //#swagger.tags=['devices']

  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to find a devices.");
    }

    const deviceId = ObjectId.createFromHexString(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection("devices")
      .deleteOne({ _id: deviceId });
    if (response.deletedCount > 0) {
      res.status(200).json({
        message: "Devices delete successfully",
        deviceId: deviceId,
      });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while delete the device");
    }
  } catch (error) {
    console.error("Error delete the device:", error); // Log the actual error for debugging

    // Generic catch-all for other unexpected errors
    res
      .status(500)
      .json({
        message:
          error.message ||
          "An unexpected error occurred while creating the device.",
      });
  }
};

module.exports = {
  getAllDevices,
  getSingleDevice,
  createDevice,
  updateDevice,
  deleteDevice
};
