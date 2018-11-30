<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a>&gt;
                <a
                    href="#/site/goodslist"
                    class="router-link-exact-active router-link-active"
                >购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="index">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(item, index) in item.subcates" :key="index">{{item.title}}&nbsp;</span>
                                            <!-- <span>摄影摄像&nbsp;</span>
                                            <span>存储设备&nbsp;</span> -->
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(item, index) in item.subcates" :key="index" href="/goods/43.html">{{item.title}}</a>
                                               
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                              <el-carousel height="341px">
                                 <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                   <img :src="item.img_url" alt="">
                                 </el-carousel-item>
                               </el-carousel>
                            </div>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <!-- 右边热卖 -->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{ index+1 }}</label>
                                    <img
                                        :src="item.img_url"
                                    >
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | shorttime}}</span>
                                </div>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in message" :key="item.level1cateid">
          <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="it in item.level2catelist" :key="it.subcateid" href="/goods/43.html">{{it.subcatetitle}}</a>
                    <a href="/goods/40.html">
                        更多
                        <i>+</i>
                    </a>
                </p>
          </div>
           <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="it in item.datas" :key="it.artID">
                            <!-- <a :href="'#/site/goodsinfo/'+it.artID" class=""> -->
                            <router-link :to="'/detail/'+ it.artID">
                                <div class="img-box">
                                    <img
                                        :src="it.img_url"
                                    >
                                </div>
                                <div class="info">
                                    <h3>{{it.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{it.sell_price}}</b>元
                                    </p>
                                    <p>
                                        <strong>库存 {{it.stock_quantity}}</strong>
                                        <span>
                                            市场价：
                                            <s>{{it.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            <!-- </a> -->
                            </router-link>
                        </li>
                    
                        
                    </ul>
                </div>
           </div>
        
       </div>
       
    </div>
</template>

<script>
// import axios from 'axios'
// import moment from 'moment'
export default {
  name: "index",
  data:function(){
      return {
        catelist:[],
        sliderlist:[],
        toplist:[],
        message:[]
       
        
      }
  },
  methods:{
    
  },
  created() {
      this.$axios.get('http://111.230.232.110:8899/site/goods/gettopdata/goods')
      .then(result=>{
        //   console.log(result);
        this.catelist = result.data.message.catelist;
        this.sliderlist = result.data.message.sliderlist;
        this.toplist = result.data.message.toplist;
      })

      this.$axios.get('http://111.230.232.110:8899/site/goods/getgoodsgroup')
      .then(result=>{
        //   console.log(result);
        this.message = result.data.message
        // console.log(this.message);
       
      })
  },
//   私有过滤器
//   filters:{
//       shorttime(value){
//         // console.log(value);
//         return moment(value).format('YYYY年MM月DD日')
//       }
//   }
};
</script>

<style>
.banner-img img{
    width: 100%;
    height: 100%;
}
</style>
