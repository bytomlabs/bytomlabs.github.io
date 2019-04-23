# 编译钱包

<a name="b6780d84"></a>
## 环境要求

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

<a name="40d37216"></a>
### 简易构建

```bash
$ cd $GOPATH/src/github.com/bytom
$ make bytomd    # build bytomd
$ make bytomcli  # build bytomcli
```

当构建完成后， `bytom` 和 `bytomcli` 二进制文件会存在于 `cmd/bytomd` 和 `cmd/bytomcli` 目录。

