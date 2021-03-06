# Mining Pool

<a name="53469cf0"></a>
# How to build BTM pool
<a name="9dec8761"></a>
## [](https://github.com/Bytom/bytom/wiki/How-to-build-BTM-pool#config-the-node)config the node
* when testing, could try switching to the`testnet`or`solonet`
  * `./bytomd init --chain_id testnet`
  * or `./bytomd init --chain_id solonet` , with a lower difficulty, in order to mine with cpu
* could use`-r "your/directory"`to specify the data directory when init with`init`or run with`node`
  * the directory will be created if not existed
<a name="procedure"></a>
## [](https://github.com/Bytom/bytom/wiki/How-to-build-BTM-pool#procedure)procedure
* need to build an account and an addr immediately after u init the node, otherwise, the rewards will be sent to an empty addr
* currently bytom doesn't support specifying the receive addr for rewards, and will use a same one by default
* [API doc](https://github.com/Bytom/bytom/wiki/API-Reference)
* the pool[`/get-work-json`](https://github.com/Bytom/bytom/wiki/API-Reference#get-work-json)from a node
  * need to set-up mining address in advance, using [`/set-minining-address`](https://github.com/Bytom/bytom/wiki/API-Reference#set-minining-address)
* send jobs to miners
  * as for the protocol,[https://github.com/HAOYUatHZ/B3-Mimic/blob/master/docs/STRATUM-BTM.md](https://github.com/HAOYUatHZ/B3-Mimic/blob/master/docs/STRATUM-BTM.md)can be helpful
    * a miner will only receive a job by`login`or by being notified by the pool
      * both use `submit` to submit
      * a miner will not `getjob` actively
  * a mock B3 miner:[https://github.com/HAOYUatHZ/B3-Mimic/blob/master/main.go](https://github.com/HAOYUatHZ/B3-Mimic/blob/master/main.go)
    * `Version`, `Height`, `Timestamp`, `Bits` are little-endian
    * about`target`
      * .
```
var Diff1 = StringToBig("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
func GetTargetHex(diff int64) string {
    padded := make([]byte, 32)
    diffBuff := new(big.Int).Div(Diff1, big.NewInt(diff)).Bytes()
    copy(padded[32-len(diffBuff):], diffBuff)
    buff := padded[0:4]
    targetHex := hex.EncodeToString(Reverse(buff))
    return targetHex
}
```
      * targethex sent from the pool is target1（`0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF`） divided by the_poolDiff_, which is adjusted dynamically in order to ensure a miner submitting shares periodically, e.g., 3 times per minute
        * `ffff3f00` is corresponding to 1024，`c5a70000` is corresponding to 100001
  * the pool need to validate the share
    * header_hash
      * can take advantage of `types.BlockHeader{}`'s `Hash()` in `"github.com/bytom/protocol/bc/types"` if using _golang_
      * [https://github.com/HAOYUatHZ/B3-Mimic/blob/master/docs/blhr_hash_V3.go](https://github.com/HAOYUatHZ/B3-Mimic/blob/master/docs/blhr_hash_V3.go) can be helpful if using other language
    * then follow the_tensority_algo to calc the hash result
      * unfortunately the verification speeds of gonum version, cpp_openblas version, cpp_simd version are all too slow
      * a working pool has to use gpu
        * [cpp tensority](https://github.com/Bytom/CppTensority), this repo also points out how to opt it using gpu
  * if a block is mined, the pool [`/submit-work-json`](https://github.com/Bytom/bytom/wiki/API-Reference#submit-work-json) to a node
* retarget
  * see above, asjusted dynamically to make a miner submit 3 times / min
<a name="2609ad51"></a>
## [](https://github.com/Bytom/bytom/wiki/How-to-build-BTM-pool#batch-tx)batch tx
* the addr for mainnet starts with`bm`
  * length:
    * normal: 42
    * mul-sig: 62
* tool
  * [https://github.com/Bytom/bytom/tree/master/tools/sendbulktx](https://github.com/Bytom/bytom/tree/master/tools/sendbulktx)
* a new addr for change will be generated each time
