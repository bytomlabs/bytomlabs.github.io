---
title: Bytom
---

# Bytom

<a name="8a5c42b7"></a>
## Installing with Homebrew
```
brew tap bytom/bytom && brew install bytom
```
<a name="b3abf203"></a>
## [](https://github.com/Bytom/bytom#building-from-source)Building from source
<a name="Requirements"></a>
### [](https://github.com/Bytom/bytom#requirements)Requirements
[Go](https://golang.org/doc/install) version 1.8 or higher, with `$GOPATH` set to your preferred directory
<a name="Installation"></a>
### [](https://github.com/Bytom/bytom#installation)Installation
Ensure Go with the supported version is installed properly:

```
$ go version
$ go env GOROOT GOPATH
```

Get the source code

```
$ git clone https://github.com/Bytom/bytom.git $GOPATH/src/github.com/bytom
```

Build source code<br /><br /><br />
```
$ cd $GOPATH/src/github.com/bytom
$ make bytomd    # build bytomd
$ make bytomcli  # build bytomcli
```

When successfully building the project, the `bytom` and `bytomcli` binary should be present in `cmd/bytomd` and `cmd/bytomcli` directory, respectively.
<a name="Executables"></a>
### [](https://github.com/Bytom/bytom#executables)Executables
The Bytom project comes with several executables found in the `cmd` directory.

| Command | Description |
| --- | --- |
| **bytomd** | bytomd command can help to initialize and launch bytom domain by custom parameters. `bytomd --help`for command line options. |
| **bytomcli** | Our main Bytom CLI client. It is the entry point into the Bytom network (main-, test- or private net), capable of running as a full node archive node (retaining all historical state). It can be used by other processes as a gateway into the Bytom network via JSON RPC endpoints exposed on top of HTTP, WebSocket and/or IPC transports. `bytomcli --help` and the [bytomcli Wiki page](https://github.com/Bytom/bytom/wiki/Command-Line-Options) for command line options. |

<a name="1aae734a"></a>
## [](https://github.com/Bytom/bytom#running-bytom)Running bytom
Currently, bytom is still in active development and a ton of work needs to be done, but we also provide the following content for these eager to do something with `bytom`. This section won't cover all the commands of `bytomd` and `bytomcli` at length, for more information, please the help of every command, e.g., `bytomcli help`.
<a name="Initialize"></a>
### [](https://github.com/Bytom/bytom#initialize)Initialize
First of all, initialize the node:

```bash
$ cd ./cmd/bytomd
$ ./bytomd init --chain_id mainnet
```

There are three options for the flag `--chain_id`:<br />
* `mainnet`: connect to the mainnet.
* `testnet`: connect to the testnet wisdom.
* `solonet`: standalone mode.

After that, you'll see `config.toml` generated, then launch the node.
<a name="launch"></a>
### [](https://github.com/Bytom/bytom#launch)launch

```bash
$ ./bytomd node
```

available flags for `bytomd node`:
```
--auth.disable                Disable rpc access authenticate
      --chain_id string             Select network type
  -h, --help                        help for node
      --mining                      Enable mining
      --p2p.dial_timeout int        Set dial timeout (default 3)
      --p2p.handshake_timeout int   Set handshake timeout (default 30)
      --p2p.laddr string            Node listen address.
      --p2p.max_num_peers int       Set max num peers (default 50)
      --p2p.pex                     Enable Peer-Exchange  (default true)
      --p2p.seeds string            Comma delimited host:port seed nodes
      --p2p.skip_upnp               Skip UPNP configuration
      --prof_laddr string           Use http to profile bytomd programs
      --vault_mode                  Run in the offline enviroment
      --wallet.disable              Disable wallet
      --wallet.rescan               Rescan wallet
      --web.closed                  Lanch web browser or not
      --simd.enable                 Enable the _simd_ feature to speed up the _PoW_ verification (e.g., during mining and block verification)
```

Given the `bytomd` node is running, the general workflow is as follows:
* create key, then you can create account and asset.
* send transaction, i.e., build, sign and submit transaction.
* query all kinds of information, let's say, avaliable key, account, key, balances, transactions, etc.

**simd feature:**<br />You could enable the _simd_ feature to speed up the _PoW_ verification (e.g., during mining and block verification) by simply:
```
bytomd node --simd.enable
```
To enable this feature you will need to compile from the source code by yourself, and `make bytomd-simd`.<br />What is more,
* if you are using _Mac_llvm_ is installed by `brew install llvm`.
* if you are using _Windows_mingw-w64_PATH_ environment variable accordingly.

For more details about using `bytomcli` command please refer to [API Reference](https://github.com/Bytom/bytom/wiki/API-Reference)
<a name="Dashboard"></a>
### [](https://github.com/Bytom/bytom#dashboard)Dashboard
Access the dashboard:
```
$ open http://localhost:9888/
```
<a name="7dbea6a4"></a>
### [](https://github.com/Bytom/bytom#in-docker)In Docker
Ensure your [Docker](https://www.docker.com/) version is 17.05 or higher.<br />$ docker build -t bytom .<br />For the usage please refer to [running-in-docker-wiki](https://github.com/Bytom/bytom/wiki/Running-in-Docker).
