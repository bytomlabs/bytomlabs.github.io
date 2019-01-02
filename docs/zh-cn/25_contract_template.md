## 典型合约模板解析

### 单签验证合约
  `LockWithPublicKey`源代码如下：
  ```
  contract LockWithPublicKey(publicKey: PublicKey) locks valueAmount of valueAsset {
    clause unlockWithSig(sig: Signature) {
      verify checkTxSig(publicKey, sig)
      unlock valueAmount of valueAsset
    }
  }
  ```

  - 合约编译之后的字节码为：`ae7cac`
  - 合约对应的指令码为：`TXSIGHASH SWAP CHECKSIG`

  假如合约参数如下：
  - `publicKey` : e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78

  添加合约参数后的合约程序如下：`20e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e787403ae7cac00c0`

  对应的解锁合约的参数如下：
  - `sig` :
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

  对应的解锁合约交易模板示例如下：
  ```js
  {
    "base_transaction": null,
    "actions": [
      {
        "output_id": "913d941faf5a19501ab4c06747fe1eb38c5ae76b74d0f5af524fc40ee6bf7116",
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
        ],
        "type": "spend_account_unspent_output"
      },
      {
        "amount": 100000000,
        "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
        "control_program": "0014c5a5b563c4623018557fb299259542b8739f6bc2",
        "type": "control_program"
      },
      {
        "account_id": "0G1JIR6400A02",
        "amount": 20000000,
        "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "type": "spend_account"
      }
    ],
    "ttl": 0,
    "time_range": 1521625823
  }
  ```

### 多签验证合约
  `LockWithMultiSig`源代码如下：
  ```
  contract LockWithMultiSig(publicKey1: PublicKey,
                          publicKey2: PublicKey,
                          publicKey3: PublicKey) locks valueAmount of valueAsset {
    clause spend(sig1: Signature, sig2: Signature) {
      verify checkTxMultiSig([publicKey1, publicKey2, publicKey3], [sig1, sig2])
      unlock valueAmount of valueAsset
    }
  }
  ```
  - 合约编译之后的字节码为：`537a547a526bae71557a536c7cad`
  - 合约对应的指令码为：`3 ROLL 4 ROLL 2 TOALTSTACK TXSIGHASH 2ROT 5 ROLL 3 FROMALTSTACK SWAP CHECKMULTISIG`

  假如合约参数如下：
  - `publicKey1` : e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78
  - `publicKey2` : 1f51c25decab2168835f1292a5432707ed94b90be8f5ec0d62aca1c6daa1ec55
  - `publicKey3` : e386c85178418fc72f8182111aa818ac736f3f7f1eee75ccdd7e5a057abe8fe0

  添加合约参数后的合约程序如下：（注意添加合约参数的顺序与虚拟机入栈的顺序是相反的）`20e386c85178418fc72f8182111aa818ac736f3f7f1eee75ccdd7e5a057abe8fe0201f51c25decab2168835f1292a5432707ed94b90be8f5ec0d62aca1c6daa1ec5520e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78740e537a547a526bae71557a536c7cad00c0`

  对应的解锁合约的参数如下：（注意解锁合约参数的顺序，否则会执行VM失败）
  - `sig1` :
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

  - `sig2` :
  ```js
  {
    "type": "raw_tx_signature",
    "raw_data": {
      "xpub": "e0f470a91bcd99497b4804d76264a293e257ca906938a43e34a6a0e619bbf5f1606a2866eca2ceec9f93348c577b052f30bb7ef41b4b09fff28eb1004ca1f8d5",
      "derivation_path": [
        "010200000000000000",
        "0100000000000000"
      ]
    }
  }
  ```

  对应的解锁合约交易模板示例如下：
  ```js
  {
    "base_transaction": null,
    "actions": [
      {
        "output_id": "bf6a3999cfbd25cef24ff1b19c6f2e0988de2e8ef3d40ed7c15402f2a7327bfa",
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
          },
          {
            "type": "raw_tx_signature",
            "raw_data": {
              "xpub": "e0f470a91bcd99497b4804d76264a293e257ca906938a43e34a6a0e619bbf5f1606a2866eca2ceec9f93348c577b052f30bb7ef41b4b09fff28eb1004ca1f8d5",
              "derivation_path": [
                "010200000000000000",
                "0100000000000000"
              ]
            }
          }
        ],
        "type": "spend_account_unspent_output"
      },
      {
        "amount": 200000000,
        "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
        "control_program": "0014c5a5b563c4623018557fb299259542b8739f6bc2",
        "type": "control_program"
      },
      {
        "account_id": "0G1JIR6400A02",
        "amount": 20000000,
        "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "type": "spend_account"
      }
    ],
    "ttl": 0,
    "time_range": 1521625823
  }
  ```

