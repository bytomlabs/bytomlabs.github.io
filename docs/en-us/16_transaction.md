# Transaction

## Introduction 

​	Blockchain consists of a set of transactions that are irreversible and linked by cryptography. Each transaction contains one or more “inputs” and “outputs”. An input can issue a new asset unit or use a existing asset unit in the previous transaction output as the source of the transfer. The output gets the asset units from the input and decides how to allocate them. A single output contains an amount of assets and a corresponding control program in order to specify how it will be spent. Also, an output can retire asset units and remove them from circulation.

​	A transaction can have multiple inputs and outputs that may contain many different types of assets, different sources, and different destinations. In a transaction, all actions (issuing, spending, receiving, and retiring assets) will be executed simultaneously as a single atomic operation. There is no timepoint that actions only partially executed.

​	In a transaction, the total amount of assets in the input must equal the total amount of assets in the output. In order to create a new asset unit, we issue the asset in one input and receive it with one or more outputs . Also, we spend the asset in one input and receive it in one or more outputs to transfer. As for retiring, spend it in the input and destroy it in one output.

### Spend the whole UTXO

​	Create an input, that is, a certain amount of assets are spent from a previous transaction output, and all of assets must be fully spent. If you don't want to transfer all of assets to the receiver, it is necessary to return some to your account，which is called change. Therefore, spending assets from one input often requires two outputs. One as the output of destination and one for returning the assets left. In general, Bytom will automatically manage the change output for you.

### Merge UTXOs

​	Some payments may require a lot of asset units since the amount is greater than any UTXOs. When using the account to make a purchase, as long as assets are enough in the account , Bytom will automatically select the UTXOs to satisfy the payment.



### Create Transactions

​	Creating a transaction contains three steps in total:

 	1. Build-transaction: Define what the transaction is for:  to issue an asset or to spend an asset from an account, or to use another account to receive an asset.

2. Sign-transaction: Use the private key to sign the asset spending or issue new asset units.

3. Submit-transaction: Submit a complete, signed transaction to the blockchain and propagate it to other nodes on the mainnet. 

#### Build-transaction

​	You don't have to directly manipulate input and output on Bytom, but to build transactions through several high-level actions listed below. There are six types of actions currently :

| action                       | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| issue                        | Issue a new asset unit                                       |
| spend_account                | Spend specified asset units from a specified account. Bytom will automatically find enough asset units from UTXOs and create an output for change. |
| spend_account_unspent_output | Specify a complete UTXO from an account. And change requires other actions. |
| control_address              | Receive an asset unit in the form of address pattern.        |
| control_program              | Receive an asset unit in the form of contract pattern.       |
| retire                       | Retire specified asset units                                 |

#### Sign-transaction

​	In order to be accepted by the blockchain, a transaction requires a valid signature contained in its input. For the input of asset issuance, the signature must correspond to the public key of the asset issuance program，and for the spending input, the signature must correspond to the public key of the control program in the output which will be spent. Transaction signatures ensure the security of blockchain, while cryptography can prevent someone to generate valid transaction signatures without the related private key.

#### Submit-transaction

​	Provided that the input and output of the transaction is balanced and all inputs are signed, it is considered valid and can be submitted to the blockchain. The local node will be the first to add the transaction to the blockchain and propagate to its peers on the mainnet. 