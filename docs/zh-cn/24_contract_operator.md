# 常见数值操作码

| 关键字                 | 代码            | 描述                                         |
| --------------------- | -------------- | -------------------------------------------- |
| OP_1ADD               | 0x8b           | 返回栈顶数据加1                                    |
| OP_1SUB               | 0x8c           | 返回栈顶数据减1                                    |
| OP_2MUL               | 0x8d           | 返回栈顶数据乘2                                    |
| OP_2DIV               | 0x8e           | 返回栈顶数据除2                                   |
| OP_NEGATE             | 0x8f           | 返回栈顶数据符号取反结果                               |
| OP_ABS                | 0x90           | 返回栈顶数据符号取正结果                               |
| OP_NOT                | 0x91           | 判断输入值是否为0，如果为0则返回true，否则返回false      |
| OP_0NOTEQUAL          | 0x92           | 判断输入值是否不为0，如果不为0则返回true，否则返回false                    |
| OP_ADD                | 0x93           | 返回两个输入值之和                             |
| OP_SUB                | 0x94           | 返回两个输入值之差，即x-y，其中两个输入值的顺序为y、x             |
| OP_MUL                | 0x95           | 返回两个输入值之积                     |
| OP_DIV                | 0x96           | 返回两个输入值相除的结果，即x/y，其中两个输入值的顺序为y、x         |
| OP_MOD                | 0x97           | 返回两个输入值取余的结果，即x mod y，其中两个输入值的顺序为y、x     |
| OP_LSHIFT             | 0x98           | 返回左移位结果，表示y向左移动x位，即 y << uint(x)，其中第一个输入值表示移位系数x，第二个输入值表示操作数y|
| OP_RSHIFT             | 0x99           |返回右移位结果，表示y向右移动x位，即 y >> uint(x)，其中第一个输入值表示移位系数x，第二个输入值表示操作数y |
| OP_BOOLAND            | 0x9a           | 布尔类型逻辑与操作，即两个输入值都为非零时返回true，否则返回false              |
| OP_BOOLOR             | 0x9b           | 布尔类型逻辑或操作，即两个输入值至少有一个为非零时返回true，否则返回false            |
| OP_NUMEQUAL           | 0x9c           | 判断两个整型输入值是否相等，如果相等则返回true，否则返回false                |
| OP_NUMEQUALVERIFY     | 0x9d           | 先执行OP_NUMEQUAL操作，然后再执行OP_VERIFY操作，即两个整型输入值相等时，返回nil（VERIFY成功），否则VERIFY失败     |
| OP_NUMNOTEQUAL        | 0x9e           | 判断两个整型输入值是否不相等，如果不相等则返回true，否则返回false           |
| OP_LESSTHAN           | 0x9f           | 两个输入值的顺序为x、y，如果 y<x 则返回true，否则返回false                |
| OP_GREATERTHAN        | 0xa0           | 两个输入值的顺序为x、y，如果 y>x 则返回true，否则返回false                |
| OP_LESSTHANOREQUAL    | 0xa1           | 两个输入值的顺序为x、y，如果 y<=x 则返回true，否则返回false          |
| OP_GREATERTHANOREQUAL | 0xa2           | 两个输入值的顺序为x、y，如果 y>=x 则返回true，否则返回false          |
| OP_MIN                | 0xa3           | 返回两个栈顶数值中较小的一项                    |
| OP_MAX                | 0xa4           | 返回两个栈顶数值中较大的一项                    |
| OP_WITHIN             | 0xa5           | 三个输入值的顺序为x、y、z，如果 y <= z <= x 则返回true，否则返回fale      |

# 位操作码

| 关键字          | 代码          | 描述                                        |
| -------------- | ------------ | ------------------------------------------- |
| OP_INVERT      | 0x83         | 返回输入值按位取反的运算结果                    |
| OP_AND         | 0x84         | 返回输入值按位逻辑与运算                |
| OP_OR          | 0x85         | 返回输入值按位逻辑或运算                |
| OP_XOR         | 0x86         | 返回输入值按位逻辑异或运算              |
| OP_EQUAL       | 0x87         | 判断两个输入值是否相等，如果相等则返回true，否则返回false |
| OP_EQUALVERIFY | 0x88         | 先执行OP_EQUAL操作，然后再执行OP_VERIFY操作，即两个输入值相等时，返回nil（VERIFY成功），否则VERIFY失败           |

# 字符串处理操作码