### pubkey哈希校验和单签验证合约
  `LockWithPublicKeyHash`源代码如下：
  ```
  contract LockWithPublicKeyHash(pubKeyHash: Hash) locks valueAmount of valueAsset {
    clause spend(pubKey: PublicKey, sig: Signature) {
      verify sha3(pubKey) == pubKeyHash
      verify checkTxSig(pubKey, sig)
      unlock valueAmount of valueAsset
    }
  }
  ```
  - 合约编译之后的字节码为：`5279aa887cae7cac`
  - 合约对应的指令码为：`2 PICK SHA3 EQUALVERIFY SWAP TXSIGHASH SWAP CHECKSIG`

  假如合约参数如下：
  - `pubKeyHash` : b3f37834dfa74174e9f0d208302e77c637cfe66c3e37fe1e1574e416b3516e89

  添加合约参数后的合约程序如下：`20b3f37834dfa74174e9f0d208302e77c637cfe66c3e37fe1e1574e416b3516e8974085279aa887cae7cac00c0`

  对应的解锁合约的参数如下：（注意解锁合约参数的顺序，否则会执行VM失败）
  - `pubKey` :
  ```js
  {
    "type": "data",
    "raw_data": {
      "value": "b3f37834dfa74174e9f0d208302e77c637cfe66c3e37fe1e1574e416b3516e89"
    }
  }
  ```

  - `sig` :
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

  对应的解锁合约交易模板示例如下：
  ```js
  {
    "base_transaction": null,
    "actions": [
      {
        "output_id": "f98e0aa007dec76a827e924c25678e8c04b922fb28da9f5513a92787ac53725b",
        "arguments": [
          {
            "type": "data",
            "raw_data": {
              "value": "b3f37834dfa74174e9f0d208302e77c637cfe66c3e37fe1e1574e416b3516e89"
            }
          },
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
        ],
        "type": "spend_account_unspent_output"
      },
      {
        "amount": 300000000,
        "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
        "control_program": "0014c5a5b563c4623018557fb299259542b8739f6bc2",
        "type": "control_program"
      },
      {
        "account_id": "0G1JIR6400A02",
        "amount": 20000000,
        "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "type": "spend_account"
      }
    ],
    "ttl": 0,
    "time_range": 1521625823
  }
  ```

### 字符串哈希校验合约
  `RevealPreimage`源代码如下：
  ```
  contract RevealPreimage(hash: Hash) locks valueAmount of valueAsset {
    clause reveal(string: String) {
      verify sha3(string) == hash
      unlock valueAmount of valueAsset
    }
  }
  ```
  - 合约编译之后的字节码为：`7caa87`
  - 合约对应的指令码为：`SWAP SHA3 EQUAL`

  假如合约参数如下：
  - `hash` : 22e829107201c6b975b1dc60b928117916285ceb4aa5c6d7b4b8cc48038083e0

  添加合约参数后的合约程序如下：`2022e829107201c6b975b1dc60b928117916285ceb4aa5c6d7b4b8cc48038083e074037caa8700c0`

  对应的解锁合约的参数如下：（注意解锁合约参数的顺序，否则会执行VM失败）
  - `string` :
  ```js
  {
    "type": "string",
    "raw_data": {
      "value": "string"
    }
  }
  ```
  或者 （`string`的16进制为`737472696e67`）
  ```js
  {
    "type": "data",
    "raw_data": {
      "value": "737472696e67"
    }
  }
  ```

  对应的解锁合约交易模板示例如下：
  ```js
  {
    "base_transaction": null,
    "actions": [
      {
        "output_id": "35fe216572bea7d81effd2fed2db1bc257f977dfa492299742a0dee2a9ae1c8e",
        "arguments": [
          {
            "type": "string",
            "raw_data": {
              "value": "string"
            }
          }
        ],
        "type": "spend_account_unspent_output"
      },
      {
        "amount": 400000000,
        "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
        "control_program": "0014c5a5b563c4623018557fb299259542b8739f6bc2",
        "type": "control_program"
      },
      {
        "account_id": "0G1JIR6400A02",
        "amount": 20000000,
        "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "type": "spend_account"
      }
    ],
    "ttl": 0,
    "time_range": 1521625823
  }
  ```

