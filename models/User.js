const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  favourites: [{
    type: Schema.Types.ObjectId,
    ref: "favorite"
  }],
  image: {
    type: String,
    default: "https://res.cloudinary.com=/dmlqhwwfc/image/upload/v1568703809/GreenSpace/default_user_image_gubmhl.png"
    // default: "/public/images/default_user_image.png"
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;