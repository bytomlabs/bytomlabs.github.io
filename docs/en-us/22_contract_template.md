## Typical contract analysis

### LockWithPublicKey

  `LockWithPublicKey` source code as follows:
  ```
  contract LockWithPublicKey(publicKey: PublicKey) locks valueAmount of valueAsset {
    clause unlockWithSig(sig: Signature) {
      verify checkTxSig(publicKey, sig)
      unlock valueAmount of valueAsset
    }
  }
  ```

  - The binary: `ae7cac`
  - The instruction code: `TXSIGHASH SWAP CHECKSIG`

  If the contract parameters is as follows:
  - `publicKey` : e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78

  The instantiated contract program: `20e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e787403ae7cac00c0`

  The parameters of unlocking contract is as follows:
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

  The example of unlocking contract transaction:
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

### LockWithMultiSig  

  `LockWithMultiSig` source code as follows：
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
  - The binary: `537a547a526bae71557a536c7cad`
  - The instruction code: `3 ROLL 4 ROLL 2 TOALTSTACK TXSIGHASH 2ROT 5 ROLL 3 FROMALTSTACK SWAP CHECKMULTISIG`

  If the contract parameters are as follows:
  - `publicKey1` : e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78
  - `publicKey2` : 1f51c25decab2168835f1292a5432707ed94b90be8f5ec0d62aca1c6daa1ec55
  - `publicKey3` : e386c85178418fc72f8182111aa818ac736f3f7f1eee75ccdd7e5a057abe8fe0

  The instantiated contract program: (Please note that the sequence in which the contract parameters are added is the reverse of the order in which the virtual machines are pushed onto the stack.)`20e386c85178418fc72f8182111aa818ac736f3f7f1eee75ccdd7e5a057abe8fe0201f51c25decab2168835f1292a5432707ed94b90be8f5ec0d62aca1c6daa1ec5520e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78740e537a547a526bae71557a536c7cad00c0`

  The parameters of unlocking contract is as follows:(Please note the sequence of unlocking the contract parameters, otherwise the VM will fail to execute)
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

  The example of unlocking contract transaction:
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


### LockWithPublicKeyHash

  `LockWithPublicKeyHash` source code as follows：
  ```
  contract LockWithPublicKeyHash(pubKeyHash: Hash) locks valueAmount of valueAsset {
    clause spend(pubKey: PublicKey, sig: Signature) {
      verify sha3(pubKey) == pubKeyHash
      verify checkTxSig(pubKey, sig)
      unlock valueAmount of valueAsset
    }
  }
  ```
  - The binary: `5279aa887cae7cac`
  - The instruction code: `2 PICK SHA3 EQUALVERIFY SWAP TXSIGHASH SWAP CHECKSIG`

  If the contract parameters are as follows:
  - `pubKeyHash` : b3f37834dfa74174e9f0d208302e77c637cfe66c3e37fe1e1574e416b3516e89

  The instantiated contract program:
  `20b3f37834dfa74174e9f0d208302e77c637cfe66c3e37fe1e1574e416b3516e8974085279aa887cae7cac00c0`

  The parameters of unlocking contract is as follows:
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

  The example of unlocking contract transaction:
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

