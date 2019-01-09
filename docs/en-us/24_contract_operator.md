# Logical and numeric operators

| NAME             | CODE         | DESCRIPTION                                 |
| --------------   | ------------ | ------------------------------------------- |
| OP_1ADD               | 0x8b           | Pops a number from the data stack, adds 1 to it, and pushes the result to the data stack.|
| OP_1SUB               | 0x8c           | Pops a number from the data stack, subtracts 1 from it, and pushes the result to the data stack. |
| OP_2MUL               | 0x8d           | Pops a number from the data stack, multiplies 2 to it, and pushes the result to the data stack.  |
| OP_2DIV               | 0x8e           | Pops a number from the data stack, divides 2 from it, and pushes the result to the data stack. |
| OP_NEGATE             | 0x8f           | Pops a number from the data stack, negates it, and pushes the result to the data stack.       |
| OP_ABS                | 0x90           | Pops a number from the data stack, negates it if it is less than 0, and pushes the result to the data stack.  |
| OP_NOT                | 0x91           | Pops a boolean from the data stack, negates it, and pushes the result to the data stack.      |
| OP_0NOTEQUAL          | 0x92           | Pops a number from the data stack, and results in false if the number is equal to 0 and true otherwise. Pushes the result to the data stack.     |
| OP_ADD                | 0x93           | Pops two numbers from the data stack, adds them, and pushes the result to the data stack. |
| OP_SUB                | 0x94           | Pops two numbers from the data stack, takes their difference, and pushes the result to the data stack. (eg.x-y) |
| OP_MUL                | 0x95           | Pops two numbers from the data stack, multiplies them, and pushes the result to the data stack. |
| OP_DIV                | 0x96           | Pops two numbers from the data stack, divides them rounding toward zero to an integer, and pushes the result to the data stack.(eg.x/y)   |
| OP_MOD                | 0x97           | Pops two numbers from their data stack, determines the remainder of x divided by y, and pushes the result to the data stack. A non-zero result has the same sign as the divisor.(eg.x%y)     |
| OP_LSHIFT             | 0x98           | Pops two numbers from the data stack, multiplies x by 2**y (i.e., an arithmetic left shift with sign extension), coerces the result to a string, and pushes it to the data stack. (eg.x << y) |
| OP_RSHIFT             | 0x99           | Pops two numbers from the data stack, divides x by 2**y rounding to an integer toward negative infinity (i.e., an arithmetic right shift with sign extension), and pushes the result to the stack. (eg.x >> y) |
| OP_BOOLAND            | 0x9a           | Pops two booleans from the data stack. Pushes true to the data stack if both are true, and pushes false otherwise.|
| OP_BOOLOR             | 0x9b           | Pops two booleans from the data stack. Pushes false to the data stack if both are false and pushes true otherwise.|
| OP_NUMEQUAL           | 0x9c           | Pops two numbers from the data stack. Pushes true to the data stack if they are equal and pushes false otherwise. |
| OP_NUMEQUALVERIFY     | 0x9d           | Equivalent to `NUMEQUAL VERIFY`. Pops two numbers from the data stack, and fails if they are not equal.    |
| OP_NUMNOTEQUAL        | 0x9e           | Pops two numbers from the data stack, results in false if they are equal and in true otherwise, and pushes the result to the data stack.  |
| OP_LESSTHAN           | 0x9f           | Pops two numbers from the data stack, results in true if x is less than y and false otherwise, and pushes the result to the data stack.  |
| OP_GREATERTHAN        | 0xa0           | Pops two numbers from the data stack, results in true if x is greater than y and in false otherwise, and pushes the result to the data stack.   |
| OP_LESSTHANOREQUAL    | 0xa1           | Pops two numbers from the data stack, results in true if x is less than or equal to y and in false otherwise, and pushes the result to the data stack.   |
| OP_GREATERTHANOREQUAL | 0xa2           | Pops two numbers from the data stack, results in true if x is greater than or equal to y and in false otherwise, and pushes the result to the data stack.   |
| OP_MIN                | 0xa3           | Pops two numbers from the data stack, results in x if x is less than or equal to y and in y otherwise, and pushes the result to the data stack.    |
| OP_MAX                | 0xa4           | Pops two numbers from the stack, results in x if x is greater than or equal to y and in y otherwise, and pushes the result to the data stack.   |
| OP_WITHIN             | 0xa5           | Pops two numbers from the stack, results in true if x is greater or equal to the mininum value y and less than the maximum value z, and pushes the result to the stack.   |

# Bitwise Operator

