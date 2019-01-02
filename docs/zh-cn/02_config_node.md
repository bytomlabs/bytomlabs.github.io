## 配置节点

## 可执行文件

Bytom项目在 `cmd` 目录下有以下执行文件:

| 命令         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| **bytomd**   | bytomd为节点运行主程序，可以帮助用户通过配置个性化参数来初始化和启动Bytom节点，运行`bytomd --help`查看命令行选项。 |
| **bytomcli** | Bytom 命令行客户端. 它是Bytom全节点网络的入口，包括主网，测试网或者私有网络。其常被用于其他程序的网关，通过基于HTTP协议的 JSON RPC , WebSocket 或者 IPC通信来访问Bytom网络。 `bytomcli --help` 可以查看客户端使用方法，也可访问 [bytomcli Wiki page](https://github.com/Bytom/bytom/wiki/Command-Line-Options) 查看各命令使用指南。 |



## 运行Bytom

目前，Bytom仍在活跃的开发状态，`bytomd` 和 `bytomcli`命令的使用方法，可能因为项目不断进展中更新不完整，如果需要活的更多信息，请使用每个命令的help功能，例如 `bytomcli help`。

### 初始化

首先初始化节点:

```bash
$ cd ./cmd/bytomd
$ ./bytomd init --chain_id mainnet
```

通过选择不同标志来确定运行的网络 `--chain_id`:

- `mainnet`: 连接入主网.
- `testnet`: 连接入测试网wisdom.
- `solonet`: 进入单机私有网络. 

运行后，可以看到生成配置文件`config.toml`，接着启动节点。



### 启动节点

```bash
$ ./bytomd node
```

可用的参数通过`bytomd node --help`展示:

```bash
      --auth.disable                Disable rpc access authenticate
      --chain_id string             选择网络类型
  -h, --help                        帮助
      --mining                      开启挖矿
      --p2p.dial_timeout int        选择超时时长(default 3)
      --p2p.handshake_timeout int   选择握手的时长 (default 30)
      --p2p.laddr string            节点监听地址
      --p2p.max_num_peers int       选择最大连接节点数 (default 50)
      --p2p.pex                     允许节点交换  (default true)
      --p2p.seeds string            设置种子节点，格式为host:port，通过逗号分隔
      --p2p.skip_upnp               省略 UPNP 配置
      --prof_laddr string           使用HTTP来调试Bytom程序
      --vault_mode                  运行在离线环境
      --wallet.disable              关闭钱包功能
      --wallet.rescan               重新扫描钱包数据
      --web.closed                  开启或关闭Dashboard功能
```

假定 `bytomd`节点已经运行, 常规的工作流程步骤如下:

- 创建密钥且设置密码，接着使用Key创建账户或资产。

- 创建交易，签名交易，将签名完的交易广播到网络中。

- 通过客户端查看节点各类信息，比如可用的密钥，账户，交易详情和余额信息等。



## 在Docker中运行

在操作之前，请自行安装docker。然后在你的终端输入：

```bash   
docker
```
   
出现如下图说明你已经安装成功了docker：

![avatar](https://raw.githubusercontent.com/huangxinglong/picture/master/201812/1203/1.png)



### 获取镜像

```bash
docker pull bytom/bytom:latest
```
用docker images 查看自己下载的bytom镜像  
 
```bash    
docker images
```
    
然后出现如下图说明已经获取到了镜像：

![avatar](https://raw.githubusercontent.com/huangxinglong/picture/master/201812/1203/4.png)

### 初始化bytom

```bash
docker run -v <Bytom/data/directory/on/host/machine>:/root/.bytom bytom:latest bytomd init --chain_id <chainId>
```

默认的Bytom数据目录:

- MacOS: `~/Library/Application Support/Bytom`
- Linux: `~/.bytom`
- Windows: `%APPDATA%\Bytom`

### 进入命令行

```bash
docker run -it -p 9888:9888 -v <Bytom/data/directory/on/host/machine>:/root/.bytom bytom:latest
```

然后你可以使用 bytomd 和 bytomcli

使用 `exit` 来退出命令行模式

### 守护进程模式

例如：

```bash
docker run -d -p 9888:9888 -v <Bytom/data/directory/on/host/machine>:/root/.bytom bytom:latest bytomd node --web.closed --auth.disable
```

**列出正在运行的容器，检查他们的状态：**

```bash
docker container ls
```

或者:

```bash
docker ps
```

下图中我们可以看到我们在运行的容器：
 
 ![avatar](https://github.com/huangxinglong/picture/raw/master/201812/1203/2.png)
  
    
在浏览器中请求：<http://0.0.0.0:9888>，可以就可以看到我们的全节点钱包。
 
 ![avatar](https://raw.githubusercontent.com/huangxinglong/picture/master/201812/1203/3.png)

在容器中执行命令，例如:

```bash
docker exec -it <containerId> bytomcli create-access-token <tokenId>
```

**停止容器:**

```bash
docker stop <containerId>
```

**移除容器:**

```bash
docker rm <containerId>
```

 