### RevealPreimage  

  `RevealPreimage` source code as follows:
  ```
  contract RevealPreimage(hash: Hash) locks valueAmount of valueAsset {
    clause reveal(string: String) {
      verify sha3(string) == hash
      unlock valueAmount of valueAsset
    }
  }
  ```
  - The binary: `7caa87`
  - The instruction code: `SWAP SHA3 EQUAL`

  If the contract parameters are as follows:
  - `hash`: 22e829107201c6b975b1dc60b928117916285ceb4aa5c6d7b4b8cc48038083e0

  The instantiated contract program: `2022e829107201c6b975b1dc60b928117916285ceb4aa5c6d7b4b8cc48038083e074037caa8700c0`
  

  The parameters of unlocking contract is as follows:
  - `string` :
  ```js
  {
    "type": "string",
    "raw_data": {
      "value": "string"
    }
  }
  ```
  or
  ```js
  {
    "type": "data",
    "raw_data": {
      "value": "737472696e67"
    }
  }
  ```

  The example of unlocking contract transaction:
  ```js
  {
    "base_transaction": null,
    "actions": [
      {
        "output_id": "35fe216572bea7d81effd2fed2db1bc257f977dfa492299742a0dee2a9ae1c8e",
        "arguments": [
          {
            "type": "data",
            "raw_data": {
              "value": "737472696e67"
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

### Tradeoffer  

  `TradeOffer` source code as follows：
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
  - The binary: `547a6413000000007b7b51547ac1631a000000547a547aae7cac`
  - The instruction code: `4 ROLL JUMPIF:$cancel $trade FALSE ROT ROT 1 4 ROLL CHECKOUTPUT JUMP:$_end $cancel 4 ROLL 4 ROLL TXSIGHASH SWAP CHECKSIG $_end`

  If the contract parameters are as follows:
  - `assetRequested` : 1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22
  - `amountRequested` : 99
  - `seller` : 0014c5a5b563c4623018557fb299259542b8739f6bc2
  - `cancelKey` : e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78

  The instantiated contract program: `20e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78160014c5a5b563c4623018557fb299259542b8739f6bc20163201e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22741a547a6413000000007b7b51547ac1631a000000547a547aae7cac00c0`

  The parameters of unlocking contract is as follows: (Please note that the contract contains two clauses, you can choose one when you unlock the contract, where `clause_selector` refers to the position of the selected clause in the contract, the position number starts from `0`. In addition, you need to pay attention to the order of unlocking the contract parameters, otherwise the VM will fail to execute.)
  
  - `clause trade` unlock parameters :
    - `clause_selector` : 
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 0
      }
    }
    ```
    or
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "00"
      }
    }
    ```

    - The action of transaction for the `lock` statement: `lock amountRequested of assetRequested with seller` indicates that the unlocking account needs to pay the number of `amountRequested` asset `assetRequested` to the receiving program `seller`. Please note that the above parameters must be strictly matched, otherwise the contract execution will fail.
    ```js
    {
      "amount": 99,
      "asset_id": "2a1861ba3a5f7bbdb98392b33289465b462fe8e9d4b9c00f78cbcb1ac20fa93f",
      "control_program": "0014c5a5b563c4623018557fb299259542b8739f6bc2",
      "type": "control_program"
    },
    {
      "account_id": "0G1JJF0KG0A06",
      "amount": 99,
      "asset_id": "2a1861ba3a5f7bbdb98392b33289465b462fe8e9d4b9c00f78cbcb1ac20fa93f",
      "type": "spend_account"
    }
    ```

    The example of unlocking contract transaction:
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

  - `clause cancel` unlock parameter :
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
    or
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "01"
      }
    }
    ```

    The example of unlocking contract transaction:
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

### Escrow  

  `Escrow` source code as follows：
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
  - The binary: `537a641a000000537a7cae7cac6900c3c251557ac16328000000537a7cae7cac6900c3c251547ac1`
  - The instruction code: `3 ROLL JUMPIF:$reject $approve 3 ROLL SWAP TXSIGHASH SWAP CHECKSIG VERIFY FALSE AMOUNT ASSET 1 5 ROLL CHECKOUTPUT JUMP:$_end $reject 3 ROLL SWAP TXSIGHASH SWAP CHECKSIG VERIFY FALSE AMOUNT ASSET 1 4 ROLL CHECKOUTPUT $_end`

If the contract parameters are as follows:
  - `agent` : e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78
  - `sender` : 0014905df16bc248790676744bab063a1ae810803bd7
  - `recipient` : 0014929ec7d92f89d74716ba9591eaea588aa1867f75

  The instantiated contract program: `160014929ec7d92f89d74716ba9591eaea588aa1867f75160014905df16bc248790676744bab063a1ae810803bd720e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e787428537a641a000000537a7cae7cac6900c3c251557ac16328000000537a7cae7cac6900c3c251547ac100c0`

  The parameters of unlocking contract is as follows: 
  - `clause approve` unlock parameters :
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
    or
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "00"
      }
    }
    ```

    The example of unlocking contract transaction: (please note the `control_program` must be `recipient`, otherwise will fail to execute)
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

  - `clause reject` unlock parameters :
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
    or
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "01"
      }
    }
    ``` 

    The example of unlocking contract transaction: (please note the `control_program` must be `recipient`,otherwise will fail to execute)
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

