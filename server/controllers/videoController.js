const Video = require('../models/Video');

exports.listVideos = async function listVideos(req, res, next) {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    return res.json({ videos });
  } catch (e) {
    return next(e);
  }
};
