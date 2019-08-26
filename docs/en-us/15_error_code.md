---
title: Error Code
---

# Error Code

<a name="223abb07"></a>
## 0XX API Error

| Error Code | Note |
| :---: | :---: |
| BTM000 | Bytom API Error |
| BTM001 | Request timed out |
| BTM002 | Invalid request body |


<a name="7c9d7f12"></a>
## 1XX Network Error
<br />

| Error Code | Note |
| :---: | :---: |
| BTM103 | A peer core is operating on a different blockchain network |


<a name="d5a8a2ed"></a>
## 2xx Signers error namespace

| Error Code | Note |
| :---: | :---: |
| BTM200 | Quorum must be greater than 1 and less than or equal to the length of xpubs |
| BTM201 | Invalid xpub format |
| BTM202 | At least one xpub is required |
| BTM204 | Root XPubs cannot contain the same key more than once |


<a name="bfbfc7e2"></a>
## 3xx Contract error namespace

| Error Code | Note |
| :---: | :---: |
| BTM300 | Compile contract failed |
| BTM301 | Instantiate contract failed |


<a name="a7d9e69f"></a>
## 7XX Transaction error namespace
<a name="d41d8cd9"></a>
### 
<a name="0cbd6eb1"></a>
### 72X - 73X Build transaction error namespace

| Error Code | Note |
| :---: | :---: |
| BTM700 | Funds of account are insufficient |
| BTM701 | Available funds of account are immature |
| BTM702 | Available UTXOs of account have been reserved |
| BTM703 | Not found UTXO with given hash |
| BTM704 | Invalid action type |
| BTM705 | Invalid action object |
| BTM706 | Invalid action construction |
| BTM707 | One or more fields are missing |
| BTM708 | Invalid asset amount |
| BTM709 | Not found account |
| BTM710 | Not found asset |

<a name="07d8c066"></a>
## 73x - 79x Submit transaction error namespace
<a name="4e555d0a"></a>
### 73X - 75X Validation error

| Error Code | Note |
| :---: | :---: |
| BTM730 | Invalid transaction version |
| BTM731 | Invalid transaction size |
| BTM732 | Invalid transaction time range |
| BTM733 | Not standard transaction |
| BTM734 | Invalid coinbase transaction |
| BTM735 | Invalid coinbase assetID |
| BTM736 | Invalid coinbase arbitrary size |
| BTM737 | No results in the transaction |
| BTM738 | Mismatched assetID |
| BTM739 | Mismatched value source/dest position |
| BTM740 | Mismatched reference |
| BTM741 | Mismatched value |
| BTM742 | Missing required field |
| BTM743 | No source for value |
| BTM744 | Arithmetic overflow/underflow |
| BTM745 | Invalid source or destination position |
| BTM746 | Unbalanced asset amount between input and output |
| BTM747 | Gas credit has been spent |
| BTM748 | Gas usage calculate got a math error |



<a name="fd9c9626"></a>
### 76X - 78X VM error

| Error Code | Note |
| :---: | :---: |
| BTM760 | Alt stack underflow |
| BTM761 | Bad value |
| BTM762 | Wrong context |
| BTM763 | Data stack underflow |
| BTM764 | Disallowed opcode |
| BTM765 | Division by zero |
| BTM766 | False result for executing VM |
| BTM767 | Program size exceeds max int32 |
| BTM768 | Arithmetic range error |
| BTM769 | RETURN executed |
| BTM770 | Run limit exceeded because the BTM Fee is insufficient |
| BTM771 | Unexpected end of program |
| BTM772 | Unrecognized token |
| BTM773 | Unexpected error |
| BTM774 | Unsupported VM because the version of VM is mismatched |
| BTM775 | VERIFY failed |


<a name="34cbf106"></a>
## 8XX Mock HSM error namespace

| Error Code | Note |
| :---: | :---: |
| BTM800 | Key Alias already exists |
| BTM801 | Invalid `after` in query |
| BTM802 | Key not found or wrong password |
| BTM803 | Requested key aliases exceeds limit |
| BTM804 | Could not decrypt key with given passphrase |
| BTM860 | Request could not be authenticated |



