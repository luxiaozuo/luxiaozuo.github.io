<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a>&gt;
                <a href="/goods.html">购物商城</a>&gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <!--  -->
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.good_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em
                                                id="commoditySellPrice"
                                                class="price"
                                            >¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number
                                                    v-model="buyCount"
                                                    :min="1"
                                                    :max="goodsinfo.stock_quantity"
                                                    label="描述文字"
                                                ></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em
                                                    id="commodityStockNum"
                                                >{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button
                                                    onclick="cartAdd(this,'/',1,'/shopping.html');"
                                                    class="buy"
                                                >立即购买</button>
                                                <button
                                                    onclick="cartAdd(this,'/',0,'/cart.html');"
                                                    class="add"
                                                >加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <!-- 商品详情区域和评论区域 -->
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div
                                    id="tabHead"
                                    class="tab-head"
                                    style="position: static; top: 517px; width: 925px;"
                                >
                                    <ul>
                                        <li>
                                            <a
                                                href="javascript:;"
                                                :class="{selected:clickIndex==0}"
                                                @click="clickIndex =0"
                                            >商品介绍</a>
                                        </li>
                                        <li>
                                            <a
                                                href="javascript:;"
                                                :class="{selected:clickIndex==1}"
                                                @click="clickIndex=1"
                                            >商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div
                                class="tab-content entry"
                                v-show="clickIndex==0"
                                v-html="goodsinfo.content"
                            ></div>
                            <div class="tab-content" v-show="clickIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea
                                                 @keyup.enter="sendComment"
                                                    v-model="commentInfo"
                                                    id="txtContent"
                                                    name="txtContent"
                                                    sucmsg=" "
                                                    data-type="*10-1000"
                                                    nullmsg="请填写评论内容！"
                                                ></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input
                                                    id="btnSubmit"
                                                    name="submit"
                                                    type="submit"
                                                    value="提交评论"
                                                    class="submit"
                                                    @click="sendComment"
                                                   
                                                >
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p
                                            v-show="totalcount==0"
                                            style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                                        >暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="index">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | shorttimeplus}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page
                                            :total="totalcount"
                                            show-sizer
                                            placement="top"
                                            :page-size-opts="[6,8,12]"
                                            :page-size="pageSize"
                                            @on-change="changeIndex"
                                            @on-page-size-change="changeSize"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <!-- 热卖推荐 -->
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                                <!-- </a> -->
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">{{item.title}}</a>
                                            <span>{{item.add_time | shorttime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回底部 -->
        <BackTop></BackTop>
    </div>
</template>
<script>
// import axios from 'axios'
export default {
  name: "detail",
  data: function() {
    return {
      artID: "",
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      buyCount: 1,
      clickIndex: 0,
      pageIndex: 1,
      pageSize: 6,
      totalcount: 0,
      comments: [],
      commentInfo: ""
    };
  },
  methods: {
    initData() {
      this.artID = this.$route.params.artID;
      this.buyCount = 1;
      //    console.log(artID)
      // 发送请求获取详情数据
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`
        )
        .then(result => {
          // console.log(result);
          this.goodsinfo = result.data.message.goodsinfo;
          this.hotgoodslist = result.data.message.hotgoodslist;
          this.imglist = result.data.message.hotgoodslist;
        });

      this.getComments();
    },
    getComments() {
      // 发送请求获取评论数据
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.artID
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(result => {
          //   console.log(result);
          this.comments = result.data.message;
          this.totalcount = result.data.totalcount;
        });
    },
    // 页码改变的函数
    changeIndex(pageIndex) {
      this.pageIndex = pageIndex;
      this.getComments();
    },
    // 每页的数量改变的函数
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.getComments();
    },
    // 发表评论的函数
    sendComment() {
        if(!this.commentInfo.trim()){
            alert('请输入评论内容');
            return;
        }
      this.$axios
        .post(
          `http://111.230.232.110:8899/site/validate/comment/post/goods/${
            this.artID
          }`,
          {
            commenttxt: this.commentInfo
          }
        )
        .then(result => {
          //   console.log(result);
        //   alert(result.data.message);
          this.commentInfo = ''
          this.getComments()
        })
        .catch(error => {
          alert(result.data.message);
        });
    }
  },
  created() {
    this.initData();
  },
  watch: {
    $route() {
      //   console.log('数据变了');
      this.initData();
    }
  }
};
</script>
<style>
.tab-content img {
  max-width: 900px;
  display: block;
}
</style>