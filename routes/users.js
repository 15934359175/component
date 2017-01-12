var express = require('express');
var router = express.Router();
var upload = require('./fileuploads');
var unzip=require("unzip");
var fs=require("fs");
var async=require("async");
var shell=require('shelljs/global');

var compUrl=process.cwd()+"/comp";

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
              var rmdir=compUrl+"/__MACOSX";

              try {
                  var info=fs.statSync(rmdir);
                  if(info){

                      rm('-rf', rmdir);
                  }
              }catch (e){

              }

              var packageUrl=process.cwd()+"/comp/package.json";
              var packageData=JSON.parse(fs.readFileSync(packageUrl).toString());
              var category=packageData.category;
              var name=packageData.name;
              //根据json文件的信息，来创建相应的目录
              var destdir=  compUrl+"/"+category+"/"+name
              mkdir('-p',destdir );
              //将文件移动到指定的目录里面
              mv(compUrl+"/code",compUrl+"/layout",destdir);
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
