const fs = require('fs');
const moment = require('moment');
const path = require('path');
const hljs = require('highlight');
const md = require('markdown-it')({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="markdown hljs"><code>' +
                   hljs.highlight(lang, str, true).value +
                   '</code></pre>';
          } catch (__) {}
        }
    
        return '<pre class="markdown hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});
const swig = require('swig');
swig.setDefaults({cache: false});


/**
 * 【陈勇 2018-10-31 232035】
 * @param data 读取的md文件的string数据
 * @returns {string} info
 */
function parseMd(data){
    let dataStr = JSON.stringify(data),
        dateArr = [],
        date = '',
        title = '',
        content = '',
        headContent = '',
        dirs = [];  //文章生成的路径
    
    date = dataStr.match(/date: (\d+-\d+-\d+)\\r\\n/)[1];
    dateArr = date.split('-');
    dirs = dateArr;
    title = dataStr.substring(dataStr.indexOf('title: ') + 7, dataStr.indexOf('\\r\\ndate: ')).trim();
    dirs.push(title);
    content = md.render(data);
    //计算<!--more-->
    let moreIndex = dataStr.indexOf('<!--more-->');
    headContent = moreIndex === -1 ? content : md.render(data.slice(0,moreIndex));

    return {
        date,
        dateArr,
        title,
        headContent,
        content,
        dirs
    }
}

/**
 * 【陈勇 2018-10-31 231840】
 * @param templateFile  模板文件
 * @param data 将data数据渲染在模板文件templateFile中
 * @returns html
 *  */
function renderHtml(templateFile , data){
    return swig.render(fs.readFileSync(templateFile ).toString(),{
        filename: 'idnex.html',
        autoescape: false,
        locals: data
    });
}

/**
 * 【陈勇 2018-10-31 232420】
 * @param {string} source 源文件目录
 * @param {stirng} target 目标文件目录 
 */
function copyFileSync(source, target){
    let stats = fs.statSync(source);
    //判断文件是否存在
    if(!fs.existsSync(target)){
        if(stats.isDirectory()){
            //创建参数所传dir名称的目录
            fs.mkdirSync(target);
        }
    } 
    if(stats.isFile()) {
        //将原文件复制到目标文件下
        fs.copyFileSync(source, target);
    }else if(stats.isDirectory()){
        let currentDirs = fs.readdirSync(source);
        for(let i = 0; i < currentDirs.length; i++){
            copyFileSync(`${source}\\${currentDirs[i]}`, `${target}\\${currentDirs[i]}`);
        }
    }
}

exports.parseMd = parseMd;
exports.renderHtml = renderHtml;
exports.copyFileSync = copyFileSync;