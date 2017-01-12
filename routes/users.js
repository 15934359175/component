var express = require('express');
var router = express.Router();
var upload = require('./fileuploads');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("admin");
});
router.post('/upload', upload.single('file'), function (req, res, next) {
    if (req.file) {
        res.send('文件上传成功')
        console.log(req.file);
        console.log(req.body);
    }
});


module.exports = router;