### 币币交易合约
  `TradeOffer`源代码如下：
  ```
  contract TradeOffer(assetRequested: Asset,
                    amountRequested: Amount,
                    seller: Program,
                    cancelKey: PublicKey) locks valueAmount of valueAsset {
    clause trade() {
      lock amountRequested of assetRequested with seller
      unlock valueAmount of valueAsset
    }
    clause cancel(sellerSig: Signature) {
      verify checkTxSig(cancelKey, sellerSig)
      unlock valueAmount of valueAsset
    }
  }
  ```
  - 合约编译之后的字节码为：`547a6413000000007b7b51547ac1631a000000547a547aae7cac`
  - 合约对应的指令码为：`4 ROLL JUMPIF:$cancel $trade FALSE ROT ROT 1 4 ROLL CHECKOUTPUT JUMP:$_end $cancel 4 ROLL 4 ROLL TXSIGHASH SWAP CHECKSIG $_end`

  假如合约参数如下：
  - `assetRequested` : 1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22
  - `amountRequested` : 99
  - `seller` : 0014c5a5b563c4623018557fb299259542b8739f6bc2
  - `cancelKey` : e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78

  添加合约参数后的合约程序如下：`20e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78160014c5a5b563c4623018557fb299259542b8739f6bc20163201e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22741a547a6413000000007b7b51547ac1631a000000547a547aae7cac00c0`

  对应的解锁合约的参数如下：（注意该合约包含两个`clause`，在解锁合约的时候任选其一即可，其中`clause_selector`指的是选择的解锁`clause`在合约中的位置（位置序号从`0`开始计算），此外还需注意解锁合约参数的顺序，否则会执行VM失败）
  - `clause trade` 解锁参数 :
    - `clause_selector` : 
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 0
      }
    }
    ```
    或
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "00"
      }
    }
    ```

    - `lock`语句的交易`action`构造 : `lock amountRequested of assetRequested with seller`语句表示解锁账户需要支付对应的`amountRequested`数量的`assetRequested`资产到对应的接收对象`seller`，注意上述参数必须严格匹配，否则合约执行将失败.
    ```js
    {
      "amount": 99,
      "asset_id": "2a1861ba3a5f7bbdb98392b33289465b462fe8e9d4b9c00f78cbcb1ac20fa93f",
      "control_program": "0014c5a5b563c4623018557f299259542b8739f6bc2",
      "type": "control_program"
    },
    {
      "account_id": "0G1JJF0KG0A06",
      "amount": 99,
      "asset_id": "2a1861ba3a5f7bbdb98392b33289465b462fe8e9d4b9c00f78cbcb1ac20fa93f",
      "type": "spend_account"
    }
    ```

    对应的解锁合约交易模板示例如下：
    ```js
    // clause trade
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "9f3a63d2f8352a6891dadd8a8337268873c84a852594f35b0b9815a4b9d56d86",
          "arguments": [
            {
              "type": "integer",
              "raw_data": {
                "value": 0
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 99,
          "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
          "control_program": "0014c5a5b563c4623018557fb299259542b8739f6bc2",
          "type": "control_program"
        },
        {
          "account_id": "0G1JIR6400A02",
          "amount": 99,
          "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
          "type": "spend_account"
        },
        {
          "account_id": "0G1JIR6400A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        },
        {
          "amount": 500000000,
          "asset_id": "2a1861ba3a5f7bbdb98392b33289465b462fe8e9d4b9c00f78cbcb1ac20fa93f",
          "control_program": "0014905df16bc248790676744bab063a1ae810803bd7",
          "type": "control_program"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```

  - `clause cancel` 解锁参数 :（注意参数顺序）
    - `sellerSig` :
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

    - `clause_selector` :
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 1
      }
    }
    ```
    或
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "01"
      }
    }
    ```

    对应的解锁合约交易模板示例如下:
    ```js
    // clause cancel
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "9f3a63d2f8352a6891dadd8a8337268873c84a852594f35b0b9815a4b9d56d86",
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
            },
            {
              "type": "integer",
              "raw_data": {
                "value": 1
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 500000000,
          "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
          "control_program": "0014929ec7d92f89d74716ba9591eaea588aa1867f75",
          "type": "control_program"
        },
        {
          "account_id": "0G1JIR6400A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```

### 第三方信任机构托管合约
  `Escrow`源代码如下：
  ```
  contract Escrow(agent: PublicKey,
                sender: Program,
                recipient: Program) locks valueAmount of valueAsset {
    clause approve(sig: Signature) {
      verify checkTxSig(agent, sig)
      lock valueAmount of valueAsset with recipient
    }
    clause reject(sig: Signature) {
      verify checkTxSig(agent, sig)
      lock valueAmount of valueAsset with sender
    }
  }
  ```
  - 合约编译之后的字节码为：`537a641a000000537a7cae7cac6900c3c251557ac16328000000537a7cae7cac6900c3c251547ac1`
  - 合约对应的指令码为：`3 ROLL JUMPIF:$reject $approve 3 ROLL SWAP TXSIGHASH SWAP CHECKSIG VERIFY FALSE AMOUNT ASSET 1 5 ROLL CHECKOUTPUT JUMP:$_end $reject 3 ROLL SWAP TXSIGHASH SWAP CHECKSIG VERIFY FALSE AMOUNT ASSET 1 4 ROLL CHECKOUTPUT $_end`

  假如合约参数如下：
  - `agent` : e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78
  - `sender` : 0014905df16bc248790676744bab063a1ae810803bd7
  - `recipient` : 0014929ec7d92f89d74716ba9591eaea588aa1867f75

  添加合约参数后的合约程序如下：`160014929ec7d92f89d74716ba9591eaea588aa1867f75160014905df16bc248790676744bab063a1ae810803bd720e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e787428537a641a000000537a7cae7cac6900c3c251557ac16328000000537a7cae7cac6900c3c251547ac100c0`

  对应的解锁合约的参数如下：（注意该合约包含两个`clause`，在解锁合约的时候任选其一即可，其中`clause_selector`指的是选择的解锁`clause`在合约中的位置（位置序号从`0`开始计算），此外还需注意解锁合约参数的顺序，否则会执行VM失败）
  - `clause approve` 解锁参数 :
    - `sellerSig` :
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

    - `clause_selector` :
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 0
      }
    }
    ```
    或
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "00"
      }
    }
    ```

    对应的解锁合约交易模板示例如下:（注意接收`control_program`字段必须为`recipient`，否则执行失败）
    ```js
    // clause approve
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "15ee3368e77a0699eadaf99bbc096a48595ac975d05b10b198d902dde808e120",
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
            },
            {
              "type": "integer",
              "raw_data": {
                "value": 0
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 600000000,
          "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
          "control_program": "0014929ec7d92f89d74716ba9591eaea588aa1867f75",
          "type": "control_program"
        },
        {
          "account_id": "0G1JIR6400A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```  

  - `clause reject` 解锁参数 :
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

    - `clause_selector` :
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 1
      }
    }
    ```
    或
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "01"
      }
    }
    ``` 

    对应的解锁合约交易模板示例如下:（注意接收`control_program`字段必须为`sender`，否则执行失败）
    ```js
    // clause reject
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "15ee3368e77a0699eadaf99bbc096a48595ac975d05b10b198d902dde808e120",
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
            },
            {
              "type": "integer",
              "raw_data": {
                "value": 1
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 600000000,
          "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
          "control_program": "0014905df16bc248790676744bab063a1ae810803bd7",
          "type": "control_program"
        },
        {
          "account_id": "0G1JIR6400A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```  

  ----

