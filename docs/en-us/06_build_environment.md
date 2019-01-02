## Developer Environment

We assume that you have [`go` v1.8 or higher installed](https://golang.org/doc/install), and `GOPATH` is set.

**Note**:You must have your working copy under `$GOPATH/src/github.com/bytom`.

Since `go` does not use relative path for import, working in any other directory will have no effect, since the import paths will be appended to `$GOPATH/src`, and if the lib does not exist, the version at master HEAD will be downloaded.

Most likely you will be working from your fork of `bytom`, let's say from `github.com/nirname/bytom`. Clone or move your fork into the right place:

```
git clone git@github.com:nirname/bytom.git $GOPATH/src/github.com/bytom
```