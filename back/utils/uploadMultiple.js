const multer = require("multer");

// Set the storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// Initialize multer
const multipleUpload=()=>{ return async (req, res, next) => {}
    const paragraphes= req.body.chapterParagraphs
    const fields = paragraphes.map(
        (paragraph, i) => {
            if(paragraph && paragraph.file){
                  return {
                    name: `${i}`
                  }
            }
        }
    )
    return multer.storage({ storage: storage }).fields(fields)
}
