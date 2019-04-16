# Cli Guide

`Bytom` provides `CLI` client (`bytomcli`), it is the entry point into the `Bytom` network, capable of running as a full node archive node.<br />It can be used by other processes as a gateway into the Bytom network via JSON RPC endpoints exposed on top of HTTP, WebSocket and/or IPC transports.<br />The full `CLI` option can be viewed using `bytomcli --help`, or the [bytomcli Wiki](https://github.com/Bytom/bytom/wiki/Command-Line-Options) page.

<a name="fb10086c"></a>
# Specific command line options

Including accounts、keys、assets、token、transactions、blocks and other aspects.

<a name="Accounts"></a>
### Accounts

| Options | Meaning | Parameters | Examples |
| :--- | :--- | :--- | :--- |
| create-account | create an new account | <xpub(s)> [flags] |  |
| list-accounts | list the existing accounts | [flags] |  |
| delete-account | delete the existing account | <<accountID/alias> [flags] |  |
| create-account-receiver | Create an account receiver | [accountID] [flags] |  |
| list-addresses | list the account addresses | [flags] |  |
| validate-address | validate the account addresses | [flags] |  |
| list-pubkeys | list the account pubkeys | [publicKey] [flags |  |
| list-balances | list the accounts balances | [flags] |  |
| list-unspent-outputs | list the accounts unspent outputs | [flags] |  |

<a name="Keys"></a>
### Keys
| Options | Meaning | Parameters | Examples |
| :--- | :--- | :--- | :--- |
| create-key | create a key |  [flags] |  |
| list-keys | list the existing keys | [flags] |  |
| delete-key | delete a key |  [flags] |  |
| reset-key-password | reset key password |   [flags] |  |
| check-key-password | check key password |  [flags] |  |
| sign-message | sign message to generate signature |   [flags] |  |
| verify-message | verify signature for specified message |    [flags] |  |



<a name="Assets"></a>
### Assets
| Options | Meaning | Parameters | Examples |
| :--- | :--- | :--- | :--- |
| create-asset | create an asset | <xpub(s)> [flags] |  |
| get-asset | get asset by assetID | [flags] |  |
| list-assets | list the existing assets | [flags] |  |
| update-asset-alias | update the asset alias |  [flags] |  |


Token

| Options | Meaning | Parameters | Examples |
| :--- | :--- | :--- | :--- |
| create-access-token | create a new access token | [flags] |  |
| list-access-tokens | list the existing access tokens | [flags] |  |
| delete-access-token | delete an access token | [flags] |  |
| check-access-token | check an access token |  [flags] |  |



<a name="Transactions"></a>
### Transactions

| Options | Meaning | Parameters | Examples |
| :--- | :--- | :--- | :--- |
| build-transaction | build one transaction template,default use account id and asset id | <accountID/alias> <assetID/alias> [outputID] [flags] |  |
| sign-transaction | sign transaction templates with account password | [flags] |  |
| submit-transaction | submit signed transaction | [flags] |  |
| create-transaction-feed | create a transaction feed filter |  [flags] |  |
| list-transaction-feeds | list all of transaction feeds | [flags] |  |
| delete-transaction-feed | delete a transaction feed filter | [flags] |  |
| get-transaction-feed | get a transaction feed by alias | [flags] |  |
| update-transaction-feed | update transaction feed |  [flags] |  |

<a name="Blocks"></a>
### Blocks
| Options | Meaning | Parameters | Examples |
| :--- | :--- | :--- | :--- |
| get-block-hash | get the hash of most recent block | [flags] |  |
| get-block-count | get the number of most recent block | [flags] |  |
| get-block | get a whole block matching the given hash or height | /  [flags] |  |
| get-block-header | get the header of a block matching the given hash or height | /  [flags] |  |
| get-difficulty | get the difficulty of most recent block | [flags] |  |
| get-hash-rate | get the nonce of most recent block | [flags] |  |

Others<br />

| Options | Meaning | Parameters | Examples |
| :--- | :--- | :--- | :--- |
| is-mining | if client is actively mining new blocks | [flags] |  |
| set-mining | start or stop mining | [flags] |  |
| net-info | print the summary of network | [flags] |  |
| decode-program | decode program to instruction and data | [flags] |  |
| version | print the version number of Bytomcli | [flags] |  |
| wallet-info | print the information of wallet | [flags] |  |
| rescan-wallet | trigger to rescan block information into related wallet | [flags] |  |


