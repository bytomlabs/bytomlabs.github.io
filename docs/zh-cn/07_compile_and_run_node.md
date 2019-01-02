## 编译运行比原全节点

### 构建可执行文件

#### 基础编译
切换到比原仓库的根目录.
```bash
$ cd $GOPATH/src/github.com/bytom
$ make bytomd    # build bytomd
$ make bytomcli  # build bytomcli
```
当你成功构建了项目，`bytom` 和 `bytomcli` 二进制文件将会在 `cmd/bytomd` 和 `cmd/bytomcli` 目录下.

#### 其他编译

`make bytomd-simd`:

1. 编译 simd 版 `bytomd`.

`make release`:

1. 编译当前操作系统对应的 `32-bit`, `64-bit` 的 `bytomd`, `bytomcli` 和 `miner`.
2. 进行 md5 校验并压缩打包放在 `target/` 目录下. Darwin 下需要安装 md5 工具： `brew install md5sha1sum`.

`make release-all`:

1. 编译 _Linux_, _Windows_ 和 _Darwin_ 对应的 `32-bit`, `64-bit` 的 `bytomd`, `bytomcli` 和 `miner`.
2. 进行 md5 校验并压缩打包放在 `target/` 目录下. Darwin 下需要安装 md5 工具： `brew install md5sha1sum`.

### 运行 `bytomd`

#### 初始化

首先，初始节点:

```bash
$ cd ./cmd/bytomd
$ ./bytomd init --chain_id testnet
```

有两个选项 `--chain_id`:

- `testnet`: 连接到测试网络.
- `mainnet`: 连接到主网.
- `solonet`: 连接到单机网络

运行该指令后，你会发现 `.bytomd` 在当前文件夹生产,然后就可以启动节点了。

#### 启动节点

``` bash
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

 `bytomd` 节点运行后,你可以进行以下操作:

- 创建密钥,然后你可以创建账户和资产.
- 发送交易, 需要构建，签名和提交交易.
- 查询所有的信息, 比如可用的密钥，账户，余额和交易等等.

#### 测试

测试library:

```
go test -v ./account 
```

推荐使用选项 `-v` (没有错误也会记录日志) 。

只测试一些方法:

```
go test -v ./account -run TestCreateAccount
```

**注意**: here all tests with prefix _TestMethod_ will be run, so if you got TestMethod, TestMethod1, then both!

**测试基准**:
切换到测试目录.
```bash
cd $GOPATH/src/github.com/bytom/test
go test -v -bench=. -benchtime=3s -run=none
```

使用 `-bench`选项去指定测试目录, 并且使用 `-benchtime` 来指定测试时间。

更多请参考 [go test flags](http://golang.org/cmd/go/#hdr-Description_of_testing_flags)