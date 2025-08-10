const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

// Create a new order for a customer
const createOrders = async (req, res) => {
  //#swagger.tags=['orders']
  const { customerId, productIds } = req.body;

  try {
    // Fetch the products based on the provided product IDs
    const products = await mongodb
      .getDb()
      .db()
      .collection('products')
      .find({ _id: { $in: productIds.map((id) => new ObjectId(id)) } })
      .toArray();
    console.log(products.length);
    if (products.length === 0) {
      return res.status(400).json({ message: 'Some products were not found.' });
    }

    // Create a new order
    const newOrder = {
      customerId,
      products: products.map((product) => ({
        productId: product._id,
        name: product.name,
        price: product.price
      })),
      total: products.reduce((sum, product) => sum + product.price, 0)
    };

    // Save the order to the database
    await mongodb.getDb().db().collection('orders').insertOne(newOrder);

    res
      .status(201)
      .json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating order', error: error.message });
  }
};

const getOrdersByCustomer = async (req, res) => {
  //#swagger.tags=['orders']
  const { customerId } = req.params;

  try {
    const orders = await mongodb
      .getDb()
      .db()
      .collection('orders')
      .find({ customerId: customerId })
      .toArray();

    res.status(200).json({ orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching orders', error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  //#swagger.tags=['orders']
  const { orderId } = req.params;

  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('orders')
      .deleteOne({ _id: new ObjectId(orderId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting order', error: error.message });
  }
};

const updateOrders = async (req, res) => {
  //#swagger.tags=['orders']
  const { orderId } = req.params;
  const { productIds } = req.body;

  try {
    // Fetch the products based on the provided product IDs
    const products = await mongodb
      .getDb()
      .db()
      .collection('products')
      .find({ _id: { $in: productIds.map((id) => new ObjectId(id)) } })
      .toArray();

    if (products.length === 0) {
      return res.status(400).json({ message: 'Some products were not found.' });
    }

    // Update the order
    const updatedOrder = {
      products: products.map((product) => ({
        productId: product._id,
        name: product.name,
        price: product.price
      })),
      total: products.reduce((sum, product) => sum + product.price, 0)
    };

    // Save the updated order to the database
    await mongodb
      .getDb()
      .db()
      .collection('orders')
      .updateOne({ _id: new ObjectId(orderId) }, { $set: updatedOrder });

    res
      .status(200)
      .json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating order', error: error.message });
  }
};

module.exports = {
  createOrders,
  getOrdersByCustomer,
  deleteOrder,
  updateOrders
};
