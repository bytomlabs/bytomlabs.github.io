##  搭建开发环境

假设你已经配置好 [`go` v1.8 or higher installed](https://golang.org/doc/install), 并且设置好 `GOPATH`。

**备注**:你必须将工作目录拷贝到 `$GOPATH/src/github.com/bytom`.

因为 `go` 不依赖于import的相对路径，所以把项目放在在任何目录中都没有影响, 因为import路径会被追加到 `$GOPATH/src`,如果lib不存在, 将会从 master HEAD下载.

你最可能会把项目放在 `bytom`fork下面, 那么让我们从 `github.com/nirname/bytom`开始. 克隆并移动你的fork到正确的地方:

```
git clone git@github.com:nirname/bytom.git $GOPATH/src/github.com/bytom
```
