## Node Configuration

Currently, bytom is still in active development and a ton of work needs to be done, but we also provide the following content for these eager to do something with `bytom`. This section won't cover all the commands of `bytomd` and `bytomcli` at length, for more information, please the help of every command, e.g., `bytomcli help`.

### Initialize

First of all, initialize the node:

```
$ cd ./cmd/bytomd
$ ./bytomd init --chain_id mainnet
```

There are three options for the flag `--chain_id`:

- `mainnet`: connect to the mainnet.
- `testnet`: connect to the testnet wisdom.
- `solonet`: standalone mode.

After that, you'll see `config.toml` generated, then launch the node.

### launch

```
$ ./bytomd node --mining
```

available flags for `bytomd node`:

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
```

Given the `bytomd` node is running, the general workflow is as follows:

- create key, then you can create account and asset.
- send transaction, i.e., build, sign and submit transaction.
- query all kinds of information, let's say, avaliable key, account, key, balances, transactions, etc.

