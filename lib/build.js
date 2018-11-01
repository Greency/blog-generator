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
    let source = fs.readFileSync(mdFile).toString(),
        data = util.parseMd(source),
        {dirs} = data;
        targetDir = path.resolve(__dirname, '..', 'public');

    for(let i = 0; i < dirs.length; i++){
        targetDir += `/${dirs[i]}`;
        if(!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
    }
    html = util.renderHtml(path.resolve(__dirname, '..', 'shared/template/index.html'), data);
    fs.writeFileSync(`${targetDir}/index.html`, html);
}
