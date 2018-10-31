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
    var split = '---\n';
    var i = data.indexOf(split);
    var info = {};
    if (i !== -1) {
      var j = data.indexOf(split, i + split.length);
      if (j !== -1) {
        var str = data.slice(i + split.length, j).trim();
        data = data.slice(j + split.length);
        str.split('\n').forEach(function (line) {
          var i = line.indexOf(':');
          if (i !== -1) {
            var name = line.slice(0, i).trim();
            var value = line.slice(i + 1).trim();
            info[name] = value;
          }
        });
      }
    }
    info.source = data;
    info.layout = info.layout || 'post';
    info.content = md.render(info.source || '');
    
    // 处理 <!--more-->
    let moreFlag = data.indexOf('<!--more-->');
    info.headContent = moreFlag !== -1?md.render(data.slice(0,moreFlag)):info.content;

    let dateMoment = moment(info.date,'YYYY-MM-DD,HH:mm:ss');
    info.dateMoment= dateMoment;
    let dateArr = dateMoment.toArray();
    
    dateArr[1] += 1;
    if(dateArr[1]<10){
        dateArr[1] = '0' + dateArr[1]
    }
    info.dateArr = dateArr.map(v=>v.toString());
    
    return info;
}

/**
 * 【陈勇 2018-10-31 231840】
 * @param templateFile  模板文件
 * @param data 将data数据渲染在模板文件templateFile中
 * @returns html
 *  */
function renderHtml(templateFile , data){
    return swig.render(fs.readFileSync(templateFile ).toString(),{
        filename: file,
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