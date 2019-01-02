## Compile and Run Node

### Building Executables

#### Basic compilation
Switch to the bytom repository root directory.
```bash
$ cd $GOPATH/src/github.com/bytom
$ make bytomd    # build bytomd
$ make bytomcli  # build bytomcli
```
When successfully building the project, the `bytom` and `bytomcli` binary should be present in `cmd/bytomd` and `cmd/bytomcli` directory, respectively.

#### Some other compilation options

`make bytomd-simd`: 

1. compile the simd version of `bytomd`.
2. notes:
      1. if you are using _Mac_, please make sure _llvm_ is installed by `brew install llvm`.
      2. if you are using _Windows_, please make sure _mingw-w64_ is installed and set up the _PATH_ environment variable accordingly.

`make release`: 

1. compile the _32-bit_ and _64-bit_ version of `bytomd`, `bytomcli` and `miner` basing on the OS.
2. md5 the checksum and compress the files into `target/` directory. On Darwin `brew install md5sha1sum` is needed.

`make release-all`: 

1. compile the _32-bit_ and _64-bit_ version of `bytomd`, `bytomcli` and `miner` for _Linux_, _Windows_ and _Darwin_.
2. md5 the checksum and compress the files into `target/` directory. On Darwin `brew install md5sha1sum` is needed.


### Run `bytomd`

#### Initialize

First of all, initialize the node:

```bash
$ cd ./cmd/bytomd
$ ./bytomd init --chain_id testnet
```

There are two options for the flag `--chain_id`:

- `testnet`: connect to the testnet.
- `mainnet`: standalone mode.

After that, you'll see `.bytomd` generated in current directory, then launch the node.

#### Launch

``` bash
$ ./bytomd node --mining
```

available flags for `bytomd node`:

```
      --auth.disable                Disable rpc access authenticate
      --mining                      Enable mining
      --p2p.dial_timeout int        Set dial timeout (default 3)
      --p2p.handshake_timeout int   Set handshake timeout (default 30)
      --p2p.laddr string            Node listen address.
      --p2p.max_num_peers int       Set max num peers (default 50)
      --p2p.pex                     Enable Peer-Exchange
      --p2p.seeds string            Comma delimited host:port seed nodes
      --p2p.skip_upnp               Skip UPNP configuration
      --prof_laddr string           Use http to profile bytomd programs
      --wallet.disable              Disable wallet
      --web.closed                  Lanch web browser or not
      --simd.enable                 Enable the _simd_ feature to speed up the _PoW_ verification (e.g., during mining and block verification)
```

Given the `bytomd` node is running, the general workflow is as follows:

- create key, then you can create account and asset.
- send transaction, i.e., build, sign and submit transaction.
- query all kinds of information, let's say, avaliable key, account, key, balances, transactions, etc.

#### Testing

Testing one library:

```
go test -v ./account 
```

Using options `-v` (logging even if no error) is recommended.

Testing only some methods:

```
go test -v ./account -run TestCreateAccount
```

**Note**: here all tests with prefix _TestMethod_ will be run, so if you got TestMethod, TestMethod1, then both!

**Running benchmarks**, eg.:
switch to test directory.
```bash
cd $GOPATH/src/github.com/bytom/test
go test -v -bench=. -benchtime=3s -run=none
```

Using options `-bench` to specify test directory, and `-benchtime` to specify the test time.

for more see [go test flags](http://golang.org/cmd/go/#hdr-Description_of_testing_flags)
