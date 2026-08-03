const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Package = require('../models/Package');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, admin, async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.get('/export', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: 1 });

    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Email',
      'Minecraft Username',
      'Discord ID',
      'Items',
      'Total (₹)',
      'Status',
      'Transaction ID'
    ];

    const escapeCSV = (value) => {
      if (value === null || value === undefined) return '';
      const str = String(value);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    };

    const csvRows = [headers.join(',')];

    orders.forEach(order => {
      const itemsStr = order.items.map(item => `${item.name} x${item.quantity}`).join('; ');
      const row = [
        order._id,
        new Date(order.createdAt).toISOString(),
        escapeCSV(order.customerName),
        escapeCSV(order.email),
        escapeCSV(order.minecraftUsername),
        escapeCSV(order.discordId),
        escapeCSV(itemsStr),
        order.total,
        order.status,
        escapeCSV(order.transactionId)
      ];
      csvRows.push(row.join(','));
    });

    const csv = csvRows.join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=orders-${Date.now()}.csv`);
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.get('/:id', protect, admin, [
  param('id').isMongoId().withMessage('Invalid order ID')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.post('/',
  [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('minecraftUsername').notEmpty().withMessage('Minecraft username is required'),
    body('items').isArray({ min: 1 }).withMessage('At least one item is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    try {
      const { customerName, email, items, minecraftUsername, discordId } = req.body;

      const orderItems = [];
      let total = 0;

      for (const item of items) {
        if (!item.packageId || !item.quantity) {
          return res.status(400).json({
            success: false,
            message: 'Each item must have packageId and quantity'
          });
        }

        const pkg = await Package.findById(item.packageId);
        if (!pkg) {
          return res.status(404).json({
            success: false,
            message: `Package not found: ${item.packageId}`
          });
        }

        if (!pkg.active) {
          return res.status(400).json({
            success: false,
            message: `Package ${pkg.name} is not available`
          });
        }

        const price = pkg.discountPrice || pkg.price;
        const quantity = parseInt(item.quantity);
        const itemTotal = price * quantity;
        total += itemTotal;

        orderItems.push({
          packageId: pkg._id,
          name: pkg.name,
          price,
          quantity
        });
      }

      const order = await Order.create({
        customerName,
        email,
        items: orderItems,
        total,
        minecraftUsername,
        discordId: discordId || '',
        status: 'pending'
      });

      res.status(201).json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }
);

router.put('/:id',
  protect,
  admin,
  [
    param('id').isMongoId().withMessage('Invalid order ID'),
    body('status').isIn(['pending', 'paid', 'completed', 'refunded', 'failed']).withMessage('Invalid status')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    try {
      const updateData = { status: req.body.status };

      if (req.body.transactionId) {
        updateData.transactionId = req.body.transactionId;
      }

      const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
);

module.exports = router;
