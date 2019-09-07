<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <!-- 出发城市 -->
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <!-- queryDepartSearch:输入值改变时触发函数 -->
        <el-autocomplete
           @blur="setstartcitydefault"
          :fetch-suggestions="queryDepartSearch"
          v-model="startcity"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
           :trigger-on-focus="false"
        ></el-autocomplete>
      </el-form-item>
      <!-- 到达城市 -->
      <el-form-item label="到达城市">
        <el-autocomplete
        @blur="setendcitydefault"
          v-model="endcity"
          :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          class="el-autocomplete"
           :trigger-on-focus="false"
        ></el-autocomplete>
      </el-form-item>
      <!-- 出发时间 -->
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker type="date"  v-model="selectdata" placeholder="请选择日期" style="width: 100%;" @change="handleDate"></el-date-picker>
      </el-form-item>
      <!-- 搜索 -->
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
          
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment' //下载npm i moment -S
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            // 出发城市
            startcity:'',
            // 到达城市
            endcity:'',
            // 建议城市列表
            advisecity:[],
            // 选择时间
            selectdata:'',
            search:{
                departCity:'',//出发城市
                departCode:'',//出发城市代码
                destCity:'',//目标城市
                destCode:'',//目标城市代码
                departDate:''//日期 2019-05-01
            },
            currentTab: 0
        }
    },
    methods: {
        // 获取建议城市列表
       async getcitylist(qs,cb,data){
         // 建议城市列表
           this.advisecity=[]
            if(data===''){
               return
           }else{
               let citydata=await this.$axios({
                url:'/airs/city',
                params:{name:data}
            })
            console.log(citydata);
            // 添加一个value属性进去返回的数据，并赋值给建议城市
            citydata.data.data.map((item,index)=>{
              this.advisecity.push(
                 Object.assign(item,{value:item.name})
                ) 
              });
                    cb(this.advisecity)
           }
        },
        // 设置出发城市默认项
       setstartcitydefault(){
         this.handleDepartSelect(this.advisecity[0])
        },
        // 设置到达城市默认项
        setendcitydefault(){
         this.handleSelect(this.advisecity[0])
        },
        // 出发城市
      queryDepartSearch(qs,cb){
          this.getcitylist(qs,cb,this.startcity)
        },
        // 选中出发城市
        handleDepartSelect(hh){
           this.startcity= this.search.departCity=hh.name//出发城市
             this.search.departCode=hh.sort//出发城市代码
        },
        // 到达城市
        querySearchAsync(qs,cb){
            this.getcitylist(qs,cb,this.endcity)
        },
        // 选中到达城市
        handleSelect(hh){
          // this.destCity=
            this.endcity= this.search.destCity=hh.name//到达城市
             this.search.destCode=hh.sort//到达城市代码
        },
        // 出发时间
        handleDate(hh){
            if (hh){
          this.search.departDate= moment(hh).format('YYYY-MM-DD')
            }else{
              this.search.departDate=''
            }
        },
        // 搜索城市
       async handleSubmit(){
        
        // 跳转路由，传参
          this.$router.push({ path:'/air/flights', query: this.search})
        },
        // 交换到达出发地
        handleReverse(){
           // 发送请求的修改
           let xx=this.search.departCity//出发城市
           let hh=this.search.departCode//出发城市代码
           this.search.departCity=this.search.destCity
           this.search.departCode=this.search.destCode
           this.search.destCity=xx
           this.search.destCode=hh
          // 绑定数据的修改
           this.startcity=this.search.departCity
           this.endcity=this.search.destCity
           
           
        }
    }
}

</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
