## Install from release

You can install from [release](https://github.com/Bytom/bytom/releases), it offers some releases for 3 main operating system. 

Examples:

- bytom-1.0.3-darwin_386.tgz
- bytom-1.0.3-darwin_amd64.tgz
- bytom-1.0.3-linux_386.tgz
- bytom-1.0.3-linux_amd64.tgz
- bytom-1.0.3-windows_386.zip
- bytom-1.0.3-windows_amd64.zip

## Install from source

### Requirements

- [Go](https://golang.org/doc/install) version 1.8 or higher, with `$GOPATH` set to your preferred directory

### Installation

Ensure Go with the supported version is installed properly:

```
$ go version
$ go env GOROOT GOPATH
```

#### Get the source code

```
$ git clone https://github.com/Bytom/bytom.git $GOPATH/src/github.com/bytom
```

#### Build

```
$ cd $GOPATH/src/github.com/bytom
$ make bytomd    # build bytomd
$ make bytomcli  # build bytomcli
```

When successfully building the project, the `bytom` and `bytomcli` binary should be present in `cmd/bytomd` and `cmd/bytomcli` directory, respectively.

## Running in Docker

### Build the image
```bash
docker build -t bytom .
```

### Init bytom
```bash
docker run -v <Bytom/data/directory/on/host/machine>:/root/.bytom bytom:latest bytomd init --chain_id <chainId>
```

The default Bytom data directory (on the host) is:

+ Mac: `~/Library/Bytom`
+ Linux: `~/.bytom` 
+ Windows: `%APPDATA%\Bytom`

### Enter the iterative mode
```bash
docker run -it -p 9888:9888 -v <Bytom/data/directory/on/host/machine>:/root/.bytom bytom:latest
```

Then you can use bytomd and bytomcli following [Readme](https://github.com/Bytom/bytom/blob/master/README.md)

Use `exit` to exit Docker's iterative mode

### Daemon mode
For example,
```bash
docker run -d -p 9888:9888 -v <Bytom/data/directory/on/host/machine>:/root/.bytom bytom:latest bytomd node --web.closed --auth.disable
```

__To list the running containners and check their container id, image, corresponding command, created time, status, name and ports being used:__
```bash
docker container ls
```
or 
```bash
docker ps
```

__To execute a command inside a containner, for example:__
```bash
docker exec -it <containerId> bytomcli create-access-token <tokenId>
```

__To stop a running containner:__
```bash
docker stop <containerId>
```

__To remove a containner:__
```bash
docker rm <containerId>
```
