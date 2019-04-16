# Simd

<a name="Installation"></a>
## Installation

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
#### [](https://www.yuque.com/zionfuo/pviq87/enocye#Build)Build

```bash
$ cd $GOPATH/src/github.com/bytom
$ make bytom-simd
```

Compile Bytom clients that support Intel [SIMD](https://en.wikipedia.org/wiki/Streaming_SIMD_Extensionsl) technology:

1. If you use a MacOS system, you need to install llvm run command in advance: `brew install llvm`.
1. If you use the Windows system, you need to install the MinGW-w64 in advance and set the corresponding PATH environment variables.

