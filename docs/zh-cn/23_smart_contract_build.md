## 合约交易构造流程

### 合约参数构造
合约参数主要包括两个方面，一个是编译合约`contract`中的参数，另一个是解锁合约`clause`中的参数。其中参数的相关注意事项如下：
  - 调用编译合约API接口`compile`不加参数是直接编译合约，按照`contract`中的参数列表顺序加上参数是将合约实例化
  - 构造解锁合约交易需要添加`clause`中的参数列表
  - `Signature`参数类型只能在`clause`的参数列表中出现，不允许出现在`contract`的参数列表中
  - 如果合约包含多个`clause`，那么用户只需选择任意一个`clause`来解锁就可以了。在构造解锁合约的交易过程中，需要添加额外的参数`clause_selector`（无符号整数类型，小端存储格式），`clause_selector`是根据合约`clause`的顺序来指定的，假如`clause`的个数`n`，那么选择对应的`clause_selector`为`0 ~ n-1`，即第一个`clause`的`clause_selector`为`0`，第二个`clause`的`clause_selector`为`1`，以此类推。

如果合约的`clause`参数列表中包含`Signature`，那么在构造解锁合约交易的时候需要通过签名的必要条件`root_xpub`和`derivation_path`来间接获得，因为签名必须通过调用`sign-transaction`API接口才能得到。参数`root_xpub`和`derivation_path`是通过调用`list-pubkeys`接口获取的，此外`Signature`一般需要跟`PublicKey`配套使用，即参数`root_xpub`和`derivation_path`需要跟公钥`pubkey`一一对应，否则合约会执行失败。