| 关键字          | 代码          | 描述                                                         |
| -------------- | ------------ | ------------------------------------------------------------ |
| OP_CAT         | 0x7e         | 返回连接两个字符串的结果，输入字符串的顺序为a、b，返回结果为 ab                                     |
| OP_SUBSTR      | 0x7f         | 返回从指定偏移量开始截取固定长度的字符串子集，输入值的顺序为size、offset、str，返回结果为从str字符串的offset位置截取size大小的字符串子集。输入大小2，offset=c，str=abdcfghk，返回结果为fg                   |
| OP_LEFT        | 0x80         | 返回截取字符串左边指定长度的子串，输入值的顺序为size、str，返回结果为截取str字符串左边size大小的字符串子集。输入size=3，str=hello，返回结果为hel                         |
| OP_RIGHT       | 0x81         | 返回截取字符串右边指定长度的子串，输入值的顺序为size、str，返回结果为截取str字符串右边size大小的字符串子集。输入size=3，str=hello，返回结果为llo                         |
| OP_SIZE        | 0x82         | 返回字符串的长度大小，即len(str)                 |
| OP_CATPUSHDATA | 0x89         | 返回连接两个[]byte数据结果，输入数据的顺序为a、b，返回结果为 append(b, a) |

# 加密和散列操作码

| 关键字            | 代码          | 描述                                                         |
| ---------------- | ------------ | ------------------------------------------------------------ |
| OP_SHA256        | 0xa8         | 返回输入项的sha256哈希值                                     |
| OP_SHA3          | 0xaa         | 返回输入项的sha3哈希值                           |
| OP_HASH160       | 0xab         | 返回输入项的Ripemd160哈希值              |
| OP_CHECKSIG      | 0xac         | 验证交易签名是否正确，如果验证成功则返回true，否则返回false |
| OP_CHECKMULTISIG | 0xad         | 依次验证每个签名和公钥对是否正确，如果所有的签名和公钥对都验证成功则返回true，否则返回false |
| OP_TXSIGHASH     | 0xae         | 返回交易签名哈希，即虚拟机中context的TxSigHash |

# 控制流程操作码

| 关键字             | 代码          | 描述                                                         |
| ----------------- | ------------ | ------------------------------------------------------------ |
| OP_JUMP           | 0x63         | 无条件跳转到堆栈的指定位置，将PC设置为栈顶的四字节小端存储的无符号整数地址。如果该值不存在则执行失败 |
| OP_JUMPIF         | 0x64         | 条件跳转到堆栈的指定位置，跟OP_JUMP的区别在于该操作从数据堆栈中取出一个boolean值，如果为true才把PC设置到该地址，如果为false则不进行任何操作 |
| OP_VERIFY         | 0x69         | 校验数据堆栈的栈顶的结果，如果为true，则删除栈顶元素，并返回nil，否则执行失败  |
| OP_FAIL           | 0x6a         | 无条件执行失败                                               |
| OP_CHECKPREDICATE | 0xc0         | 调用子虚拟机执行对应的program，如果执行成功则返回true，否则返回false。如果VM的运行限制小于256，则立即执行失败                      |

# 堆栈控制操作码

| 关键字           | 代码          | 描述                                                         |
| --------------- | ------------ | ------------------------------------------------------------ |
| OP_TOALTSTACK   | 0x6b         | 把主堆栈的栈顶元素压入辅堆栈顶部，从主堆栈删除               |
| OP_FROMALTSTACK | 0x6c         | 把辅堆栈的栈顶元素压入主堆栈顶部，从辅堆栈删除。如果辅堆栈为空则执行失败 |
| OP_2DROP        | 0x6d         | 删除栈顶两个元素                                             |
| OP_2DUP         | 0x6e         | 复制栈顶两个元素                                             |
| OP_3DUP         | 0x6f         | 复制栈顶三个元素                                             |
| OP_2OVER        | 0x70         | 把栈底的两个元素复制到栈顶                                   |
| OP_2ROT         | 0x71         | 将数据堆栈中的第五和第六个元素移动到栈顶。                   |
| OP_2SWAP        | 0x72         | 将数据堆栈中的第三第四个元素移动到栈顶                       |
| OP_IFDUP        | 0x73         | 当数据堆栈的栈顶不是false时进行复制栈顶                      |
| OP_DEPTH        | 0x74         | 把数据堆栈的元素个数压入堆栈                                 |
| OP_DROP         | 0x75         | 从数据堆栈中删除栈顶元素                                     |
| OP_DUP          | 0x76         | 复制数据堆栈的栈顶元素                                       |
| OP_NIP          | 0x77         | 删除栈顶的下一个元素                                         |
| OP_OVER         | 0x78         | 复制数据堆栈的栈顶下一个元素到栈顶                           |
| OP_PICK         | 0x79         | 将数据堆栈的第n个元素复制到栈顶                              |
| OP_ROLL         | 0x7a         | 将数据堆栈的第n个元素移动到栈顶                              |
| OP_ROT          | 0x7b         | 将数据堆栈中的第三个元素向左翻转                             |
| OP_SWAP         | 0x7c         | 数据堆栈中栈顶的两个元素交换                                 |
| OP_TUCK         | 0x7d         | 从数据堆栈中栈顶元素复制并插入到栈顶下一个元素后面           |

