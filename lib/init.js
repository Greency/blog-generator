const fs = require('fs');
const path = require('path');

module.exports = function(dir){
    dir = dir || '.';
    let sourceDir = path.resolve(__dirname, '..', 'source');
    //创建参数所传dir名称的目录
    /*fs.mkdir(dir, (error)=>{
        if(error && error.code !== 'EEXIST') return;

        copyFileSync(sourceDir, path.resolve(dir));
    })*/
    copyFileSync(sourceDir, path.resolve(dir));
}

/*function copyFilesSync(source, target){
    let paths = fs.readdirSync(source),
        stats = fs.statSync(`${source}\\${paths[0]}`);
        
    console.log('path: ', stats.isDirectory());
    fs.stat(`${source}\\${paths[0]}`, (err, stats) => {
        console.log("It is a folder: " + stats.isDirectory());
        console.log("It is a file: " + stats.isFile());
      });
}*/
function copyFileSync(source, target){
    let stats = fs.statSync(source),
        index = 0;
        index++;
    console.log('source: ', source);
    console.log('target: ', target);
    console.log('exist: ', fs.existsSync(target))
    //判断文件是否存在
    if(!fs.existsSync(target)){
        if(stats.isDirectory()){
            //创建参数所传dir名称的目录
            fs.mkdirSync(target);
        }
    } 
    console.log('exist: ', fs.existsSync(target))
    if(stats.isFile()) {
        console.log('file source: ', source);
        console.log('file target: ', target);
        //将原文件复制到目标文件下
        fs.copyFileSync(source, target);
    }else if(stats.isDirectory()){
        let currentDirs = fs.readdirSync(source);
        console.log('dirs: ', currentDirs);
        for(let i = 0; i < currentDirs.length; i++){
            copyFileSync(`${source}\\${currentDirs[i]}`, `${target}\\${currentDirs[i]}`);
        }
    }
}

/*function copy(source,target,speed,cb){
  if(typeof(speed)==='function'){
    cb = speed;
    speed = 10;
  }
  console.log('source: ', source, 'target: ', target)
  fs.open(source,'r+',0o666,function(err,rfd){
    if(err)console.error('打开文件失败!');    
    fs.open(target,'w+',0o666,function(err,wfd){
      if(err)console.error('打开文件失败!');
      let buf = Buffer.alloc(speed)
        ,length = buf.length;
      function next(){
        fs.read(rfd,buf,0,length,null,(err,bytesRead)=>{
          if(err)console.error('读取文件失败!');
          if(!bytesRead){
            fs.close(rfd,function(err){});
            fs.fsync(wfd,function(err){
              fs.close(wfd,function(err){});
            });
            return cb&&cb();
          }
          fs.write(wfd,buf,0,bytesRead,null,(err,bytesWritten)=>{
            if(err)console.error('写入文件失败!');
            next();
          });
        });

      }
      next();
    });
  });
}*/

function postArticle(){
    //console.log('dir: ');
}

