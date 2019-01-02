比原链网络主要有以下几种网络类型，分别有不同的用途：

- mainnet主网：流通的币种是具有真实价值的btm。
- testnet测试网：开发者进行交易或者智能合约的测试网络。
- solonet测试网：单节点网络，不与其它节点相连，相当于私链。
- 国密测试网：使用国密加密算法的网络。

本文将主要介绍编译并启动各个网络的方法，并比较几种网络的异同。

## 1 编译并启动网络

进入比原链源码目录，并编译：

```
$ cd $GOPATH/src/github.com/bytom
$ make bytomd
```

初始化网络：

```
$ cd cmd/bytomd
$ ./bytomd init --chain_id <net-type> --home <config_and_data_path>
```

`--chain_id`指定的是启动的网络类型，有三种网络类型可选：

- mainnet：主网
- testnet：wisdom测试网
- solonet：单节点测试网

如果不指定网络类型，则默认启动solonet。

`--home`指定的是配置和数据文件存储的路径，如果不指定存储路径，则不同平台的默认路径为：

- MacOS(darwin): ~/Library/Application Support/Bytom
- Windows(windows): ~/AppData/Roaming/Bytom
- Others(eg.Linux): ~/.bytom

以启动solonet为例，将配置和数据文件存储目录指定为`$HOME/bytom/solonet`：

```
$ ./bytomd init --chain_id solonet --home $HOME/bytom/solonet
```

则在`$HOME/bytom/solonet`文件夹下会出现相应的配置文件`config.toml`：

```
$ cat $HOME/bytom/solonet/config.toml
# This is a TOML config file.
# For more information, see https://github.com/toml-lang/toml
fast_sync = true
db_backend = "leveldb"
api_addr = "0.0.0.0:9888"
chain_id = "solonet"
[p2p]
laddr = "tcp://0.0.0.0:46658"
seeds = ""
```

初始化网络之后，启动网络：

```
$ ./bytomd node --mining --home <config_and_data_path>
```

`--mining`选项指定启动节点时开启挖矿。如果前期初始化的过程中指定的网络类型是mainnet或者testnet，则无需开启挖矿。如果指定的是solonet，则强烈建议开启挖矿，否则后面进行交易测试的时候将无法打包入块。

以启动solonet节点为例：

```
$ ./bytomd node --mining --home $HOME/bytom/solonet
```

## 2 mainnet主网

比原链主网。

## 3 wisdom测试网

比原链的testnet测试网的名字是wisdom，拥有与其它节点进行通信的能力。开发者进行智能合约开发的时候需要在wisdom测试网上先行部署测试，之后才正式发布到主网上。wisdom测试网的功能与主网功能一致，开发者在wisdom测试网上得到的调试结果也将与主网运行结果相同。

开发者获取wisdom测试币的方式有以下几种：

- 启动节点的时候开启`--mining`选项，目前wisdom测试网的算力大约1~2KHash/s。则普通开发者使用个人电脑将很难挖到测试币，除非使用专业比原矿机。
- 联系比原链技术运营获取测试币。
- 可以从<http://btmdemo.ppkpub.org/joy/faucet.php>网站上获取测试币。

## 4 solonet测试网

solonet测试网络本质上是单节点网络，不与临近节点进行连接，并且其初始难度值相较于主网和wisdom测试网也低得多。目前solonet的初始出块速度大约为10秒钟内，可以保证开发者能够较快捷的得到网络运行结果。开发者可以首先开启solonet进行单节点挖矿，测试自己的智能合约，之后转到和主网环境相同的wisdom测试网进行正式测试，最后才在比原主网上部署实际智能合约。

因为solonet测试网是单节点网络，因此本节点作为唯一矿工可以获取所有的挖矿收益。

## 5 几种网络区别

各个网络地址前缀：

网络     | 地址前缀
--------|----------
mainnet | bm
testnet | tm
solonet | sm
