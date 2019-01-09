## Simple Payment Verification Wallet

Simple Payment Verification (SPV) allows a lightweight client to verify that a transaction is included in the Bytom blockchain,
 without downloading the entire blockchain. The SPV client only needs download the block headers, which are much smaller 
 than the full blocks. To verify that a transaction is in a block, a SPV client requests a proof of inclusion, in the form 
 of a Merkle branch.

To use the SPV wallet [https://github.com/Bytom/bytom-spv/releases](https://github.com/Bytom/bytom-spv/releases). 
Run and configured as the normal Bytom wallet.

#### Init 

```
./bytom-spv-wallet init --chain_id testnet -r ~/.bytom_spv
```

### launch

```
$ ./bytom-spv-wallet node -r ~/.bytom_spv
```

### Dashboard
Access the dashboard:
```
$ open http://localhost:9888/
```

---
