<template>
  <div class="login">
    <h1>整体的首页</h1>
    <span v-for="(item,index) in ['新闻','娱乐','运动']" :key="index" @click="tab(index)" :class="{lv:haha===index}">
      {{item}}
      </span>

    <ul v-show="haha===0">
      <li>新闻</li>
      <li>新闻</li>
      <li>新闻</li>
    </ul>
    <ul v-show="haha===1">
      <li>娱乐</li>
      <li>娱乐</li>
      <li>娱乐</li>
    </ul>
    <ul v-show="haha===2">
      <li>运动</li>
      <li>运动</li>
      <li>运动</li>
    </ul>



  </div>
</template>

<script>
export default {
  data(){
    return{
      haha:0


    }
  },
  methods:{
    tab(index){
      this.haha=index
    }
  }

}
</script>

<style lang="less" scoped>
.login{
  background-image: url('../static/bar1.jpg');
  height: 720px;
  width: 100%;

}
.lv{
  color: red
}

</style>