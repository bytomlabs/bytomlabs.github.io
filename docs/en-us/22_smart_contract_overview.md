## Introduction of Equity contract
  Equity is a high-level language for expressing contract programs, user can be write contract which compiled to program for [Bytom](https://github.com/Bytom/bytom). Equity contracts mainly describe the management of various assets on `Bytom`. The main features of the contract are as follows:

  - the UTXO of `Bytom` is `BUTXO`, and the blockchain records a book consisting of a number of different types of `UTXO`. Each `UTXO` has two important attributes: the asset number `assetID` and the number of assets `amount`. Generally, the specified number `amount` of asset `assetID` is Expressed abstractly as a `UTXO`.
  - All on-chain assets are locked in the contract program. Once the number `valueAmount` of asset`valueAsset` (ie `UTXO`) is unlocked by a contract, it is only meant to be locked by one or more other contracts.
  - The contract protects the asset value is that the contract program execute successfully in the virtual machine only by entering the correct unlocking parameters.

  Therefore, the `Equity` language is designed to describe which assets are locked with smart contracts and define under which conditions the specified assets can be unlocked.

### Components of contract
  An `Equity` program consists of a contract which defined with the `contract` keyword. A contract definition has the form:

  `contract ContractName ( parameters ) locks valueAmount of valueAsset { clauses }`

  - `ContractName` contract name is an identifier, defined by user.
  - `parameters` list of contract parameters, which must conform to the basic type of contract language.
  - `valueAmount` amount of asset, the identifier can be customized by the user.
  - `valueAsset` type of asset, the identifier can be customized by the user.
  - `clauses` list of clauses(ie, functions), a contract contains at least one `clause`.

### Component of Clause
  Each `clause` describes one way to unlock the value in the contract. A clause has the form:

  `clause ClauseName ( parameters ) { statements }`

  - `ClauseName` name of clauses, which is defined by users.
  - `parameters` list of clauses.
  - `statements` list of statements, a contract contains at least one `statements`.            

### Parameters
  Contract and clause parameters have names and types. A parameter is written as:

  - `name : TypeName`

  The list of parameters is:

  - `name1 : TypeName1 , name2 : TypeName2 , …`

  Adjacent parameters sharing the same type may be coalesced like so for brevity:

  - `name1 , name2 , … : TypeName`

  so that these two contract declarations are equivalent:

  - `contract LockWithMultiSig(key1: PublicKey, key2: PublicKey, key3: PublicKey)`
  - `contract LockWithMultiSig(key1, key2, key3: PublicKey)`

  Available types:

  - `Integer` `Amount` `Boolean` `String` `Hash` `Asset` `PublicKey` `Signature` `Program`

  These variable types are described in `Basic Type`.  

### Component of Statement
  The `statement` of contract, in addition to the basic statement `verify`、`lock` and `unlock`, it contains the extended statement `define`, `assign` and `if-else`. 

  * `verify` statement is to verify that the result of the expression is `true`, it has the form::
      
    &nbsp;
    `verify expression`

    &nbsp;
    The expression must have Boolean type. Every verify in a clause must evaluate as true in order for the clause to succeed. The examples are as follows:
      - `verify above(blockNumber)` tests that the current block height above the given `blockNumber`.
      - `verify checkTxSig(key, sig)` tests that a given signature matches a given public key and the transaction unlocking this contract.
      - `verify newBid > currentBid` tests that `newBid` is greater than `currentBid`.
  &nbsp;
  * `lock` statement has the form:
  
    &nbsp;
    `lock valueAmount of valueAsset with program`
    
    &nbsp;
    The `valueAmount` represents the number of assets, the `valueAsset` represents the asset type, and `program` represents the receiving object with `Program` type.
  &nbsp;
  * `unlock` statement has the form:
  
    &nbsp;
    `unlock valueAmount of valueAsset`

    &nbsp;  
    The `valueAmount` represents the number of assets, the `valueAsset` represents the asset type, The `unlock` statement indicates that the unlocked asset can be arbitrary receiving object(without specifying the new contract).
  &nbsp;
  * `define` statement has the form:
    
    &nbsp;
    `define identifier : TypeName = expression`
    or
    `define identifier : TypeName`
  
    &nbsp;
    The `identifier` is a variable whose data type is `TypeName`. If the custom variable has no assignment, the variable must be assigned in the `assign` statement. The examples are as follows:
    - `define value : Integer = amount` defined a integer variable `value` which assigned with `amount`.
    - `define value : Integer = amount + shift` defined a integer variable `value` which assigned with `amount + shift` expression.
    - `define value : Integer` defined a integer variable without assigned, this variable needs to be assigned in the `assign` statement, otherwise it will report "variable is not assigned".
  &nbsp;
  * `assign` statement has the form:
    
    &nbsp;
    `assign identifier = expression`
  
    &nbsp;
    The `identifier` must be a variable which defined in the `define` statement, besides, it is forbidden to modify variables in `contract` and `clause`. The example is as follows:
    - `assign value = amount` assigned with `amount`, the type of the `amount` must be same with `value`.
  &nbsp;
  * `if-else` statement has the form:
  
    &nbsp;
    `if expression { statements }`
    or
    `if expression { statements } else { statements }`

    &nbsp;
    The `expression` is the the judgment condition of the `if-else` statement, and the result of this expression must be a `bool` type. it execute the `statements` block below `if` When the result is `true`, otherwise Execute the `statements` block under `else`.

### Basic Type
  The available types:

  - `Boolean` value is `true` or `false`.
  - `Integer` - the range of value is `[-2^63, 2^63-1]`.
  - `Amount` - the range of value is `[0, 2^63-1]`.
  - `Asset` - assetID, the length is 32 bytes.
  - `Hash` - hash, the length is 32 bytes.
  - `PublicKey` - publickey, the length is 32 bytes.
  - `Signature` - signature should be constructed by `root_xpub` and `derivation_path` according to `publickey`, and only be used in the parameter list of `clause`.
  - `Program` - receiver program.
  - `String` - normal string.

### Expression
  The expression can be used in the `expression` which is in statement. The available expression categories are as follows:
  
  * Unary expression
    - `- expr` : negates a numeric expression
    - `~ expr` : inverts the bits in a byte string
  &nbsp;
  * Conditional expression, each of the following requires numeric operands (Integer or Amount) and produces a Boolean result:
    - `expr1 > expr2` : tests whether `expr1` is greater than `expr2`
    - `expr1 < expr2` : tests whether `expr1` is less than `expr2`
    - `expr1 >= expr2` : tests whether `expr1` is greater than or equal to `expr2`
    - `expr1 <= expr2` : tests whether `expr1` is less than or equal to `expr2`
    - `expr1 == expr2` : tests whether `expr1` is equal to `expr2`
    - `expr1 != expr2` : tests whether `expr1` is not equal `expr2`
  &nbsp;
  * Bitwise operation expression, these operate on byte strings and produce byte string results:
    - `expr1 ^ expr2` : produces the bitwise XOR of its operands
    - `expr1 | expr2` : produces the bitwise OR of its operands
    - `expr1 & expr2` : produces the bitwise AND of its operands
  &nbsp;
  * Numerical expression, these operate on numeric operands (Integer or Amount) and produce a numeric result:
    - `expr1 + expr2` : adds its operands
    - `expr1 - expr2` : subtracts `expr2` from `expr1`
    - `expr1 * expr2` : multiplies its operands
    - `expr1 / expr2` : divides `expr1` by `expr2`
    - `expr1 % expr2` : produces `expr1` modulo `expr2`
    - `expr1 << expr2` : performs a bitwise left shift on `expr1` by `expr2` bits
    - `expr1 >> expr2` : performs a bitwise right shift on `expr1` by `expr2` bits
  &nbsp;
  * Other expression：
    - `( expr )` : is expr
    - `expr ( arguments )` : is a function call, where arguments is a comma-separated list of expressions; see built-in functions below
    - a bare identifier is a variable reference
    - `[ exprs ]` : is a list literal, where exprs is a comma-separated list of expressions (presently used only in checkTxMultiSig)
    - a sequence of numeric digits optionally preceded by `-` is an integer literal
    - a sequence of bytes between single quotes `'...'` is a string literal
    - the prefix `0x` followed by `2n` hexadecimal digits is also a string literal representing `n` bytes

### Built-in Functions
  The available built-in functions:

  - `abs(n)` returns the absolute value of the value n.
  - `min(x, y)` returns the smallest of the two values ​​x and y.
  - `max(x, y)` returns the largest of the two values ​​x and y.
  - `size(s)` takes an expression of any type and produces its `Integer` size in bytes.
  - `concat(s1, s2)` takes two strings and concatenates them to produce a new string.
  - `concatpush(s1, s2)` takes two strings and produces the concatenation of s1 followed by the BVM opcodes needed to push s2 onto the BVM stack. This is typically used to construct new VM programs out of pieces of other ones. 
  - `below(height)`  takes a `unsigned integer` and returns a `Boolean` telling whether the current block height below to `height`.
  - `above(height)` takes a `unsigned integer` and returns a `Boolean` telling whether the current block height above to `height`.
  - `sha3(s)` takes a byte string and produces its SHA3-256 hash. 
  - `sha256(s)` takes a byte string and produces its SHA-256 hash.
  - `checkTxSig(key, sig)` takes a `PublicKey` and a `Signature` and returns a `Boolean` telling whether `sig` matches both key and the unlocking transaction.
  - `checkTxMultiSig([key1, key2, ...], [sig1, sig2, ...])` takes one list-literal of `PublicKeys` and another of `Signatures` and returns a `Boolean` that is true only when every `sig` matches both a key and the unlocking transaction. Ordering matters: not every key needs a matching signature, but every signature needs a matching key, and those must be in the same order in their respective lists.
