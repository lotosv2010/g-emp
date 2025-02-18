# g-emp

简版 EMP 框架实现

## 快速开始

```shell
npm install
npm link
```

## 使用

- 首先启动一个静态服务器tool服务，可以访问本目录下的data目录下的index.json文件

```shell
# 初始化 EMP
gemp init -t http://127.0.0.1:5500/data/index.json

# 启动 remote
cd ./example/remote-app
gemp dev

# 启动 host
cd ./example/host-app
gemp dev
```