### 抵押贷款合约
  `LoanCollateral`源代码如下：
  ```
  contract LoanCollateral(assetLoaned: Asset,
                        amountLoaned: Amount,
                        blockHeight: Integer,
                        lender: Program,
                        borrower: Program) locks valueAmount of valueAsset {
    clause repay() {
      lock amountLoaned of assetLoaned with lender
      lock valueAmount of valueAsset with borrower
    }
    clause default() {
      verify above(blockHeight)
      lock valueAmount of valueAsset with lender
    }
  }
  ```
  - 合约编译之后的字节码为：`557a641b000000007b7b51557ac16951c3c251557ac163260000007bcd9f6900c3c251567ac1`
  - 合约对应的指令码为：`5 ROLL JUMPIF:$default $repay FALSE ROT ROT 1 5 ROLL CHECKOUTPUT VERIFY 1 AMOUNT ASSET 1 5 ROLL CHECKOUTPUT JUMP:$_end $default ROT BLOCKHEIGHT LESSTHAN VERIFY FALSE AMOUNT ASSET 1 6 ROLL CHECKOUTPUT $_end`

  假如合约参数如下：
  - `assetLoaned` : 1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22
  - `amountLoaned` : 88
  - `blockHeight` : 1920
  - `lender` : 0014905df16bc248790676744bab063a1ae810803bd7
  - `borrower` : 0014929ec7d92f89d74716ba9591eaea588aa1867f75

  添加合约参数后的合约程序如下：`160014929ec7d92f89d74716ba9591eaea588aa1867f75160014905df16bc248790676744bab063a1ae810803bd70280070158201e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c227426557a641b000000007b7b51557ac16951c3c251557ac163260000007bcd9f6900c3c251567ac100c0`

  对应的解锁合约的参数如下：（注意该合约包含两个`clause`，在解锁合约的时候任选其一即可，其中`clause_selector`指的是选择的解锁`clause`在合约中的位置（位置序号从`0`开始计算），此外还需注意解锁合约参数的顺序，否则会执行VM失败）
  - `clause repay` 解锁参数 :
    - `clause_selector` : 
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 0
      }
    }
    ```
    或
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "00"
      }
    }
    ```

    - 连续两个`lock`语句的交易`action`构造 : `lock amountLoaned of assetLoaned with lender`语句表示解锁账户需要支付对应的`amountLoaned`数量的`assetLoaned`资产到对应的接收对象`lender`; `lock valueAmount of valueAsset with borrower`语句表示将合约锁定的`valueAmount`数量的`valueAsset`资产到对应的接收对象`borrower`。注意上述参数必须严格匹配，否则合约执行将失败.
    ```js
    {
      "amount": 88,
      "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
      "control_program": "0014905df16bc248790676744bab063a1ae810803bd7",
      "type": "control_program"
    },
    {
      "amount": 700000000,
      "asset_id": "2ee76aeaa110308fcdfb382fa02a4a35823d5a589ffcaddb23f11f8a1fae3302",
      "control_program": "0014929ec7d92f89d74716ba9591eaea588aa1867f75",
      "type": "control_program"
    },
    {
      "account_id": "0G1JIR6400A02",
      "amount": 88,
      "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
      "type": "spend_account"
    }
    ```

    对应的解锁合约交易模板示例如下：
    ```js
    // clause repay
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "3cf74c303558b7343cfa20b32ccddfd8e66293ae1970f7612ca6cb9a006e76bc",
          "arguments": [
            {
              "type": "integer",
              "raw_data": {
                "value": 0
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 88,
          "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
          "control_program": "0014905df16bc248790676744bab063a1ae810803bd7",
          "type": "control_program"
        },
        {
          "amount": 700000000,
          "asset_id": "2ee76aeaa110308fcdfb382fa02a4a35823d5a589ffcaddb23f11f8a1fae3302",
          "control_program": "0014929ec7d92f89d74716ba9591eaea588aa1867f75",
          "type": "control_program"
        },
        {
          "account_id": "0G1JIR6400A02",
          "amount": 88,
          "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
          "type": "spend_account"
        },
        {
          "account_id": "0G1JIR6400A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```

  - `clause default` 解锁参数 :（注意参数顺序）
    - `clause_selector` :
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 1
      }
    }
    ```
    或
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "01"
      }
    }
    ```

    对应的解锁合约交易模板示例如下:（注意接收`control_program`字段必须为`lender`，否则执行失败）
    ```js
    // clause default
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "3cf74c303558b7343cfa20b32ccddfd8e66293ae1970f7612ca6cb9a006e76bc",
          "arguments": [
            {
              "type": "integer",
              "raw_data": {
                "value": 1
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 700000000,
          "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
          "control_program": "0014905df16bc248790676744bab063a1ae810803bd7",
          "type": "control_program"
        },
        {
          "account_id": "0G1JIR6400A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```

