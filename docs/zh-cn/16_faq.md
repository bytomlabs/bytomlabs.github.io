---
title: 常见问题
---

# 常见问题

**1、如何连接远程全节点服务器**

远程服务需要本地生成的Access-token，可以通过以下两种方式：<br />`./bytomcli create-access-token test`  或者 `curl -X POST create-access-token -d '{"id":"test"}'`<br />然后获得access-token：

"created_at": "2018-05-18T16:00:25.284677605+08:00",<br />"id": "test",<br />"token":"test:fe50927ddaa5bcca77021e9f50fa5ef236a6140c012d1fe2eb9241f61a9228e4

test是账户，fe50927ddaa5bcca77021e9f50fa5ef236a6140c012d1fe2eb9241f61a9228e4是密码

postman的方式，设置Authorization为Basic Auth，然后填写账户名和密码

Java代码调用：

```
String auth = Username + ":" + Password;
byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
String authHeader = "Basic " + new String(encodedAuth);
Map<String, String> header = new LinkedHashMap<String, String>();
header.put("Authorization", authHeader);
```

**2、错误：{"status":"fail","msg":"tx rejected: checking result 0: checking output source: checking value source: checking mux source 0: checking value source: checking issuance program: pushing initial argument 0: run limit exceeded"} ，**

交易费gas给少了

**3、reservation found outputs already reserved **

表示该账户的utxo被暂时缓存，建议隔几分钟后再发该交易，一般是交易密码错误

**4、build里面那个ttl是干嘛用的？**

ttl表示utxo的缓存时间， reservation found outputs already reserved, 这个错误对应的时间，time_range 是为了延迟交易上链的一个时间戳，ttl 为 0 的话会采用默认的时间，大概2两个块的时间（五分钟），超过ttl不能重新 build-transaction

**5、一笔交易最大可以支持多少上链数据？**

上链数据和gas上限有关，现在比原链数据上限为175000字节 = 170 KB

**6、如何配置区块数据到指定位置**

`$ ./bytomd node --mining --home <config_and_data_path>`

