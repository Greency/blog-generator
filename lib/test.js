const fs = require('fs');
const path = require('path');
const util = require('./utils');
const swig = require('swig');

module.exports = function(){
    //let source = fs.readFileSync(path.resolve(__dirname, '..', 'source\\_posts\\nodejs搭建一个静态博客生成器.md')).toString();
    //console.log(source);

    //console.log(util.parseMd(source));
    util.createPage();
}
