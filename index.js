const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static(__dirname + "/public"));
app.use(express.json());

// default options
 
app.use(fileUpload());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Handling POST req in server i.e https://localhost:8000

app.post("/upload/images", function(req, res) {
  console.log(req.files);
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  //upload_img is name given for file in client
  let image = req.files.upload_img;

  //Storing in server
  image.mv(`./public/images/${image.name}`, function(err) {
    if (err) return res.status(500).send(err);
    return res.status(200).send("Image upload success");
  });
});

//listening on port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