# VM检查操作码

这些指令会导致VM立即停止并返回false 。

| 关键字          | 代码          | 描述                                                         |
| -------------- | ------------ | ------------------------------------------------------------ |
| OP_CHECKOUTPUT | 0xc1         | 从数据堆栈中弹出5项进行检查：prog，version，assetid，amount，index |
| OP_ASSET       | 0xc2         | 这条指令已经删掉了Nonce类型）返回资产ID（assetid），即虚拟机中context的AssetID。校验context的资产ID，主要有两种情况：1）如果第一个action对象是Issuance，则直接推送value.AssetID;2）如果第一个action对象是Spend，则推送SpentOutput.Source.Value.AssetID |
| OP_AMOUNT      | 0xc3         | 这条指令已经删掉了Nonce类型）返回资产数量（amount），即虚拟机中context的Amount。校验context的资产数量，主要有两种情况：1）如果第一个action对象是Issuance，则直接推送value.Amount; 2）如果第一个action对象是Spend，则推送SpentOutput.Source.Value.Amount |
| OP_PROGRAM     | 0xc4         | 返回接收的program，即虚拟机中context的Code               |
| OP_INDEX       | 0xc9         | 返回目标接收对象的索引位置，即虚拟机中context的DestPos      |
| OP_ENTRYID     | 0xca         | 返回目标接收对象的交易entryID，即虚拟机中context的EntryID                             |
| OP_OUTPUTID    | 0xcb         | 返回已花费UTXO生成的交易SpentOutputID，即虚拟机中context的SpentOutputID                             |
| OP_BLOCKHEIGHT | 0xcd         | 返回当前块的高度height，即虚拟机中context的BlockHeight                                         |

# 数据入栈操作指令

| 关键字        | 代码          | 描述                                 |
| ------------ | ------------ | ------------------------------------ |
| OP_PUSHDATA1 | 0x4c         | 将一个字节的数据长度前缀和对应长度大小的字节数据压入堆栈，即(prefix + data)，其中prefix=len(data)，而前缀prefix所能表示的范围为:(0, 255)bytes，对应的十六进制范围为:(0x00, 0xFF) |
| OP_PUSHDATA2 | 0x4d         | 将两个字节的数据长度前缀和对应长度大小的字节数据压入堆栈，即(prefix + data)，其中prefix=len(data)，而前缀prefix所能表示的范围为:(0, 65535)bytes，对应的十六进制范围为:(0x0000, 0xFFFF) |
| OP_PUSHDATA4 | 0x4e         | 将四个字节的数据长度前缀和对应长度大小的字节数据压入堆栈，即(prefix + data)，其中prefix=len(data)，而前缀prefix所能表示的范围为:(0, 4294967295)bytes，对应的十六进制范围为:(0x00000000, 0xFFFFFFFF) |
| OP_1NEGATE   | 0x4f         | 数字 -1 被压入堆栈                   |
| OP_NOP       | 0x61         | 无任何操作                           |
| OP_FALSE / OP_0 | 0x00         | 一个字节空串被推到堆栈中（并非OP_NOP操作，这里会有一个元素被压入堆栈） |
| OP_TRUE  | 0x51         | 数字 1 被压入堆栈                                            |
| OP_1 ~ OP_16  | 0x51 ~ 0x60      | 数字 n 被压入堆栈，n的取值范围为[1, 16]  |
| OP_DATA_1 ~ OP_DATA_75 | 0x01 ~ 0x4b | 把 n 个字节大小的数据压入堆栈， n的取值范围为[1, 75]  |
