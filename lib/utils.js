const fs = require('fs');
const moment = require('moment');
const path = require('path');
const hljs = require('highlight');
const md = require('markdown-it')({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
                   hljs.highlight(lang, str, true).value +
                   '</code></pre>';
          } catch (__) {}
        }
    
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});
const swig = require('swig');
swig.setDefaults({cache: false});

//解析md文档
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

//渲染html
function renderHtml(file, data){
    /*let tmpl = swig.compileFile(file);
    return tmpl(data);*/

    return swig.render(fs.readFileSync(file).toString(),{
        filename: file,
        autoescape: false,
        locals: data
    });
}

//生成页面
function createPage(){
    let source = fs.readFileSync(path.resolve(__dirname, '..', 'source\\_posts\\nodejs搭建一个静态博客生成器.md')).toString();
    //console.log('source: ', source);
        data = parseMd(source);
    //console.log('data: ', data, path.resolve(__dirname, '../', '\\ok'));
        html = renderHtml(path.resolve(__dirname, '..', 'shared\\template\\index.html'), data);
    //console.log('html: ', html);
    
    fs.writeFileSync(`${__dirname}\\index.html`, html);
}

exports.parseMd = parseMd;
exports.createPage = createPage;