| NAME             | CODE         | DESCRIPTION                                 |
| --------------   | ------------ | ------------------------------------------- |
| OP_INVERT      | 0x83         | Inverts bits in the first item on the data stack.               |
| OP_AND         | 0x84         | Bitwise AND operation. Longer item is truncated, keeping the prefix.   |
| OP_OR          | 0x85         | Bitwise OR operation. Shorter item is zero-padded to the right.       |
| OP_XOR         | 0x86         | Bitwise XOR operation. Shorter item is zero-padded to the right.    |
| OP_EQUAL       | 0x87         | Pops two strings from the stack and compares them byte-by-byte. Pushes true if the strings are equal, false otherwise.  |
| OP_EQUALVERIFY | 0x88         | Same as `EQUAL VERIFY`. Pops two strings from the stack, compares them byte-by-byte, and fails execution if they are not equal.       |

# Splice operators

| NAME             | CODE         | DESCRIPTION                                 |
| --------------   | ------------ | ------------------------------------------- |
| OP_CAT         | 0x7e         | Concatenates top two items on the data stack.          |
| OP_SUBSTR      | 0x7f         | Extracts a substring of `string` of a given size `n` at a given offset `m`.    |
| OP_LEFT        | 0x80         | Extracts a prefix of `string` with the given size `n`.     |
| OP_RIGHT       | 0x81         | Extracts a suffix of `string` with the given size `n`.    |
| OP_SIZE        | 0x82         | Pushes the size of `string` encoded as a number `n` without removing `string` from the data stack.      |
| OP_CATPUSHDATA | 0x89         | Appends second `string` encoded as the most compact `PUSHDATA` instruction. This is used for building new programs piecewise. |

# Cryptographic instructions

| NAME             | CODE         | DESCRIPTION                                 |
| --------------   | ------------ | ------------------------------------------- |
| OP_SHA256        | 0xa8         | Replaces top stack item with its SHA-256 hash value.    |
| OP_SHA3          | 0xaa         | Replaces top stack item with its SHA3-256 hash value.     |
| OP_HASH160       | 0xab         | Replaces top stack item with its Ripemd160 hash value.     |
| OP_CHECKSIG      | 0xac         | Pops the top three items on the data stack, verifies the signature sig of the hash with a given public key pubkey and pushes true if the signature is valid; pushes false if it is not. Fails if hash is not a 32-byte string. |
| OP_CHECKMULTISIG | 0xad         | Pops non-negative numbers n and m from the data stack(n and m is positive), Pops n public keys, Pops hash from the data stack, Pops m signatures, Verifies signatures one by one against the public keys and the given hash. Signatures must be in the same order as public keys and no two signatures are verified with the same public key, Pushes true if all of the signatures are valid, and false otherwise.  |
| OP_TXSIGHASH     | 0xae         | Computes the transaction signature hash corresponding to the current entry. Equals SHA3-256 of the concatenation of the current entry ID and transaction ID: `TXSIGHASH = SHA3-256(entryID || txID)` |

# Control Flow Operators

| NAME             | CODE         | DESCRIPTION                                 |
| --------------   | ------------ | ------------------------------------------- |
| OP_JUMP           | 0x63         | Followed by a 4-byte unsigned integer address, sets the PC to address. Fails if not followed by 4 bytes. Note: this opcode may cause some instructions to not be executed.  |
| OP_JUMPIF         | 0x64         | Followed by a 4-byte unsigned integer address, pops a boolean from the data stack. If it is true, sets the PC to address. If it is false, does nothing. Fails if not followed by 4 bytes. Note: this opcode may cause some instructions to not be executed. |
| OP_VERIFY         | 0x69         | Fails execution if the top item on the data stack is false. Otherwise, removes the top item.  |
| OP_FAIL           | 0x6a         | Fails execution unconditionally.      |
| OP_CHECKPREDICATE | 0xc0         | Pops 3 items from the data stack: limit, predicate and n. If limit equals zero, sets it to the VM’s remaining run limit minus 256. Reduces VM’s run limit by 256 + limit. Instantiates a new VM instance (“child VM”) with its run limit set to limit. Moves the top n items from the parent VM’s data stack to the child VM’s data stack without incurring run limit refund or charge of their standard memory cost in either VM. The order of the moved items is unchanged. The memory cost of these items will be refunded when the child VM pops them, or when the child VM is destroyed and its parent VM is refunded. Child VM evaluates the predicate and pushes true to the parent VM data stack if the evaluation did not fail and the child VM’s data stack is non-empty with a true value on top (this implements the same semantics as for the top-level verify predicate operation). It pushes false otherwise. Note that the parent VM does not fail when the child VM exhausts its run limit or otherwise fails.   |

# Stack control operators

