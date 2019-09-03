<template>
  <div class="container">
    <!-- 轮播图 -->
     <el-carousel >
      <el-carousel-item v-for="(item,index) in lunbo" :key="index">
        <img :src="serverdata+item.url"> 
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
<!-- 搜索框 -->
        <div class="banner-content">
            <div class="search-bar">
                <!-- tab栏 -->
                <el-row 
                type="flex" 
                class="search-tab">
                    <span v-for="(item,index) in inputinfo " :key="index" @click="tabclick(index)" :class="{active:index===tabdata}" >
                        <i>{{item.tabname}}</i>
                    </span>
                </el-row>

                <!-- 输入框 -->
                <el-row 
                type="flex" 
                align="middle" 
                class="search-input">
                    <input
                    v-model="searchdata"
                    :placeholder="inputinfo[tabdata].placeholder" 
                    @keyup.enter="searchclick(tabdata)"
                    />
                    <i class="el-icon-search" @click="searchclick(tabdata)"></i>
                </el-row>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      // 轮播图
      lunbo:[
      ],
      // tab栏
      inputinfo:[
        {
          tabname:'攻略',
          placeholder:'搜索城市'
        },
        {
          tabname:'酒店',
          placeholder:'请输入酒店搜索城市'
        },
        {
          tabname:'机票',
          placeholder:''
        }
        ],
        // tab选择的栏目
        tabdata:0,
        // 服务器地址
        serverdata:'',
        // 搜索信息
        searchdata:''
    }
  },
  mounted(){
      console.log(this.axios);
    // 轮播图
    this.$axios({
      url:'/scenics/banners'
    }).then((hh)=>{
      this.lunbo=hh.data.data
      this.serverdata=this.$axios.defaults.baseURL
      console.log(this.serverdata);
      

    })
    .catch((err)=>{
      console.log(err);
    })

  },
  methods:{
    // 点击切换信息
    tabclick(index){
     this.tabdata=index
     if (index===2){
       console.dir(this);
      this.$router.push({ path: '/air' })
     }
    },
    // 搜索按钮
    searchclick(tabdata){
      if (tabdata===0){
this.$router.push({ path: '/post', query: { search: this.searchdata }})
      }else if(tabdata===1){
this.$router.push({ path: '/hotel', query: { search: this.searchdata }})
      }
      
    }
  }
}
</script>

<style lang="less" scoped>
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }

    .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }

            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
}
</style>