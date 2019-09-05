<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
        <!-- 用户名手机 -->
            <el-form-item class="form-item" prop="username">
                <el-input 
                v-model="form.username"
                placeholder="用户名手机">
                </el-input>
            </el-form-item>
          <!-- 输入验证码 -->
            <el-form-item class="form-item" prop="captcha">
                <el-input 
                v-model="form.captcha"
                placeholder="验证码" >
                    <template slot="append">
                        <el-button  @click="getcaptcha" >
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>
        <!-- 输入你的名字 -->
            <el-form-item class="form-item" prop="nickname">
                <el-input 
                v-model="form.nickname"
                placeholder="你的名字">
                </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item class="form-item" prop="password">
                <el-input 
                v-model="form.password"
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item class="form-item" prop="checkPassword">
                <el-input 
                 v-model="form.checkPassword"
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>
    <!-- 点击注册 -->
            <el-button 
            class="submit" 
            type="primary" 
            @click="registeruaer"
            >
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
    // 密码的双重验证
        const checkPassword= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            form: {
            username: "",   // 登录用户名/手机
            password: "",    // 登录密码
            checkPassword: "", // 确认密码
            nickname: "",	// 昵称
            captcha: ""		// 手机验证码
        },
        
        rules: {
            // 登录用户名/手机
            username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
             // 登录密码
            password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            // 昵称
            nickname: [{ required: true,message: '请输入昵称', trigger: 'blur' }],
            // 手机验证码
            captcha: [{required: true, message: '请输入验证码', trigger: 'blur' }],
            // 确认密码
            checkPassword:[{ validator: checkPassword, trigger: 'blur' }],
        },
        
        }
    },

    methods: {
        // 获取验证码
      async  getcaptcha(){
           let captchadata= await this.$axios({
               method:'post',
               url:'/captchas',
               data:{ tel:this.form.username}
            })
            if (captchadata.status===200){
                this.$message.success('验证码是:'+captchadata.data.code)
            }
        },
        // 注册用户
        registeruaer(){
            this.$refs['form'].validate((valid)=>{
                if(valid){
            const {checkPassword,...hahaha}=this.form
                    this.$message.success('注册成功')
                    this.$axios({
                        method:'post',
                        url:'/accounts/register',
                        data:hahaha
                    }).then((hh)=>{
                this.$message.success('注册成功');
                console.log(hh)
                    })
                    .catch((err)=>{
                console.log(err)                        
                    })
                }else{
                    this.$message.error('请输入正确的信息');
                }
            })
            console.log(this)
            
        }
        
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