---
title: Compile
---

# Compile

<a name="Requirements"></a>
### Requirements

* [Go](https://golang.org/doc/install) version 1.8 or higher, with `$GOPATH` set to your preferred directory

<a name="Installation"></a>
### Installation

Ensure Go with the supported version is installed properly:

```bash
$ go version
$ go env GOROOT GOPATH
```

<a name="2898b2bb"></a>
#### Get the source code

```bash
$ git clone https://github.com/Bytom/bytom.git $GOPATH/src/github.com/bytom
```

<a name="Build"></a>
#### Build

```bash
$ cd $GOPATH/src/github.com/bytom
$ make bytom-simd
```

Compile Bytom clients that support Intel [SIMD](https://en.wikipedia.org/wiki/Streaming_SIMD_Extensionsl) technology:

1. If you use a MacOS system, you need to install llvm run command in advance: `brew install llvm`.
1. If you use the Windows system, you need to install the MinGW-w64 in advance and set the corresponding PATH environment variables.

```bash
$ make release
```

```bash
$ make release-all
```

Compile multiple versions of Bytom clients, including:
1. Compile 32-bit and 64-bit bytomd, bytomcli and miner in the corresponding operating system environment.
1. At the same time, the corresponding binary file is compressed to the target/ Directory. The MacOS system needs to install the md5 verification tool in advance and run the command brew install md5sha1sum.

<a name="bacbf0f6"></a>
### Simple Step

```
$ cd $GOPATH/src/github.com/bytom
$ make bytomd    # build bytomd
$ make bytomcli  # build bytomcli
```

When successfully building the project, the `bytom` and `bytomcli` binary should be present in `cmd/bytomd`and `cmd/bytomcli` directory, respectively.
