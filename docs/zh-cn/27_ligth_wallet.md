## SPV 轻钱包

SPV允许轻量级客户端在没有下载整个区块链的情况下，验证交易是否包含在Bytom区块链中。 SPV钱包只需要下载区块头，相比下载整个区块信息来说要小的多。为了验证一笔交易是否在区块中，SPV钱包需要以Merkle树形式请求包含证明
。

使用SPV钱包请点击 [https://github.com/Bytom/bytom-spv/releases](https://github.com/Bytom/bytom-spv/releases). 
与全节点钱包的使用方法相同

### 初始 

```
./bytom-spv-wallet init --chain_id testnet -r ~/.bytom_spv
```

### 运行

```
$ ./bytom-spv-wallet node -r ~/.bytom_spv
```

### Dashboard
进入dashboard:
```
$ 打开 http://localhost:9888/
```

---
