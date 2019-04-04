---
title: 侧链部署
keywords: 比原侧链,部署流程
description: 比原侧链部署使用流程
---

# Vapor 侧链solonet部署说明

## 启动 vapor

consensus.json内容如下:

```json
    {
        "consensus":{
            "consensus_type": "dpos" ,
            "period": 3,
            "max_signers_count": 7,
            "min_boter_balance": 1000000000,
            "genesis_timestamp": 1524549600,
            "coinbase": "vsm1qkm743xmgnvh84pmjchq2s4tnfpgu9ae2f9slep",
            "xprv": "a8e281b615809046698fb0b0f2804a36d824d48fa443350f10f1b80649d39e5f1e85cf9855548915e36137345910606cbc8e7dd8497c831dce899ee6ac112445",
            "signers": [
                "vsm1qkm743xmgnvh84pmjchq2s4tnfpgu9ae2f9slep"
            ]
        }
    }
```

```shell
./vapor init --chain_id solonet -r "side_chain"
./vapor node -r "side_chain" --consensus_config_file consensus.json
```

## 获取公私钥

```shell
curl -s -X POST -d '{}' http://127.0.0.1:8888/create-key-pair  > key_pair

注: 公私钥用来生成主链上锁定资产以及解锁资产的合约地址
```

## 停止vapor并删除数据目录

```shell
rm -rf side_chain
```



## 启动 bytomd、vapor

- bytomd
```shell
./bytomd init --chain_id solonet -r "main_chain"
./bytomd node -r "main_chain"
```

- vapor
  fedpeg_xpubs、sign_block_xpubs、signer为上面获取的公私钥
```shell
xprv=$(cat key_pair | jq ".data.xprv" | sed "s/\"//g")
xpub=$(cat key_pair | jq ".data.xpub" | sed "s/\"//g")

./vapor init --chain_id solonet -r "side_chain"

./vapor node -r "side_chain" --auth.disable --side.fedpeg_xpubs $xpub  --consensus_config_file consensus.json --validate_pegin true --side.parent_genesis_block_hash "a97a7a59e0e313f9300a2d7296336303889930bfdf5a80d8a9b05db343c03380"
```

## 启动侧链工具

体验的主链与侧链交互的工具的使用如下：

拷贝上面生成key_pair文件到目录tools/side_chain_tool/

* [参考侧链工具README](../../../../tools/side_chain_tool/README.md)

## Bytom----->Vapor

- 工具页面输入侧链账户ID，获取mainchain_address(主链锁定地址)、claim_script(赎回脚本)

  ![pegin-address](png/pegin-address.png)

- 在主链的dashboard，发送btm到mainchain_address 或者启动monitor_tx自动处理claim tx

- 工具页面赎回交易填入参数，发送交易

  ![tosidechain](png/tosidechain.png)

Vapor----->Bytom

- 在主链的dashboard，新建一个主链地址，并备份

- 在侧链的dashboard，导入主链的备份，找到与主链新建地址相同的ctrlProgram的地址，并发送交易到这个地址

- 在侧链的dashboard上retire上面地址的资产

- 工具网页的侧链发送回主链的页面填入参数，发送交易

  ![tomain](png/tomain.png)



## 注册出块候选人

