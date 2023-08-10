const mongoose = require("mongoose");
const jwt = require('jsonwebtoken'); // jsonwebtoken 모듈을 import

const memberSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

memberSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    {
      id: this._id.toString(),
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: '30m',
    }
  );
  return token;
};

memberSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    {
      id: this._id.toString(),
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '15d',
    }
  );
  return token;
};

module.exports = mongoose.model("member", memberSchema);