### LoanCollateral 

  `LoanCollateral`source code as follows：
  
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
  - The binary: `557a641b000000007b7b51557ac16951c3c251557ac163260000007bcd9f6900c3c251567ac1`
  - The instruction code: `5 ROLL JUMPIF:$default $repay FALSE ROT ROT 1 5 ROLL CHECKOUTPUT VERIFY 1 AMOUNT ASSET 1 5 ROLL CHECKOUTPUT JUMP:$_end $default ROT BLOCKHEIGHT LESSTHAN VERIFY FALSE AMOUNT ASSET 1 6 ROLL CHECKOUTPUT $_end`

If the contract parameters are as follows:
  - `assetLoaned` : 1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22
  - `amountLoaned` : 88
  - `blockHeight` : 1920
  - `lender` : 0014905df16bc248790676744bab063a1ae810803bd7
  - `borrower` : 0014929ec7d92f89d74716ba9591eaea588aa1867f75

  The instantiated contract program: `160014929ec7d92f89d74716ba9591eaea588aa1867f75160014905df16bc248790676744bab063a1ae810803bd70280070158201e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c227426557a641b000000007b7b51557ac16951c3c251557ac163260000007bcd9f6900c3c251567ac100c0`

  The parameters of unlocking contract is as follows:
  - `clause repay` unlock parameters :
    - `clause_selector` : 
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 0
      }
    }
    ```
    or
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "00"
      }
    }
    ```

    - the action of transaction for two consecutive `lock` statements : `lock amountLoaned of assetLoaned with lender` indicates that the unlocking account needs to pay the number of `amountLoaned` asset `assetLoaned` to the receiving program `lender`; `lock valueAmount of valueAsset with borrower` indicates that the unlocking account needs to pay the number of `valueAmount` asset `valueAsset` to the receiving program `borrower`. Please note that the above parameters must be strictly matched, otherwise the contract execution will fail.
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

    The example of unlocking contract transaction:
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
        },怎么样
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

  - `clause default` unlock parameters :
    - `clause_selector` :
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 1
      }
    }
    ```
    or
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "01"
      }
    }
    ```

    The example of unlocking contract transaction:(please note the `control_program` must be `lender`, otherwise will fail to execute)
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


### CallOption

  `CallOption` source code as follows：
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
  - The binary: `557a6420000000547acda069547a547aae7cac69007c7b51547ac1632c000000547acd9f6900c3c251567ac1`
  - The instruction code: `5 ROLL JUMPIF:$expire $exercise FALSE ROT ROT 1 5 ROLL CHECKOUTPUT VERIFY 1 AMOUNT ASSET 1 5 ROLL CHECKOUTPUT JUMP:$_end $expire ROT BLOCKHEIGHT LESSTHAN VERIFY FALSE AMOUNT ASSET 1 6 ROLL CHECKOUTPUT $_end`

If the contract parameters are as follows:
  - `strikePrice` : 199
  - `strikeCurrency` : 1e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c22
  - `seller` : 0014905df16bc248790676744bab063a1ae810803bd7
  - `buyerKey` : e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78
  - `blockHeight` : 3096

  The instantiated contract program: `02180c20e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78160014905df16bc248790676744bab063a1ae810803bd7201e074b22ed7ae8470c7ba5d8a7bc95e83431a753a17465e8673af68a82500c2201c7742c557a6420000000547acda069547a547aae7cac69007c7b51547ac1632c000000547acd9f6900c3c251567ac100c0`

  The parameters of unlocking contract is as follows: 
  - `clause exercise` unlock parameters :
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
    or
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "00"
      }
    }
    ```

    - The action of transaction for the `lock` statement: `lock strikePrice of strikeCurrency with seller` indicates that the unlocking account needs to pay the number of `strikePrice` asset `strikeCurrency` to the receiving program `seller`. Please note that the above parameters must be strictly matched, otherwise the contract execution will fail.
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

    The parameters corresponding to unlocking contract are as follows:
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
          "account_id": "0G1JIR6400A02",    - The action of transaction for the `lock` statement: `lock amountRequested of assetRequested with seller` indicates that the unlocking account needs to pay the number of `amountRequested` asset `assetRequested` to the receiving program `seller`. Please note that the above parameters must be strictly matched, otherwise the contract execution will fail.
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

  - `clause expire` unlock patameters :
    - `clause_selector` : 
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 1
      }
    }
    ```
    or
    ```js
    {
      "type": "data",
      "raw_data": {
        "value": "01"
      }
    }
    ```

    The example of unlocking contract transaction: (please note the `control_program` must be `seller`,otherwise will fail to execute)
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

