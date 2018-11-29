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
                <li class="active">
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
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <div id="orderForm" name="orderForm" url>
              <!-- <div class="form-box address-info"> -->
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="收货人姓名" prop="accept_name">
                  <el-input v-model="ruleForm.accept_name"></el-input>
                </el-form-item>

                <el-form-item label="所属地区" prop="area">
                  <VDistpicker
                    @selected="areaSelected"
                    :province="ruleForm.area.province.value"
                    :city="ruleForm.area.city.value"
                    :area="ruleForm.area.area.value"
                  ></VDistpicker>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码" prop="post_code">
                  <el-input v-model="ruleForm.post_code"></el-input>
                </el-form-item>

                <!-- </div> -->
                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      <!-- <input
                      name="payment_id"
                      type="radio"
                      onclick="paymentAmountTotal(this);"
                      value="1"
                    >
                      <input name="payment_price" type="hidden" value="0.00">在线支付-->
                      <el-radio v-model="ruleForm.payment_id" :label="6">在线支付</el-radio>&nbsp;&nbsp;
                      <em>手续费：0.00元</em>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      <!-- <input
                      name="express_id"
                      type="radio"
                      onclick="freightAmountTotal(this);"
                      value="1"
                      data-type="*"
                      sucmsg=" "
                    >
                    <input name="express_price" type="hidden" value="20.00">顺丰快递
                    <em>费用：20.00元</em>
                      <span class="Validform_checktip"></span>-->
                      <el-radio
                        @change="ruleForm.expressMoment=24"
                        v-model="ruleForm.express_id"
                        :label="1"
                      >顺丰快递</el-radio>&nbsp;&nbsp;
                      <em>费用：24.00元</em>&nbsp;&nbsp;
                      <el-radio
                        @change="ruleForm.expressMoment=8"
                        v-model="ruleForm.express_id"
                        :label="2"
                      >圆通快递</el-radio>&nbsp;&nbsp;
                      <em>费用：8.00元</em>&nbsp;&nbsp;
                      <el-radio
                        @change="ruleForm.expressMoment=10"
                        v-model="ruleForm.express_id"
                        :label="3"
                      >韵达快递</el-radio>&nbsp;&nbsp;
                      <em>费用：10.00元</em>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="8"
                  cellspacing="0"
                  class="cart-table"
                >
                  <tbody>
                    <tr>
                      <th colspan="2" align="left">商品信息</th>
                      <th width="84" align="left">单价</th>
                      <th width="84" align="center">购买数量</th>
                      <th width="104" align="left">金额(元)</th>
                    </tr>
                    <tr v-for="(item, index) in orderGoodsList" :key="index">
                      <td width="68">
                        <!-- <a target="_blank" href="/goods/show-89.html"> -->
                        <router-link :to="'/detail/'+item.id">
                          <img :src="item.img_url" class="img">
                          <!-- </a> -->
                        </router-link>
                      </td>
                      <td>
                        <!-- <a target="_blank" href="/goods/show-89.html"> -->
                        <router-link :to="'/detail/'+item.id">
                          {{item.title}}
                          <!-- </a> -->
                        </router-link>
                      </td>
                      <td>
                        <span class="red">￥{{item.sell_price}}</span>
                      </td>
                      <td align="center">{{item.buycount}}</td>
                      <td>
                        <span class="red">￥{{item.buycount*item.sell_price}}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <dt>订单备注(100字符以内)</dt>
                      <dd>
                        <textarea
                          v-model="ruleForm.message"
                          name="message"
                          class="input"
                          style="height:35px;"
                        ></textarea>
                      </dd>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{totalCount}}</label>件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label
                        id="goodsAmount"
                        class="price"
                      >{{totalPrice}}</label>元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label>元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label
                        id="totalAmount"
                        class="price"
                      >{{totalPrice + ruleForm.expressMoment}}</label>
                    </p>
                    <p class="btn-box">
                      <a class="btn button" href="/cart.html">返回购物车</a>
                      <a id="btnSubmit" @click="submit('ruleForm')" class="btn submit">确认提交</a>
                    </p>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";

export default {
  name: "order",
  // 数据
  components: { VDistpicker },
  data: function() {
    var validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号码"));
        }
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱地址"));
      } else {
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱地址"));
        }
      }
    };
    var validatePostCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱地址"));
      } else {
        let reg = /^[1-9]\d{5}(?!\d)$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮政编码"));
        }
      }
    };
    return {
      orderGoodsList: [],
      totalCount: 0,
      totalPrice: 0,
      goodsids: "",
      totalInfo: {},
       orderid: 0,

      //   element的数据
      ruleForm: {
        accept_name: "小木木",
        address: "宝豪科技大厦",
        mobile: "13537860506",
        email: "111555555@qq.com",
        post_code: "140106",
        area: {
          province: { code: "140000", value: "山西省" },
          city: { code: "140100", value: "太原市" },
          area: { code: "140106", value: "迎泽区" }
        },
        payment_id: 6,
        express_id: 1,
        expressMoment: 24,
        message: "一定要快点发货呀",
       
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "change" },
          {
            min: 2,
            max: 30,
            message: "长度在 2 到 30 个字符",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "change" },
          {
            min: 3,
            message: "地址写详细点,这样快递开的更快哦",
            trigger: "change"
          }
        ],
        mobile: [{ validator: validateMobile, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  methods: {
    areaSelected(area) {
      //    console.log(area);
      this.ruleForm.area = area;
    },
    submit(ruleForm) {
      // 在提交服务器时,验证一下数据是否规范
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          // alert('submit!');
          let obj = {};
          this.ruleForm.goodsAmount = this.totalPrice;
          this.ruleForm.goodsids = this.$route.params.ids;
          this.orderGoodsList.forEach(e => {
            obj[e.id] = e.buycount;
          });
          this.ruleForm.cargoodsobj = obj;
          this.totalInfo = this.ruleForm;
          this.$axios
            .post("site/validate/order/setorder", this.ruleForm)
            .then(result => {
              //  console.log(result);
              if (result.data.status === 0) {
                this.$Message.success("提交成功");
                this.orderid = result.data.message.orderid;
                this.$router.push("/payMoney/"+this.orderid);
              }
            });
        } else {
          this.$Message.warning('请正确输入资料')
          return false;
        }
      });
    }
  },
  // 计算属性
  //   computed: {
  //     //   因为是在结算页,所以数据不会再发生改变了,所以没有必要使用计算属性了
  //     // totalCount() {
  //     //   let num = 0;
  //     //   this.orderGoodsList.forEach(element => {
  //     //     num += element.buycount;
  //     //   });
  //     //   return num;
  //     // },
  //     // totalPrice() {
  //     //   let price = 0;
  //     //   this.orderGoodsList.forEach(element => {
  //     //     price += element.buycount*element.sell_price;
  //     //   });
  //     //   return price;
  //     // }
  //   },
  created() {
    let ids = this.$route.params.ids;
    this.$axios.get(`site/validate/order/getgoodslist/${ids}`).then(result => {
      //   console.log(result);
      this.orderGoodsList = result.data.message;
      //   注意:从服务器中获取的数据中,购买数量都是1,需要自己在客户端设置
      this.orderGoodsList.forEach(e => {
        e.buycount = this.$store.state.cartData[e.id];
        this.totalCount += e.buycount;
        this.totalPrice += e.buycount * e.sell_price;
      });
      // console.log(this.orderGoodsList);
    });
  }
};
</script>
<style >
</style>