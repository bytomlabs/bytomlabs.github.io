## Flow of building a contract

### Parameters of contract


The parameters of equity contract mainly include `contract` parameters and `clause` parameters. The notes for the parameters are as follows:

  - Calling the compile contract API `compile` without arguments is to compile the contract. Adding the arguments in the list of `contract` parameters by order is instantiating the contract.
  - Create an unlock contract transaction should add `clause` parameters by order.
  - The `Signature` type can only appear in `Clause` parameters and cannot appear in `contract` parameters.
  - If the contract contains multiple clauses, the user only need to select one of the `clause` to unlock contract. besides, it should be add extra parameters `clause_selector` (unsigned integer type, little endian storage), `clause_selector` is specified according to the order of the contract `clause`,the range of `clause_selector` is `0 ~ n-1` when the count of contract clauses is `n`, at the same time, the `clause_selector` of the first clause is `0`, and the `clause_selector` of the second clause is `1`, and so on.

If the parameters of contract's clause contain `Signature`, the related signature parameters `root_xpub` and `derivation_path` need to be provided when constructing the unlock contract transaction, because `Signature` must be acquired by calling the `sign-transaction` API. The parameters `root_xpub` and `derivation_path` can be obtained by calling the `list-pubkeys` API. In addition, `Signature` is generally used with `PublicKey`, ie the parameters `root_xpub` and `derivation_path` need to be associated with the public key `pubkey`，otherwise the result of runing contract will be fail.

The parameters of [`list-pubkeys`](https://github.com/Bytom/bytom/wiki/API-Reference#list-pubkeys) are as follows:
  - `String` - *account_id*, account ID.
  - `String` - *account_alias*, account alias.
  - `String` - *public_key*, publickey.

The json format of its request and response is as follows:
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

### Compile contract
Compiling contract is to compile a contract into an executable virtual machine instructions. When the contract has `contract` parameters, these parameters need to be instantiated before that the contract is locked, because these parameters are restrictions for unlocking the contract.

Compiling contract currently supports two methods, one is to use the `equity` compilation tool, and the other is to call the API `compile`.The [`equity` compilation tool](https://github.com/Bytom/equity) is as follows:
```
./equity <contract_file> [flags]
```

flags：
```
    --bin        Binary of the contracts in hex.
    --instance   Object of the Instantiated contracts.
    --shift      Function shift of the contracts.
```

Take `LockWithPublicKey` as an example, compile and instantiate the contract as follows:
```
./equity LockWithPublicKey --instance e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78
```

response：
```
======= LockWithPublicKey =======
Instantiated program:
20e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e787403ae7cac00c0
```

The parameters of compiling contract API [`compile`](https://github.com/Bytom/bytom/wiki/API-Reference#compile) are as follows:
- `String` - *contract*, content of contract
- `Array of Object` - *args*, contract parameter structure (array type).
  - `Boolean` - *boolean*, the boolean type of contract parameter, The basic type included is `Boolean`.
  - `Integer` - *integer*, the integer type of contract parameter, The basic types included are `Integer` and `Amount`.
  - `String` - *string*, the string type of contract parameter, The basic types included are `String`、`Asset`、`Hash`、`Program` and `PublicKey`.

Take `LockWithPublicKey` as an example, the json format of the request and response is as follows:
```js
// Request
{
  "contract": "contract LockWithPublicKey(publicKey: PublicKey) locks locked { clause unlockWithSig(sig: Signature) { verify checkTxSig(publicKey, sig) unlock locked }}",
  "args": [
    {
      "string": "e9108d3ca8049800727f6a3505b3a2710dc579405dde03c250f16d9a7e1e6e78"
    }
  ]
}

// Result
{
  "name": "LockWithPublicKey",
  "source": "contract LockWithPublicKey(publicKey: PublicKey) locks locked { clause unlockWithSig(sig: Signature) { verify checkTxSig(publicKey, sig) unlock locked }}",
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

### Lock contract

The lock contract actually refers the deployment of contract. The essence is to call the API `build-transaction` to send the asset to the contract-specific program. Just set the receiver `control_program` to the specified contract. The template for constructing the lock contract transaction is as follows: (Note: contract transactions do not support transactions in which the recipient's assets are BTM at the moment.)
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

After the deployment is successful, the transaction can be signed `sign-transaction`, `sign_complete` is `true` indicating that the signature is successful, then the signed-transaction can be submitted into the transaction-pools through `submit-transaction`, waiting for the transaction to be confirmed. 

----

### Find contract UTXO

After the contract transaction is successfully submitted, then you can unlock the contract-locked assets, you need to find the contract UTXO before unlocking the contract.

You can find the contract UTXO by calling the API `list-unspent-outputs` with `smart_contract` is `true`, otherwise you will not find it. The parameters are as follows:
- `String` - `id`, the outputID.
- `Boolean` - `smart_contract`, whether to find the contract UTXO by the flag.

The input and output results are as follows:
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
After finding the contract UTXO, the parameters of contract can be parsed through the API [`decode-program`](https://github.com/Bytom/bytom/wiki/API-Reference#decode-program), the user can judge whether the contract can be unlocked according to the existing contract parameters.

----

### Unlock contract

Unlocking contract refers calling the contract, the essence is to add the correct contract parameters into transaction so that the contract program can be successfully executed in the virtual machine. Currently, the contract-related parameters can be added into the array parameters `arguments` which are in the the `action` structure of `spend_account_unspent_output` for API `build-transaction`. The parameters are as follows:

1） `RawTxSigArgument` type is `raw_tx_signature`, it contains `xpub` and `derivation_path`, in addition, the `publickey` is generated by `xpub` and `derivation_path`(These parameters can be obtained through the API `list-pubkeys`).
  - `xpub` root publickey.
  - `derivation_path` derivation path.
  
The format is as follows:
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

2） `DataArgument` type is `data`, this type is compatible with all contract parameter types except `rawTxSigArgument`, whose value is a hexadecimal string, the format is as follows:
```js
{
  "type": "data",
  "raw_data": {
    "value": "b3f37834dfa74174e9f0d208302e77c637cfe66c3e37fe1e1574e416b3516e89"
  }
}
```

3）`BoolArgument` type is `boolean`, the format is as follows:：
```js
{
  "type": "boolean",
  "raw_data": {
    "value": true
  }
}
```

4）`IntegerArgument` type is `integer`, the format is as follows:
```js
{
  "type": "integer",
  "raw_data": {
    "value": 10000
  }
}
```

5）`StrArgument` type is `string`, the format is as follows:
```js
{
  "type": "string",
  "raw_data": {
    "value": "this is a test string"
  }
}
```

Taking the contract `LockWithPublicKey` as an example, the template for unlocking a contract transaction is as follows:
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

After the deployment is successful, the transaction can be signed `sign-transaction`, `sign_complete` is `true` indicating that the signature is successful, then the signed-transaction can be submitted into the transaction-pools through `submit-transaction`, waiting for the transaction to be confirmed. 
