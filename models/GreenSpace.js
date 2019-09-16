const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const greenSpaceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    lat: Number,
    lng: Number
  },
  image: {
    type: String,
    default: "/public/images/default_user_image.png"
  },
  tags: [{
    type: String,
    enum: [
      "Park",
      "Garden",
      "Bench",
      "Steps",
      "Nature reserve",
      "Tiny space",
      "Water",
      "Trees",
      "Lawn",
      "Food place",
      "Quiet",
      "Loud",
      "Sports",
      "Barbeque",
      "Picknick",
      "Playground",
      "Wheelchair-accessible"
    ]
  }]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const GreenSpace = mongoose.model("GreenSpace", greenSpaceSchema);
module.exports = GreenSpace;