## Introduction 

​	A block is a container data structure that aggregates transactions for inclusion in the public ledger, the blockchain. It is made of a header, containing metadata, followed by a long list of transactions that make up the bulk of its size. Each block references to the previous block, and all the blocks are linked from the back to the front to grow a blockchain.

​	Each block within the blockchain is identified by a hash, generated using the SHA256 cryptographic hash algorithm on the header of the block. Although a block has just one parent, it can temporarily have multiple children. That is called “fork", a temporary situation that occurs when different blocks are discovered almost simultaneously by different miners.Eventually, only one child block can become part of the blockchain.Therefore, when specifying a block by block height, there may be more than one block at the same height.

​	The “previous block hash” field is inside the block header and thereby affects the current block’s hash when the hash of previous block has changed. Also, this in turn causes  the hash of the subsequent blocks to change, and so on. This domino effect ensures that the block won't change unless the hash of all subsequent blocks are recalculated.

## Structure of a Block

The structure of the block is shown in the following table. A block mainly contains the block header and all transaction information which makes up the bulk of its size. The size of the block is much larger than the size of the block header.

| Field               | Description                             |
| ------------------- | --------------------------------------- |
| Block Header        | Several fields form the block header    |
| Transaction Counter | How many transactions follow            |
| Transactions        | The transactions recorded in this block |



## Structure of a Block Header

 The structure of the block header is shown in the following table:

| Field               | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| Version             | A version number to track software/protocol upgrades         |
| Height              | Height of a block                                            |
| Previous Block Hash | A reference to the hash of the previous (parent) block in the chain |
| Timestamp           | The approximate creation time of this block (seconds from Unix Epoch) |
| Nonce               | A counter used for the Proof-of-Work algorithm               |
| Difficulty Target   | The Proof-of-Work algorithm difficulty target for this block |
| Merkle Root         | A hash of the root of the merkle tree of this block’s transactions |

 ## Block Identifiers: Block Header Hash and Block Height

​	The block hash is a digital fingerprint, made by hashing the block header twice through the SHA256 algorithm.The block hash identifies a block uniquely and unambiguously and can be independently derived by any node by simply hashing the block header. Instead of including the block hash in the data of current block, it is referenced by the next block as the "previous block hash".

​	A second way to identify a block is by its position in the blockchain, called the block height. The first block ever created is at block height 0, and each subsequent block is one position higher than the previous block. Unlike the block hash, the block height is not a unique identifier. Two or more blocks might have the same block height, which is called "fork". In addition, the block height is contained in the data of the block.

## Validate a block

​	As the newly solved block moves across the network, each node performs a series of tests to validate it before propagating it to its peers. This ensures that only valid blocks are propagated on the network. When a node receives a new block, it will validate the block by checking it against a long list of criteria that must all be met; otherwise, the block is rejected. That includes:

- Check if the version of the block is greater than or equal to the version of the previous  block

- Check if the height of the block is the height of the parent block plus 1
- Check that the "Previous Block Hash" field is the hash of previous block
- Check that the timestamp is less than one hours in the future and not less than the intermediate time of the last 11 blocks.
- Check if the difficulty target meets the requirement
- Check that the proof of work on the block is valid
- Check if  the amount of coinbase matches the current height
- Whether the calculated Merkle root hash of the transaction is consistent with the block header
- Whether the calculated Merkle root hash of the transaction state is consistent with the block header
- Validate each transaction in the block