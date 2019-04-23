// 全局的一些配置
export default {
    rootPath: '', // 发布到服务器的根目录，需以/开头但不能有尾/，如果只有/，请填写空字符串
    port: 9090, // 本地开发服务器的启动端口
    domain: 'dubbo.apache.org', // 站点部署域名，无需协议和path等
    defaultSearch: 'google', // 默认搜索引擎，baidu或者google
    defaultLanguage: 'en-us',
    'en-us': {
        pageMenu: [
            {
                key: 'home',
                text: 'Home',
                link: '//bytom.io'
            },
            {
            key: 'dev',
            text: 'Developer',
            link: '//bytom.io/dev',
            },
        ],
        disclaimer: {
            title: 'friendship tips',
            content: 'If there are errors in document editing, please contact us!',
        },
        documentation: {
            title: 'Documentation',
            list: [{
                    text: 'Overview',
                    link: '/en-us/docs/01_bytom.html',
                },
                {
                    text: 'Quick start',
                    link: '/en-us/docs/01_bytom.html',
                },
                {
                    text: 'Developer guide',
                    link: '/en-us/docs/01_bytom.html',
                },
            ],
        },
        resources: {
            title: 'Resources',
            list: [{
                text: 'Github',
                link: 'https://github.com/bytomlabs/bytomlabs.github.io',
            }, ],
        },
        copyright: 'Copyright © 2019 Bytom',
    },
    'zh-cn': {
        pageMenu: [
            {
                key: 'home',
                text: '首页',
                link: '//bytom.io'
            },
            {
            key: 'dev',
            text: '开发者',
            link: '//bytom.io/dev',
            },
       
        ],
        disclaimer: {
            title: '友情提示',
            content: '如果文档编辑有错误，请联系我们!',
        },
        documentation: {
            title: '文档',
            list: [{
                    text: 'Overview',
                    link: '/zh-cn/docs/01_bytom.html',
                },
                {
                    text: 'Quick start',
                    link: '/zh-cn/docs/01_bytom.html',
                },
                {
                    text: 'Developer guide',
                    link: '/zh-cn/docs/01_bytom.html',
                },
            ],
        },
        resources: {
            title: '编辑文档',
            list: [{
                text: 'Github',
                link: 'https://github.com/bytomlabs/bytomlabs.github.io',
            }, ],
        },
        copyright: 'Copyright © 2019 Bytom',
    },
}