### 看涨期权合约
  `CallOption`源代码如下：
  ```
  contract CallOption(strikePrice: Amount,
                    strikeCurrency: Asset,
                    seller: Program,
                    buyerKey: PublicKey,
                    blockHeight: Integer) locks valueAmount of valueAsset {
    clause exercise(buyerSig: Signature) {
      verify below(blockHeight)
      verify checkTxSig(buyerKey, buyerSig)
      lock strikePrice of strikeCurrency with seller
      unlock valueAmount of valueAsset
    }
    clause expire() {
      verify above(blockHeight)
      lock valueAmount of valueAsset with seller
    }
  }
  ```
  - 合约编译之后的字节码为：`557a6420000000547acda069547a547aae7cac69007c7b51547ac1632c000000547acd9f6900c3c251567ac1`
  - 合约对应的指令码为：`5 ROLL JUMPIF:$expire $exercise FALSE ROT ROT 1 5 ROLL CHECKOUTPUT VERIFY 1 AMOUNT ASSET 1 5 ROLL CHECKOUTPUT JUMP:$_end $expire ROT BLOCKHEIGHT LESSTHAN VERIFY FALSE AMOUNT ASSET 1 6 ROLL CHECKOUTPUT $_end`

  假如合约参数如下：
  - `strikePrice` : 199
  - `strikeCurrency` : 1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22
  - `seller` : 0014905df16bc248790676744bab063a1ae810803bd7
  - `buyerKey` : e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78
  - `blockHeight` : 3096

  添加合约参数后的合约程序如下：`02180c20e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78160014905df16bc248790676744bab063a1ae810803bd7201e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c2201c7742c557a6420000000547acda069547a547aae7cac69007c7b51547ac1632c000000547acd9f6900c3c251567ac100c0`

  对应的解锁合约的参数如下：（注意该合约包含两个`clause`，在解锁合约的时候任选其一即可，其中`clause_selector`指的是选择的解锁`clause`在合约中的位置（位置序号从`0`开始计算），此外还需注意解锁合约参数的顺序，否则会执行VM失败）
  - `clause exercise` 解锁参数 :
    - `buyerSig` : 
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

    - `clause_selector` : 
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 0
      }
    }
    ```
    或
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "00"
      }
    }
    ```

    - `lock`语句的交易`action`构造 : `lock strikePrice of strikeCurrency with seller`语句表示解锁账户需要支付对应的`strikePrice`数量的`strikeCurrency`资产到对应的接收对象`seller`，注意上述参数必须严格匹配，否则合约执行将失败.
    ```js
    {
      "amount": 199,
      "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
      "control_program": "0014c5a5b563c4623018557fb299259542b8739f6bc2",
      "type": "control_program"
    },
    {
      "account_id": "0G1JIR6400A02",
      "amount": 199,
      "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
      "type": "spend_account"
    }
    ```

    对应的解锁合约交易模板示例如下：
    ```js
    // clause exercise
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "7afa15ad39356a7e6dc363fba823146ecb0132967f067ddfa13494a34a984518",
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
            },
            {
              "type": "integer",
              "raw_data": {
                "value": 0
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 199,
          "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
          "control_program": "0014c5a5b563c4623018557fb299259542b8739f6bc2",
          "type": "control_program"
        },
        {
          "account_id": "0G1JIR6400A02",
          "amount": 199,
          "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
          "type": "spend_account"
        },
        {
          "account_id": "0G1JIR6400A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        },
        {
          "amount": 800000000,
          "asset_id": "2a1861ba3a5f7bbdb98392b33289465b462fe8e9d4b9c00f78cbcb1ac20fa93f",
          "control_program": "0014905df16bc248790676744bab063a1ae810803bd7",
          "type": "control_program"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```

  - `clause expire` 解锁参数 :
    - `clause_selector` : 
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 1
      }
    }
    ```
    或
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "01"
      }
    }
    ```

    对应的解锁合约交易模板示例如下:（注意接收`control_program`字段必须为`seller`，否则执行失败）
    ```js
    // clause expire
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "7afa15ad39356a7e6dc363fba823146ecb0132967f067ddfa13494a34a984518",
          "arguments": [
            {
              "type": "integer",
              "raw_data": {
                "value": 1
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 800000000,
          "asset_id": "1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22",
          "control_program": "0014905df16bc248790676744bab063a1ae810803bd7",
          "type": "control_program"
        },
        {
          "account_id": "0G1JIR6400A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```

