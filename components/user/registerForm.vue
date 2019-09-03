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
                        <el-button >
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
            >
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
        return {
            form: {
            username: "",   // 登录用户名/手机
            password: "",    // 登录密码
            checkPassword: "", // 确认密码
            nickname: "",	// 昵称
            captcha: ""		// 手机验证码
        },
        
        rules: {
            username: [{ 
                required: true, 
                message: '请输入用户名', 
                trigger: 'blur' 
            }],
            password: [{ 
                required: true, 
                message: '请输入密码', 
                trigger: 'blur' 
            }],
            nickname: [{ 
                required: true, 
                message: '请输入昵称', 
                trigger: 'blur' 
            }],
            captcha: [{ 
                required: true, 
                message: '请输入验证码', 
                trigger: 'blur' 
            }],
        },
        
        }
    },

    methods: {
        
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