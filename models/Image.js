const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  image: {
    type: String,
    default: "/public/images/greenspace_default.jpg"
  },
  greenspace: {
    type: Schema.Types.ObjectId,
    ref: 'GreenSpace'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;