```shell
`curl -s -X POST -d '{"base_transaction":null,"actions":[{"address":"vsm1qndq3w79kwtk9acnuswxlwxjqweglwhg8yrzp2c","amount":100000000, "asset_id":"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","name":"test-node1","dpos_type":1,"type":"dpos"}],"ttl":0,"time_range":43432}' http://127.0.0.1:8888/build-transaction`
```



## 用户投票给候选人

```shell
`curl -s -X POST -d '{"base_transaction":null,"actions":[{"address":"vsm1qkm743xmgnvh84pmjchq2s4tnfpgu9ae2f9slep","amount":100000000, "asset_id":"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","forgers":["vsm1qndq3w79kwtk9acnuswxlwxjqweglwhg8yrzp2c", "vsm1q93jcjhwe62n5mdtym6m7utle95erd6s3jsn4tn","vsm1qtu926tcsky876hflm93getsv27w7pccv4jg2fs"],"dpos_type":2,"type":"dpos"}],"ttl":0,"time_range":43432}' http://127.0.0.1:8888/build-transaction`
```



## 用户取消投票

```shell
`curl -s -X POST -d '{"base_transaction":null,"actions":[{"address":"vsm1qkm743xmgnvh84pmjchq2s4tnfpgu9ae2f9slep","amount":100000000, "asset_id":"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","forgers":["vsm1qndq3w79kwtk9acnuswxlwxjqweglwhg8yrzp2c", "vsm1q93jcjhwe62n5mdtym6m7utle95erd6s3jsn4tn","vsm1qtu926tcsky876hflm93getsv27w7pccv4jg2fs"],"dpos_type":3,"type":"dpos"}],"ttl":0,"time_range":43432}' http://127.0.0.1:8888/build-transaction`
```

# claim交易

​	主链是通过矿工挖矿产生资产，vapor侧链是通过claim交易产生资产，因此侧链上资产的源头都是claim交易。

​	claim交易是资产从主链转移到侧链产生的交易，即在主链上锁定交易，在侧链上用claim交易生成侧链上的资产。

# 主链与侧链资产的转移逻辑

### 侧链充值流程

​	vapor侧链中验证人、收集人、联邦三个角色：

​		验证人：侧链的出块人，任何人都可以成为验证人。

​		收集人：监控主链锁定在联邦合约地址的交易，收集交易并生成claim交易，发送到节点验证人进行验证入交易池。

​		联邦   ： 侧链充值是指资产从主链转移到侧链的过程，转移过程，是需要资产先锁定到联邦合约地址。

​	![main2side](png/main2side.png)



​	联邦合约地址生成：

​	1、联邦合约地址需要7个联邦成员公钥生成，系统开始启动由初始出块人担任。

​	2、运行一段时间后vapor侧链上用户可以注册为联邦成员候选人，由vapor侧链用户投票，从注册候选人中选出联邦成员，每次联邦成员变动不能超	      过联盟成员的1/3

​	3、选出联邦成员后，由新的联邦成员生成新的合约地址，以前的联邦合约地址转账到新的联邦合约地址。

​	4、转账完成后，主链锁定资产到新的联邦地址，以后可以再竞选联邦成员。

​	

​	收集人：

​	1、系统启动之时，由初始出块人担任。

​	2、运行一段时间后，vapor侧链上用户可以注册成为候选人收集人，由vapor侧链用户投票，从注册的候选人中选出收集人(dpos出块一轮筛选一次)

​	3、下发新的监控主链的联邦合约地址的收集人，收集交易，并附带收集人列表、收集人签名、原始交易、收集人公钥的claim交易到节点



​	注：成为验证人、收集人、联邦在侧链都需要质押一定数量的btm

### 侧链提现流程

​	1、vapor侧链用户发起提现请求，销毁vapor侧链的资产

​	2、联邦合约地址针对请求向vapor侧链用户的主链地址发送对应对应数量的资产(前提交易已经在侧链上达到不会回滚的确认数)

​	3、联邦在侧链上生成一笔完成提现的操作的交易



# claim交易

1、claim交易输入

- 增加ClaimInput的输入类型，也是vapor侧链上资产产生源头，主要用于处理资产从主链到侧链的转移。

- TxInput结构作用增加字段Peginwitness

  ​	Peginwitness保存了主链的源交易信息，用于其他节点收到交易时做验证。

  ​	内容如下(字段序列化后依次放入Peginwitness):

  ​	amount + ParentGenesisBlockHash + claimScript + rawTx + merkleBlock

- 生成claim交易输入，并根据主链交易、proof生成Peginwitness

2、签名交易

​	签名交易是对claim交易的签名。

3、提交交易

​	提交交易是要进入交易池，以及广播交易给其他节点。

​	在入交易池前以及处理block过程的交易验证的时候，claim交易验证是对输入中的claim输入与Peginwitness的信息匹配做验证(验证主链交易信息，以及生成的claim输入有没恶意行为)，类似工作量证明。

