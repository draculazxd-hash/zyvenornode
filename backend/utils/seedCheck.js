const User = require('../models/User');
const Package = require('../models/Package');
const Settings = require('../models/Settings');
const Category = require('../models/Category');
const Order = require('../models/Order');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const seedCheck = async () => {
  try {
    const adminCount = await User.countDocuments({ role: 'admin' });

    if (adminCount === 0) {
      console.log('No admin found. Running auto-seed...');
      await runSeed();
      console.log('Auto-seed completed successfully!');
    } else {
      console.log('Admin exists. Skipping auto-seed.');
    }
  } catch (error) {
    console.error('Seed check failed:', error.message);
  }
};

const runSeed = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);
    const hashedPassword = await bcrypt.hash('vaelor@123', salt);

    const admin = await User.create([{
      email: 'vaelormc@gmail.com',
      password: hashedPassword,
      role: 'admin'
    }], { session });

    console.log('Admin user created: vaelormc@gmail.com');

    const categories = await Category.create([
      { name: 'Ranks', icon: 'Crown', order: 0 },
      { name: 'Keys', icon: 'Key', order: 1 },
      { name: 'Coins', icon: 'Coins', order: 2 }
    ], { session });

    console.log(`${categories.length} categories created`);

    const packages = await Package.create([
      {
        name: 'VIP',
        category: 'rank',
        price: 99,
        description: 'The VIP rank offers great perks for casual players',
        features: [
          '/fly in lobby',
          '5 home slots',
          'VIP prefix [VIP]',
          'Access to /hat command',
          'Priority join during server lag',
          '1.5x Coins Multiplier',
          'Colored chat support'
        ],
        order: 0,
        active: true
      },
      {
        name: 'MVP',
        category: 'rank',
        price: 199,
        description: 'MVP rank includes everything in VIP plus more',
        features: [
          'All VIP perks included',
          '/fly in survival games',
          '15 home slots',
          'MVP prefix [MVP]',
          'Access to /nick command',
          '2x Coins Multiplier',
          'Custom join message',
          'Extra inventory slots in shop',
          'Daily reward bonus (+25%)'
        ],
        order: 1,
        active: true
      },
      {
        name: 'PRO',
        category: 'rank',
        price: 399,
        description: 'PRO rank for the dedicated Minecraft enthusiast',
        features: [
          'All MVP perks included',
          '/fly in all game modes',
          '30 home slots',
          'PRO prefix [PRO]',
          'Access to /glow and /hat',
          '2.5x Coins Multiplier',
          'Custom particle effects',
          'Exclusive PRO kit',
          'Daily reward bonus (+50%)',
          'Create private parties',
          'Leaderboard priority display'
        ],
        order: 2,
        active: true
      },
      {
        name: 'LEGEND',
        category: 'rank',
        price: 799,
        description: 'LEGEND rank is our most popular premium package',
        features: [
          'All PRO perks included',
          'Unlimited homes',
          'LEGEND prefix [LEGEND]',
          '3x Coins Multiplier',
          'Custom name tag color',
          'Access to all particle effects',
          'Exclusive LEGEND kit',
          'Daily reward bonus (+100%)',
          'Vanish command /v',
          'Staff chat access',
          'Custom warp creation (5 warps)',
          'Free monthly crate key x3',
          'Early access to new updates'
        ],
        order: 3,
        active: true
      },
      {
        name: 'CUSTOM',
        category: 'rank',
        price: 1499,
        description: 'The ultimate custom rank with personalized benefits',
        features: [
          'All LEGEND perks included',
          'Unlimited everything',
          'CUSTOM prefix [YOUR NAME]',
          'Custom name tag + color',
          '4x Coins Multiplier',
          'Create your own custom kit',
          'Exclusive Discord role',
          'Personal in-game statue',
          'Daily reward bonus (+200%)',
          'Unlimited warps creation',
          'God mode in creative lobby',
          'Free legendary crate key x5',
          'Beta tester access',
          'Priority 24/7 support',
          'Custom command (/yourname)'
        ],
        order: 4,
        active: true
      },
      {
        name: 'Vote Key x5',
        category: 'key',
        price: 49,
        description: 'Get 5 Vote Keys instantly delivered',
        features: [
          '5x Vote Crate Keys',
          'Common rewards guaranteed',
          'Chance for rare loot',
          'Instant delivery on purchase',
          'Use at /warp crates'
        ],
        order: 0,
        active: true
      },
      {
        name: 'Rare Key x3',
        category: 'key',
        price: 99,
        description: '3 Rare Keys for valuable rewards',
        features: [
          '3x Rare Crate Keys',
          'Rare enchantments available',
          'Higher chance for diamonds',
          'Instant delivery on purchase',
          'Use at /warp crates'
        ],
        order: 1,
        active: true
      },
      {
        name: 'Epic Key x2',
        category: 'key',
        price: 149,
        description: '2 Epic Keys for premium exclusive loot',
        features: [
          '2x Epic Crate Keys',
          'Epic gear and weapons',
          '100% chance for rare items',
          'Chance for $500,000 coins',
          'Instant delivery on purchase'
        ],
        order: 2,
        active: true
      },
      {
        name: 'Legendary Key x1',
        category: 'key',
        price: 299,
        description: '1 Legendary Key for the ultimate crate experience',
        features: [
          '1x Legendary Crate Key',
          'Guaranteed legendary item',
          'Chance for custom rank upgrade',
          'Chance for 5,000,000 coins',
          'Exclusive legendary particles',
          'Instant delivery on purchase'
        ],
        order: 3,
        active: true
      },
      {
        name: '1,000 Coins',
        category: 'coin',
        price: 29,
        description: 'Instant 1,000 server coins boost',
        features: [
          '+1,000 Server Coins',
          'Instant credit to account',
          'Spend at the server shop',
          'Buy kits, cosmetics, and more',
          'No expiration date'
        ],
        order: 0,
        active: true
      },
      {
        name: '5,000 Coins',
        category: 'coin',
        price: 99,
        description: 'Great value 5,000 coin package',
        features: [
          '+5,000 Server Coins',
          'Save 15% vs purchasing separately',
          'Instant credit to account',
          'Spend at the server shop',
          'Buy rare kits and upgrades'
        ],
        order: 1,
        active: true
      },
      {
        name: '10,000 Coins',
        category: 'coin',
        price: 179,
        description: 'Best value 10,000 coin bundle',
        features: [
          '+10,000 Server Coins',
          'Save 40% vs purchasing separately',
          'Instant credit to account',
          'Purchase premium kits',
          'Unlock exclusive cosmetics',
          'Perfect for competitive play'
        ],
        order: 2,
        active: true
      },
      {
        name: '50,000 Coins',
        category: 'coin',
        price: 699,
        description: 'Massive coin pack for serious players',
        features: [
          '+50,000 Server Coins',
          'Best savings - 65% off',
          'Instant credit to account',
          'Buy everything in the shop',
          'Unlock all prestige upgrades',
          'Max out your coin balance',
          'Great for PvP and Skyblock'
        ],
        order: 3,
        active: true
      }
    ], { session });

    console.log(`${packages.length} packages created`);

    const settings = await Settings.create([{
      siteTitle: 'ZyvenorMC',
      siteDescription: 'The best Minecraft server experience - Ranks, Keys, Coins and more!',
      heroTitle: 'Welcome to ZyvenorMC',
      heroSubtitle: 'Support our server and unlock amazing in-game rewards! Your purchase helps us maintain and grow the community.',
      serverIp: 'play.zyvenormc.com',
      discordLink: 'https://discord.gg/zyvenormc',
      supportEmail: 'support@zyvenormc.com',
      footerText: '© 2024 ZyvenorMC. All rights reserved. Made with love for the Minecraft community.',
      primaryColor: '#8b5cf6',
      secondaryColor: '#06b6d4',
      fontFamily: 'Inter, system-ui, sans-serif',
      announcementBanner: '🎉 New LEGEND rank available now! Get yours before the sale ends!',
      maintenanceMode: false,
      darkMode: true,
      borderRadius: 'lg',
      buttonStyle: 'gradient'
    }], { session });

    console.log('Settings created');

    const samplePackages = await Package.find({}, null, { session }).limit(3);
    let sampleItems1 = [], sampleItems2 = [], sampleItems3 = [];

    if (samplePackages.length >= 1) {
      sampleItems1.push({
        packageId: samplePackages[0]._id,
        name: samplePackages[0].name,
        price: samplePackages[0].price,
        quantity: 1
      });
    }

    if (samplePackages.length >= 2) {
      sampleItems2.push({
        packageId: samplePackages[1]._id,
        name: samplePackages[1].name,
        price: samplePackages[1].price,
        quantity: 1
      });
    }

    if (samplePackages.length >= 3) {
      sampleItems3.push({
        packageId: samplePackages[2]._id,
        name: samplePackages[2].name,
        price: samplePackages[2].price,
        quantity: 2
      });
      if (samplePackages.length >= 1) {
        sampleItems3.push({
          packageId: samplePackages[0]._id,
          name: samplePackages[0].name,
          price: samplePackages[0].price,
          quantity: 1
        });
      }
    }

    const total1 = sampleItems1.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total2 = sampleItems2.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total3 = sampleItems3.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orders = await Order.create([
      {
        customerName: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        items: sampleItems1.length > 0 ? sampleItems1 : [{ packageId: new mongoose.Types.ObjectId(), name: 'Sample', price: 99, quantity: 1 }],
        total: total1 || 99,
        status: 'completed',
        minecraftUsername: 'RahulGamer123',
        discordId: 'rahul#1234',
        transactionId: 'PAYU_8F3J2K9X1L',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        customerName: 'Priya Patel',
        email: 'priya.patel@example.com',
        items: sampleItems2.length > 0 ? sampleItems2 : [{ packageId: new mongoose.Types.ObjectId(), name: 'Sample', price: 199, quantity: 1 }],
        total: total2 || 199,
        status: 'paid',
        minecraftUsername: 'PriyaPlaysMC',
        discordId: 'priya#5678',
        transactionId: 'RAZOR_A7M2K5P9Q3',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        customerName: 'Amit Kumar',
        email: 'amit.kumar@example.com',
        items: sampleItems3.length > 0 ? sampleItems3 : [{ packageId: new mongoose.Types.ObjectId(), name: 'Sample', price: 499, quantity: 1 }],
        total: total3 || 499,
        status: 'pending',
        minecraftUsername: 'AmitLegend',
        discordId: 'amit#9012',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
      }
    ], { session });

    console.log(`${orders.length} sample orders created`);

    await session.commitTransaction();
    session.endSession();

    return { admin, categories, packages, settings, orders };

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = seedCheck;
