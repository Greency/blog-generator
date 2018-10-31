const fs = require('fs');
const path = require('path');
const util = require('./utils');

module.exports = function(){
    //先将模板文件中的静态CSS，js复制到public中
    let sourceDir = path.resolve(__dirname, '..', 'shared/assets'),
        targetDir = path.resolve(__dirname, '..', 'public/assets');
    util.copyFileSync(sourceDir, targetDir);

    //读取用户需要post的md文档
    let mdPath = path.resolve(__dirname, '..', `shared/md`),
        currentDirs = fs.readdirSync(mdPath);
    
    for(let i = 0; i < currentDirs.length; i++){
        createPage(`${mdPath}/${currentDirs[i]}`);
    }
}

/**
 * 【陈勇 2018-10-31 232306】
 * @param mdFile md文件
 */
function createPage(mdFile){
    let source = fs.readFileSync(mdFile).toString();
    //console.log('source: ', source);
        data = util.parseMd(source);
        //console.log(data.content);
    //console.log('data: ', data, path.resolve(__dirname, '../', '\\ok'));
        //html = renderHtml(path.resolve(__dirname, '..', 'shared\\template\\index.html'), data);
    //console.log('html: ', html);
    
    //fs.writeFileSync(`${__dirname}\\index.html`, html);
}