import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = () => {
return new Vuex.Store({
    // 最简单的用法
 state:{
    nickname:'',
    logintoken: ''
    //localStorage本地存储(20M)
    //localStorage.setItem(key,value);存储
    //localStorage.removeItem(key);删除数据
    //localStorage.clear()删除全部数据
    // window.localStorage.getItem('nickname')
},
/* mutattions也是一个对象，这个对象里面可以放改变state的初始值的方法，
具体的用法就是给里面的方法传入参数state或额外的参数,然后利用vue的双向数据
驱动进行值的改变，同样的定义好之后也把这个mutations扔进Vuex.Store里面 */
 mutations :{
    //  登录成功时保存token
    loginkeep(state,hh) {   //方法名随意,自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        // state.nickname++,res.data.
        state.nickname=hh.user.nickname
        state.logintoken=hh.token
    },
    // 退出登录时，删除tonken
    deletetoken(state){
        state.nickname=''
        state.logintoken=''
        localStorage.removeItem('store');//删除数据
    }
    // newNum(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
    //    state.changableNum+=sum;
    // }
}

})
}


// 暴露仓库
 
export default store;