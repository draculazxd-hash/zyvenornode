const express = require('express');
const Order = require('../models/Order');
const Package = require('../models/Package');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// GET /api/admin/stats - dashboard KPIs
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $in: ['paid', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const activePackages = await Package.countDocuments({ active: true });
    
    // 7 day revenue for chart
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const start = new Date(d.setHours(0,0,0,0));
      const end = new Date(d.setHours(23,59,59,999));
      const rev = await Order.aggregate([
        { $match: { status: { $in: ['paid','completed'] }, createdAt: { $gte: start, $lte: end } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]);
      days.push({ name: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][start.getDay()], revenue: rev[0]?.total || 0, orders: await Order.countDocuments({ createdAt: { $gte: start, $lte: end } }) });
    }

    // Top packages
    const topPackages = await Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.name', sales: { $sum: '$items.quantity' }, revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } } } },
      { $sort: { revenue: -1 } },
      { $limit: 5 }
    ]).then(arr => arr.map(p => ({ name: p._id, sales: p.sales, revenue: p.revenue })));

    // Recent orders
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders,
        totalCustomers,
        activePackages,
        revenueOverTime: days,
        topPackages,
        recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/admin/analytics - analytics data
router.get('/analytics', protect, admin, async (req, res) => {
  try {
    // Monthly sales last 8 months
    const months = [];
    for (let i = 7; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      const rev = await Order.aggregate([
        { $match: { status: { $in: ['paid','completed'] }, createdAt: { $gte: start, $lte: end } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]);
      const orderCount = await Order.countDocuments({ createdAt: { $gte: start, $lte: end } });
      const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      months.push({ month: monthNames[d.getMonth()], revenue: rev[0]?.total || 0, orders: orderCount, customers: 0 });
    }

    // Sales by category
    const byCategory = await Order.aggregate([
      { $unwind: '$items' },
      { $lookup: { from: 'packages', localField: 'items.packageId', foreignField: '_id', as: 'pkg' } },
      { $unwind: { path: '$pkg', preserveNullAndEmptyArrays: true } },
      { $group: { _id: { $ifNull: ['$pkg.category', 'other'] }, total: { $sum: 1 } } }
    ]).then(arr => {
      const map = { rank: 'Ranks', key: 'Keys', coin: 'Coins', other: 'Other' };
      const colors = { rank: '#8b5cf6', key: '#06b6d4', coin: '#f59e0b', other: '#64748b' };
      let total = arr.reduce((s, x) => s + x.total, 0) || 1;
      return arr.map(x => ({ name: map[x._id] || 'Other', value: Math.round(x.total / total * 100), color: colors[x._id] || '#64748b' }));
    });

    // Best selling packages
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.name', sales: { $sum: '$items.quantity' }, revenue: { $sum: { $multiply: ['$items.price','$items.quantity'] } } } },
      { $sort: { sales: -1 } },
      { $limit: 5 }
    ]).then(arr => arr.map(p => ({ name: p._id, sales: p.sales, revenue: p.revenue, growth: 0 })));

    res.status(200).json({
      success: true,
      data: { monthly: months, categorySales: byCategory, topProducts }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
