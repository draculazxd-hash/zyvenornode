const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, param, validationResult } = require('express-validator');
const Package = require('../models/Package');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'package-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const { category, all } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (all !== 'true') {
      query.active = true;
    }

    const packages = await Package.find(query).sort({ order: 1, _id: 1 });

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid package ID')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    res.status(200).json({
      success: true,
      data: pkg
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.post('/',
  protect,
  admin,
  upload.single('image'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('category').isIn(['rank', 'key', 'coin']).withMessage('Invalid category'),
    body('price').isNumeric().withMessage('Price must be a number').toFloat()
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
      const packageData = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description || '',
        features: req.body.features ? JSON.parse(req.body.features) : [],
        order: req.body.order ? parseInt(req.body.order) : 0,
        active: req.body.active !== undefined ? req.body.active === 'true' : true
      };

      if (req.body.discountPrice) {
        packageData.discountPrice = parseFloat(req.body.discountPrice);
      }

      if (req.file) {
        packageData.image = `/uploads/${req.file.filename}`;
      }

      const pkg = await Package.create(packageData);

      res.status(201).json({
        success: true,
        data: pkg
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
  upload.single('image'),
  [
    param('id').isMongoId().withMessage('Invalid package ID')
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
      let pkg = await Package.findById(req.params.id);

      if (!pkg) {
        return res.status(404).json({
          success: false,
          message: 'Package not found'
        });
      }

      const updateData = {};
      if (req.body.name) updateData.name = req.body.name;
      if (req.body.category) updateData.category = req.body.category;
      if (req.body.price !== undefined) updateData.price = parseFloat(req.body.price);
      if (req.body.discountPrice !== undefined) {
        updateData.discountPrice = req.body.discountPrice ? parseFloat(req.body.discountPrice) : null;
      }
      if (req.body.description !== undefined) updateData.description = req.body.description;
      if (req.body.features) updateData.features = JSON.parse(req.body.features);
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.active !== undefined) updateData.active = req.body.active === 'true';

      if (req.file) {
        if (pkg.image) {
          const oldImagePath = path.join(__dirname, '..', pkg.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.image = `/uploads/${req.file.filename}`;
      }

      pkg = await Package.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true
      });

      res.status(200).json({
        success: true,
        data: pkg
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

router.delete('/:id',
  protect,
  admin,
  [
    param('id').isMongoId().withMessage('Invalid package ID')
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
      const pkg = await Package.findById(req.params.id);

      if (!pkg) {
        return res.status(404).json({
          success: false,
          message: 'Package not found'
        });
      }

      if (pkg.image) {
        const imagePath = path.join(__dirname, '..', pkg.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await Package.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: 'Package deleted successfully'
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