### PriceChanger

  `PriceChanger` source code as follows:
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
  - The binary: `557a6432000000557a5479ae7cac6900c3c25100597a89587a89587a89587a89557a890274787e008901c07ec1633a000000007b537a51567ac1`
  - The instruction code: `5 05 ROLL JUMPIF:$redeem $changePrice 5 05 ROLL 4 04 PICK TXSIGHASH SWAP CHECKSIG VERIFY FALSE AMOUNT ASSET 1 01 FALSE 9 09 ROLL CATPUSHDATA 8 08 ROLL CATPUSHDATA 8 08 ROLL CATPUSHDATA 8 08 ROLL CATPUSHDATA 5 05 ROLL CATPUSHDATA DATA_2 7478 CAT FALSE CATPUSHDATA DATA_1 c0 CAT CHECKOUTPUT JUMP:$_end $redeem FALSE ROT 3 03 ROLL 1 01 6 06 ROLL CHECKOUTPUT $_end`

  If the contract parameters is as follows:
  - `askAmount` : 20000
  - `askAsset` : c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee
  - `sellerKey` : 055539eb36abcaaf127c63ae20e3d049cd28d0f1fe569df84da3aedb018ca1bf
  - `sellerProg` : 0014dedfd406c591aa221a047a260107f877da92fec5

  The instantiated contract program: 
  `160014dedfd406c591aa221a047a260107f877da92fec520055539eb36abcaaf127c63ae20e3d049cd28d0f1fe569df84da3aedb018ca1bf20c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee02204e3a557a6432000000557a5479ae7cac6900c3c25100597a89587a89587a89587a89557a890274787e008901c07ec1633a000000007b537a51567ac1747800c0`

  The parameters of unlocking contract is as follows:
  - `clause changePrice` unlock patameters :
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

    After the contract parameter is constructed, you need to specify the receiving object in the contract `lock` statement. `lock valueAmount of valueAsset with PriceChanger(newAmount, newAsset, sellerKey, sellerProg)` statement indicates that the unlocked value is relocked into the new contract object, the receiver is instantiated contract program with parameters is that：
    - `newAmount` : 10000
    - `newAsset` : 3addca837514d599c509aed802c0b7671838b363a298cbcb0acb06bc24076cf4
    - `sellerKey` : 055539eb36abcaaf127c63ae20e3d049cd28d0f1fe569df84da3aedb018ca1bf
    - `sellerProg` : 0014dedfd406c591aa221a047a260107f877da92fec5

    &nbsp; 
    The instantiated contract program:  
    `160014dedfd406c591aa221a047a260107f877da92fec520055539eb36abcaaf127c63ae20e3d049cd28d0f1fe569df84da3aedb018ca1bf203addca837514d599c509aed802c0b7671838b363a298cbcb0acb06bc24076cf40210273a557a6432000000557a5479ae7cac6900c3c25100597a89587a89587a89587a89557a890274787e008901c07ec1633a000000007b537a51567ac1747800c0`

    &nbsp;
    The example of unlocking contract transaction: 
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

  - `clause redeem` unlock patameters :
    - `clause_selector` :
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 1
      }
    }
    ```

    The example of unlocking contract transaction:
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

### PartLoanCollateral
  `PartLoanCollateral` source code as follows:
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
  - The binary: 
  `567a6477000000567900a0577954799f9a916164630000000057795379515879c16951c3587995547996c2515979c16952c3767c59799555799694c251005a798959798958798957795c7994895679895579890274787e008901c07ec16963720000000070515879c16951c3c2515979c1696383000000537acd9f6900c3c251577ac1`
  - The instruction code: `6 06 ROLL JUMPIF:$default $repay 6 06 PICK FALSE GREATERTHAN 7 07 PICK 4 04 PICK LESSTHAN BOOLAND NOT NOP JUMPIF 63000000 FALSE 7 07 PICK 3 03 PICK 1 01 8 08 PICK CHECKOUTPUT VERIFY 1 01 AMOUNT 8 08 PICK MUL 4 04 PICK DIV ASSET 1 01 9 09 PICK CHECKOUTPUT VERIFY 2 02 AMOUNT DUP SWAP 9 09 PICK MUL 5 05 PICK DIV SUB ASSET 1 01 FALSE 10 0a PICK CATPUSHDATA 9 09 PICK CATPUSHDATA 8 08 PICK CATPUSHDATA 7 07 PICK 12 0c PICK SUB CATPUSHDATA 6 06 PICK CATPUSHDATA 5 05 PICK CATPUSHDATA DATA_2 7478 CAT FALSE CATPUSHDATA DATA_1 c0 CAT CHECKOUTPUT VERIFY JUMP 72000000 FALSE 2OVER 1 01 8 08 PICK CHECKOUTPUT VERIFY 1 01 AMOUNT ASSET 1 01 9 09 PICK CHECKOUTPUT VERIFY JUMP:$_end $default 3 03 ROLL BLOCKHEIGHT LESSTHAN VERIFY FALSE AMOUNT ASSET 1 01 7 07 ROLL CHECKOUTPUT $_end`

  If the contract parameters is as follows:
  - `assetLoaned` : c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee
  - `amountLoaned` : 8000
  - `blockHeight` : 1900
  - `lender` : 0014dedfd406c591aa221a047a260107f877da92fec5
  - `borrower` : 0014bf54f5adbbd2dc11bffb50277b5a993cec75e924

  The instantiated contract program: `160014bf54f5adbbd2dc11bffb50277b5a993cec75e924160014dedfd406c591aa221a047a260107f877da92fec5026c0702401f20c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee4c83567a6477000000567900a0577954799f9a916164630000000057795379515879c16951c3587995547996c2515979c16952c3767c59799555799694c251005a798959798958798957795c7994895679895579890274787e008901c07ec16963720000000070515879c16951c3c2515979c1696383000000537acd9f6900c3c251577ac1747800c0`

  The parameters of unlocking contract is as follows:
  - `clause changePrice` unlock patameters :
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

    The `if-else` statement block of the contract contains the `lock` statement, besides the number of `lock` statements below the `if` statement is different from the number of `lock` statements under the `else` statement, therefore the execution process needs to be pre-judged before unlocked the contract. The execution process is under the `if` statement block when `amountPartLoaned` is equal to 2000 which is less than `amountLoaned` with 8000, otherwise it's the `else` statement block. furthermore, the numeric expression in the lock statement needs to be calculated by the user before using it. If the locked value `valueAmount` is 3000, then the `valueAmount*amountPartLoaned/amountLoaned` is 750 and the `valueAmount-(valueAmount*amountPartLoaned/amountLoaned)` is 2250. finally, `lock valueAmount of valueAsset with PriceChanger(newAmount, newAsset, sellerKey, sellerProg)` statement indicates that the unlocked value is relocked into the new contract object, the receiver is instantiated contract program with parameters is that：
    - `assetLoaned` : c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee
    - `amountLoaned` : 6000
    - `blockHeight` : 1900
    - `lender` : 0014dedfd406c591aa221a047a260107f877da92fec5
    - `borrower` : 0014bf54f5adbbd2dc11bffb50277b5a993cec75e924

    &nbsp; 
    The instantiated contract program: 
    `160014bf54f5adbbd2dc11bffb50277b5a993cec75e924160014dedfd406c591aa221a047a260107f877da92fec5026c0702701720c6b12af8326df37b8d77c77bfa2547e083cbacde15cc48da56d4aa4e4235a3ee4c83567a6477000000567900a0577954799f9a916164630000000057795379515879c16951c3587995547996c2515979c16952c3767c59799555799694c251005a798959798958798957795c7994895679895579890274787e008901c07ec16963720000000070515879c16951c3c2515979c1696383000000537acd9f6900c3c251577ac1747800c0`
    
    &nbsp;
    The example of unlocking contract transaction:
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

    The execution process is the `else` block when the `amountPartLoaned` greater than or equal to the `amountLoaned` which value is 8000, the example of unlocking contract transaction: 
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

  - `clause default` unlock patameters :
    - `clause_selector` :
    ```js
    {
      "type": "integer",
      "raw_data": {
        "value": 1
      }
    }
    ```

    The example of unlocking contract transaction:
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