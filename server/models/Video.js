const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    youtubeId: { type: String, required: true },
    channel: { type: String, default: 'CodeFlow' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', VideoSchema);
