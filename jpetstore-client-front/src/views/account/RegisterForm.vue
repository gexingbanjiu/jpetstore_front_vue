<template>
    <div class="RegisterForm">
        <div class="register-warpper">
        <el-form
        label-position="left"
         :model="ruleForm"
         :rules="rules"
         label-width="180px"
         status-icon
         ref="ruleForm">
            <el-row :gutter="40" type="flex" justify="center">
                <el-col :span="8" class="col">
                    <h2 class="register-title">JPetStore 用户注册</h2>
                    <el-form-item style="margin-top:50px" label="用户名:" prop="username">
                        <el-input type="text" auto-complete="off" v-model="ruleForm.username"></el-input>
                    </el-form-item>

                    <el-form-item label="密码:" prop="password">
                        <el-input type="password" auto-complete="off" v-model="ruleForm.password"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码:" prop="checkPass">
                        <el-input type="password" auto-complete="off" v-model="ruleForm.checkPass"></el-input>
                    </el-form-item>

                    <el-form-item label="Phone:" prop="phone">
                        <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
                    </el-form-item>
 
                    <el-form-item label="验证码" prop="checkcode">
                    <el-col :span="12">
                        <el-input type="text" v-model="ruleForm.checkCode" placeholder="验证码"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-button 
                            type="primary" 
                            @click="getCheckCode()" 
                            :class="{'disabled-style':getCodeBtnDisable}" 
                            :disabled="getCodeBtnDisable">
                                {{ codeBtnWord }}
                        </el-button>
                    </el-col>
                    </el-form-item>
                    
                    <div id="btn"> 
                        <el-col :span="8">
                            <el-button type="primary" round @click="returnLogin()">返回</el-button>
                        </el-col>             
                        <el-col :span="8">
                            <el-button type="primary" round @click="RegisteForm('')">注册</el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" round @click="ResetForm('')">重置</el-button>
                        </el-col>
                    </div> 
                </el-col>
            </el-row>
        </el-form>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common';
