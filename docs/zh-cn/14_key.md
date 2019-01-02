# 助记词

比原链已经支持了BIP39协议, 关于协议的具体信息请查看: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki

# 种子生成私钥

- 输入: 长度为64的种子, 种子的来源可以是随机生成或者从助记词计算而来.
- 输出: 长度为64的私钥
```
$ xprv = hmac(sha512, seed, []byte{'R', 'o', 'o', 't'})
$ xprv[0] &= 248
$ xprv[31] &= 31
$ xprv[31] |= 64
```

# 私钥生成公钥
- 输入: 长度为64的私钥
- 输出: 长度为64的公钥
```
$ xpub[:32] = edwards25519.GeScalarMultBase(xprv[:32])
$ xpub[32:] = xprv[32:]
```

# 私钥推导子私钥
- 输入: 长度为64的私钥, 推导路径的byte数组
- 输出: 长度为64的子私钥
```
$ xpub = xprv.XPub()
$ child_xprv = hmac(sha512, []byte{'N'} + xpub[:32] + derive_path, xpub[32:])
$ child_xprv[0] &= 248
$ child_xprv[29] &= 1
$ child_xprv[30] = 0
$ child_xprv[31] = 0
$
$ carry = 0
$ for i := 0; i < 32; i++ {
$     sum := int(xprv[i]) + int(child_xprv[i]) + carry
$     child_xprv[i] = byte(sum & 0xff)
$     carry = (sum >> 8)
$ }
```

# 公钥推导子公钥
- 输入: 长度为64的公钥, 推导路径的byte数组
- 输出: 长度为64的子公钥
```
$ child_xpub = hmac(sha512, []byte{'N'} + xpub[:32] + derive_path, xpub[32:])
$ child_xpub[0] &= 248
$ child_xpub[29] &= 1
$ child_xpub[30] = 0
$ child_xpub[31] = 0
$ f = edwards25519.GeScalarMultBase(child_xpub[:32])
$ p = edwards25519.Point(xpub[:32])
$ child_xpub[:32] = edwards25519.AddPoint(p, f)
```

# 私钥扩展成签名用的私钥
- 输入: 长度为64的私钥
- 输出: 长度为64的扩展私钥
```
$ expanded = hmac(sha512, xprv, []byte{'E', 'x', 'p', 'a', 'n', 'd'})
$ expanded[:32] = xprv[:32]
```