<template>
<div>
<footer class="footer">
<el-row type="flex" class="main" justify="space-around">
<dl> 
 	<dt>闲云旅游旅游网</dt>
 	<dd>上亿旅行者共同打造的"旅行神器"</dd>
	<dd><i>60,000</i>  多个全球旅游目的地</dd>
    <dd> <i>600,000</i>  个细分目的地新玩法</dd>
	<dd><i>760,000,000</i> 次攻略下载</dd>
	<dd><i>38,000</i> 家旅游产品供应商</dd>
</dl>
<dl> 
 	<dt>关于我们</dt>
 	<dd>隐私政策 商标声明</dd>
	<dd>服务协议 游记协议</dd>
    <dd>商城平台服务协议</dd>
	<dd>网络信息侵权通知指引</dd>
	<dd>闲云旅游旅游网服务监督员</dd>
    <dd>网站地图加入闲云旅游</dd>
</dl>
<dl> 
 	<dt>旅行服务</dt>
 	<dd class="h">旅游攻略 酒店预订</dd>
	<dd>旅游特价 国际租车</dd>
    <dd>旅游问答 旅游保险</dd>
	<dd>旅游指南 订火车票</dd>
	<dd>旅游资讯 APP下载</dd>
</dl>
<dl> 
 	<dt><img src="../static/QR.png"></dt>
 	<dd>关注我们</dd>
</dl>
</el-row>
    <p>京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</p>
</footer>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.footer{
    height: 330px;
    background-color: #333333;
    .main{
        width: 1000px;
        margin: 0 auto;
        border-bottom: 1px solid #cccccc;

        dl{
            flex: 1;
            color: #cccccc;
            margin:20px 10px;
             dd:nth-child(2){
                 margin-top:10px;
             }
             &:nth-child(4){
                 text-align: center;
                 height: 140px;
                 width: 140px;
             }
            dt{
                font-size: 16px;
                line-height: 20px;
                img{
                    height: 140px;
                 width: 140px;
                }
               }
            dd{
                line-height: 22px;
                font-size: 12px;
                 i{
                    color: #ff8c28;
                }
               
            }
        }
    }
    p{
        margin-top: 50px;
        text-align: center;
        font-size: 12px;
         color: #cccccc;
    }
  
}

</style>