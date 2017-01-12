var express = require('express');
var router = express.Router();
var upload = require('./fileuploads');
var unzip=require("unzip");
var fs=require("fs");
var async=require("async");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("admin");
});
router.post('/upload', upload.single('file'), function (req, res, next) {
    if (req.file) {
        async.series([
            //解压
            function(cb){
                var upzipurl=process.cwd()+"/comp"
                fs.createReadStream(req.file.path).pipe(unzip.Extract({ path: upzipurl}));
                setTimeout(function () {
                    cb();
                },2000)

            },
            //读取json文件并创建目录结构
            function(cb){
              var packageUrl=process.cwd()+"/comp/package.json";
              var packageData=JSON.parse(fs.readFileSync(packageUrl).toString());
              var category=packageData.category;
              var name=packageData.name;
             

              cb();
            }

        ],function(){
            console.log("完毕")
        })
        //1. 解压 -> 2. 读取

        res.send('文件上传成功')

    }
});


module.exports = router;
