<template>
<header class="header">
<el-row type="flex" class="row-bg main" justify="space-between">
<div class="logo">
    <nuxt-link to="/" class="logo"><img src="../static/logo.jpg"></nuxt-link>
</div>
<el-row type="flex" justify="start"  class="lianjie">
      <nuxt-link to="/">首页</nuxt-link>
      <nuxt-link to="/post">旅游攻略</nuxt-link>
      <nuxt-link to="/hotel">酒店</nuxt-link>
      <nuxt-link to="/air">国内机票</nuxt-link>
</el-row>
<div class="login">
    <nuxt-link to="/user" v-show="!$store.state.logintoken">登录</nuxt-link>
    <el-dropdown v-show="$store.state.logintoken" class="user" >
  <span class="el-dropdown-link" >
      <img src="../static/avatar.jpg" alt="" class="userimg">
    {{$store.state.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item>个人中心</el-dropdown-item>
    <el-dropdown-item @click.native="selectdata">退出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </div>
</el-row>
</header>
</template>
<script>
export default {
    data(){
        return{
            logintoken: this.$store.state.logintoken,
        }
    },
    methods:{
        selectdata(){
            console.log(1111);
            this.$store.commit('deletetoken')
        }
    },
}
</script>
<style lang="less" scoped>
.header{
    height: 60px;
    line-height: 60px;
    
    // overflow: hidden; 这东西要在定了宽高的地方用
    .main{
        width: 1000px;
        margin:0 auto;
        .logo{  
        display:block;
            img{
                display: block;
                height: 60px;
            }
    }
    .lianjie{
        flex:1;
        margin: 0 20px;
        a{
            height: 60px;
            box-sizing:border-box;//内减模式
            padding: 0 15px;
            &:hover{
            color: #409eff;
            border-bottom:5px solid  #409eff;
        }
        }
        .nuxt-link-exact-active{
            background-color: #409eff;
            color: #fff!important;
        }
    }
    }
}


.userimg{
    width: 44px;
    height: 44px;
    vertical-align: middle;
    border-radius: 50%;
    box-sizing:border-box;//内减模式
    &:hover{
         border: 3px #409eff solid;
     }
    
}


</style>