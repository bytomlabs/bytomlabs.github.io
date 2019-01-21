# bytomlabs.github.io

## 参考文档

- 参考：https://docsite.js.org


## 目录结构

- blog   博客
- build  编译后的文件
- docs   文档内容
- en-us  编译后的英文文件
- zh-cn  编译后的中文文件


## 安装 docsite
#### 安装
docsite 用于基于降价文档快速构建静态站点。

确保安装的节点版本满足以下要求：node >= 6.9.0
执行npm install docsite -g全局安装

#### 验证安装
docsite -V在终端中运行，看到docsite的版本意味着它已成功安装。
 

## 编辑文件

- 在docs目录下添加文件，然后在site_config目录下的docs.js中添加对应文件的html
- 本地: docsite start
- docsite build 后传到GitHub


## 更多详情

- 如果你在使用的过程中，遇到问题欢迎给我们提Issues


