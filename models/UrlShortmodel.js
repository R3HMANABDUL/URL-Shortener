
const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    
  },
  originalUrl: {
    type: String,
    required: true,
  },
  visitHistory: [
    {
      timestamp: {
        type: Number,
      },
    },
  ],
}, { timestamps: true }); // <-- correct option

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;



// const mongoose = require("mongoose");
// const shortid = require("shortid");   // library to generate unique ids

// const UrlSchema = new mongoose.Schema({
//   shortId: {
//     type: String,
//     required: true,
//     unique: true,
//     default: shortid.generate   // ✅ ensures shortId is never null
//   },
//   originalUrl: {
//     type: String,
//     required: true,
//   },
//   visitHistory: [
//     {
//       timestamp: { type: Number },
//     },
//   ],
// }, { timestamps: true });

// const Url = mongoose.model("Url", UrlSchema);

// module.exports = Url;