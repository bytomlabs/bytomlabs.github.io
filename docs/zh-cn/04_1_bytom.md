---
title: Bytom
---

# Bytom

<a name="21cc966e"></a>
## Homebrew安装

```
brew tap bytom/bytom && brew install bytom
```

<a name="d6fcf590"></a>
### Docker安装

确保您的Docker版本为17.05或更高版本。

#### 获取Docker镜像

```bash
$ docker pull bytom/bytom:latest
```

#### 初始化：

```bash
$ docker run -v < Bytom / data / directory / on / host / machine >：/ root /.bytom bytom：latest bytomd init --chain_id < chainId >
```

默认的Bytom数据目录（在主机上）是：

Mac： ~/Library/Bytom

Linux： ~/.bytom

windows： %APPDATA%\Bytom

chainId 有三种选择：

mainnet：连接到主网

testnet：连接到测试网

solonet：单节点

如下例（mac/testnet）：

```bash
$  docker run -v ~/Library/Bytom:/root/.bytom bytom/bytom:latest bytomd init --chain_id testnet
```

#### 开启docker终端交互模式：
 
```bash
$  docker run -it -p 9888:9888 -v ~/Library/Bytom:/root/.bytom bytom/bytom:latest
```

#### 开启守护进程模式：

```bash
$   docker run -d -p 9888:9888 -v ~/Library/Bytom:/root/.bytom bytom/bytom:latest bytomd node --web.closed --auth.disable
```

#### 查看正在运行的容器：

```bash
$  docker ps
``` 

<a name="9ba4dbfa"></a>
## 从源码构建

<a name="b6780d84"></a>
### 环境要求

* [Go](https://golang.org/doc/install) 版本1.8或者更高, 设置 `$GOPATH`

```bash
$ go version #查看golang版本是否符合要求
$ go env GOROOT GOPATH #获取环境变量
```

<a name="8331c475"></a>
### 下载Bytom源代码

```bash
$ git clone https://github.com/Bytom/bytom.git $GOPATH/src/github.com/bytom
```

<a name="d4ede159"></a>
### Makefile构建

```bash
$ make bytom-simd
```

编译支持Intel [SIMD](https://en.wikipedia.org/wiki/Streaming_SIMD_Extensionsl) 技术的Bytom客户端，需注意:

1. 如果使用_MacOS_llvm_  运行命令:`brew install llvm`.
1. 如果使用_Windows_mingw-w64_PATH_环境变量.

```bash
$ make release
```

编译多种版本的Bytom客户端,  步骤包括：

1. 编译相应操作系统环境下的_32位_64位_ `bytomd`, `bytomcli` and `miner`
1. 进行md5校验同时压缩相应二进制文件至 `target/` 目录. _MacOS_系统需要预先安装md5校验工具,运行命令 `brew install md5sha1sum`.

```bash
$ make release-all
```

编译所有平台下的多种版本Bytom客户端，步骤包括：

1. 编译各操作系统环境下的_32位_64位_ `bytomd`, `bytomcli` and `miner`, 包括_Windows_Linux_MacOS_.

1. 进行md5校验同时压缩相应二进制文件至 `target/` 目录. _MacOS_系统需要预先安装md5校验工具, 运行命令`brew install md5sha1sum`.

<a name="d41d8cd9"></a>
### 
<a name="4c763bb6"></a>
### 运行

<a name="2cb472ff"></a>
#### 初始化

首先，初始节点:

```bash
$ cd ./cmd/bytomd
$ ./bytomd init --chain_id testnet
```

有两个选项 `--chain_id`:

* `testnet`: 连接到测试网络.
* `mainnet`: 连接到主网.
* `solonet`: 连接到单机网络<br />运行该指令后，你会发现 `.bytomd` 在当前文件夹生产,然后就可以启动节点了。

<a name="87cdb9e3"></a>
#### 启动节点

```bash
$ ./bytomd node --mining
```

下面是一些可用参数:

```
--auth.disable                Disable rpc access authenticate
      --mining                      Enable mining
      --p2p.dial_timeout int        Set dial timeout (default 3)
      --p2p.handshake_timeout int   Set handshake timeout (default 30)
      --p2p.laddr string            Node listen address.
      --p2p.max_num_peers int       Set max num peers (default 50)
      --p2p.pex                     Enable Peer-Exchange
      --p2p.seeds string            Comma delimited host:port seed nodes
      --p2p.skip_upnp               Skip UPNP configuration
      --prof_laddr string           Use http to profile bytomd programs
      --wallet.disable              Disable wallet
      --web.closed                  Lanch web browser or not
```

`bytomd` 节点运行后,你可以进行以下操作:

* 创建密钥,然后你可以创建账户和资产.
* 发送交易, 需要构建，签名和提交交易.
* 查询所有的信息, 比如可用的密钥，账户，余额和交易等等.

<a name="3fa8b34a"></a>
## 仪表盘

进入仪表盘打开：<http://localhost:9888/>


