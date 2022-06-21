<template>
<div class="SiginForm">
    <div class="login-wrapper">
        
    <el-form
    label-position="left"
     :model="ruleForm"
     status-icon
     :rules="rules"
     ref="ruleForm"
     label-width="100px"
     class="login_container">
        <el-row type="flex" justify="center">
            <el-col :span="8" class="col">
                <div class="login_header_title">
                    <!-- <a href="javascript:;" :class="{on: loginByPwd}" @click="loginByPwd = true">密码登录</a>
                    <a href="javascript:;" :class="{on: !loginByPwd}" @click="loginByPwd = false">短信登录</a> -->
                    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first" :class="{on: loginByPwd}" @click="loginByPwd = true">密码登录</el-tab-pane>
    <el-tab-pane label="配置管理" name="second" :class="{on: !loginByPwd}" @click="loginByPwd = false">短信登录</el-tab-pane>
  </el-tabs>

                </div>
                <el-form-item label="用户名" prop="username" v-if="loginByPwd">
                    <el-input type="text" auto-complete="off" v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="loginByPwd">
                    <el-input type="password" auto-complete="off" v-model="ruleForm.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone" v-if="loginByPwd==false">
                    <el-input type="text" auto-complete="off" v-model="ruleForm.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="checkcode" v-if="loginByPwd==false">
                    <el-col :span="12">
                        <el-input type="text" v-model="ruleForm.checkcode" placeholder="验证码"></el-input>
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
                <el-form-item>
                    <el-col :span="12">
                        <el-button type="primary" round @click="LoginForm('ruleForm')" class="submitBtn">登录</el-button>
                    </el-col>
                    <el-col :span="10">
                        <el-button type="primary" round @click="$router.push('/register')" class="submitBtn">注册</el-button>
                    </el-col>
                </el-form-item>
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
        //校验输入的手机号码格式
        activeName:'first'

        var checkPhone = (rule, value, callback) => {
            const regPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if(value === "") {
                alert("手机号不能为空");
            }
            else {
                if(regPhone.test(value)) {
                    callback();
                }
                else {
                    callback(new Error("请输入合法的手机号"));
                }
            }
        };
        
        return {
            loginByPwd:true,    // 登陆方式
            Token: "",
            codeBtnWord: '发送验证码',
            waitTime: 61,
            ruleForm: {
                username:"",
                password:"",
                // phone: "",
                // checkcode:""
            },
            rules: {
                username:[
                    {
                        required: true,
                        message: "请输入用户名",               
                        trigger: "blur"
                    },
                ],
                password:[
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }
                ],
                phone:[
                    {
                        required: true,
                        validator: checkPhone,
                        trigger: "blur"
                    }
                ],
                checkcode:[
                    {
                        required: true,
                        message: "请进行验证",
                        trigger: "blur"
                    }
                ]
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
        //登录函数
        LoginForm() {   
            if(this.loginByPwd==true){
                // 用户名密码登陆
                var _this=this
                common.ajax({
                    //参数
                    data:{
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                    },
                    method:"post",
                    url: "/accounts/loginByUsername", //""内为接口名
                    success:e=>{   //成功回调函数
                        console.log(e);
                        if(e.status==0){
                            // 表示登陆成功
                            window.sessionStorage.setItem("account", JSON.stringify(e.data));
                            alert("登陆成功");
                            this.$router.push('/');
                            this.$router.go(0);
                        }else{
                            alert(e.msg);
                        }
                    },
                    error:e=>{//失败回调
                        console.log(e)
                        console.log("fail")
                    }
                })
            }      // if 
            else{
                var checkCode=window.sessionStorage.getItem("checkCode");
                var checkTime=window.sessionStorage.getItem("checkTime");
                var currentTime=new Date();
                var oldTime=new Date(checkTime);
                var lateTime=currentTime-oldTime;   // 获取验证码和输入验证码时间差的毫秒数
                if(lateTime<=180000){
                    if(checkCode==this.ruleForm.checkcode && this.ruleForm.phone==window.sessionStorage.getItem("checkPhone")){
                    // 验证码输入正确
                        var _this=this
                        common.ajax({
                            data:{
                                "phone": _this.ruleForm.phone
                            },
                            method:"post",
                            url: "/accounts/loginByPhone",
                            success:e=>{   //成功回调函数
                                console.log(e);
                                if(e.status==0){
                                    // 表示登陆成功
                                    window.sessionStorage.setItem("account", JSON.stringify(e.data));
                                    alert("登陆成功");
                                    this.$router.push('/');
                                    this.$router.go(0)
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
                
                
            }   // else                  
        },

       
        //点击获取手机验证码
        getCheckCode() {
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
.el-button.disabled-style {
    background-color: #EEEEEE;
    color: #CCCCCC;
}

.login_title {
    text-align: center;
    color: #505458;
}
.col {
    width: 65%;
}

.SiginForm {
    height: 600px;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.login-wrapper {
    background-color: #fff;
    width: 500px;
    height:400px;
    border-radius: 15px;
    /* padding: 10px 0px; */
    /* padding-left: 0px; */
    /* padding-right: 0px; */
    position: relative;
    left: 50%;
    top: 310px;
    margin-bottom: 50px;
    transform: translate(-50%,-50%);
}

.submitBtn {
    margin-right: 20px;
}



</style>