const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllCustomers = async (req, res) => {
  //#swagger.tags=['customers']
  try {
    const result = await mongodb.getDb().db().collection('customers').find();
    const customers = await result.toArray();

    res.status(200).json(customers);
  } catch (error) {
    console.log('Error getting customer ', error);
    res.status(500).json({ message: 'Error in server to get customers.' });
  }
};

const getCustomerById = async (req, res) => {
  //#swagger.tags=['customers']
  try {
    const customerId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('customers')
      .find(customerId);
    const customer = await result.toArray();

    res.status(200).json(customer);
  } catch (error) {
    console.log('Error getting the customer profile.');
    res.status(500).json({ message: error.message });
  }
};

const getCustomersByUsername = async (req, res) => {
  //#swagger.tags=['customers']
  try {
    const username = req.params.username;
    const result = await mongodb
      .getDb()
      .db()
      .collection('customers')
      .findOne({ username: username });
    if (!customer) {
      res.status(404).json({ message: 'Customer not found!' });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.log('Error getting the customer profile.', error.message);
    res.status(500).json({ message: error.message });
  }
};

const createCustomers = async (req, res) => {
  //#swagger.tags=['customers']
  const customer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    role: req.body.role || 'customer'
  };
  const respond = await mongodb
    .getDb()
    .db()
    .collection('customers')
    .insertOne(customer);
  if (respond.acknowledged) {
    res.status(201).send(customer);
  } else {
    res
      .status(500)
      .json(respond.error || 'Some error ocurred while creating a Customer');
  }
};

const updateCustomersById = async (req, res) => {
  //#swagger.tags=['customers']
  try {
    const customerId = new ObjectId(req.params.id);
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      role: req.body.role || 'customer'
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('customers')
      .replaceOne({ _id: customerId }, customer);

    if (response.modifiedCount > 0) {
      res.status(200).json(customer);
    } else {
      res
        .status(404)
        .json({ message: 'Customer not found or no changes made.' });
    }
  } catch (error) {
    console.log('Error updating the customer profile.', error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteCustomers = async (req, res) => {
  //#swagger.tags=['customers']
  try {
    const customerId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('customers')
      .deleteOne({ _id: customerId });
    if (response.deletedCount > 0) {
      res.status(202).json({ message: 'Customer deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Customer not found.' });
    }
  } catch (error) {
    console.log('Error deleting the customer.', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  getCustomersByUsername,
  createCustomers,
  updateCustomersById,
  deleteCustomers
};
