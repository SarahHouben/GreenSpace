const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const greenSpaceSchema = new Schema({
  name: String,
  creator: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  location: {
    lat: Number,
    lng: Number
  },
  tags: {
    type: String,
    enum: [
      "Park",
      "Garden",
      "Bench",
      "Steps",
      "Nature reserve",
      "Tiny",
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
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const GreenSpace = mongoose.model("GreenSpace", greenSpaceSchema);
module.exports = GreenSpace;