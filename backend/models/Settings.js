const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  siteTitle: {
    type: String,
    default: 'ZyvenorMC',
    trim: true
  },
  siteDescription: {
    type: String,
    default: 'The best Minecraft server experience',
    trim: true
  },
  logo: {
    type: String,
    default: ''
  },
  favicon: {
    type: String,
    default: ''
  },
  heroTitle: {
    type: String,
    default: 'Welcome to ZyvenorMC',
    trim: true
  },
  heroSubtitle: {
    type: String,
    default: 'Support our server and get amazing in-game rewards!',
    trim: true
  },
  serverIp: {
    type: String,
    default: 'play.zyvenormc.com',
    trim: true
  },
  discordLink: {
    type: String,
    default: 'https://discord.gg/zyvenormc',
    trim: true
  },
  supportEmail: {
    type: String,
    default: 'support@zyvenormc.com',
    trim: true
  },
  footerText: {
    type: String,
    default: '© 2024 ZyvenorMC. All rights reserved.',
    trim: true
  },
  primaryColor: {
    type: String,
    default: '#8b5cf6'
  },
  secondaryColor: {
    type: String,
    default: '#06b6d4'
  },
  backgroundImage: {
    type: String,
    default: ''
  },
  fontFamily: {
    type: String,
    default: 'Inter, system-ui, sans-serif'
  },
  announcementBanner: {
    type: String,
    default: '',
    trim: true
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  darkMode: {
    type: Boolean,
    default: true
  },
  borderRadius: {
    type: String,
    enum: ['none', 'sm', 'md', 'lg', 'xl'],
    default: 'lg'
  },
  buttonStyle: {
    type: String,
    enum: ['solid', 'gradient', 'outlined', 'soft'],
    default: 'gradient'
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);