export default {
    data() {
        var validateUsername = (rule, value, callback) => {
            if(value==="") {
                callback(new Error("请输入用户名"));
            }
            else {
                //这里添加向后端发送请求验证用户名是否可用
                common.ajax({
                    url: "/accounts/" + this.ruleForm.username,
                    method:"get",
                    success:e=>{   //成功回调函数
                            if(e.status==0){
                                // 表示账号已经存在
                                callback(new Error("该用户名已存在"));
                            }
                        },
                    error:e=>{//失败回调
                        console.log(e)
                        console.log("fail")
                    }
                })
            }
        };

        var validatePass = (rule, value, callback) => {
            if(value==="") {
                callback(new Error("请输入密码"));
            }
            else{
            }
        };

        var validateCheckPass = (rule, value, callback) => {
            if(value==="") {
                callback(new Error("请再次输入密码"));
            }
            else if(value !== this.ruleForm.password) {
                callback(new Error("两次密码不一致"));
            }
            else {
                callback();
            }
        };

        var checkPhone = (rule, value, callback) => {
            const regPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if(value === "") {
                alert("手机号不能为空");
            }
            else {
                if(regPhone.test(value)) {
                    // 判断该手机号是否已经被注册
                    common.ajax({
                        url: "/accounts/phones",
                        data: {
                            "phone": this.ruleForm.phone
                        },
                        success:e=>{   //成功回调函数
                            if(e.status==0){
                                // 表示手机号已经被注册
                                callback(new Error("该手机号已被注册"));
                            } else{
                                callback()
                            }
                        },
                        error:e=>{//失败回调
                            console.log(e)
                            console.log("fail")
                        }
                    })
                }
                else {
                    callback(new Error("请输入合法的手机号"));
                }
            }

        };

        return {
            waitTime: 61,
            codeBtnWord: '发送验证码',
            ruleForm: {
                username: '',
                password: '',
                checkPass: '',
                phone: '',
                checkCode:''   // 验证码
            },
            rules: {
                username:[
                    {
                        required: true,
                        validator: validateUsername,
                        trigger:"blur"
                    }
                ],
                password:[
                    {
                        required: true,
                        validator: validatePass,
                        trigger: "blur"
                    }
                ],
                checkPass:[
                    {
                        required: true,
                        validator: validateCheckPass,
                        trigger:"blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        validator: checkPhone,
                        trigger: "blur"
                    }
                ],
            }
        }
    },

    computed: {
        getCodeBtnDisable:{
            get() {
                if(this.waitTime === 61) {
                    if(this.ruleForm.phone) {
                        return false;
                    }
                    return true;
                }
                return true;
            },

            set() {}
        }
    },
    
    methods: {
        //注册
        RegisteForm() {  
           if(this.ruleForm.password==this.ruleForm.checkPass){
               // 给服务器发送请求
               var checkCode=window.sessionStorage.getItem("checkCode");
                var checkTime=window.sessionStorage.getItem("checkTime");
                var currentTime=new Date();
                var oldTime=new Date(checkTime);
                var lateTime=currentTime-oldTime;   // 获取验证码和输入验证码时间差的毫秒数
                if(lateTime<=180000){
                    if(checkCode==this.ruleForm.checkCode && this.ruleForm.phone==window.sessionStorage.getItem("checkPhone")){
                    // 验证码输入正确
                        var _this=this
                        common.ajax({
                            data:{
                                "phone": _this.ruleForm.phone,
                                "username": _this.ruleForm.username,
                                "password": _this.ruleForm.password
                            },
                            method:"post",
                            url: "/accounts/register",
                            success:e=>{   //成功回调函数
                                console.log(e);
                                if(e.status==0){
                                    alert("注册成功！请在登陆后及时完善个人信息");
                                    this.$router.push('/signin'); 
                                }else{
                                    alert(e.msg);
                                }
                            },
                            error:e=>{//失败回调
                                console.log(e)
                                console.log("fail")
                            }
                        });
                    }else{   // 验证码输入不正确
                        console.log("验证码输入不正确！");
                    }
                } else{
                    alert("验证码超时！请重新验证");
                }
           } else{
               alert("两次输入的密码不一致！请重新输入")
           }    
          
        },
        //重置表单
        ResetForm() {
            this.ruleForm.username=""
            this.ruleForm.password=""
            this.ruleForm.checkPass=""
            this.ruleForm.checkCode=""
            this.ruleForm.phone=""
        },

        returnLogin(){
            this.$router.push('/signin');
        },

        getCheckCode(){
            var _this=this
            common.ajax({
                data:{
                    "phone":_this.ruleForm.phone
                },
                url:"/accounts/sendMsg",
                method:"post",
                success:e=>{   //成功回调函数
                        console.log(e);
                        if(e.status==0){
                            // 表示获取验证码成功
                            window.sessionStorage.setItem("checkCode", e.data);
                            window.sessionStorage.setItem("checkTime", new Date());
                            window.sessionStorage.setItem("checkPhone", _this.ruleForm.phone)
                        }else{
                            alert(e.msg);
                        }
                    },
                error:e=>{//失败回调
                    console.log(e)
                    console.log("fail")
                }
            });
        }
    }
}

</script>

<style scoped>
.col {
    width: 70%;
}
.register-title {
    text-align: center;
    color: #505458;
}
.RegisterForm {
    height: 800px;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.register-warpper {
    background-color: #fff;
    width: 600px;
    height:600px;
    border-radius: 15px;
    position: relative;
    left: 50%;
    top: 400px;
    margin-bottom: 200px;
    transform: translate(-50%,-50%);
}
#btn{
    margin-left: 30px;
}
.el-button.disabled-style {
    background-color: #EEEEEE;
    color: #CCCCCC;
}

</style>