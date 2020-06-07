#!/usr/bin/env node

// Node CLI 应用入口文件必须要有这样的文件头
// 如果是 Linux 或者 macOS 系统下还学要修改此文件的读写权限
// 具体就是通过 chmod 755 cli.js 实现修改

// console.log('cli working')

// 脚手架的工作过程：
// 1. 通过命令行交互询问用户问题
// 2. 根据用户回答的结果生成文件

// 使用 inquirer 在 node 中和用户进行命令行交互
// yarn add inquirer

const path = require('path')
const fs = require('fs')
const inquirer = require("inquirer")
const ejs = require("ejs")

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project Name?'
    }
]).then(answers => {
    // console.log(answers)
    // 根据用户的回答结果解和模板生成文件

    // 模板的目录
    const tmpDir = path.join(__dirname, 'templates')
    // 目标目录
    const destDir = process.cwd()
    // console.log(process.cwd()) // D:\workPlatform\demos\sample-scaffolding

    // 将模板下的文件全部转换到目标目录
    fs.readdir(tmpDir, (err, files) => {
        if(err) throw err
        files.forEach(file => {
            // 通过模板引擎去渲染这些文件
            ejs.renderFile(path.join(tmpDir, file), answers, (err, result) => {
                if(err) throw err
                // console.log(result)

                // 将结果写入目标文件路径
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})