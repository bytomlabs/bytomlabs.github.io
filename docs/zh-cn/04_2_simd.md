# Simd

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

<a name="4c763bb6"></a>
## 运行

<a name="2cb472ff"></a>
### 初始化

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
### 启动节点

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

<a name="db06c78d"></a>
### 测试

测试library:

```
go test -v ./account
```

推荐使用选项 `-v` (没有错误也会记录日志) 。<br />只测试一些方法:

```
go test -v ./account -run TestCreateAccount
```

**注意**: here all tests with prefix _TestMethod_ will be run, so if you got TestMethod, TestMethod1, then both!<br />**测试基准**:<br />切换到测试目录.

```bash
cd $GOPATH/src/github.com/bytom/test
go test -v -bench=. -benchtime=3s -run=none
```

使用 `-bench`选项去指定测试目录, 并且使用 `-benchtime` 来指定测试时间。<br />更多请参考 [go test flags](http://golang.org/cmd/go/#hdr-Description_of_testing_flags)

