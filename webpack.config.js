
const path=require('path')

const webpack=require('webpack');
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const config={
    target:'web',
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test:/.css$/,
               use:[
                   'style-loader',
                   'css-loader'
               ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            },
            
            {
                test:/\.styl$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                     
                    },
                    'stylus-loader'
                ]   
            },
            {
                test:/\.js$/,
                loader:'babel-loader'
            }

        ]
    },
    plugins: [
        new webpack.DefinePlugin({ // 在页面上判断环境 process.env 在 js中都能访问到 process.env="production"
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]

}
if(isDev){
    // 打开dev 调试工具
    config.devtool='#cheap-module-eval-source-map'
    config.devServer={
        port: 8030,
        host: '127.0.0.1',// 通过localhost 和内网IP访问
        overlay: {
            errors: true 
        },
        open:true, //自动打开浏览器 每次npm 都会重新加载 烦！！
        hot: true //热加载
    }
    config.plugins.push( // 热加载 所需的模块
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports=config;

























