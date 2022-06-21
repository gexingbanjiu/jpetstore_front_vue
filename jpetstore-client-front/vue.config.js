/*
 * @Author: Rain 1254895072@qq.com
 * @Date: 2022-04-21 15:51:04
 * @LastEditors: Rain 1254895072@qq.com
 * @LastEditTime: 2022-06-09 22:42:37
 * @FilePath: \jpetstore-client-front\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8081',
        changeOrigin: true , //是否跨域
        ws: false
      }
    }
  },
  
    publicPath: './',
})