### 可修改价格的币币交易合约
  `PriceChanger`源代码如下：
  ```
  contract PriceChanger(askAmount: Amount, askAsset: Asset, sellerKey: PublicKey, sellerProg: Program) locks valueAmount of valueAsset {
    clause changePrice(newAmount: Amount, newAsset: Asset, sig: Signature) {
      verify checkTxSig(sellerKey, sig)
      lock valueAmount of valueAsset with PriceChanger(newAmount, newAsset, sellerKey, sellerProg)
    }
    clause redeem() {
      lock askAmount of askAsset with sellerProg
      unlock valueAmount of valueAsset
    }
  }
  ```
  - 合约编译之后的字节码为：`557a6432000000557a5479ae7cac6900c3c25100597a89587a89587a89587a89557a890274787e008901c07ec1633a000000007b537a51567ac1`
  - 合约对应的指令码为：`5 05 ROLL JUMPIF:$redeem $changePrice 5 05 ROLL 4 04 PICK TXSIGHASH SWAP CHECKSIG VERIFY FALSE AMOUNT ASSET 1 01 FALSE 9 09 ROLL CATPUSHDATA 8 08 ROLL CATPUSHDATA 8 08 ROLL CATPUSHDATA 8 08 ROLL CATPUSHDATA 5 05 ROLL CATPUSHDATA DATA_2 7478 CAT FALSE CATPUSHDATA DATA_1 c0 CAT CHECKOUTPUT JUMP:$_end $redeem FALSE ROT 3 03 ROLL 1 01 6 06 ROLL CHECKOUTPUT $_end`

  假如合约参数如下：
  - `askAmount` : 20000
  - `askAsset` : c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee
  - `sellerKey` : 055539eb36abcaaf127c63ae20e3d049cd28d0f1fe569df84da3aedb018ca1bf
  - `sellerProg` : 0014dedfd406c591aa221a047a260107f877da92fec5

  添加合约参数后的合约程序如下：
  `160014dedfd406c591aa221a047a260107f877da92fec520055539eb36abcaaf127c63ae20e3d049cd28d0f1fe569df84da3aedb018ca1bf20c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee02204e3a557a6432000000557a5479ae7cac6900c3c25100597a89587a89587a89587a89557a890274787e008901c07ec1633a000000007b537a51567ac1747800c0`

  对应的解锁合约的参数如下：（注意该合约包含两个`clause`，在解锁合约的时候任选其一即可，其中`clause_selector`指的是选择的解锁`clause`在合约中的位置（位置序号从`0`开始计算），此外还需注意解锁合约参数的顺序，否则会执行VM失败）
  - `clause changePrice` 解锁参数 :
    - `newAmount` :
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 10000
      }
    }
    ```

    - `newAsset` :
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "3addca837514d599c509aed802c0b7671838b363a298cbcb0acb06bc24076cf4"
      }
    }
    ```

    - `sig` :
    ```js
    {
      "type": "raw_tx_signature",
      "raw_data": {
        "xpub": "a4d4f09a04371516d37e1d27f92c9cb41e4b1e7f62762cf23ed3904a9dfd2d794195862fffd00bf7ac373e5891c8d2eb660dc5ff9c040ec4e01f973bbfd31c23",
        "derivation_path": [
          "010100000000000000",
          "0100000000000000"
        ]
      }
    }
    ```

    - `clause_selector` : 
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 0
      }
    }
    ```

    合约参数构造完成之后，需要对合约`lock`语句中接收对象进行指定。该合约中的接收对象是一个新的合约程序，`lock valueAmount of valueAsset with PriceChanger(newAmount, newAsset, sellerKey, sellerProg)`语句表示合约锁定的资产被重新锁定到合约对象中，因此需要构造实例化的合约程序作为接收对象。接收合约的参数如下：
    - `newAmount` : 10000
    - `newAsset` : 3addca837514d599c509aed802c0b7671838b363a298cbcb0acb06bc24076cf4
    - `sellerKey` : 055539eb36abcaaf127c63ae20e3d049cd28d0f1fe569df84da3aedb018ca1bf
    - `sellerProg` : 0014dedfd406c591aa221a047a260107f877da92fec5

    &nbsp; 
    添加合约参数后的实例化合约程序如下： 
    `160014dedfd406c591aa221a047a260107f877da92fec520055539eb36abcaaf127c63ae20e3d049cd28d0f1fe569df84da3aedb018ca1bf203addca837514d599c509aed802c0b7671838b363a298cbcb0acb06bc24076cf40210273a557a6432000000557a5479ae7cac6900c3c25100597a89587a89587a89587a89557a890274787e008901c07ec1633a000000007b537a51567ac1747800c0`

    &nbsp;
    对应的解锁合约交易模板示例如下：
    ```js
    // clause changePrice
    {
    "base_transaction": null,
    "actions": [
        {
        "output_id": "31feac2f482f48dd99117569a3148d1b84211d41b64a980dc9ec37bda922b0c8",
        "arguments": [
            {
            "type": "integer",
            "raw_data": {
                "value": 10000
            }
            },
            {
            "type": "data",
            "raw_data": {
                "value": "3addca837514d599c509aed802c0b7671838b363a298cbcb0acb06bc24076cf4"
            }
            },
            {
            "type": "raw_tx_signature",
            "raw_data": {
                "xpub": "a4d4f09a04371516d37e1d27f92c9cb41e4b1e7f62762cf23ed3904a9dfd2d794195862fffd00bf7ac373e5891c8d2eb660dc5ff9c040ec4e01f973bbfd31c23",
                "derivation_path": [
                "010100000000000000",
                "0100000000000000"
                ]
            }
            },
            {
            "type": "integer",
            "raw_data": {
                "value": 0
            }
            }
        ],
        "type": "spend_account_unspent_output"
        },
        {
        "amount": 900,
        "asset_id": "2a62180553e70131f668639116d6d1e29417537766b5244cbe49fa6b36c5d7b0",
        "control_program": "160014dedfd406c591aa221a047a260107f877da92fec520055539eb36abcaaf127c63ae20e3d049cd28d0f1fe569df84da3aedb018ca1bf203addca837514d599c509aed802c0b7671838b363a298cbcb0acb06bc24076cf40210273a557a6432000000557a5479ae7cac6900c3c25100597a89587a89587a89587a89557a890274787e008901c07ec1633a000000007b537a51567ac1747800c0",
        "type": "control_program"
        },
        {
        "account_id": "0ILGLSTC00A02",
        "amount": 20000000,
        "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "type": "spend_account"
        }
    ],
    "ttl": 0,
    "time_range": 1521625823
    }
    ```

  - `clause redeem` 解锁参数 :
    - `clause_selector` :
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 1
      }
    }
    ```

    其对应的解锁合约交易模板示例如下:
    ```js
    // clause redeem
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "31feac2f482f48dd99117569a3148d1b84211d41b64a980dc9ec37bda922b0c8",
          "arguments": [
            {
              "type": "integer",
              "raw_data": {
                "value": 1
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 20000,
          "asset_id": "c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee",
          "control_program": "0014dedfd406c591aa221a047a260107f877da92fec5",
          "type": "control_program"
        },
        {
          "account_id": "0JPC5DBOG0A02",
          "amount": 20000,
          "asset_id": "c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee",
          "type": "spend_account"
        },
        {
          "account_id": "0JPC5DBOG0A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        },
        {
          "amount": 900,
          "asset_id": "2a62180553e70131f668639116d6d1e29417537766b5244cbe49fa6b36c5d7b0",
          "control_program": "0014bf54f5adbbd2dc11bffb50277b5a993cec75e924",
          "type": "control_program"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```

