const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  paragraphs: { type: Number, required: true },
  preview: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);