其中[API接口`list-pubkeys`](https://github.com/Bytom/bytom/wiki/API-Reference#list-pubkeys)的参数如下：
- `String` - *account_id*, 账户ID.
- `String` - *account_alias*, 账户别名.
- `String` - *public_key*, 根据指定pubkey来查询.

其请求和响应的json格式如下：
```js
// Request
{
  "account_id": "0G1JIR6400A02"
}

// Result
{
  "pubkey_infos": [
    {
      "derivation_path": [
        "010100000000000000",
        "0300000000000000"
      ],
      "pubkey": "c37d5531f393bc6a3568628c0c0e17801ea452e75d604deb01403c4b161659a3"
    },
    {
      "derivation_path": [
        "010100000000000000",
        "0200000000000000"
      ],
      "pubkey": "117d12e84bb19e956451e0b1eb2bffc662ecb7aac7e63d77e524ddd467eb3617"
    },
    {
      "derivation_path": [
        "010100000000000000",
        "0100000000000000"
      ],
      "pubkey": "e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78"
    }
  ],
  "root_xpub": "5c6145b241b1147987565719657a0506ebb417a2e110a235a42cfb40951880f447432f930ce9fd1a6b7e51b3ddbfdc7adb57d33448f93c0defb4de630703a144"
}
```

----

### 编译合约
编译合约是将合约编译成可执行的虚拟机指令流程。如果合约有参数列表`contract parameters`的话，在锁定合约之前需要对这些合约参数进行实例化，因为这些参数是解锁合约的限制条件。

编译合约目前支持两种方式，一种是使用`equity`编译工具，另一种是调用编译合约的API接口`compile`。其中通过[`equity`编译工具](https://github.com/Bytom/equity)的方式如下：
```
./equity <contract_file> [flags]
```

其中`flag`标志如下：
```
    --bin        Binary of the contracts in hex.
    --instance   Object of the Instantiated contracts.
    --shift      Function shift of the contracts.
```

以`LockWithPublicKey`为例，编译并实例化合约如下：
```
./equity LockWithPublicKey --instance e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78
```

返回结果如下：
```
======= LockWithPublicKey =======
Instantiated program:
20e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e787403ae7cac00c0
```

另一种是通过调用编译合约[API接口`compile`](https://github.com/Bytom/bytom/wiki/API-Reference#compile)的方式，其接口参数如下：
- `String` - *contract*, 合约内容.
- `Array of Object` - *args*, 合约参数结构体（数组类型）.
  - `Boolean` - *boolean*, 布尔类型的合约参数，对应的基本类型是`Boolean`.
  - `Integer` - *integer*, 整数类型的合约参数，对应的基本类型包括：`Integer`、`Amount`.
  - `String` - *string*, 字符串类型的合约参数，对应的基本类型包括：`String`、`Asset`、`Hash`、`Program`、`PublicKey`.

以`LockWithPublicKey`为例，其请求和响应的json格式如下：
```js
// Request
{
  "contract": "contract LockWithPublicKey(publicKey: PublicKey) locks valueAmount of valueAsset { clause unlockWithSig(sig: Signature) { verify checkTxSig(publicKey, sig) unlock valueAmount of valueAsset }}",
  "args": [
    {
      "string": "e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78"
    }
  ]
}

// Result
{
  "name": "LockWithPublicKey",
  "source": "contract LockWithPublicKey(publicKey: PublicKey) locks valueAmount of valueAsset { clause unlockWithSig(sig: Signature) { verify checkTxSig(publicKey, sig) unlock valueAmount of valueAsset }}",
  "program": "20e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e787403ae7cac00c0",
  "params": [
    {
      "name": "publicKey",
      "type": "PublicKey"
    }
  ],
  "value": "locked",
  "clause_info": [
    {
      "name": "unlockWithSig",
      "args": [
        {
          "name": "sig",
          "type": "Signature"
        }
      ],
      "value_info": [
        {
          "name": "locked"
        }
      ],
      "block_heights": [],
      "hash_calls": null
    }
  ],
  "opcodes": "0xe9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78 DEPTH 0xae7cac FALSE CHECKPREDICATE",
  "error": ""
}
```

----

### 锁定合约
`lock`锁定合约，即部署合约，其本质是调用`build-transaction`接口将资产发送到合约特定的`program`，只需将接收方`control_program`设置为指定合约即可，构造锁定合约交易的模板如下：（注意：合约交易暂时不支持接收方资产为BTM资产的交易）
```js
// Request
{
  "base_transaction": null,
  "actions": [
    {
      "account_id": "0G1JIR6400A02",
      "amount": 20000000,
      "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      "type": "spend_account"
    },
    {
      "account_id": "0G1JIR6400A02",
      "amount": 900000000,
      "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
      "type": "spend_account"
    },
    {
      "amount": 900000000,
      "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
      "control_program": "20e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e787403ae7cac00c0",
      "type": "control_program"
    }
  ],
  "ttl": 0,
  "time_range": 1521625823
}

// Result
{
  "raw_transaction": "0701dfd5c8d505020161015f150ec246dc739a8c4c3f7b4083ededcb2854ca221e437a49f23ec84c7c47ea80ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8099c4d599010001160014726e902e30525e01f0157f12be476c904060383b01000160015ed53c1f3388681f62ae778ac8a54c2b091bbdc91d68ec1e94b20aa2183484f8331e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c2280c8afa02501011600145de3c504b41019d11698d572b1a37d9a4c9118c1010003013effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80bfffcb990101160014310c2265e8e3b7057a62caf09a9f907763f369ea00013d1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c2280f69bf32101160014d0d18752a276c94b25f920b02a8edff251b16b7600014f1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c2280d293ad03012820e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e787403ae7cac00c000",
  "signing_instructions": [
    {
      "position": 0,
      "witness_components": [
        {
          "type": "raw_tx_signature",
          "quorum": 1,
          "keys": [
            {
              "xpub": "5c6145b241b1147987565719657a0506ebb417a2e110a235a42cfb40951880f447432f930ce9fd1a6b7e51b3ddbfdc7adb57d33448f93c0defb4de630703a144",
              "derivation_path": [
                "010100000000000000",
                "0100000000000000"
              ]
            }
          ],
          "signatures": null
        },
        {
          "type": "data",
          "value": "e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78"
        }
      ]
    },
    {
      "position": 1,
      "witness_components": [
        {
          "type": "raw_tx_signature",
          "quorum": 1,
          "keys": [
            {
              "xpub": "5c6145b241b1147987565719657a0506ebb417a2e110a235a42cfb40951880f447432f930ce9fd1a6b7e51b3ddbfdc7adb57d33448f93c0defb4de630703a144",
              "derivation_path": [
                "010100000000000000",
                "0700000000000000"
              ]
            }
          ],
          "signatures": null
        },
        {
          "type": "data",
          "value": "54df681ac3174a11d4456265641a204e04f64b8f860f37bf5584cf4187f54e99"
        }
      ]
    }
  ],
  "allow_additional_actions": false
}
```

构建交易成功之后，便可以对交易进行签名`sign-transaction`，返回结果中`sign_complete`为`true`表示签名成功，将签名的交易通过`submit-transaction`提交到交易池中，等待交易被打包上链

----

### 查找合约UTXO
部署合约交易发送成功之后，接下来便需要对合约锁定的资产进行解锁，解锁合约之前需要找到合约的UTXO。

可以通过调用[API接口`list-unspent-outputs`](https://github.com/Bytom/bytom/wiki/API-Reference#list-unspent-outputs)来查找，在查合约UTXO的情况下必须将`smart_contract`设置为`true`，否则会查不到，其参数如下：
- `String` - *id*, UTXO对应的`outputID`，可以根据发布合约交易的输出`output`中的找到.
- `Boolean` - *smart_contract*, 是否展示合约的UTXO，默认不显示.

对应的输入输出结果如下：
```js
// Request
curl -X POST list-unspent-outputs -d '{"id": "413d941faf5a19501ab4c06747fe1eb38c5ae76b74d0f5af524fc40ee6bf7116", "smart_contract": true}'

// Result
{
  "account_alias": "",
  "account_id": "",
  "address": "",
  "amount": 900000000,
  "asset_alias": "GOLD",
  "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
  "change": false,
  "control_program_index": 0,
  "id": "413d941faf5a19501ab4c06747fe1eb38c5ae76b74d0f5af524fc40ee6bf7116",
  "program": "20e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e787403ae7cac00c0",
  "source_id": "c9680e6dd5e9ae7f825fe7edab9fa35c119eb7feab0ab4e426c84a579daf4ef9",
  "source_pos": 2,
  "valid_height": 0
}
```
找到对应的合约UTXO之后，可以通过[API接口`decode-program`](https://github.com/Bytom/bytom/wiki/API-Reference#decode-program)解析合约的参数信息，用户可以根据已有的参数信息判断该合约能否解锁

----

### 解锁合约
`unlock`解锁合约，即调用合约，其本质是通过给交易添加相应的合约参数以便合约程序`program`在虚拟机中执行成功，目前合约相关的参数都可以通过`build-transaction`中的`Action`结构`spend_account_unspent_output`中的数组参数`arguments`进行添加，其中参数如下：

1） `RawTxSigArgument` 签名相关的参数，`type`类型为`raw_tx_signature`，主要包含主公钥`xpub`和其对应的派生路径`derivation_path`，而待验证的`publickey`是通过该主公钥和派生路径生成的子公钥生成的（这些参数可以通过API接口`list-pubkeys`获取）
  - `xpub` 主公钥
  - `derivation_path` 派生路径
  
参数格式如下：
```js
{
  "type": "raw_tx_signature",
  "raw_data": {
    "xpub": "5c6145b241b1147987565719657a0506ebb417a2e110a235a42cfb40951880f447432f930ce9fd1a6b7e51b3ddbfdc7adb57d33448f93c0defb4de630703a144",
    "derivation_path": [
      "010100000000000000",
      "0100000000000000"
    ]
  }
}
```

2） `DataArgument` 数据类型参数，`type`类型为`data`，该类型可以兼容除了`rawTxSigArgument`以外的所有合约参数类型，其值是16进制的字符串，需要注意的是`integer`整数类型是小端存储格式。参数格式如下：（以`publickey`为例）
```js
{
  "type": "data",
  "raw_data": {
    "value": "b3f37834dfa74174e9f0d208302e77c637cfe66c3e37fe1e1574e416b3516e89"
  }
}
```

3）`BoolArgument` 布尔类型参数，`type`类型为`boolean`，该类型取值为`true`或`false`。参数格式如下：
```js
{
  "type": "boolean",
  "raw_data": {
    "value": true
  }
}
```

4）`IntegerArgument` 整型类型参数，`type`类型为`integer`。参数格式如下：
```js
{
  "type": "integer",
  "raw_data": {
    "value": 10000
  }
}
```

5）`StrArgument` 字符串类型参数，`type`类型为`string`。参数格式如下：
```js
{
  "type": "string",
  "raw_data": {
    "value": "this is a test string"
  }
}
```

以合约`LockWithPublicKey`为例，其解锁合约交易的模板如下：
```js
// Request
{
  "base_transaction": null,
  "actions": [
    {
      "type": "spend_account_unspent_output",
      "output_id": "413d941faf5a19501ab4c06747fe1eb38c5ae76b74d0f5af524fc40ee6bf7116",
      "arguments": [
        {
          "type": "raw_tx_signature",
          "raw_data": {
            "xpub": "5c6145b241b1147987565719657a0506ebb417a2e110a235a42cfb40951880f447432f930ce9fd1a6b7e51b3ddbfdc7adb57d33448f93c0defb4de630703a144",
            "derivation_path": [
              "010100000000000000",
              "0100000000000000"
            ]
          }
        }
      ]
    },
    {
      "type": "control_program",
      "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
      "amount": 900000000,
      "control_program": "0014726e902e30525e01f0157f12be476c904060383b"
    },
    {
      "type": "spend_account",
      "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      "amount": 5000000,
      "account_id": "0G1JIR6400A02"
    }
  ],
  "ttl": 0,
  "time_range": 1521625823
}

// Result
{
  "raw_transaction": "0701dfd5c8d5050201720170c9680e6dd5e9ae7f825fe7edab9fa35c119eb7feab0ab4e426c84a579daf4ef91e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c2280d293ad0302012820e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e787403ae7cac00c001000160015e8412e8e8c359683f1f5f3a7308b084022f1f149dab176e6e6e8daada895d0e29ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0c6c6944f00011600141313e974d19f3d37db29a212d75b4c763e42f433010002013d1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c2280d293ad0301160014726e902e30525e01f0157f12be476c904060383b00013dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa0b095924f011600147076c737d92621e0033899a54d02fa79f362922700",
  "signing_instructions": [
    {
      "position": 0,
      "witness_components": [
        {
          "type": "raw_tx_signature",
          "quorum": 1,
          "keys": [
            {
              "xpub": "5c6145b241b1147987565719657a0506ebb417a2e110a235a42cfb40951880f447432f930ce9fd1a6b7e51b3ddbfdc7adb57d33448f93c0defb4de630703a144",
              "derivation_path": [
                "010100000000000000",
                "0100000000000000"
              ]
            }
          ],
          "signatures": null
        }
      ]
    },
    {
      "position": 1,
      "witness_components": [
        {
          "type": "raw_tx_signature",
          "quorum": 1,
          "keys": [
            {
              "xpub": "5c6145b241b1147987565719657a0506ebb417a2e110a235a42cfb40951880f447432f930ce9fd1a6b7e51b3ddbfdc7adb57d33448f93c0defb4de630703a144",
              "derivation_path": [
                "010100000000000000",
                "0300000000000000"
              ]
            }
          ],
          "signatures": null
        },
        {
          "type": "data",
          "value": "c37d5531f393bc6a3568628c0c0e17801ea452e75d604deb01403c4b161659a3"
        }
      ]
    }
  ],
  "allow_additional_actions": false
}
```

构建交易成功之后，便可以对交易进行签名`sign-transaction`，返回结果中`sign_complete`为`true`表示签名成功，将签名的交易通过`submit-transaction`提交到交易池中，等待交易被打包上链