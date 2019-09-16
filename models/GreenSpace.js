const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const greenSpaceSchema = new Schema(
  {
    name: String,
    creator: String,
    location: {lon:Number,lat:Number},
    images: String,
    comments: String,
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
        "Wheelchair-accessible"
      ]
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const GreenSpace = mongoose.model("GreenSpace", greenSpaceSchema);
module.exports = GreenSpace;
