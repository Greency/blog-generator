## 前言
> 目录结构
```
—bin
  —bmd //命令行文件
    —new //新建md文档
    —build  //将文档编译成html
    —server  //开启本地服务
—lib  //业务实现文件
—template  //博客模板文件
  —source  //放置md文件
  —themes  //博客模板样式文件
  —config.json  //博客配置文件
```

## 起步
> 目录搭建，环境安装

> 注意：博主的nodejs版本为v8.12.0

- ##### 新建一个文件夹，如：blog-md
- ##### 在blog-md下安装commander

```
npm install commander --save
```
- ##### 在blog-md下新建一个bin文件，并在bin下新建一个文本，如：bmd（此文本主要编写命令）
- ##### 先在bmd中写下如下信息

```
#! /usr/bin/env node
const program = require('commander');
```
- ##### 在blog-md下新建source文件夹
- 在source文件夹下新建themes和md两个文件夹

> themes是放置生成博客的默认模板；md是放置你写的md文件

## 编写模块文件
> 编写博客的模板文件

- ##### 在文件

## 编写init命令

> 完成init命令的编写，以及其对应功能的实现