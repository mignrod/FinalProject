const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllPayments = async (req, res) => {
   //#swagger.tags=['payments']
        try {
          const result = await mongodb.getDb().db().collection("payments").find();
          const payments = await result.toArray();
          res.status(200).json(payments);
        } catch (error) {
          console.error("Error to get payments", error);
          res.status(500).json({ message: "Error in server to get payments." });
        }
      };

const getSinglePayment = async (req, res) => {
  //#swagger.tags=['payments']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid id to find a payment.");
        return;
    }

    const paymentId = ObjectId.createFromHexString(req.params.id);
    const payment = await mongodb
      .getDb()
      .db()
      .collection("payments")
      .findOne({ _id: paymentId });

    if (!payment) {
      res.status(404).json({ message: "payment no found" });
      return;
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error to get device:", error);

    res.status(500).json({ message: "Error Server to get device" });
  }
};

const createPayment = async (req, res) => {
  //#swagger.tags=['payments']
  try {
    
    if (
      !req.body.payment_amount ||
      !req.body.orderId 
      
    ) {
      return res
        .status(400)
        .json({
          message:
            " payment_amount, orderId are necesary. something was wrong",
        });
    }
    const payment = {
      payment_amount: req.body.payment_amount,
      orderId: req.body.orderId,
     
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("payments")
      .insertOne(payment);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Payment created successfully",
        paymentId: response.insertedId, // Return the ID of the newly created payment
      });
    } else {
      res.status(500).json({
        message:
          "Failed to create payment: Operation not acknowledged by database.",
      });
    }
  } catch (error) {
    console.error("Error creating payment:", error);

    res.status(500).json({
      message:
        error.message ||
        "An unexpected error occurred while creating the payment.",
    });
  }
};

const updatePayment = async (req, res) => {
  //#swagger.tags=['payments']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid id to find a payment.");
    }

    const paymentId = ObjectId.createFromHexString(req.params.id);
   
     if (
      !req.body.payment_amount ||
      !req.body.orderId
    
      ) {
      return res
        .status(400)
        .json({
          message:
            " payment and orderId are necesary. something was wrong",
        });
    }
    const payment = {
      payment_amount: req.body.payment_amount,
      orderId: req.body.orderId,
      
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("payments")
      .replaceOne({ _id: paymentId }, payment);
    if (response.modifiedCount > 0) {
      res.status(200).json({
        message: "payment update successfully",
        paymentId: paymentId 
      });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the payment");
    }
  } catch (error) {
    console.error("Error updating the payment:", error); // Log the actual error for debugging

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

const deletePayment = async (req, res) => {
  //#swagger.tags=['payments']

  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to find a devices.");
    }

    const paymentId = ObjectId.createFromHexString(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection("payments")
      .deleteOne({ _id: paymentId });
    if (response.deletedCount > 0) {
      res.status(200).json({
        message: "payment delete successfully",
        paymentId: paymentId,
      });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while delete the payment");
    }
  } catch (error) {
    console.error("Error delete the payment:", error); // Log the actual error for debugging

    // Generic catch-all for other unexpected errors
    res
      .status(500)
      .json({
        message:
          error.message ||
          "An unexpected error occurred while creating the payment.",
      });
  }
};

module.exports = {
  getAllPayments,
  getSinglePayment,
  createPayment,
  updatePayment,
  deletePayment
};
