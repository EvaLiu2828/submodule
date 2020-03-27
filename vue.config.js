'use strict'
const path = require('path')
const webpack = require('webpack')
const defaultSettings = require('./config/index.js')

function resolve (dir) {
    return path.join(__dirname, dir)
}
  
const name = defaultSettings.title || 'vue vant template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9605 npm run dev OR npm run dev --port = 9605
const port = process.env.port || process.env.npm_config_port || 8500 // dev port
 
// key: package name
// value: global variable name
// key是import的包名，value是CDN提供的全局变量名
// 所以最后webpack会把一个静态资源编译成：module.export[key] = window[value]
const externals = {
    "RuixinApi": "RuixinApi"
}

module.exports = {
    /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
    publicPath: defaultSettings.basePath,
    outputDir: 'dist',
    assetsDir: 'static',
    indexPath: 'index.html',
    filenameHashing: true,
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true, // 项目启动时是否自动打开浏览器 或 通过 npm 命令参数 --open 设置
        overlay: {
          warnings: false,
          errors: true
        },
        disableHostCheck: true
    },
    css: {
        loaderOptions: {
        //   css: {
        //     // 这里的选项会传递给 css-loader
        //   },
            postcss: {
            // 这里的选项会传递给 postcss-loader
                plugins: [
                    require('postcss-pxtorem')({ // 把px单位换算成rem单位
                        rootValue: 37.5,
                        unitPrecision: 5, // 最小精度，小数点位数
                        propList: ['*'], // !不匹配属性（这里是字体相关属性不转换）, '!font*'
                        selectorBlackList: [],
                        minPixelValue: 2 // 替换的最小像素值
                    }),
                    require('autoprefixer')({
                    // browsers: ['Android >= 4.0', 'iOS >= 7'] ==>修改为下面
                        overrideBrowserslist: [
                            'Android 4.1',
                            'iOS 7.1',
                            'Chrome > 31',
                            'ff > 31',
                            'ie >= 8'
                        ]
                    })
                ]
            }
        }
    },
    configureWebpack: config => {
        // 为生产环境修改配置...
        if (process.env.NODE_ENV === 'production') {
            // externals 里的模块不打包
            Object.assign(config, {
            // provide the app's title in webpack's name field, so that
            // it can be accessed in index.html to inject the correct title.
                name: name,
                externals: externals
            })
        }
        // 为开发环境修改配置...
        if (process.env.NODE_ENV === 'development') {
            Object.assign(config, {
                name: name,
                externals: externals
            })
        }
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery",
                "RuixinApi": "RuixinApi"
            })
        ],
        config.externals = {
            "RuixinApi": "RuixinApi"
        }
    },
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
        // alias
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('_v', resolve('src/views'))
            .set('_c', resolve('src/components'))
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }))
    }
}