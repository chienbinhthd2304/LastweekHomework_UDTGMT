var express = require('express');
var router = express.Router();
const path = require("path");

var storageDir = path.join(__dirname, '..', 'public', 'images') + '/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Application of computer vision' });
});

router.post('/', function(req, res, next) {
  const {image} = req.files;

  if (image){
    image.mv(storageDir + image.name);
    res.render('index', { 
      title: 'Application of computer vision',
      msg: "Upload file succesful"
    });
  }
  else {
    res.sendStatus(400);
  }
  
})

module.exports = router;
