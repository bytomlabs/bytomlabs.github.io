export default {
    'en-us': {
        sidemenu: [{
                title: 'Understanding Bytom',
                children: [{
                        title: 'Overview',
                        link: '/en-us/docs/00_index.html',
                    }, {
                        title: 'Architecture and Design',
                        opened: true,
                        children: [{
                                title: 'Overall Architecture Overview',
                                link: '/en-us/docs/13_architecture_overview.html',
                            },
                            {
                                title: 'Key',
                                link: '/en-us/docs/14_key.html',
                            },
                            {

                                title: 'Address',
                                link: '/en-us/docs/15_address.html',
                            },
                            {
                                title: 'Account',
                                link: '/en-us/docs/16_account.html',
                            },
                            {
                                title: 'Transaction',
                                link: '/en-us/docs/17_transaction.html',
                            },
                            {
                                title: 'Block',
                                link: '/en-us/docs/18_block.html',
                            },
                            {
                                title: 'UTXO',
                                link: '/en-us/docs/19_UTXO.html',
                            },
                        ],
                    },
                    {
                        title: 'Consensus',
                        link: '/en-us/docs/20_consensus.html',
                    },
                    {
                        title: 'Smart Contract',
                        opened: true,
                        children: [{
                                title: 'Overview',
                                link: '/en-us/docs/22_smart_contract_overview.html',
                            },
                            {
                                title: 'Smart Contract Build',
                                link: '/en-us/docs/23_smart_contract_build.html',
                            },
                            {
                                title: 'Contract Template',
                                link: '/en-us/docs/24_contract_operator.html',
                            },
                            {
                                title: 'Contract Template',
                                link: '/en-us/docs/22_contract_template.html',
                            },
                        ],
                    },
                    {
                        title: 'Side Chain',
                        opened: true,
                        children: [{
                                title: 'Overview',
                                link: '/en-us/docs/30_sidechain_overview.html',
                            },
                            {
                                title: 'Configuration Node',
                                link: '/en-us/docs/31_sidechain.html',
                            },
                        ],
                    },

                ],
            },
            {
                title: 'Developer Guilde',
                children: [{
                    title: 'Build Developer Environment',
                    link: '/en-us/docs/06_build_environment.html'
                }, {
                    title: 'Compile and Run Node',
                    opened: true,
                    children: [{
                            title: 'Compile run node',
                            link: '/en-us/docs/07_compile_and_run_node.html',
                        },
                        {
                            title: 'docker run node',
                            link: '/en-us/docs/32_docker_run.html',
                        },
                    ],
                }, {
                    title: 'RPC Tutorial',
                    link: '/en-us/docs/08_rpc_call.html',
                }, {
                    title: 'Websocket Tutorial',
                    link: '/en-us/docs/09_ws_call.html',
                }, ],
            },
            {
                title: 'Fast Learning',
                children: [{
                    title: 'DAPP Guild',
                    opened: true,
                    children: [{
                            title: 'Installation And Operation',
                            link: '/en-us/docs/dapp/1_dapp.html',
                        },
                        {
                            title: 'Configuration Node',
                            link: '/en-us/docs/dapp/2_dapp.html',
                        },
                        {
                            title: 'Command Line Tool',
                            link: '/en-us/docs/dapp/3_dapp.html',
                        },
                    ],
                }, {
                    title: 'Development Data Collection',
                    opened: true,
                    children: [{
                            title: 'Document',
                            link: '/en-us/docs/collection/1_collection.html',
                        },
                        {
                            title: 'Configuration Node',
                            link: '/en-us/docs/collection/2_collection.html',
                        },
                        {
                            title: 'Command Line Tool',
                            link: '/en-us/docs/collection/3_collection.html',
                        },
                    ],
                }, ],
            },
            {
                title: 'Docking Guild',
                children: [{
                    title: 'Exchange Docking Guide',
                    opened: true,
                    children: [{
                            title: 'Installation And Operation',
                            link: '/en-us/docs/exchange/1_exchange.html',
                        },
                        {
                            title: 'Configuration Node',
                            link: '/en-us/docs/exchange/2_exchange.html',
                        },
                        {
                            title: 'Configuration Node',
                            link: '/en-us/docs/exchange/3_exchange.html',
                        },
                    ],
                }, {
                    title: 'Wallet Docking Guide',
                    opened: true,
                    children: [{
                            title: 'Sign Key',
                            link: '/en-us/docs/wallet/1_wallet.html',
                        },
                        {
                            title: 'Configuration Node',
                            link: '/en-us/docs/wallet/2_wallet.html',
                        },
                        {
                            title: 'Begining',
                            link: '/en-us/docs/wallet/3_wallet.html',
                        },
                    ],
                }, ],
            },
            {
                title: 'SDK Total',
                children: [{
                    title: 'Third party SDK',
                    link: '/en-us/docs/10_other_sdk.html',
                }, ],
            },
            {
                title: 'Ecosphere',
                children: [{
                    title: 'Bytom Ecology',
                    opened: true,
                    children: [{
                            title: 'Full Node Wallet',
                            link: '/en-us/docs/23_wallet.html',
                        },
                        {
                            title: 'Light Wallet',
                            link: '/en-us/docs/24_ligth_wallet.html',
                        },
                        {
                            title: 'Blockchain Browser',
                            link: '/en-us/docs/25_block_explorer.html',
                        },
                        {
                            title: 'Mine Pool',
                            link: '/en-us/docs/26_mining_pool.html',
                        },
                    ],
                }, {
                    title: 'Floor Application',
                    opened: true,
                    children: [{
                            title: 'application',
                            link: '/en-us/docs/application/1_application.html',
                        },
                        
                    ],
                }, ],
            },
        ],
        barText: 'Document',
    },
    'zh-cn': {
        sidemenu: [{
                title: '认识比原',
                children: [{
                        title: '概述',
                        link: '/zh-cn/docs/00_index.html',
                    }, {
                        title: '设计原理和架构',
                        opened: true,
                        children: [{
                                title: '整体架构概览',
                                link: '/zh-cn/docs/13_architecture_overview.html',
                            },
                            {
                                title: '秘钥',
                                link: '/zh-cn/docs/14_key.html',
                            },
                            {

                                title: '地址',
                                link: '/zh-cn/docs/15_address.html',
                            },
                            {
                                title: '账户',
                                link: '/zh-cn/docs/16_account.html',
                            },
                            {
                                title: '交易',
                                link: '/zh-cn/docs/17_transaction.html',
                            },
                            {
                                title: '区块',
                                link: '/zh-cn/docs/18_block.html',
                            },
                            {
                                title: 'UTXO',
                                link: '/zh-cn/docs/19_utxo.html',
                            },
                        ],
                    },
                    {
                        title: '共识算法',
                        link: '/zh-cn/docs/20_consensus.html',
                    },
                    {
                        title: '智能合约',
                        opened: true,
                        children: [{
                                title: '概述',
                                link: '/zh-cn/docs/22_smart_contract_overview.html',
                            },
                            {
                                title: '构造流程',
                                link: '/zh-cn/docs/23_smart_contract_build.html',
                            },
                            {
                                title: '操作符介绍',
                                link: '/zh-cn/docs/24_contract_operator.html',
                            },
                            {
                                title: '合约模板',
                                link: '/zh-cn/docs/25_contract_template.html',
                            },
                        ],
                    },
                    {
                        title: '侧链',
                        opened: true,
                        children: [{
                                title: '概述',
                                link: '/zh-cn/docs/30_sidechain_overview.html',
                            },
                            {
                                title: '配置节点',
                                link: '/zh-cn/docs/31_sidechain.html',
                            },
                        ],
                    },

                ],
            },
            {
                title: '开发者指南',
                children: [{
                    title: '搭建开发环境',
                    link: '/zh-cn/docs/06_build_environment.html'
                }, {
                    title: '编译运行全节点',
                    opened: true,
                    children: [{
                            title: '安装与运行',
                            link: '/zh-cn/docs/07_compile_and_run_node.html',
                        },
                        {
                            title: 'docker运行比原全节点',
                            link: '/zh-cn/docs/demo2.html',
                        },
                    ],
                }, {
                    title: '全节点RPC接口调用',
                    link: '/zh-cn/docs/08_rpc_call.html',
                }, {
                    title: 'Websocket使用说明',
                    link: '/zh-cn/docs/09_ws_call.html',
                }, ],
            },
            {
                title: '快速学习',
                children: [{
                    title: 'DAPP开发指南',
                    opened: true,
                    children: [{
                            title: '安装与运行',
                            link: '/zh-cn/docs/dapp/1_dapp.html',
                        },
                        {
                            title: '配置节点',
                            link: '/zh-cn/docs/dapp/2_dapp.html',
                        },
                        {
                            title: '命令行工具',
                            link: '/zh-cn/docs/dapp/3_dapp.html',
                        },
                    ],
                }, {
                    title: '开发资料集合',
                    opened: true,
                    children: [{
                            title: '文档',
                            link: '/zh-cn/docs/collection/1_collection.html',
                        },
                        {
                            title: '配置节点',
                            link: '/zh-cn/docs/collection/2_collection.html',
                        },
                        {
                            title: '命令行工具',
                            link: '/zh-cn/docs/collection/3_collection.html',
                        },
                    ],
                }, ],
            },
            {
                title: '对接指南',
                children: [{
                    title: '交易所对接指南',
                    opened: true,
                    children: [{
                            title: '安装与运行',
                            link: '/zh-cn/docs/exchange/1_exchange.html',
                        },
                        {
                            title: '配置节点',
                            link: '/zh-cn/docs/exchange/2_exchange.html',
                        },
                        {
                            title: '配置节点',
                            link: '/zh-cn/docs/exchange/3_exchange.html',
                        },
                    ],
                }, {
                    title: '钱包所对接指南',
                    opened: true,
                    children: [{
                            title: '安装与运行',
                            link: '/zh-cn/docs/wallet/1_wallet.html',
                        },
                        {
                            title: '配置节点',
                            link: '/zh-cn/docs/wallet/2_wallet.html',
                        },
                        {
                            title: '开始挖矿',
                            link: '/zh-cn/docs/wallet/3_wallet.html',
                        },
                    ],
                }, ],
            },
            {
                title: 'SDK集锦',
                children: [{
                    title: '第三方SDK',
                    link: '/zh-cn/docs/10_other_sdk.html',
                }, ],
            },
            {
                title: '生态圈',
                children: [{
                    title: '比原生态',
                    opened: true,
                    children: [{
                            title: '全节点钱包',
                            link: '/zh-cn/docs/26_wallet.html',
                        },
                        {
                            title: '轻钱包',
                            link: '/zh-cn/docs/27_ligth_wallet.html',
                        },
                        {
                            title: '区块链浏览器',
                            link: '/zh-cn/docs/28_block_explorer.html',
                        },
                        {
                            title: '矿池',
                            link: '/zh-cn/docs/29_mining_pool.html',
                        },
                    ],
                }, {
                    title: '落地应用',
                    opened: true,
                    children: [{
                            title: '应用',
                            link: '/zh-cn/docs/application/1_application.html',
                        },
                        
                    ],
                }, ],
            },
        ],
        barText: '文档',
    },
}