const express = require("express");
const imageRouter = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");//Filesystem
const util = require("util");
const storage = multer.diskStorage({destination: "./browser/uploadedImages"});
const upload = multer({storage: storage});

const renamePromise = util.promisify(fs.rename);

imageRouter.post("/upload", upload.single("profile"), async (req, res, next) => {
  const fileType = req.file.mimetype.split("/")[1]; //filetype (png, jpg)
  const originalName = req.file.originalname.split(".")[0];
  console.log("Filetype: " + fileType);

  const finalName = req.file.filename + "." + fileType;


  const oldPath = path.join("browser", "uploadedImages", req.file.filename);
  console.log("oldPath: " + oldPath);
  const newpath = path.join("browser", "uploadedImages", finalName  );


    await renamePromise(oldPath, newpath);
    console.log(req.file);
    res.status(200).json({file: finalName})
})

module.exports = imageRouter;
