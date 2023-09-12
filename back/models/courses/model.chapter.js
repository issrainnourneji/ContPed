const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chapterSchema = new Schema (
    {
        chapterTitle: { type: String, required: true },
        chapterParagraphs: [{
            paragraphTitle: { type: String, required: true },
            paragraphContent: { type: String, required: true },
            paragraphVideos: { type: String, default: null },
            paragraphImages: { type: String, default: null },
        }]

    }
)

module.exports = mongoose.model('chapters', chapterSchema);

