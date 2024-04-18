# Cloudflare Workers AI Chat with DuckDB

本项目是一个基于 Cloudflare Workers AI 和 DuckDB 的简易网页聊天项目，类似于 ChatGPT。前端和后端一起打包，前端使用 Vue 3，后端使用 Spring Boot。

## 介绍

该项目旨在演示如何利用 Cloudflare Workers AI 和 DuckDB 构建一个简单的网页聊天应用。前端使用 Vue 3 构建，提供了用户界面以及与后端通信的功能。后端使用 Spring Boot 构建，处理前端发送的请求并返回相应的数据。

## 功能特点

- 用户可以与 AI 进行实时对话。
- 对话内容存储在 DuckDB 数据库中，可进行检索和分析。
- 前端使用 Vue 3 构建，提供了友好的用户界面。
- 后端使用 Spring Boot 构建，处理前端请求并进行相应的逻辑处理。


## 如何使用

### 前提条件

- 安装 Node.js（版本 >= 21.7.3）
- 安装 Java（版本 >= 21）
- 安装 Maven（版本 >= 3.9.6）

### 修改application.properties
 请参考[https://developers.cloudflare.com/workers-ai/get-started/rest-api/](https://developers.cloudflare.com/workers-ai/get-started/rest-api/)
- 更改account-id
- 更改api-token
- 更改你需要使用的model
- 更改system-prompt

### 前端

1. 进入 `ui` 目录。
2. 执行 `npm install` 安装依赖。
3. 执行 `npm run dev` 启动开发服务器。

### 后端

1. 进入目录。
2. 执行 `mvn spring-boot:run` 启动 Spring Boot 应用。

### 前后端打包集成
已集成前后端打包,直接`mvn package`会生成target/chat.jar
将chat.jar放到任意文件夹下
直接运行打开 http://localhost:20001/
同时会在同一文件夹下生成chat.duckdb和chat.duckdb.wal文件
迁移时将这几个文件复制走就可以了

默认打包出来的是thin jar,请确保安装了maven 
想直接打完整包请在pom里删掉spring-boot-thin-layout与spring-boot-thin-maven-plugin

## 在线体验

欢迎在线体验 [https://chat.doge.icu/](https://chat.doge.icu/)

## 贡献

欢迎提交问题和拉取请求以改进该项目。如果您有任何疑问或建议，请随时联系我们。

## 许可证

该项目基于 [MIT 许可证](LICENSE) 发布。详情请参阅许可证文件。

