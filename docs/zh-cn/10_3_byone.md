---
title: Byone
---

# Byone

<a name="52be9dae"></a>
## 安装使用插件钱包

<a name="232e9e3e"></a>
### 1. 打开Google浏览器的应用商店，搜索Bystore

![](https://cdn.nlark.com/yuque/0/2019/png/241708/1554887373320-3401e737-e9ff-43a2-986d-0a7aab0107fb.png#align=left&display=inline&height=383&originHeight=1312&originWidth=2554&size=0&status=done&width=746)

下载链接：[http://t.cn/E6cFFwb](http://t.cn/E6cFFwb)

<a name="0b50cd4b"></a>
### 2. 然后点击添加到Chrome,就可以添加到我们的：

![](https://cdn.nlark.com/yuque/0/2019/png/241708/1554887373407-2d1c4148-f2c4-46b4-ba2c-112e5366b6db.png#align=left&display=inline&height=378&originHeight=1282&originWidth=2530&size=0&status=done&width=746)

<a name="47ae9f5a"></a>
### 3. 使用google插件钱包

如果你使用的是测试网，可以去测试网水龙头领取BTM。<br />测试网水龙头：[http://test.blockmeta.com/faucet.php](http://test.blockmeta.com/faucet.php)

<a name="e4755bf5"></a>
## 搭建Dapp demo

Dapp demo是一个基于比原的储蓄合约，该demo可以进行资产的锁仓储蓄，到期返还资产并给一定的利息。这个dapp很适合的场景就是股息分红，内部通过智能合约自动锁仓操作，到期资产自动解锁。所以我个人对这个dapp应用场景表示非常看好。

项目源码地址：[https://github.com/Bytom/Bytom-Dapp-Demo](https://github.com/Bytom/Bytom-Dapp-Demo)

根据源码里面的readme.md文件进行搭建dapp,然后我们在本地打开[http://127.0.0.1:8080](http://127.0.0.1:8080) 后就可以看该dapp应用。然后我们点开我们的账户如下图：

![](https://cdn.nlark.com/yuque/0/2019/png/241708/1554887373314-645757e1-899b-431b-b51c-7343fc526819.png#align=left&display=inline&height=371&originHeight=741&originWidth=1489&size=0&status=done&width=746)

点击saving，我们看到的是储蓄资产界面，用户可以设置资产的金额，并储蓄资产

![](https://cdn.nlark.com/yuque/0/2019/png/241708/1554887373545-02703ed0-bab9-44fd-aa3a-a27c78f054d2.png#align=left&display=inline&height=394&originHeight=767&originWidth=1454&size=0&status=done&width=746)

下图是我们收益的页面，我们可以看到自己储蓄的收益，如果是到期的话我们可以提出自己的收益。

![](https://cdn.nlark.com/yuque/0/2019/png/241708/1554887373388-fa150cbd-9da9-48e1-b011-d40b046e45c9.png#align=left&display=inline&height=394&originHeight=767&originWidth=1454&size=0&status=done&width=746)

<a name="41de188d"></a>
## Dapp调起Google插件的实现

<a name="0fe7802e"></a>
### 初始化注入

![](https://cdn.nlark.com/yuque/0/2019/jpeg/241708/1554887373396-1ab689f1-9aaa-4438-8aef-fb8f8501bbee.jpeg#align=left&display=inline&height=451&originHeight=1764&originWidth=2920&size=0&status=done&width=746)

<a name="94838a4c"></a>
### 检查插件，账户

![](https://cdn.nlark.com/yuque/0/2019/png/241708/1554887373337-ea1047a0-6a0d-4c08-bdbe-cf324b70dc77.png#align=left&display=inline&height=443&originHeight=948&originWidth=1595&size=0&status=done&width=746)

<a name="71d6453a"></a>
### 调交易接口

下图是发送交易的API接口，接口的具体文档参考:[https://github.com/Bytom/Bystore/wiki/API-reference](https://github.com/Bytom/Bystore/wiki/API-reference)。还有其他的API接口都在该文档里面。监听事件接口bytom.request(eventName, options)。

![](https://cdn.nlark.com/yuque/0/2019/jpeg/241708/1554887373401-67ec3221-1f60-4e5d-be13-ffd10ff18417.jpeg#align=left&display=inline&height=345&originHeight=1414&originWidth=3056&size=0&status=done&width=746)

<a name="81e3cc81"></a>
## 后端服务器接口

由于比原链采用的UTXO模型，该模型没有状态。但是在开发dapp的过程中需要关联用户的的地址。所以后端服务器主要是封装一层类似账户模型，方便dapp跟链进行交互。开发者开发dapp可以搭建改项目作为与链交互的服务器，自己搭建参考项目的readme.

后端服务器项目地址：[https://github.com/oysheng/bufferserver](https://github.com/oysheng/bufferserver)

<a name="7e57630b"></a>
## Dapp开发流程梳理

通过上面的一系列步骤，我们已经大概明白基于比原链开发dapp的一个大致流程。流程总结就是：

<a name="7102f610"></a>
#### step1: 下载安装Chrome插件钱包，如果自己的dapp不需要跳过这一步。

<a name="887b8690"></a>
#### step2: 如果需要自己搭建BlockCenter后端服务器，参考项目说明文件安装。不想搭建的话，直接用官方的服务，直接远程调用即可。

<a name="bd617c2e"></a>
#### step3: 开发智能合约，并编译。然后将编译后的合约参数配置在dapp的配置文件，如下图：（全红部分是测试网合约配置参数）

![](https://cdn.nlark.com/yuque/0/2019/png/241708/1554887373393-4316b52b-ba60-4a2c-85a9-a951af2fef44.png#align=left&display=inline&height=438&originHeight=1806&originWidth=3078&size=0&status=done&width=746)

<a name="46ac9374"></a>
#### step4:调用Chrome插件钱包。

到此，在比原链上开发dapp的整套流程都已经梳理清楚，欢迎大家快速上手试试。开发出优秀的dapp应用。

Github： [https://github.com/bycoinio/Bystore/](https://github.com/bycoinio/Bystore/)

