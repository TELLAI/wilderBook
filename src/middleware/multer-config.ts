import multer from "multer";

const MIME : string[] = ["image/jpg", "image/jpeg", "image/png"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../client/wild-book/src/assets");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    let extension: string = "";
    if (file.mimetype === "image/jpg") {
      extension = MIME[0];
    } else if (file.mimetype === "image/jpeg") {
      extension = MIME[1];
    } else if (file.mimetype === "image/png") {
      extension = MIME[2];
    }
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const newName = name + Date.now() + "." + extension;
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    callback(null, newName);
  },
});

export default multer({ storage }).single("image")
