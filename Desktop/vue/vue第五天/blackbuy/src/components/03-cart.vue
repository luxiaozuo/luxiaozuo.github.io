<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a>&gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车
                        </h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table
                            width="100%"
                            align="center"
                            class="cart-table"
                            border="0"
                            cellspacing="0"
                            cellpadding="8"
                        >
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 购物车有数据 -->
                                <tr v-for="(item, index) in goodsList" :key="item.id">
                                    <td>
                                        <el-switch
                                            v-model="item.isSelected"
                                            active-color="#13ce66"
                                            inactive-color="#9e9e9e"
                                        ></el-switch>
                                    </td>
                                    <td>
                                        <img :src="item.img_url" alt="">
                                        <span>{{item.title}}</span>
                                    </td>
                                    <td colspan="2">{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number
                                            v-model="item.buycount"
                                            :min="0"
                                            size="small"
                                        ></el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td>
                                        <!-- <el-button  @click="open2">点击打开 Message Box</el-button> -->
                                        <el-button
                                            @click="delOne(item.id)"
                                            type="danger text"
                                            icon="el-icon-delete"
                                            circle
                                        ></el-button>
                                    </td>
                                </tr>
                                <!-- 购物车没有数据 -->
                                <tr v-show="goodsList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>
                                                    您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedCount}}</b>件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selectedPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button
                                class="button"
                                onclick="javascript:location.href='/index.html';"
                            >继续购物</button>
                            <router-link :to="'/order/'+ selectedId">
                            <button
                                class="submit"
                            >立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "cart",
  data: function() {
    return {
      goodsList: [],
      ids:''
    };
  },
  methods: {
    delOne(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.goodsList.forEach((e, index) => {
            if (e.id == id) {
              this.goodsList.splice(index, 1);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    let obj = this.$store.state.cartData;
    let ids = "";
    for (const key in obj) {
      ids += key;
      ids += ",";
    }
    // ids = ids.substring(0,ids.length-2)
    ids = ids.slice(0, -1);
    // console.log(ids);
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(result => {
      //   console.log(result);
      //  返回的数据里面没有购买的数量,以及是否选中的字段
      result.data.message.forEach(element => {
        element.buycount = this.$store.state.cartData[element.id];
        element.isSelected = true;
      });
      //   console.log(result);
      this.goodsList = result.data.message;
    //   console.log(this.goodsList);
    });
  },
  computed: {
    selectedCount() {
      let num = 0;

      this.goodsList.forEach(e => {
        if (e.isSelected) {
          num += e.buycount;
        }
      });
      return num;
    },
    selectedPrice() {
      let price = 0;
      this.goodsList.forEach(e => {
        if (e.isSelected) {
          price += e.buycount * e.sell_price;
        }
      });
      return price;
    },
    selectedId(){
          let ids = ''
        this.goodsList.forEach(e=>{
            if(e.isSelected == true){
                ids+=e.id;
                ids+=','
            }
            
        })
        ids = ids.slice(0,-1)
        //    console.log(ids);
            return ids
    }
  },
  watch: {
    goodsList: {
      handler: function(val, oldVal) {
        //   this.$store.state.cartData
        // console.log(val);
        // 只能通过 this.$store.commit('方法名',参数)
        // 修改数量的函数
        let obj = {};

        val.forEach((e, index) => {
          obj[e.id] = e.buycount;
          
        });
        this.$store.commit('changeCount',obj)
      },
      deep: true
    }
  }
};
</script>
<style>
td img {
  width: 100px;
}
td:nth-child(2) {
  display: flex;
  align-items: center;
}
</style>
