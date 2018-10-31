const fs = require('fs');
const path = require('path');
const util = require('./utils');

module.exports = function(){
    //先将模板文件中的静态CSS，js复制到public中
    let sourceDir = path.resolve(__dirname, '..', 'shared/assets'),
        targetDir = path.resolve(__dirname, '..', 'public/assets');
    util.copyFileSync(sourceDir, targetDir);
}

/**
 * 【陈勇 2018-10-31 232306】
 * @param 
 */
function createPage(){
    let source = fs.readFileSync(path.resolve(__dirname, '..', 'source\\_posts\\nodejs搭建一个静态博客生成器.md')).toString();
    //console.log('source: ', source);
        data = parseMd(source);
    //console.log('data: ', data, path.resolve(__dirname, '../', '\\ok'));
        html = renderHtml(path.resolve(__dirname, '..', 'shared\\template\\index.html'), data);
    //console.log('html: ', html);
    
    fs.writeFileSync(`${__dirname}\\index.html`, html);
}