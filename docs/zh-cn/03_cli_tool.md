# 命令行工具简介
`Bytom`提供`CLI`客户端(`bytomcli`), 它是进入`Bytom`网络的入口点,能够作为全节点运行. 

其他进程可使用`HTTP`、`WebSocket`或`IPC`等方式通过`JSON RPC`调用访问`Bytom`网络.

完整的`CLI`选项可使用`bytomcli --help`查看, 或参阅[bytomcli Wiki](https://github.com/Bytom/bytom/wiki/Command-Line-Options)页面.

# 具体的命令行选项
包含从账户、密钥、资产、token、交易、区块及其他等几个方面.

- 账户
  
| 选项 | 含义 | 参数 | 示例 |
| :------| :------ | :------ |:------ |
| create-account | 创建一个新账户 | `<alias> <xpub(s)> [flags]` |   | 
| list-accounts | 获取节点中所有账户 | `[flags]` | |
| delete-account | 删除指定账户 |  | 
| create-account-receiver | 给指定账户新建地址 | `<accountAlias> [accountID] [flags]` | |
| list-addresses | 获取账户下所有地址 | `[flags]` |  |
| validate-address | 检验地址是否合法 | `<address> [flags]` |  |
| list-pubkeys | 获取账户公钥 | `<accountInfo> [publicKey] [flags` |  |
| list-balances | 获取账户余额 | `[flags]` |  |
| list-unspent-outputs | 获取账户未花费输出 | `[flags]` |  |

- 密钥

| 选项 | 含义 | 参数 | 示例 |
| :------| :------ | :------ |:------ |
| create-key | 创建密钥 | `<alias> <password> [flags]` |   | 
| list-keys | 获取节点中的所有密钥 | `[flags]` |  |
| delete-key | 删除密钥 | `<xpub> <password> [flags]` |  |
| reset-key-password | 修改密钥密码 | `<xpub> <old-password> <new-password> [flags]` |  |
| check-key-password | 校验密钥密码 | `<xpub> <password> [flags]` |  |
| sign-message | 签名消息以产生签名 | `<address> <message> <password> [flags]` |  |
| verify-message | 特定消息校验签名 | `<address> <xpub> <message> <signature> [flags]` |  |

- 资产

| 选项 | 含义 | 参数 | 示例 |
| :------| :------ | :------ |:------ |
| create-asset | 创建一类资产 | `<alias> <xpub(s)> [flags]` |   | 
| get-asset | 通过资产id查询资产 | `<assetID> [flags]` |  |
| list-assets | 查询现存所有资产 | `[flags]` |  |
| update-asset-alias | 更改资产别名 | `<assetID> <newAlias> [flags]` |  |

- token

| 选项 | 含义 | 参数 | 示例 |
| :------| :------ | :------ |:------ |
| create-access-token | 创建新的资产token | `<tokenID> [flags]` |   | 
| list-access-tokens | 查询所有资产token | `[flags]` |  |
| delete-access-token | 删除一种资产token | `<tokenID> [flags]` |  |
| check-access-token | 校验资产token | `<tokenID> <secret> [flags]` |  |

- 交易

| 选项 | 含义 | 参数 | 示例 |
| :------| :------ | :------ |:------ |
| build-transaction | 构造一笔交易(默认使用账户及资产id) | `<accountID/alias> <assetID/alias> <amount>[outputID] [flags]` |   | 
| sign-transaction | 签名一笔交易 | `<json templates> [flags]` |  |
| submit-transaction | 广播已签名的交易 | `<json templates> [flags]` |  |
| create-transaction-feed| 创建交易费 | `<alias> <filter> [flags]` |   | 
| list-transaction-feeds| 查询所有交易费 | `[flags]` |   | 
| delete-transaction-feed| 删除交易费 | `<alias> [flags]` |   | 
| get-transaction-feed| 通过别名查询交易费 | `<alias> [flags]` |   | 
| update-transaction-feed| 更改交易费 | `<alias> <fiter> [flags]` |   | 

- 区块

| 选项 | 含义 | 参数 | 示例 |
| :------| :------ | :------ |:------ |
| get-block-hash | 查询最新区块哈希 | `[flags]` |   | 
| get-block-count | 查询最新去区块高度 | `[flags]` |  |
| get-block | 依据给定区块哈希或高度查询区块体 | `<hash> / <height> [flags]` |  |
| get-block-header | 依据给定区块哈希或高度查询区块头 | `<hash> / <height> [flags]` |  |
| get-difficulty | 获取最新区块难度值 | `[flags]` |  |
| get-hash-rate | 查询最新区块的哈希率 | `[flags]` |  |

- 其他

| 选项 | 含义 | 参数 | 示例 |
| :------| :------ | :------ |:------ |
| is-mining | 检查客户端是否开启挖矿 | `[flags]` |   | 
| set-mining | 设置是否开启挖矿模式 | `<true or false> [flags]` |  |
| net-info | 输出网络概要信息 | `[flags]` |  |
| decode-program | 将程序解码成指令集数据 | `<program> [flags]` |  |
| version | 获取命令行工具版本号 | `[flags]` |  |
| wallet-info | 输出钱包信息 | `[flags]` |  |
| rescan-wallet | 触发扫描区块信息至钱包 | `[flags]` |  |
 

