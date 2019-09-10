import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = () => {
return new Vuex.Store({
    // 最简单的用法
 state:{
    nickname:'',
    logintoken: '',
    //localStorage.setItem('key',value);存储;localStorage.removeItem(key);删除数据
    //localStorage.getItem('key');存储
    history:[],
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
    },
    // 搜索历史纪录的保存,并且固定长度5
    addsearchhistory(state,hh){
        if (state.history.length>4){
            state.history.splice(0,1)
            state.history.push(hh)
        }else{
            state.history.push(hh)
        }
    },


    
}

})
}


// 暴露仓库
 
export default store;