// 这是注册页面组件
<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item"  prop="username">
                <el-input 
                placeholder="用户名手机"
                v-model="form.username">
                </el-input>
            </el-form-item>  
            <el-form-item class="form-item" prop="captcha">
                <el-input 
                placeholder="验证码"
                v-model="form.captcha" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                placeholder="你的名字"
                 v-model="form.nickname">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                placeholder="密码" 
                type="password"
                 v-model="form.password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input 
                placeholder="确认密码" 
                type="password"
                v-model="form.checkPassword">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
          // rule当前的规则，目前是空的
        // value输入框的值
        // callback是回调函数，必须要调用
        // 确认密码
        const  validatePass = (rule,value,callback) =>{
            if (value === '') {
                callback( new Error('请再次输入密码'));
            }else if(value !==this.form.password) {
                callback(new Error('两次输入密码不一致'))
            }else {
                callback();
            }
        }
        return {
            // 表单数据
            form: {
            username: "17688880000",   // 登录用户名/手机
            password: "111",  // 登录密码
            checkPassword: "111", // 确认密码
            nickname: "111",	// 昵称
            captcha: "000000"		// 手机验证码
            },
            // 表单规则
            rules: {},
        }
        rules: {
            username: [{
                required:true,
                message:'请输入用户手机',
                trigger:'blur'
            }]
            nickname: [{
                required:true,
                message:'请输入用户名',
                trigger:'blur'
            }]
            password: [{
                 required:true,
                message:'请输入用户密码',
                trigger:'blur'
            }]
             checkPassword: [{ 
              validator: checkPassword,
              trigger: 'blur' 
              }]
        }
    },
    methods: {
        // 发送验证码
        handleSendCaptcha(){
            if(!this.form.username){
                this.$confirm('手机号不能为空','提示',{
                    confimButtonText:'确定',
                    showCancelButton:false,
                    type:'warning'
                    // warning:警告
                })
                return;
            }
            if(this.form.username.length !==11){
                this.$confirm('手机号格式错误','提示',{
                     confimButtonText:'确定',
                    showCancelButton:false,
                    type:'warning'
                })
                return;
            }
            // 发送验证码
            this.$axios({
                url:'captchas',
                method:'POST',
                data:{
                    tel:this.form.username//手机号码
                }
            }).then(res => {
                const{code} =res.data;
                this.$confirm(`模拟手机验证码为:${code}`,'提示',{
                    confimButtonText:'确定',
                    showCancelButton:false,
                    type:'warning'
                })
            })

        },


        // 注册
        handleRegSubmit(){
         this.$refs['form'].validate((valid) =>{
             if(valid){
                //  注册提交
                const {checkPassword, ...props} = this.form;
                this.$axios({
                    url:'/accounts/register',
                    method:'POST',
                    data:props
                }).then(res => {
                   // 注册成功后帮用户自动登录
                        // commit接受两个参数，第一个mutations参数是方法名，第二个参数数据
                        this.$store.commit("user/setUserInfo", res.data)
                })
             }
         });
        },
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>