| NAME             | CODE         | DESCRIPTION                                 |
| --------------   | ------------ | ------------------------------------------- |
| OP_TOALTSTACK   | 0x6b         | Moves the top item from the data stack to the alt stack.   |
| OP_FROMALTSTACK | 0x6c         | Moves the top item from the alt stack to the data stack. Fails if the alt stack is empty.  |
| OP_2DROP        | 0x6d         | Removes top 2 items from the data stack.    |
| OP_2DUP         | 0x6e         | Duplicates top 2 items on the data stack.     |
| OP_3DUP         | 0x6f         | Duplicates top 3 items on the data stack.     |
| OP_2OVER        | 0x70         | Duplicates two items below the top two items on the data stack.      |
| OP_2ROT         | 0x71         | Moves 2 items below the top 4 items on the data stack to the top of the stack.   |
| OP_2SWAP        | 0x72         | Moves 2 items below the top 2 items on the data stack to the top of the stack.     |
| OP_IFDUP        | 0x73         | Duplicates the top item only if it’s not false.    |
| OP_DEPTH        | 0x74         | Adds the size of the data stack encoded as a VM number.    |
| OP_DROP         | 0x75         | Removes the top item from the data stack.   |
| OP_DUP          | 0x76         | Duplicates the top item on the data stack.   |
| OP_NIP          | 0x77         | Removes the item below the top one on the data stack.    |
| OP_OVER         | 0x78         | Copies the second from the top item to the top of the data stack.     |
| OP_PICK         | 0x79         | Copies n+2th item from the top to the top of the data stack. Fails if the top item is not a valid non-negative number or there are fewer than n+2 items on the stack.    |
| OP_ROLL         | 0x7a         | Moves n+2th item from the top to the top of the data stack. Fails if the top item is not a valid non-negative number or there are fewer than n+2 items on the stack.   |
| OP_ROT          | 0x7b         | Moves the third item from the top to the top of the data stack.      |
| OP_SWAP         | 0x7c         | Swaps top two items on the data stack.     |
| OP_TUCK         | 0x7d         | Tucks the second item from the top of the data stack with two copies of the top item.    |

# Introspection instructions

The following instructions are defined within a transaction context. In the block context these instructions cause VM to halt immediately and return false.

Note: standard memory cost is applied after the instruction is executed in order to determine the exact size of the encoded data (this also applies to ASSET, even though the result is always 32 bytes long).

| NAME             | CODE         | DESCRIPTION                                 |
| --------------   | ------------ | ------------------------------------------- |
| OP_CHECKOUTPUT   | 0xc1         | Pops 6 items from the data stack: index, amount, assetid, version, prog. check the specified destination entry.  |
| OP_ASSET         | 0xc2         | If the current entry is an Issuance1, pushes Value.AssetID. If the current entry is a Spend1, pushes the SpentOutput.Source.Value.AssetID of that entry. Fails if executed in the block context. Fails if the entry is not an Issuance1 or a Spend1. |
| OP_AMOUNT        | 0xc3         | If the current entry is an Issuance1, pushes Value.Amount. If the current entry is a Spend1, pushes the SpentOutput.Source.Value.Amount of that entry. Fails if executed in the block context. Fails if the entry is not an Issuance1 or a Spend1. |
| OP_PROGRAM       | 0xc4         | Pushes a program based on a type of current entry and the context.  Fails if executed in the block context.   |
| OP_INDEX         | 0xc9         | Pushes the ValueDestination.position of the current entry on the data stack. Fails if the current entry is not an issuance or a spend.    |
| OP_ENTRYID       | 0xca         | Pushes the current entry ID on the data stack (e.g. a spend or an issuance). Fails if executed in the block context.    |
| OP_OUTPUTID      | 0xcb         | Pushes the spent output ID on the data stack. Fails if executed in the block context. Fails if the current entry is not a spend.     |
| OP_BLOCKHEIGHT   | 0xcd         | Pushes the current block height on the data stack. Fails if executed in the transaction context.   |

# Instructions pushing data on stack

| NAME             | CODE         | DESCRIPTION                                 |
| --------------   | ------------ | ------------------------------------------- |
| OP_PUSHDATA1     | 0x4c         | It is followed by a 1-byte length prefix encoding a length n, then n bytes of data to push (supports up to 255 bytes).  |
| OP_PUSHDATA2     | 0x4d         | It is followed by a 2-byte little-endian length prefix encoding a length n, then n bytes of data to push (supports up to 65535 bytes).  |
| OP_PUSHDATA4     | 0x4e         | It is followed by a 4-byte little-endian length prefix encoding a length n, then n bytes of data to push (supports up to 4294967295 bytes).  |
| OP_1NEGATE       | 0x4f         | Pushes "ff ff ff ff ff ff ff ff" (the VM number -1) onto the data stack.    |
| OP_NOP           | 0x61         | No operation.                               |
| OP_FALSE / OP_0  | 0x00         | Equivalent to OP_0, Pushes an empty string (the VM number 0) to the data stack. |
| OP_TRUE          | 0x51         | Equivalent to OP_1, Pushes an empty string (the VM number 1) to the data stack. |
| OP_1 ~ OP_16     | 0x51 ~  0x60 | Pushes number `n` on the data stack. the range of `n` is [1, 16].    |
| OP_DATA_1 ~ OP_DATA_75  | 0x01 ~  0x4b | It is followed by `n` bytes of data to be pushed onto the data stack as a single VM string. the range of `n` is [1, 75].  |
