<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>   
                    <filters :hh="searchdata"  @setdisposedata="disposedata"/>
                </div>
                <!-- 航班头部布局 -->
                <div>
                    <flights/>
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                    <flightsList
                    v-for="(itemt,index) in actualdata" :key="index"
                     :data="itemt"/>
                </div>
                <!-- 分页功能 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="airtotal">
    </el-pagination>
            </div> 
            <!-- 侧边栏 -->
            <div class="aside">
                <flightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>
import flights from '../../components/air/flightsListHead'
import flightsList from '../../components/air/flightsList'
import filters from '../../components/air/flightsFilters'
import flightsAside from '../../components/air/flightsAside'

import moment from "moment";

export default {
    data(){
        return {
            // 总的数据
            searchdata:{
                flights:[1,2],
                info:{},
                options:{
                    airport:[],
                    company:[],
                    flightTimes:[]
                }
            },
            // 实际渲染的数据
            actualdata:[],
            // 当前页数
            currentPage: 1,
            // 总页数
            airtotal:0,
            // 每页显示的数目
            pagenum:5,

        }
    },
    components:{
        flights,
        flightsList,
        filters,
        flightsAside,

    },
    methods:{
         handleSizeChange(val) {
        this.pagenum=val
        this.changeairdata()
      },
      handleCurrentChange(val) {
        this.currentPage=val
        this.changeairdata()
        
      },
      changeairdata(){
        //  实际渲染的页数
        this.actualdata=this.searchdata.flights.slice((this.currentPage-1)*this.pagenum,this.pagenum*this.currentPage)

      },
    //   筛选组件发过来的数据
      disposedata(data){
          this.airtotal=data.length
          this.actualdata=data
      }
    },
   async mounted(){
        let airlist =await this.$axios({
            url:'/airs',
            params:this.$route.query
          });
         this.searchdata={ ...airlist.data} 
         this.airtotal=airlist.data.total
         this.changeairdata()   
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>