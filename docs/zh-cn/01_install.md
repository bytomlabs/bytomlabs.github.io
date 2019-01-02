# 二进制安装

全节点（Full Nodes）是存储 Bytom 区块链全部数据的应用程序，通过P2P网络互联，实现了Bytom协议的所有功能。Bytom 全节点客户端最新版本为1.0.4, 可通过Web(Dashboard)和桌面应用(Electron)访问， 并适用于常用操作系统平台。下面是全节点钱包各个系统的版本，可以根据自己的系统对应下载。

*Windows*平台:

| 体系结构 | Web                                                          | Desktop                                                      |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 32bit    | [**bytom-1.0.4-windows_386.zip**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-1.0.4-windows_386.zip) | [**bytom-wallet-desktop-1.0.4-win-ia32.zip**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-wallet-desktop-1.0.4-win-ia32.zip) |
| 64bit    | [**bytom-1.0.4-windows_amd64.zip**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-1.0.4-windows_amd64.zip) | [**bytom-wallet-desktop-1.0.4-win-x64.zip**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-wallet-desktop-1.0.4-win-x64.zip) |

*Linux*平台:  (推荐Ubuntu 16.04）

| 体系结构 | Web                                                          | Desktop                                                      |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 32bit    | [**bytom-1.0.4-linux_386.tgz**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-1.0.4-linux_386.tgz) | [**bytom-wallet-desktop-1.0.4-linux-ia32.zip**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-wallet-desktop-1.0.4-linux-ia32.zip) |
| 64bit    | [**bytom-1.0.4-linux_amd64.tgz**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-1.0.4-linux_amd64.tgz) | [**bytom-wallet-desktop-1.0.4-linux-x64.zip**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-wallet-desktop-1.0.4-linux-x64.zip) |

*MacOS*平台: (推荐MacOS )

| 体系结构 | Web                                                          | Desktop                                                      |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 32bit    | [**bytom-1.0.4-darwin_386.tgz**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-1.0.4-darwin_386.tgz) | [**bytom-wallet-desktop-1.0.4-mac.zip**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-wallet-desktop-1.0.4-mac.zip) |
| 64bit    | [**bytom-1.0.4-darwin_amd64.tgz**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-1.0.4-darwin_amd64.tgz) | [**bytom-wallet-desktop-1.0.4-mac.zip**](https://github.com/Bytom/bytom/releases/download/v1.0.4/bytom-wallet-desktop-1.0.4-mac.zip) |



# 源码安装

#### 环境要求

- [Go](https://golang.org/doc/install) 版本1.8或者更高, 设置 `$GOPATH`

```bash
$ go version #查看golang版本是否符合要求
$ go env GOROOT GOPATH #获取环境变量
```

#### 从Github下载Bytom源代码

```bash
$ git clone https://github.com/Bytom/bytom.git $GOPATH/src/github.com/bytom
```

#### Makefile构建

```bash
$ make bytom-simd
```

编译支持Intel [SIMD](https://en.wikipedia.org/wiki/Streaming_SIMD_Extensionsl) 技术的Bytom客户端，需注意:

1. 如果使用*MacOS*系统,  需提前安装 *llvm*  运行命令:`brew install llvm`.
2. 如果使用*Windows*系统,  需提前安装 *mingw-w64*并设置相应的*PATH*环境变量.

```bash
$ make release
```
编译多种版本的Bytom客户端,  步骤包括：

1. 编译相应操作系统环境下的*32位* 和 *64位* `bytomd`, `bytomcli` and `miner` 

2. 进行md5校验同时压缩相应二进制文件至 `target/` 目录. *MacOS*系统需要预先安装md5校验工具,运行命令 `brew install md5sha1sum`.

```bash
$ make release-all
```

编译所有平台下的多种版本Bytom客户端，步骤包括：

1. 编译各操作系统环境下的*32位* 和 *64位* `bytomd`, `bytomcli` and `miner`, 包括*Windows*, *Linux*, *MacOS*. 
2. 进行md5校验同时压缩相应二进制文件至 `target/` 目录. *MacOS*系统需要预先安装md5校验工具, 运行命令`brew install md5sha1sum`.

#### 简易构建

```bash
$ cd $GOPATH/src/github.com/bytom
$ make bytomd    # build bytomd
$ make bytomcli  # build bytomcli
```

当构建完成后， `bytom` 和 `bytomcli` 二进制文件会存在于 `cmd/bytomd` 和 `cmd/bytomcli` 目录。