### 可部分借贷的抵押贷款合约
  `PartLoanCollateral`源代码如下：
  ```
  contract PartLoanCollateral(assetLoaned: Asset,
                          amountLoaned: Amount,
                          blockHeight: Integer,
                          lender: Program,
                          borrower: Program) locks valueAmount of valueAsset {
    clause repay(amountPartLoaned: Amount) {
      if amountPartLoaned > 0 && amountPartLoaned < amountLoaned {
        lock amountPartLoaned of assetLoaned with lender
        lock valueAmount*amountPartLoaned/amountLoaned of valueAsset with borrower
        lock valueAmount-(valueAmount*amountPartLoaned/amountLoaned) of valueAsset with PartLoanCollateral(assetLoaned, amountLoaned-amountPartLoaned, blockHeight, lender, borrower)
      } else {
        lock amountLoaned of assetLoaned with lender
        lock valueAmount of valueAsset with borrower
      }
    }
    clause default() {
      verify above(blockHeight)
      lock valueAmount of valueAsset with lender
    }
  }
  ```
  - 合约编译之后的字节码为：`567a6477000000567900a0577954799f9a916164630000000057795379515879c16951c3587995547996c2515979c16952c3767c59799555799694c251005a798959798958798957795c7994895679895579890274787e008901c07ec16963720000000070515879c16951c3c2515979c1696383000000537acd9f6900c3c251577ac1`
  - 合约对应的指令码为：`6 06 ROLL JUMPIF:$default $repay 6 06 PICK FALSE GREATERTHAN 7 07 PICK 4 04 PICK LESSTHAN BOOLAND NOT NOP JUMPIF 63000000 FALSE 7 07 PICK 3 03 PICK 1 01 8 08 PICK CHECKOUTPUT VERIFY 1 01 AMOUNT 8 08 PICK MUL 4 04 PICK DIV ASSET 1 01 9 09 PICK CHECKOUTPUT VERIFY 2 02 AMOUNT DUP SWAP 9 09 PICK MUL 5 05 PICK DIV SUB ASSET 1 01 FALSE 10 0a PICK CATPUSHDATA 9 09 PICK CATPUSHDATA 8 08 PICK CATPUSHDATA 7 07 PICK 12 0c PICK SUB CATPUSHDATA 6 06 PICK CATPUSHDATA 5 05 PICK CATPUSHDATA DATA_2 7478 CAT FALSE CATPUSHDATA DATA_1 c0 CAT CHECKOUTPUT VERIFY JUMP 72000000 FALSE 2OVER 1 01 8 08 PICK CHECKOUTPUT VERIFY 1 01 AMOUNT ASSET 1 01 9 09 PICK CHECKOUTPUT VERIFY JUMP:$_end $default 3 03 ROLL BLOCKHEIGHT LESSTHAN VERIFY FALSE AMOUNT ASSET 1 01 7 07 ROLL CHECKOUTPUT $_end`

  假如合约参数如下：
  - `assetLoaned` : c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee
  - `amountLoaned` : 8000
  - `blockHeight` : 1900
  - `lender` : 0014dedfd406c591aa221a047a260107f877da92fec5
  - `borrower` : 0014bf54f5adbbd2dc11bffb50277b5a993cec75e924

  添加合约参数后的合约程序如下：`160014bf54f5adbbd2dc11bffb50277b5a993cec75e924160014dedfd406c591aa221a047a260107f877da92fec5026c0702401f20c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee4c83567a6477000000567900a0577954799f9a916164630000000057795379515879c16951c3587995547996c2515979c16952c3767c59799555799694c251005a798959798958798957795c7994895679895579890274787e008901c07ec16963720000000070515879c16951c3c2515979c1696383000000537acd9f6900c3c251577ac1747800c0`

  对应的解锁合约的参数如下：（注意该合约包含两个`clause`，在解锁合约的时候任选其一即可，其中`clause_selector`指的是选择的解锁`clause`在合约中的位置（位置序号从`0`开始计算），此外还需注意解锁合约参数的顺序，否则会执行VM失败）
  - `clause changePrice` 解锁参数 :
    - `amountPartLoaned` :
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 2000
      }
    }
    ```

    - `clause_selector` : 
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 0
      }
    }
    ```

    从合约中可以看出`lock`语句位于`if-else`语句块中，并且`if`语句下面的`lock`语句个数跟`else`语句下的`lock`语句个数不相同，因此合约解锁之前，需要对语句的执行流程进行预判断。当`amountPartLoaned`等于2000时，是小于`amountLoaned`的值8000，所以执行的流程是`if`语句下面合约流程。此外，`lock`语句中`valueAmount*amountPartLoaned/amountLoaned`和`valueAmount-(valueAmount*amountPartLoaned/amountLoaned)`需要用户在使用之前先计算好，假如合约锁定的资产值`valueAmount`为3000, 那么`valueAmount*amountPartLoaned/amountLoaned`的计算结果为750，而`valueAmount-(valueAmount*amountPartLoaned/amountLoaned)`的计算结果为2250。最后，该合约中的接收对象是一个新的合约程序，`lock valueAmount-(valueAmount*amountPartLoaned/amountLoaned) of valueAsset with PartLoanCollateral(assetLoaned, amountLoaned-amountPartLoaned, blockHeight, lender, borrower)`语句表示合约锁定的资产被重新锁定到合约对象中，因此需要构造实例化的合约程序作为接收对象。接收合约的参数如下：
    - `assetLoaned` : c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee
    - `amountLoaned` : 6000
    - `blockHeight` : 1900
    - `lender` : 0014dedfd406c591aa221a047a260107f877da92fec5
    - `borrower` : 0014bf54f5adbbd2dc11bffb50277b5a993cec75e924

    &nbsp; 
    添加合约参数后的实例化合约程序如下： 
    `160014bf54f5adbbd2dc11bffb50277b5a993cec75e924160014dedfd406c591aa221a047a260107f877da92fec5026c0702701720c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee4c83567a6477000000567900a0577954799f9a916164630000000057795379515879c16951c3587995547996c2515979c16952c3767c59799555799694c251005a798959798958798957795c7994895679895579890274787e008901c07ec16963720000000070515879c16951c3c2515979c1696383000000537acd9f6900c3c251577ac1747800c0`
    
    &nbsp;
    对应的解锁合约交易模板示例如下：
    ```js
    // clause repay
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "a80552a346e271aaa7c71d0fa362a6b02aa844bb71a72934db64bc2b9906d0b9",
          "arguments": [
            {
              "type": "integer",
              "raw_data": {
                "value": 2000
              }
            },
            {
              "type": "integer",
              "raw_data": {
                "value": 0
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 2000,
          "asset_id": "c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee",
          "control_program": "0014dedfd406c591aa221a047a260107f877da92fec5",
          "type": "control_program"
        },
        {
          "amount": 750,
          "asset_id": "2a62180553e70131f668639116d6d1e29417537766b5244cbe49fa6b36c5d7b0",
          "control_program": "0014bf54f5adbbd2dc11bffb50277b5a993cec75e924",
          "type": "control_program"
        },
        {
          "amount": 2250,
          "asset_id": "2a62180553e70131f668639116d6d1e29417537766b5244cbe49fa6b36c5d7b0",
          "control_program": "160014bf54f5adbbd2dc11bffb50277b5a993cec75e924160014dedfd406c591aa221a047a260107f877da92fec5026c0702701720c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee4c83567a6477000000567900a0577954799f9a916164630000000057795379515879c16951c3587995547996c2515979c16952c3767c59799555799694c251005a798959798958798957795c7994895679895579890274787e008901c07ec16963720000000070515879c16951c3c2515979c1696383000000537acd9f6900c3c251577ac1747800c0",
          "type": "control_program"
        },
        {
          "account_id": "0JPC5DBOG0A02",
          "amount": 2000,
          "asset_id": "c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee",
          "type": "spend_account"
        },
        {
          "account_id": "0JPC5DBOG0A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```

    当`amountPartLoaned`大于或等于`amountLoaned`的值8000时，执行的流程是`else`语句下面合约流程。对应的解锁合约交易模板示例如下：
    ```js
    // clause repay
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "a80552a346e271aaa7c71d0fa362a6b02aa844bb71a72934db64bc2b9906d0b9",
          "arguments": [
            {
              "type": "integer",
              "raw_data": {
                "value": 8000
              }
            },
            {
              "type": "integer",
              "raw_data": {
                "value": 0
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 8000,
          "asset_id": "c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee",
          "control_program": "0014dedfd406c591aa221a047a260107f877da92fec5",
          "type": "control_program"
        },
        {
          "amount": 3000,
          "asset_id": "2a62180553e70131f668639116d6d1e29417537766b5244cbe49fa6b36c5d7b0",
          "control_program": "0014bf54f5adbbd2dc11bffb50277b5a993cec75e924",
          "type": "control_program"
        },
        {
          "account_id": "0JPC5DBOG0A02",
          "amount": 8000,
          "asset_id": "c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee",
          "type": "spend_account"
        },
        {
          "account_id": "0JPC5DBOG0A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```

  - `clause default` 解锁参数 :
    - `clause_selector` :
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 1
      }
    }
    ```

    对应的解锁合约交易模板示例如下:
    ```js
    // clause default
    {
      "base_transaction": null,
      "actions": [
        {
          "output_id": "a80552a346e271aaa7c71d0fa362a6b02aa844bb71a72934db64bc2b9906d0b9",
          "arguments": [
            {
              "type": "integer",
              "raw_data": {
                "value": 1
              }
            }
          ],
          "type": "spend_account_unspent_output"
        },
        {
          "amount": 3000,
          "asset_id": "2a62180553e70131f668639116d6d1e29417537766b5244cbe49fa6b36c5d7b0",
          "control_program": "0014905df16bc248790676744bab063a1ae810803bd7",
          "type": "control_program"
        },
        {
          "account_id": "0ILGLSTC00A02",
          "amount": 20000000,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "type": "spend_account"
        }
      ],
      "ttl": 0,
      "time_range": 1521625823
    }
    ```    