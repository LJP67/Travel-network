// 这是处理axios的请求拦截插件
import { Messsage } from "element-ui";
export default ({ $axios }) => {

    // 错误拦截,onError用于错误拦截
    $axios.onError(res => {
        // 返回的res是一个错误的对象,Error对象下面都有一个response的属性可以访问错误的信息

        // 解构出错误的信息和代码
        const { messsage, statusCode } = res.response.data;

        if (statusCode === 400) {
            // Messsage = this.$message
            Messsage.error(message)
        }
    })
}