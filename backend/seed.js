require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Package = require('./models/Package');
const Settings = require('./models/Settings');
const Category = require('./models/Category');
const Order = require('./models/Order');

const seedDatabase = async () => {
  console.log('Starting database seed...');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);

  const session = await mongoose.startSession();

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    session.startTransaction();

    console.log('\n--- Clearing existing data ---');
    await User.deleteMany({}, { session });
    await Package.deleteMany({}, { session });
    await Settings.deleteMany({}, { session });
    await Category.deleteMany({}, { session });
    await Order.deleteMany({}, { session });
    console.log('All collections cleared');

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);
    const hashedPassword = await bcrypt.hash('vaelor@123', salt);

    console.log('\n--- Creating Admin User ---');
    const admin = await User.create([{
      email: 'vaelormc@gmail.com',
      password: hashedPassword,
      role: 'admin'
    }], { session });
    console.log('Admin created: vaelormc@gmail.com / vaelor@123');

    console.log('\n--- Creating Categories ---');
    const categories = await Category.create([
      { name: 'Ranks', icon: 'Crown', order: 0 },
      { name: 'Keys', icon: 'Key', order: 1 },
      { name: 'Coins', icon: 'Coins', order: 2 }
    ], { session });
    console.log(`Created ${categories.length} categories:`, categories.map(c => c.name).join(', '));

    console.log('\n--- Creating Packages ---');
    const packages = await Package.create([
      {
        name: 'VIP',
        category: 'rank',
        price: 99,
        description: 'The VIP rank offers great perks for casual players who want to enhance their Minecraft experience with quality of life features.',
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
        description: 'MVP rank includes everything in VIP plus additional features for more serious players who want to stand out.',
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
        description: 'PRO rank for the dedicated Minecraft enthusiast who wants premium features and exclusive perks.',
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
        description: 'LEGEND rank is our most popular premium package with outstanding features and top-tier support.',
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
        description: 'The ultimate custom rank with personalized benefits. Contact staff after purchase to customize your experience!',
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
        description: 'Get 5 Vote Keys instantly delivered to your account for the Vote Crate!',
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
        description: '3 Rare Keys packed with valuable rewards like diamonds, enchantments, and gear.',
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
        description: '2 Epic Keys unlocking premium exclusive loot you won\'t find anywhere else!',
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
        description: '1 Legendary Key for the ultimate crate experience. Only the best items await!',
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
        description: 'An instant 1,000 server coins boost to start your shopping spree!',
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
        description: 'Great value 5,000 coin package - perfect for buying multiple items!',
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
        description: 'Best value 10,000 coin bundle. Save big and unlock everything you need!',
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
        description: 'Massive coin pack for serious players. Become the richest on the server!',
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
    console.log(`Created ${packages.length} packages:`);
    const rankPackages = packages.filter(p => p.category === 'rank');
    const keyPackages = packages.filter(p => p.category === 'key');
    const coinPackages = packages.filter(p => p.category === 'coin');
    console.log(`  Ranks (₹): ${rankPackages.map(p => `${p.name}@₹${p.price}`).join(', ')}`);
    console.log(`  Keys (₹): ${keyPackages.map(p => `${p.name}@₹${p.price}`).join(', ')}`);
    console.log(`  Coins (₹): ${coinPackages.map(p => `${p.name}@₹${p.price}`).join(', ')}`);

    console.log('\n--- Creating Settings ---');
    const settings = await Settings.create([{
      siteTitle: 'ZyvenorMC',
      siteDescription: 'The best Minecraft server experience - Ranks, Keys, Coins and more! Support our growing community today.',
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
    console.log('Site settings configured');
    console.log(`  Title: ${settings[0].siteTitle}`);
    console.log(`  Theme: ${settings[0].darkMode ? 'Dark Mode' : 'Light Mode'}`);
    console.log(`  Primary: ${settings[0].primaryColor}, Secondary: ${settings[0].secondaryColor}`);
    console.log(`  Server IP: ${settings[0].serverIp}`);

    console.log('\n--- Creating Sample Orders ---');
    const vipPkg = packages.find(p => p.name === 'VIP');
    const mvpPkg = packages.find(p => p.name === 'MVP');
    const proPkg = packages.find(p => p.name === 'PRO');
    const voteKeyPkg = packages.find(p => p.name.includes('Vote Key'));
    const coinPkg = packages.find(p => p.name.includes('5,000 Coins'));

    const orderItems1 = [];
    if (vipPkg) orderItems1.push({ packageId: vipPkg._id, name: vipPkg.name, price: vipPkg.price, quantity: 1 });
    if (voteKeyPkg) orderItems1.push({ packageId: voteKeyPkg._id, name: voteKeyPkg.name, price: voteKeyPkg.price, quantity: 2 });
    const total1 = orderItems1.reduce((s, i) => s + (i.price * i.quantity), 0) || 99;

    const orderItems2 = [];
    if (mvpPkg) orderItems2.push({ packageId: mvpPkg._id, name: mvpPkg.name, price: mvpPkg.price, quantity: 1 });
    if (coinPkg) orderItems2.push({ packageId: coinPkg._id, name: coinPkg.name, price: coinPkg.price, quantity: 1 });
    const total2 = orderItems2.reduce((s, i) => s + (i.price * i.quantity), 0) || 199;

    const orderItems3 = [];
    if (proPkg) orderItems3.push({ packageId: proPkg._id, name: proPkg.name, price: proPkg.price, quantity: 1 });
    const total3 = orderItems3.reduce((s, i) => s + (i.price * i.quantity), 0) || 399;

    const orders = await Order.create([
      {
        customerName: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        items: orderItems1,
        total: total1,
        status: 'completed',
        minecraftUsername: 'RahulGamer123',
        discordId: 'rahul#1234',
        transactionId: 'PAYU_8F3J2K9X1L7M5N',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        customerName: 'Priya Patel',
        email: 'priya.patel@example.com',
        items: orderItems2,
        total: total2,
        status: 'paid',
        minecraftUsername: 'PriyaPlaysMC',
        discordId: 'priya#5678',
        transactionId: 'RAZOR_A7M2K5P9Q3R1T',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        customerName: 'Amit Kumar',
        email: 'amit.kumar@example.com',
        items: orderItems3,
        total: total3,
        status: 'pending',
        minecraftUsername: 'AmitLegend',
        discordId: 'amit#9012',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
      }
    ], { session });
    console.log(`Created ${orders.length} sample orders:`);
    orders.forEach(o => {
      console.log(`  ${o.customerName} (${o.minecraftUsername}): ₹${o.total} - [${o.status.toUpperCase()}]`);
    });

    await session.commitTransaction();
    console.log('\n========================================');
    console.log('✅ Database seed completed successfully!');
    console.log('========================================');
    console.log('\nAdmin Login:');
    console.log('  Email: vaelormc@gmail.com');
    console.log('  Password: vaelor@123');
    console.log('\nSummary:');
    console.log(`  - Admin Users: ${await User.countDocuments()}`);
    console.log(`  - Categories: ${await Category.countDocuments()}`);
    console.log(`  - Packages: ${await Package.countDocuments()}`);
    console.log(`  - Settings: ${await Settings.countDocuments()}`);
    console.log(`  - Orders: ${await Order.countDocuments()}`);
    console.log('\nRun: npm start');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Seed failed!');
    console.error(error.message);
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    process.exit(1);
  } finally {
    session.endSession();
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  }
};

seedDatabase();
