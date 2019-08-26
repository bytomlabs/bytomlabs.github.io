---
title: Explorer API
---

# Explorer API

The API provides you with a convenient, powerful and simple way to read data from the bytom network and build your own services with it. The API allows to use the real-time analytical data about bytom blockchain transactions, addresses and assets. Below is the list of APIs, 1 request per second. Please do not exceed the limits or you'll be banned. If you have specific needs, please let us know, we are ready to help you.

<a name="cea10d22"></a>
## API Host

Default api host:

| Network | URL |
| :---: | :---: |
| mainnet | [https://blockmeta.com/api/v2](https://blockmeta.com/api/v2) |
| testnet | [https://blockmeta.com/api/wisdom](https://blockmeta.com/api/wisdom) |


A complete request example via `curl`:

```bash
// curl -X GET url/method
curl -X GET https://blockmeta.com/api/v2/blocks
```

<a name="a5ba1f41"></a>
## API Methods

<a name="f88328a9"></a>
#### `address`

Get address asset balance,receive asset amount,sent asset amount and recent transactions.

<a name="Method"></a>
##### Method

- /address/<string:address>
- /address/<string:address>/asset/<string:asset_id>

<a name="Parameters"></a>
##### Parameters

- `String` - _address_, address of account<br />
optional:
- `String` - _asset_id_, asset_id
- `Integer` - _page_, page number of address transactions
- `Integer` - _limit_, transaction number per page

<a name="Example"></a>
##### Example

```bash
// Request
curl -X GET https://blockmeta.com/api/v2/address/bm1qsk6dj6pym7yng0ev7wne7tm3d54ea2sjz5tyxk?limit=1&page=1
// Response
{
    "address": "bm1qsk6dj6pym7yng0ev7wne7tm3d54ea2sjz5tyxk",
    "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    "balance": 154263689273022,
    "receive": 382483033706493,
    "sent": 228219344433471,
    "join_timestamp": 1525523171,
    "miner": 0,
    "transactions": [
        {
            "id": "7cce3bcf4fc261fd7693fffc4c71d092e97624e24529a386a49cbfdc222bbe76",
            "version": 1,
            "size": 81,
            "time_range": 0,
            "status_fail": false,
            "mux_id": "08514648d1ef7643f19db5f1ca4b456a6237d410001e8c75c03c6e9eb9efbc85",
            "height": 66586,
            "chain_status": "mainnet",
            "coinbase": 1,
            "detail": [
                {
                    "type": "coinbase",
                    "asset_id": "0000000000000000000000000000000000000000000000000000000000000000",
                    "amount": 0,
                    "arbitrary": "003636353836",
                    "transaction_id": "7cce3bcf4fc261fd7693fffc4c71d092e97624e24529a386a49cbfdc222bbe76",
                    "io": 0
                },
                {
                    "type": "control",
                    "id": "f23771e954386c7c86d5a41e5bbaa03c61d8e1c4397c762143a9176b9a432ae4",
                    "position": 0,
                    "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                    "amount": 41250000000,
                    "control_program": "001485b4d96824df89343f2cf3a79f2f716d2b9eaa12",
                    "address": "bm1qsk6dj6pym7yng0ev7wne7tm3d54ea2sjz5tyxk",
                    "transaction_id": "7cce3bcf4fc261fd7693fffc4c71d092e97624e24529a386a49cbfdc222bbe76",
                    "io": 1
                }
            ]
        }
    ],
    "pagination": {
        "current": 1,
        "limit": 1,
        "total": 9532
    }
}
```

<a name="62879867"></a>
#### `asset`

Get asset details by asset id.

<a name="Method-1"></a>
##### Method

/asset/<string:asset_id>

<a name="Parameters-1"></a>
##### Parameters

- `String` - _asset_id_, asset_id<br />
optional:
- `Integer` - _page_, page number of asset transactions
- `Integer` - _limit_, transaction number per page

<a name="Example-1"></a>
##### Example

```bash
// Request
curl -X GET https://blockmeta.com/api/v2/asset/04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141?page=1&limit=1
// Response
{
    "issuance_program": "ae20dd98f21845f4e7c76224fd870a47ab9425210075ed4281ecd6ed1085f25b4c7a5151ad",
    "total_amount": 1000000000000,
    "decimals": 8,
    "description": "",
    "name": "",
    "symbol": "",
    "issue_timestamp": 1527315522,
    "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
    "transactions": [
        {
            "id": "7f706976ca9f85bdf9dabdfa1f9e2cfb3364795f90f58b8f644deb8b00246399",
            "version": 1,
            "size": 595,
            "time_range": 0,
            "status_fail": false,
            "mux_id": "8e495d3b10756fccf37d3107f148ad18b4ecaa42a1410b3183c3d4360cace985",
            "height": 37425,
            "chain_status": "mainnet",
            "coinbase": 0,
            "detail": [
                {
                    "type": "spend",
                    "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                    "amount": 668600000,
                    "control_program": "0014242b44609cb269ac51c9cb00913b3107b382ded9",
                    "address": "bm1qys45gcyukf56c5wfevqfzwe3q7ec9hkej65lfd",
                    "spent_output_id": "b8ff07e2e174ae3f94537604a64ad9b98b5fa61de4e476c7230aacbf75ebb7b5",
                    "transaction_id": "7f706976ca9f85bdf9dabdfa1f9e2cfb3364795f90f58b8f644deb8b00246399",
                    "io": 0
                },
                {
                    "type": "spend",
                    "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
                    "amount": 997700000000,
                    "control_program": "0014b276cf1001cbb171d63620915d9f558348db6dad",
                    "address": "bm1qkfmv7yqpewchr43kyzg4m864sdydkmddp5mfxf",
                    "spent_output_id": "839719c68fbe8a7f780663e713805a2c581b4943ba24b8653b7d35a00a273d55",
                    "transaction_id": "7f706976ca9f85bdf9dabdfa1f9e2cfb3364795f90f58b8f644deb8b00246399",
                    "io": 0
                },
                {
                    "type": "control",
                    "id": "8a55da87a17f0fa5c132a53e5c11e62c3254b7dfa09deed71c5b579b62ba20e5",
                    "position": 0,
                    "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                    "amount": 667700000,
                    "control_program": "001410d780309dfb4aefda4e49bbf1a01881c465fe9e",
                    "address": "bm1qzrtcqvyald9wlkjwfxalrgqcs8zxtl57tea5cw",
                    "transaction_id": "7f706976ca9f85bdf9dabdfa1f9e2cfb3364795f90f58b8f644deb8b00246399",
                    "io": 1
                },
                {
                    "type": "control",
                    "id": "7264906e06e4709817c230955bc8786be2a6e5a69cc223780e70681f7ea96fd3",
                    "position": 1,
                    "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
                    "amount": 997200000000,
                    "control_program": "0014b8b64446c452d3e377ba62ab3f0c8650002a20eb",
                    "address": "bm1qhzmyg3ky2tf7xaa6v24n7ryx2qqz5g8ty4jcrc",
                    "transaction_id": "7f706976ca9f85bdf9dabdfa1f9e2cfb3364795f90f58b8f644deb8b00246399",
                    "io": 1
                },
                {
                    "type": "control",
                    "id": "049c4fb1367f6675645f523cc943a6a6c41b069072d60711f088b92061f2fa4b",
                    "position": 2,
                    "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
                    "amount": 500000000,
                    "control_program": "0014c1dcaedc48e0b3c029485d509a0fca157e987f31",
                    "address": "bm1qc8w2ahzguzeuq22gt4gf5r72z4lfsle3ltk8d2",
                    "transaction_id": "7f706976ca9f85bdf9dabdfa1f9e2cfb3364795f90f58b8f644deb8b00246399",
                    "io": 1
                }
            ]
        }
    ],
    "pagination": {
        "current": 1,
        "limit": 1,
        "total": 9
    }
}
```

<a name="7ed2da57"></a>
#### `assets`

Get assets issued on bytom network

<a name="Method-2"></a>
##### Method

/assets

<a name="Parameters-2"></a>
##### Parameters

optional:

- `Integer` - _page_, page number of assets
- `Integer` - _limit_, asset number per page

<a name="Example-2"></a>
##### Example

```bash
// Request
curl -X GET https://blockmeta.com/api/v2/assets?page=3&limit=10
// Response
{
    "assets": [
        {
            "issuance_program": "ae2067efe306cb96f7f481bd88c6325a77900d32b276e64a8a576c06f5f7bf6988e95151ad",
            "total_amount": 210000000000000000,
            "decimals": 8,
            "description": "Bytom Official Issue",
            "name": "BTM",
            "symbol": "BTM",
            "s_timestamp": 1533010776.991276,
            "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        },
        {
            "issuance_program": "ae20237e66a9ef0b181c5b15ef6fc74e2f331c83aa6cb5606315f34eb81817c489c45151ad",
            "total_amount": 8400000000000000,
            "decimals": 8,
            "description": "",
            "name": "",
            "symbol": "",
            "issue_timestamp": 1533021975,
            "s_timestamp": 1533022247.9164958,
            "asset_id": "ce0ba852a65dfa445548e3a66f78aec1fd3011f74b7268ed0e0598928706ae80"
        },
        {
            "issuance_program": "ae204f92fc3eb7c82cd27471966a098187583ce6d6bd02264c04e5d148df35fe8eed5151ad",
            "total_amount": 1000000000000000000,
            "decimals": 8,
            "description": "",
            "name": "",
            "symbol": "",
            "issue_timestamp": 1533092470,
            "s_timestamp": 1533092546.611149,
            "asset_id": "d5e348366a1c341dc60759e0de102bded16a3565c6038ffbe846a54073750e68"
        }
    ],
    "pagination": {
        "current": 3,
        "limit": 10,
        "total": 3
    }
}
```

<a name="eb1f8cd6"></a>
#### `block`

Get block by block height or block hash

<a name="Method-3"></a>
##### Method

- /block/<int:height>
- /block/<string:hash>

<a name="Parameters-3"></a>
##### Parameters

- `Integer` - _height_, block height
- `String` - _hash_, block hash

<a name="Example-3"></a>
##### Example

```bash
// Request
curl -X GET https://blockmeta.com/api/v2/block/58680
curl -X GET https://blockmeta.com/api/v2/block/844e8d97fa66980f603f5a8f626dc610d3891058e056e0aa13797196fe704754
// Response
{
    "hash": "844e8d97fa66980f603f5a8f626dc610d3891058e056e0aa13797196fe704754",
    "size": 414,
    "version": 1,
    "height": 58680,
    "previous_block_hash": "359912beb873c9526ff223393e2b84ce0100d7a47d90463fa036e0e73177d0d8",
    "timestamp": 1531984680,
    "nonce": 229687365138347316,
    "bits": 2017612633070008956,
    "difficulty": "8977184039",
    "transaction_merkle_root": "1f3f8260d63899be7e92fa33e6e4a60eb0acca08885abc3672c993c29cd9ed56",
    "transaction_status_hash": "c9c377e5192668bc0a367e4a4764f11e7c725ecced1d7b6a492974fab1b6d5bc",
    "hash_rate": 280537001,
    "transaction_count": 1,
    "chain_status": "mainnet",
    "transactions": [
        {
            "id": "a641f07626381617303dedc3fa17a797982f30fc2e49a9abe98193b5aa5d743a",
            "version": 1,
            "size": 81,
            "time_range": 0,
            "status_fail": false,
            "mux_id": "3ea24fade77a8dee0110bfc8a90397344d31aa7de67d88e60641294c29e4c4bc",
            "height": 58680,
            "chain_status": "mainnet",
            "coinbase": 1,
            "detail": [
                {
                    "type": "coinbase",
                    "asset_id": "0000000000000000000000000000000000000000000000000000000000000000",
                    "amount": 0,
                    "arbitrary": "003538363830",
                    "transaction_id": "a641f07626381617303dedc3fa17a797982f30fc2e49a9abe98193b5aa5d743a",
                    "io": 0
                },
                {
                    "type": "control",
                    "id": "f0937105fa1b60527d9ca475a2780e57e4e9708342ff2dcc963be52cd7ce08e8",
                    "position": 0,
                    "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                    "amount": 41250000000,
                    "control_program": "0014c190f77b1e7adadae97e69a6a7d7762649c6e04f",
                    "address": "bm1qcxg0w7c70tdd46t7dxn204mkyeyudcz063s49e",
                    "transaction_id": "a641f07626381617303dedc3fa17a797982f30fc2e49a9abe98193b5aa5d743a",
                    "io": 1
                }
            ]
        }
    ]
}
```

<a name="57ec8edb"></a>
#### `blocks`

Get latest blocks

<a name="Method-4"></a>
##### Method

/blocks

<a name="Parameters-4"></a>
##### Parameters

optional:

- `Integer` - _page_, page number of blocks
- `Integer` - _limit_, block number per page

<a name="Example-4"></a>
##### Example

```bash
// Request
curl -X GET https://blockmeta.com/api/v2/blocks?page=1&limit=10
// Response
{
    "blocks": [
        {
            "hash": "3715fc97b05258e95fa94020c76a827c901b8837fb16b86f3468781e70ca9d62",
            "size": 30552,
            "version": 1,
            "height": 66692,
            "previous_block_hash": "3350cd6f58095d1745d8e95588cab3157652bdcbe1d0c38ab5138b07b7aa07e1",
            "timestamp": 1533123349,
            "nonce": 4613934258141154516,
            "bits": 2017612633068329013,
            "difficulty": "11353365045",
            "transaction_merkle_root": "4e21072695092af28edfeedd96599e00999eddcb640b264f8d448e3289612a08",
            "transaction_status_hash": "cc25f1c0862b2b31d43d4dfb8e2a6b4e4c7e4a3ec18127494e349747e327d336",
            "hash_rate": 241560958,
            "transaction_count": 46,
            "chain_status": "mainnet"
        },
        {
            "hash": "3350cd6f58095d1745d8e95588cab3157652bdcbe1d0c38ab5138b07b7aa07e1",
            "size": 3090,
            "version": 1,
            "height": 66691,
            "previous_block_hash": "ba46306d4a6b5d1fe9054d034fb65756b9ef3e89c6bbfa6917c670d6f47d42bd",
            "timestamp": 1533123302,
            "nonce": 89640530873195,
            "bits": 2017612633068329013,
            "difficulty": "11353365045",
            "transaction_merkle_root": "137ee94fe7a30cd0882e1b2e7172f4ad7f7722f7c4cf90be647702e897b79c1d",
            "transaction_status_hash": "ca8e7c022f80a5d5dbc02b8a73234c9ab9069fa0db0f235b2fb8ccd1d6036069",
            "hash_rate": 55113422,
            "transaction_count": 5,
            "chain_status": "mainnet"
        },
        {
            "hash": "ba46306d4a6b5d1fe9054d034fb65756b9ef3e89c6bbfa6917c670d6f47d42bd",
            "size": 14476,
            "version": 1,
            "height": 66690,
            "previous_block_hash": "f49f8eb7c99a6450f58d151cd925fa98fd999783a21019e2df94c85e25dac8f1",
            "timestamp": 1533123096,
            "nonce": 3602968342337572314,
            "bits": 2017612633068329013,
            "difficulty": "11353365045",
            "transaction_merkle_root": "8b25a36e78568c326d5eb4d2e867e2469da4479fa5ea31ab83c3e57abcd4cb6e",
            "transaction_status_hash": "aa210fec0e249e9121e51546c9c9c3e3e3515ceb8e065511a64b218a442dc34e",
            "hash_rate": 103212409,
            "transaction_count": 22,
            "chain_status": "mainnet"
        },
        {
            "hash": "f49f8eb7c99a6450f58d151cd925fa98fd999783a21019e2df94c85e25dac8f1",
            "size": 1754,
            "version": 1,
            "height": 66689,
            "previous_block_hash": "40b0f92cfeb3399bf0bc1f2ca2928251cb45448cf55bf7491952442dca276db7",
            "timestamp": 1533122986,
            "nonce": 4323828896408748377,
            "bits": 2017612633068329013,
            "difficulty": "11353365045",
            "transaction_merkle_root": "58b875a9273d86b233ce1312a7cbbc81db3f801127ef2a14936917fe06e022e2",
            "transaction_status_hash": "a4489d66751139d2d3f120b2dacf4a8c52e6cadd7de603dc8ef1c66c350cba74",
            "hash_rate": 810954646,
            "transaction_count": 3,
            "chain_status": "mainnet"
        },
        {
            "hash": "40b0f92cfeb3399bf0bc1f2ca2928251cb45448cf55bf7491952442dca276db7",
            "size": 32558,
            "version": 1,
            "height": 66688,
            "previous_block_hash": "3ff5d46b3534c38cc70728143565ae921826446d4194c6fd50e0e517a3af6eb0",
            "timestamp": 1533122972,
            "nonce": 91358249423491,
            "bits": 2017612633068329013,
            "difficulty": "11353365045",
            "transaction_merkle_root": "b676607fd5b141bc1bbd23ee08eace3c54278aad20845af95ac0f2e469455b4b",
            "transaction_status_hash": "7f8b345fd77260927f389ecb461255d7aa0b16a92bb943f6575b6406cff28051",
            "hash_rate": 33003968,
            "transaction_count": 49,
            "chain_status": "mainnet"
        },
        {
            "hash": "3ff5d46b3534c38cc70728143565ae921826446d4194c6fd50e0e517a3af6eb0",
            "size": 9124,
            "version": 1,
            "height": 66687,
            "previous_block_hash": "42c6d38a72136b818e08b5e4ac67224028c873526d4dd81ac132dc0caae372e4",
            "timestamp": 1533122628,
            "nonce": 74031462222925425,
            "bits": 2017612633068329013,
            "difficulty": "11353365045",
            "transaction_merkle_root": "35acfb92df484b57a4e362486c0bb241c95ad9e8880ee4dff96ed86bf7405d84",
            "transaction_status_hash": "06208aecbc8ebbba0fe1c6c8ecaed7898d4e9fc567af6289c242cf34dae958af",
            "hash_rate": 157685625,
            "transaction_count": 14,
            "chain_status": "mainnet"
        },
        {
            "hash": "42c6d38a72136b818e08b5e4ac67224028c873526d4dd81ac132dc0caae372e4",
            "size": 1754,
            "version": 1,
            "height": 66686,
            "previous_block_hash": "d6a78e1f6b5ce84b042922e12efec2a827928735cbb9b3536154a7ac8104a5ed",
            "timestamp": 1533122556,
            "nonce": 91083873957844322,
            "bits": 2017612633068329013,
            "difficulty": "11353365045",
            "transaction_merkle_root": "7d075cbb8b797313ac90dc4aea9be649dc6504a5d3406c9b81806c455b2a55b2",
            "transaction_status_hash": "a4489d66751139d2d3f120b2dacf4a8c52e6cadd7de603dc8ef1c66c350cba74",
            "hash_rate": 202738661,
            "transaction_count": 3,
            "chain_status": "mainnet"
        },
        {
            "hash": "d6a78e1f6b5ce84b042922e12efec2a827928735cbb9b3536154a7ac8104a5ed",
            "size": 39932,
            "version": 1,
            "height": 66685,
            "previous_block_hash": "c0b1eb3ef3e90e15acfaba57b6250c30bd5b1f564b7f9765787b670378a35bdc",
            "timestamp": 1533122500,
            "nonce": 4194339850092046483,
            "bits": 2017612633068329013,
            "difficulty": "11353365045",
            "transaction_merkle_root": "651a0b0ca5dd4a1ebe56324f953ef0ecb99a63e08f526ba7e288e19186b7184b",
            "transaction_status_hash": "a6b4433cd4cc98934a0334509aff9d2dea0ba685cbffb0db4c03eaf693a1a945",
            "hash_rate": 13049844,
            "transaction_count": 60,
            "chain_status": "mainnet"
        },
        {
            "hash": "c0b1eb3ef3e90e15acfaba57b6250c30bd5b1f564b7f9765787b670378a35bdc",
            "size": 1754,
            "version": 1,
            "height": 66684,
            "previous_block_hash": "03266dfef52a070aa530eb0fd2888125283301c37f9645abdd8eeae32d96044f",
            "timestamp": 1533121630,
            "nonce": 4770121628526893245,
            "bits": 2017612633068329013,
            "difficulty": "11353365045",
            "transaction_merkle_root": "f7dee684af790dd4206de4c119087e5df3599226cae65f17d96bbae0092838e1",
            "transaction_status_hash": "a4489d66751139d2d3f120b2dacf4a8c52e6cadd7de603dc8ef1c66c350cba74",
            "hash_rate": 1032124095,
            "transaction_count": 3,
            "chain_status": "mainnet"
        },
        {
            "hash": "03266dfef52a070aa530eb0fd2888125283301c37f9645abdd8eeae32d96044f",
            "size": 5774,
            "version": 1,
            "height": 66683,
            "previous_block_hash": "827da542f0da085ca66a2e83df2d53f20f2d906e5e3b1f2a4720327cb83039c7",
            "timestamp": 1533121619,
            "nonce": 76625012584420006,
            "bits": 2017612633068329013,
            "difficulty": "11353365045",
            "transaction_merkle_root": "baa16a745a24d4b3cb2ae2244f93630f6249d01a226050e985da218ec37e7165",
            "transaction_status_hash": "3c1af31e7207e35fb156b258d53fabb0a3d3dab4dda3080d396494fb188c340c",
            "hash_rate": 283834126,
            "transaction_count": 9,
            "chain_status": "mainnet"
        }
    ],
    "pagination": {
        "current": 1,
        "limit": 10,
        "total": 6670
    }
}
```

<a name="2c34610b"></a>
#### `daily`

Get daily statistic of bytom network

<a name="Method-5"></a>
##### Method

/stat/daily

<a name="Parameters-5"></a>
##### Parameters

optional:

- `Integer` - _from_, start timestamp of statistic
- `Integer` - _to_, end timestamp of statistic

<a name="Example-5"></a>
##### Example

```bash
// Request
curl -X GET https://blockmeta.com/api/v2/stat/daily
// Response
[
    {
        "date": "2018-08-01",
        "mainnet_block_count": 377,
        "orphan_block_count": 1,
        "transaction_count": 488,
        "transaction_amount": 1261058177984834,
        "transaction_fee": 1067204216,
        "transaction_gas": 5336021.08,
        "new_address_count": 102,
        "new_asset_count": 1
    }
]
```

<a name="40c76968"></a>
#### `difficulty`

Get difficulty statistic of bytom network

<a name="Method-6"></a>
##### Method

/stat/difficulty

<a name="Parameters-6"></a>
##### Parameters

optional:

- `Integer` - _from_, start timestamp of statistic
- `Integer` - _to_, end timestamp of statistic

<a name="Example-6"></a>
##### Example

```bash
// Request
curl -X GET https://blockmeta.com/api/v2/stat/difficulty?from=1530874300&to=15312384200
// Response
[
    {
        "change_time": "2018-07-08 04:45:51",
        "difficulty": 10452505013,
        "change_rate": "14.3%"
    },
    {
        "change_time": "2018-07-12 04:00:51",
        "difficulty": 9217527092,
        "change_rate": "-11.82%"
    },
    {
        "change_time": "2018-07-15 20:49:28",
        "difficulty": 8721820207,
        "change_rate": "-5.38%"
    },
    {
        "change_time": "2018-07-19 06:28:40",
        "difficulty": 8977184039,
        "change_rate": "2.93%"
    },
    {
        "change_time": "2018-07-22 19:20:11",
        "difficulty": 8883415522,
        "change_rate": "-1.04%"
    },
    {
        "change_time": "2018-07-26 03:21:49",
        "difficulty": 9322699206,
        "change_rate": "4.94%"
    },
    {
        "change_time": "2018-07-29 02:45:08",
        "difficulty": 10964255885,
        "change_rate": "17.61%"
    },
    {
        "change_time": "2018-08-01 11:53:14",
        "difficulty": 11353365045,
        "change_rate": "3.55%"
    }
]
```

<a name="d4433975"></a>
#### `hash-rate`

Get hash rate statistic of bytom network

<a name="Method-7"></a>
##### Method

/stat/hash-rate

<a name="Parameters-7"></a>
##### Parameters

optional:

- `Integer` - _from_, start timestamp of statistic
- `Integer` - _to_, end timestamp of statistic

<a name="Example-7"></a>
##### Example

```bash
// Request
curl -X GET https://blockmeta.com/api/v2/stat/difficulty?from=1530874300&to=15312384200
// Response
[
    [
        1533052800,
        63422994.50333333
    ],
    [
        1533056400,
        61562406.08166666
    ],
    [
        1533060000,
        71880656.02
    ],
    [
        1533063600,
        75958760.63583334
    ],
    [
        1533067200,
        93855763.4063889
    ],
    [
        1533070800,
        59036902.51777778
    ],
    [
        1533074400,
        78712127.97944444
    ],
    [
        1533078000,
        53553248.29472222
    ],
    [
        1533081600,
        90436467.12472223
    ],
    [
        1533085200,
        86353272.05444445
    ],
    [
        1533088800,
        75134306.41916667
    ],
    [
        1533092400,
        86312727.75277779
    ],
    [
        1533096000,
        65323902.23888889
    ],
    [
        1533099600,
        72487528.42305556
    ],
    [
        1533103200,
        56278212.83
    ],
    [
        1533106800,
        67019420.557222225
    ],
    [
        1533110400,
        66181084.608333334
    ],
    [
        1533114000,
        51030506.395833336
    ],
    [
        1533117600,
        85207861.46222222
    ]
]
```

<a name="f1568ee9"></a>
#### `miner`

Get miner statistic of bytom network

<a name="Method-8"></a>
##### Method

/stat/miner

<a name="Parameters-8"></a>
##### Parameters

optional:

- `Integer` - _from_, start timestamp of statistic
- `Integer` - _to_, end timestamp of statistic

<a name="Example-8"></a>
##### Example

```bash
// Request
curl -X GET https://blockmeta.com/api/v2/stat/miner?from=1533052800&to=1533139200
// Response
[
    {
        "address": "bm1q3yt265592czgh96r0uz63ta8fq40uzu5a8c2h0",
        "name": "鱼池",
        "mine_block_count": 198,
        "percent": "49.75%"
    },
    {
        "address": "bm1qcxg0w7c70tdd46t7dxn204mkyeyudcz063s49e",
        "name": "双U",
        "mine_block_count": 79,
        "percent": "19.85%"
    },
    {
        "address": "bm1qp92dpx6c69zrz9gwyde8glpww29yjlu7lxyf2y",
        "name": "国池",
        "mine_block_count": 40,
        "percent": "10.05%"
    },
    {
        "address": "bm1qsk6dj6pym7yng0ev7wne7tm3d54ea2sjz5tyxk",
        "name": "未知矿池1号",
        "mine_block_count": 30,
        "percent": "7.54%"
    },
    {
        "address": "bm1qap4qk88n6sk388lfy55s9z8antz5avp5z3spqp",
        "name": "蜘蛛",
        "mine_block_count": 25,
        "percent": "6.28%"
    },
    {
        "address": "bm1q2lm5c7ajtutcjzhr4cvuge385ygynupe90m7xj",
        "name": "蚂蚁",
        "mine_block_count": 12,
        "percent": "3.02%"
    },
    {
        "address": "bm1q3jymk8ruwslvx568qh98y2u7wuqhaz8gf3pt3q",
        "name": "未知矿池",
        "mine_block_count": 7,
        "percent": "1.76%"
    },
    {
        "address": "bm1qxlvtg7078znef59g039h9f5k40atz7j05s7y3q",
        "name": "未知矿池",
        "mine_block_count": 6,
        "percent": "1.51%"
    },
    {
        "address": "bm1qrwhwspf4mva328xtaeed9fjmgj2u8mqywv887z",
        "name": "蜜蜂",
        "mine_block_count": 1,
        "percent": "0.25%"
    }
]
```

<a name="99677c8c"></a>
#### `nodes`

Get information of all bytom nodes.country include cn,sg,jp,es,de,us,kr,ca,ru,uk

<a name="Method-9"></a>
##### Method

/nodes

<a name="Parameters-9"></a>
##### Parameters

optional:

- `Integer` - _page_, page number of data, page >= 1
- `Integer` - _limit_, number of data per page, max limit is 200
- `String` - _ country_, country the node is located

<a name="Example-9"></a>
##### Example

```bash
// Request
curl -X GET https://blockmeta.com/api/v2/nodes?page=1&limit=2&country=cn
// Response
{
  "nodes": [
    {
      "address": "47.101.167.203:46657",
      "status": "active",
      "height": 243658,
      "status_time": "2019-06-03T09:03:01Z",
      "rtt": 50359363,
      "network": "mainnet",
      "version": "1.0.9+00f77625",
      "is_seed": false,
      "coordinate": {
        "longitude": 120.1614,
        "latitude": 30.2936
      },
      "country": "China",
      "symbol": "cn",
      "name": "iczc"
    },
    {
      "address": "193.112.67.165:46657",
      "status": "busy",
      "height": 243656,
      "status_time": "2019-06-03T09:01:59Z",
      "rtt": 51971962,
      "network": "mainnet",
      "version": "1.0.8+56443ac4",
      "is_seed": false,
      "coordinate": {
        "longitude": 116.3883,
        "latitude": 39.9289
      },
      "country": "China",
      "symbol": "cn",
      "name": "EONE"
    }
  ],
  "pagination": {
    "current": 1,
    "limit": 2,
    "total": 37
  }
}
```

<a name="7853a353"></a>
#### `rank`

Get asset balance rankings of address

<a name="Method-10"></a>
##### Method

/rank/<string:asset_id>

<a name="Parameters-10"></a>
##### Parameters

optional:

- `String` - _asset_id_, asset_id
- `Integer` - _page_, page number of rankings
- `Integer` - _limit_, address number per page

<a name="Example-10"></a>
##### Example

```bash
// Request
https://blockmeta.com/api/v2/rank/04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141?page=1&limit=10
// Response
{
    "address": [
        {
            "address": "bm1qhzmyg3ky2tf7xaa6v24n7ryx2qqz5g8ty4jcrc",
            "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
            "balance": 997200000000,
            "receive": 997200000000,
            "sent": 0,
            "join_timestamp": 1528890869
        },
        {
            "address": "bm1qc8w2ahzguzeuq22gt4gf5r72z4lfsle3ltk8d2",
            "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
            "balance": 1500000000,
            "receive": 2500000000,
            "sent": 1000000000,
            "join_timestamp": 1528888504
        },
        {
            "address": "bm1qlf9cfmn9alm6zjljeaag35h80y4ha2adra7rcz",
            "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
            "balance": 1190000000,
            "receive": 1190000000,
            "sent": 0,
            "join_timestamp": 1528890326
        },
        {
            "address": "bm1qx09067ax6t9t3vekk0uat78ajxhep7tkcezqve",
            "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
            "balance": 100000000,
            "receive": 100000000,
            "sent": 0,
            "join_timestamp": 1528890326
        },
        {
            "address": "bm1qcrz3rnme38v6awccca2l6mmk3dsu5fhafu6v4q",
            "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
            "balance": 10000000,
            "receive": 1300000000,
            "sent": 1290000000,
            "join_timestamp": 1528888504
        },
        {
            "address": "bm1qd83zunqeq5cfml6g540jlxfpe073tnqm4w5z8n",
            "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
            "balance": 0,
            "receive": 1000000000000,
            "sent": 1000000000000,
            "join_timestamp": 1527315522
        },
        {
            "address": "bm1qjwdx4dcda3vendajtgrjpx6gxmvmagq52t8ag5",
            "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
            "balance": 0,
            "receive": 1000000000000,
            "sent": 1000000000000,
            "join_timestamp": 1527317202
        },
        {
            "address": "bm1q406g9qk6ne7alanztt27q7snhte8h4kx2w8w4p",
            "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
            "balance": 0,
            "receive": 999900000000,
            "sent": 999900000000,
            "join_timestamp": 1528885266
        },
        {
            "address": "bm1qv5wa2xsaaq02ardxty4sp5pwj26nx4j5eu9l9x",
            "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
            "balance": 0,
            "receive": 100000000,
            "sent": 100000000,
            "join_timestamp": 1528885266
        },
        {
            "address": "bm1qkfmv7yqpewchr43kyzg4m864sdydkmddp5mfxf",
            "asset_id": "04356941e62729a4099a45c5e9c1945545d4023da08bf270ab726d4162165141",
            "balance": 0,
            "receive": 997700000000,
            "sent": 997700000000,
            "join_timestamp": 1528889587
        }
    ],
    "pagination": {
        "current": 1,
        "limit": 10,
        "total": 2
    }
}
```

<a name="e239011e"></a>
#### `total`

Get total statistic of bytom network

<a name="Method-11"></a>
##### Method

/stat/total

<a name="Parameters-11"></a>
##### Parameters

optional:

- `Integer` - _from_, start timestamp of statistic
- `Integer` - _to_, end timestamp of statistic

<a name="Example-11"></a>
##### Example

```bash
// Request
https://blockmeta.com/api/v2/stat/total
// Response
{
    "mainnet_block_count": 66577,
    "orphan_block_count": 3,
    "transaction_count": 217540,
    "transaction_amount": 2201666087354342581,
    "transaction_fee": 366284534845,
    "transaction_gas": 1831422674.225,
    "new_address_count": 165602,
    "new_asset_count": 22
}
```

<a name="d7c79958"></a>
#### `transaction`

Get transaction by transaction_id

<a name="Method-12"></a>
##### Method

/transaction/<string:transaction_id>

<a name="Parameters-12"></a>
##### Parameters

- `String` - _transaction_id_, transaction id

<a name="Example-12"></a>
##### Example

```bash
// Request
https://blockmeta.com/api/v2/transaction/88def07e14825e78d552245846fd2b88eb109049b7b0185a6ab893f2eae1eead
// Response
{
    "id": "88def07e14825e78d552245846fd2b88eb109049b7b0185a6ab893f2eae1eead",
    "version": 1,
    "size": 78,
    "time_range": 0,
    "status_fail": false,
    "mux_id": "bae7a52e33bc64d0bd5c7103fb200ed80a263386f3a5b28aaa7556505dd4b140",
    "height": 12579,
    "chain_status": "mainnet",
    "coinbase": 1,
    "detail": [
        {
            "type": "coinbase",
            "asset_id": "0000000000000000000000000000000000000000000000000000000000000000",
            "amount": 0,
            "arbitrary": "e384a3",
            "transaction_id": "88def07e14825e78d552245846fd2b88eb109049b7b0185a6ab893f2eae1eead",
            "io": 0
        },
        {
            "type": "control",
            "id": "55946ee277e75e945bdf619bbcf13fafc19f992d2ff7a252ddedd90582b307c5",
            "position": 0,
            "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
            "amount": 41250000000,
            "control_program": "0014c190f77b1e7adadae97e69a6a7d7762649c6e04f",
            "address": "bm1qcxg0w7c70tdd46t7dxn204mkyeyudcz063s49e",
            "transaction_id": "88def07e14825e78d552245846fd2b88eb109049b7b0185a6ab893f2eae1eead",
            "io": 1
        }
    ]
}
```

<a name="a603ee91"></a>
#### `transactions`

Get latest transactions

<a name="Method-13"></a>
##### Method

/transactions

<a name="Parameters-13"></a>
##### Parameters

- `Integer` - _page_, page number of data, page >= 1
- `Integer` - _limit_, number of date per page, max limit is 200

<a name="Example-13"></a>
##### Example

```bash
// Request
https://blockmeta.com/api/v2/transactions?page=1&limit=2
// Response
{
  "transactions": [
    {
      "id": "49362f0fe882d6f2f0497550269f21c2b138706cc7192a37e50d9a598548044b",
      "version": 1,
      "size": 82,
      "time_range": 0,
      "status_fail": false,
      "mux_id": "a3b111a5cb2915c8a3e81b8e5a2a121e14ced098ee52a11408da974a5f9027e4",
      "height": 243653,
      "timestamp": 1559551478,
      "chain_status": "mainnet",
      "coinbase": 1,
      "fee": 0,
      "transaction_amount": 41258000000,
      "confirmations": 1,
      "details": [
        {
          "type": "coinbase",
          "asset_id": "0000000000000000000000000000000000000000000000000000000000000000",
          "amount": 0,
          "arbitrary": "00323433363533",
          "input_id": "d45562151da84c46f45123fb1cc81084848324bcea6473c2a90119a33e3b8301",
          "transaction_id": "49362f0fe882d6f2f0497550269f21c2b138706cc7192a37e50d9a598548044b",
          "status_fail": false,
          "io": 0
        },
        {
          "type": "control",
          "id": "bbfeb44d07f338baaf65f54701a4a31f989cab4babde8b62c4a11082b8228830",
          "position": 0,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "amount": 41258000000,
          "control_program": "00148916ad528556048b97437f05a8afa7482afe0b94",
          "address": "bm1q3yt265592czgh96r0uz63ta8fq40uzu5a8c2h0",
          "transaction_id": "49362f0fe882d6f2f0497550269f21c2b138706cc7192a37e50d9a598548044b",
          "status_fail": false,
          "io": 1,
          "decode_program": [
            "DUP",
            "HASH160",
            "DATA_20 8916ad528556048b97437f05a8afa7482afe0b94",
            "EQUALVERIFY",
            "TXSIGHASH",
            "SWAP",
            "CHECKSIG"
          ],
          "asset_name": "BTM",
          "asset_decimals": "8"
        }
      ]
    },
    {
      "id": "b8f38f5d5e2ee27a5b041bb61faafec5c507aaa3fc92b731c3c9b6b61e6aaf80",
      "version": 1,
      "size": 930,
      "time_range": 1559551455,
      "status_fail": false,
      "mux_id": "c6b8916d63e146e2cccc3477a2f7d716f15d5fd498c5f77160c50a2b957e4996",
      "height": 243653,
      "timestamp": 1559551478,
      "chain_status": "mainnet",
      "coinbase": 0,
      "fee": 8000000,
      "transaction_amount": 50459230073,
      "confirmations": 1,
      "details": [
        {
          "type": "spend",
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "amount": 27896288081,
          "control_program": "0014d9a283348ff2ee94905b0011e07a131dc6e7c20a",
          "address": "bm1qmx3gxdy07thffyzmqqg7q7snrhrw0ss288flcu",
          "spent_output_id": "51df8e3b88360ec431ce2aed9d190e080625a28d9782e15516f0ccae0a6f8e81",
          "input_id": "e77366f5702a798538cd6fe1f021b0c800a74f2f3e0d1d169cd51c0eca5abe5d",
          "witness_arguments": [
            "bf4a56a6320fa973649a34bcbf115c862a5430e71484c596671c465d00b67a2281d6bee55115015aabc2e081c13f3469d80ecb56de60468c67e0619b7f3a3c08",
            "8167cfa7199eaa405d8b06f0e39364d2e5ed76b089fd1c86128b942b48fce0cd"
          ],
          "transaction_id": "b8f38f5d5e2ee27a5b041bb61faafec5c507aaa3fc92b731c3c9b6b61e6aaf80",
          "status_fail": false,
          "io": 0,
          "decode_program": [
            "DUP",
            "HASH160",
            "DATA_20 d9a283348ff2ee94905b0011e07a131dc6e7c20a",
            "EQUALVERIFY",
            "TXSIGHASH",
            "SWAP",
            "CHECKSIG"
          ],
          "asset_name": "BTM",
          "asset_decimals": "8"
        },
        {
          "type": "spend",
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "amount": 12213562353,
          "control_program": "001498f4f39d15d0da7a74b0a9790e2a1ec68d509204",
          "address": "bm1qnr6088g46rd85a9s49usu2s7c6x4pysyfft9gv",
          "spent_output_id": "bf8777b87b1793c16267a9ddeb660fe738157897a0c2f23cc528191a9343a8c5",
          "input_id": "7ad066082839a732e6651d91cd4ac048025a6bc485ad8be1e4542cf28c2c479f",
          "witness_arguments": [
            "b9c4e0748d1e4d4d6ea0718a522a2c075373bb430e0e1fe32b17130043146c0d77b2bc79745c068bad4d2a4f0d22563706f39ab4f8d61d8cc0b703ce8e68020b",
            "5acf8e75a59bad604a4a757356b1fdf5468fa3d54a07c68b69640d6a24d3200f"
          ],
          "transaction_id": "b8f38f5d5e2ee27a5b041bb61faafec5c507aaa3fc92b731c3c9b6b61e6aaf80",
          "status_fail": false,
          "io": 0,
          "decode_program": [
            "DUP",
            "HASH160",
            "DATA_20 98f4f39d15d0da7a74b0a9790e2a1ec68d509204",
            "EQUALVERIFY",
            "TXSIGHASH",
            "SWAP",
            "CHECKSIG"
          ],
          "asset_name": "BTM",
          "asset_decimals": "8"
        },
        {
          "type": "spend",
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "amount": 7399161717,
          "control_program": "00143dbce80e2110753f5ee4b2ee018ad91bd3b5c36e",
          "address": "bm1q8k7wsr3pzp6n7hhykthqrzker0fmtsmwwqjsx2",
          "spent_output_id": "eec00f99f435ecda5f59d319086cb63f41aeeed54f3dbe32087e410f0def0ec5",
          "input_id": "5273b33e4c87f749c017e65e308b325aaa4e8223f3ce794496675b61e0c7be9c",
          "witness_arguments": [
            "e6b5594eb6e083fc7e130ffdfa8f326dfaed439cca9b040e5b22b80f4b02e07c107ed6ab762e27efd48340f317608f64f3cb35ba9d5ae02a937889db6567550a",
            "c628b33e97881eb3c3916f2c5a992fa8fee476021566386faa8d17a29fbad853"
          ],
          "transaction_id": "b8f38f5d5e2ee27a5b041bb61faafec5c507aaa3fc92b731c3c9b6b61e6aaf80",
          "status_fail": false,
          "io": 0,
          "decode_program": [
            "DUP",
            "HASH160",
            "DATA_20 3dbce80e2110753f5ee4b2ee018ad91bd3b5c36e",
            "EQUALVERIFY",
            "TXSIGHASH",
            "SWAP",
            "CHECKSIG"
          ],
          "asset_name": "BTM",
          "asset_decimals": "8"
        },
        {
          "type": "spend",
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "amount": 2958217922,
          "control_program": "0014b7c13ae88a97100b537cfc15f37852cfe3cd9c53",
          "address": "bm1qklqn46y2jugqk5muls2lx7zjel3um8znhfrvsr",
          "spent_output_id": "799b4efcc17700a20bfc60a6ed7169539849e29336ca9c33fd525f5f2fa343f8",
          "input_id": "5af25fee3cb0c8052f4a21f6d06dc6e16b28d49ffc03743be2f656ad132166aa",
          "witness_arguments": [
            "483ae2e780258d63c0913479c9c37bf20d00130f54e74afd641b2d4b61a00a47bae2aef0195f02aee65d14cc3ecb6f779290ac90b13a0fc3cc714d9deeead90c",
            "a3297b8e42d58404a34662e71389cc816b863aaaec1ce1375ccb2f35707d1a00"
          ],
          "transaction_id": "b8f38f5d5e2ee27a5b041bb61faafec5c507aaa3fc92b731c3c9b6b61e6aaf80",
          "status_fail": false,
          "io": 0,
          "decode_program": [
            "DUP",
            "HASH160",
            "DATA_20 b7c13ae88a97100b537cfc15f37852cfe3cd9c53",
            "EQUALVERIFY",
            "TXSIGHASH",
            "SWAP",
            "CHECKSIG"
          ],
          "asset_name": "BTM",
          "asset_decimals": "8"
        },
        {
          "type": "control",
          "id": "da54a32deb7d37723086ce23b75687ad95722eff32075cc80fbc6542df9f2b09",
          "position": 0,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "amount": 859230073,
          "control_program": "0014c7ba9f5a385aebb29bf6973ab2f009410837e8c9",
          "address": "bm1qc7af7k3ctt4m9xlkjuat9uqfgyyr06xfpnagsv",
          "transaction_id": "b8f38f5d5e2ee27a5b041bb61faafec5c507aaa3fc92b731c3c9b6b61e6aaf80",
          "status_fail": false,
          "io": 1,
          "decode_program": [
            "DUP",
            "HASH160",
            "DATA_20 c7ba9f5a385aebb29bf6973ab2f009410837e8c9",
            "EQUALVERIFY",
            "TXSIGHASH",
            "SWAP",
            "CHECKSIG"
          ],
          "asset_name": "BTM",
          "asset_decimals": "8"
        },
        {
          "type": "control",
          "id": "0e5823d2b3b2bed2125344e4d1b0bfea5e7bb77d648221aa8fb652c496c6d8fc",
          "position": 1,
          "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "amount": 49600000000,
          "control_program": "0014800b6d9b785834179d5e47e5b58818a051801409",
          "address": "bm1qsq9kmxmctq6p0827gljmtzqc5pgcq9qfp4qr40",
          "transaction_id": "b8f38f5d5e2ee27a5b041bb61faafec5c507aaa3fc92b731c3c9b6b61e6aaf80",
          "status_fail": false,
          "io": 1,
          "decode_program": [
            "DUP",
            "HASH160",
            "DATA_20 800b6d9b785834179d5e47e5b58818a051801409",
            "EQUALVERIFY",
            "TXSIGHASH",
            "SWAP",
            "CHECKSIG"
          ],
          "asset_name": "BTM",
          "asset_decimals": "8"
        }
      ]
    }
  ],
  "pagination": {
    "current": 1,
    "limit": 2,
    "total": 535457
  }
}
```

<a name="271c43b8"></a>
#### `unconfirmed-transactions`

Get unconfirmed transactions from bytom node memory pool

<a name="Method-14"></a>
##### Method

/unconfirmed-transactions

<a name="Example-14"></a>
##### Example

```bash
// Request
https://blockmeta.com/api/v2/unconfirmed-transactions
// Response
[
  {
    "id": "e1a8f056f69f02be63a82374c3928ae2a49bf4c4e6a8f2ad7d231c1737121070",
    "version": 1,
    "size": 611,
    "time_range": 0,
    "status_fail": false,
    "mux_id": "507ab87ae0e6ae078275055d062b3c902e8bf0ac7a1407429778cbd439bc82ad",
    "fee": 1000000,
    "transaction_amount": 3546000000
  },
  {
    "id": "738446630c5c7801b39dcced868e5e3f692f68791d85b543c6cf227e53f1082f",
    "version": 1,
    "size": 332,
    "time_range": 260933,
    "status_fail": false,
    "mux_id": "6cb8e7c87ae20e09f773036c3bb9f1db0e4116055559d3d4b3f731d010320c3c",
    "fee": 449000,
    "transaction_amount": 3800000000
  },
  {
    "id": "52cd5f58b3e7990a693dade6d5aaf6343bc2b970132426edebf8238b34334403",
    "version": 1,
    "size": 468,
    "time_range": 0,
    "status_fail": false,
    "mux_id": "67f8abe784022969c1dad75a89c691ba9d7ccf5e3f446c455ed963769f65b440",
    "fee": 1200000,
    "transaction_amount": 0
  },
  {
    "id": "abed223d45c9eab5789174064746617132189672d83b04fefb53bf17986d65ea",
    "version": 1,
    "size": 339,
    "time_range": 1559551685,
    "status_fail": false,
    "mux_id": "36e4cdf903141e9cd2251a6bc18f05aeef75c23823842c0360c2746554362c43",
    "fee": 8000000,
    "transaction_amount": 5941788000000
  }
]
```

<a name="09aa843e"></a>
#### `utxo`

Get assets utxo statistic of bytom network

<a name="Method-15"></a>
##### Method

/stat/utxo

<a name="Parameters-14"></a>
##### Parameters

optional:

- `Integer` - _from_, start timestamp of statistic
- `Integer` - _to_, end timestamp of statistic

<a name="Example-15"></a>
##### Example

```bash
// Request
https://blockmeta.com/api/v2/stat/utxo
// Response
[
    {
        "asset_id": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "utxo_count": 5508
    },
    {
        "asset_id": "d5e348366a1c341dc60759e0de102bded16a3565c6038ffbe846a54073750e68",
        "utxo_count": 3
    }
]
```