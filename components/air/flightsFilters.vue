<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{hh.info.departCity}} - {{hh.info.destCity}} 
                / 
                {{hh.info.departDate}} 
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                   v-for="(item,index) in hh.options.airport" :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTime"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item,index) in hh.options.flightTimes " :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                     v-for="(item,index) in hh.options.company" :key="index"
                    :label="item"
                    :value="item"
                    >

                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item,index) in airSizes "
                    :key="index"
                    :label="item.name"
                    :value="item.size"
                     >
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        hh:{
            type:Object,
            default:{},
            
        }
    },
    data(){
        return {
            airport: "",        // 机场
            flightTime: "",    // 出发时间
            company: "",        // 航空公司
            airSize:''    ,// 机型大小
            airSizes:[
                {name:'大',size:'L'},
                {name:'中',size:'M'},
                {name:'小',size:'S'}
            ],
            // 要发送出去用来条件渲染的数据
            filtratedata:[],
            // 用于存储筛选条件的对象
            filtratelist:{
                // 起飞机场
                dst_airport_name:'',
                // 起飞时间
                dep_time:'',
                // 航空公司
                airline_name:'',
                // 机型大小
                plane_size:''
            }

        }
    },
    methods: {
        // 选取了筛选数据后执行的函数
        disposedata(){
            this.filtratedata=this.hh.flights

            // 起飞机场
            if(this.filtratelist.dst_airport_name){

            this.filtratedata=this.filtratedata.filter((age)=>{
              return age.org_airport_name==this.filtratelist.dst_airport_name
          })

            // 起飞时间
            }if (this.filtratelist.dep_time){
                let arrtime=this.filtratelist.dep_time.split(',')
                console.log(arrtime);
                this.filtratedata=this.filtratedata.filter((age)=>{
                    let startime=age.dep_time.split(':')
              return +startime[0]>=+arrtime[0]&&+startime[0]<+arrtime[1]
          })
            // 航空公司
            }if (this.filtratelist.airline_name){
                this.filtratedata=this.filtratedata.filter((age)=>{
              return age.airline_name==this.filtratelist.airline_name
          })
            // 机型大小
            }if (this.filtratelist.plane_size){
                this.filtratedata=this.filtratedata.filter((age)=>{
              return age.plane_size==this.filtratelist.plane_size
          })

            }
            this.$emit('setdisposedata',this.filtratedata)
        },
        // 选择机场时候触发
        handleAirport(value){
            // 起飞机场
            this.filtratelist.dst_airport_name=value
            this.disposedata()
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            
            // 起飞时间
            this.filtratelist.dep_time=value
            this.disposedata()
            
            
        },

         // 选择航空公司时候触发
        handleCompany(value){
                // 航空公司
                this.filtratelist.airline_name=value
          this.disposedata()
          

        },

         // 选择机型时候触发
        handleAirSize(value){
           // 机型大小
           this.filtratelist.plane_size=value
           this.disposedata()
           
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
                // 起飞机场
                this.filtratelist.dst_airport_name=this.airport='',
                // 起飞时间
                this.filtratelist.dep_time=this.flightTime='',
                // 航空公司
                this.filtratelist.airline_name= this.company='',
                // 机型大小
                this.filtratelist.plane_size= this.airSize=''
            this.$emit('setdisposedata',this.hh.flights)

        },
    },
    // 如果 `question` 发生改变，这个函数就会运行
    watch: {
       hh: function () {
      this.filtratedata=this.hh.flights
    }
  },
    mounted(){ 
   
    }
}
</script>
<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>