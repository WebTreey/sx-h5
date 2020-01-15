<template>
  <div class="order">
    <div class="main">
      <div class="content-item order-adderss" @click="$router.push('/address?isFromOrder=1')">
        <div class="adderss-y" v-if="roderData.address">
          <div class="df">
            <p class="df">
              <i class="iconfont">&#xe6a5;</i>
              <span class="ml-10">{{roderData.address.memberName}}</span>
            </p>
            <p class="df ml-20 fl">
              <i class="iconfont">&#xe687;</i>
              <span class="ml-10">{{roderData.address.mobile}}</span>
            </p>
            <p class="df">
              <i class="iconfont tr-270 col-3">&#xe6ab;</i>
            </p>
          </div>
          <div class="mt-20">{{roderData.address.addAll}} {{roderData.address.addressInfo}}</div>
        </div>
        <p class="df jb" v-else>
          <span>去选择地址</span>
          <i class="iconfont tr-270">&#xe6ab;</i>
        </p>
      </div>
      <div class="content-item list">
        <div class="item" v-for="(item,index) in cartListVOs" :key="index">
          <h3>
            {{item.seller.sellerName}}
            <div class="df af full">
              <span class="mr-20">满减</span>
              <div v-html="fullSub(item)"></div>
            </div>
          </h3>
          <div class="box mb-20" style=" border-bottom: 1px solid #dedede;">
            <div
              class="mt-20"
              v-for="cart in item.cartList"
              :key="cart.id"
              @click="$router.push(`/productList/details/${cart.product.id}`)"
            >
              <div class="df af pr">
                <div class="cart-product ml-20 df af">
                  <img class="product-img" :src="$store.state.BASE_IMG+cart.product.masterImg" />
                  <div class="ml-20 df fc af jb cart-h">
                    <h4 class="to-2 fs-28">{{cart.product.name1}}</h4>
                    <div>
                      <p class="col-red fs-24">￥{{cart.productGoods.mallMobilePrice || '0.00'}}</p>
                      <div class="df jb">x{{cart.count}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="subtotal df">
              <span>小计¥{{item.sellerCheckedDiscountedAmount}}</span>
              <p class="ml-20">
                <span class="pr-20">( 立减{{item.sellerCheckedDiscounted-item.orderDiscount}}</span>
                <span class="pr-20">满减{{item.orderDiscount}} )</span>
              </p>
            </div>
            <div class="btn-group tr pt-20">
              <span
                class="col-red"
                v-if="selected[item.seller.id]?selected[item.seller.id].couponName:false"
              >{{selected[item.seller.id].couponName}}</span>
              <a class="btn red-bg" @click="getsellercouponFn(item.seller.id)">使用优惠券</a>
            </div>
            <div
              class="mt-20"
              v-if="selected[item.seller.id]? selected[item.seller.id].isopen :false"
            >
              <div class="select df af">
                <select
                  class="fl"
                  v-model="selected[item.seller.id].couponSn"
                  v-show="selected[item.seller.id].tab"
                >
                  <option value="0">-- 请选择 --</option>
                  <option
                    :value="chlidItem.couponSn"
                    v-for="(chlidItem,index) in selected[item.seller.id].options"
                    :key="index"
                  >{{chlidItem.couponName}}</option>
                </select>
                <div class="input-group" v-show="!selected[item.seller.id].tab">
                  <div class="df">
                    <label class="fs tr" style="width:80px">序列号：</label>
                    <input type="text" v-model="selected[item.seller.id].couponSn" />
                  </div>
                  <div class="df">
                    <label class="fs tr" style="width:80px">密码：</label>
                    <input type="text" class="mt-20" v-model="selected[item.seller.id].pass" />
                  </div>
                </div>
                <a
                  class="btn ml-20 fs"
                  @click="couponInput(item.seller.id)"
                >{{selected[item.seller.id].tab?'输入':'选择'}}</a>
              </div>
              <div class="mt-20">
                <a class="btn white" @click="clostSeller(item.seller.id)">取消</a>
                <a
                  class="btn white ml-20"
                  @click="checksellercouponFn(item.sellerCheckedDiscountedAmount,item.seller)"
                >确定</a>
                <a class="btn white ml-20" @click="cancelCoupon(item.seller)">取消使用优惠券</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-item ps">
        <h3 class="df" @click="tabFn('ps')">
          <span>支付配送</span>
          <span class="fl tr">在线支付</span>
          <i class="iconfont">&#xe6ab;</i>
        </h3>
        <div class="mt-40 tc" v-show="tabOption.ps">
          <a
            class="btn white"
            :class="{red:paymentCode=='ONLINE'}"
            @click="payFunction('ONLINE','在线支付')"
          >在线支付</a>
          <a
            class="btn white"
            :class="{red:paymentCode=='OFFLINE'}"
            @click="payFunction('OFFLINE','到货支付')"
          >到货支付</a>
        </div>
      </div>
      <div class="content-item fp">
        <h3 class="df" @click="tabFn('fp')">
          <span>发票信息</span>
          <span class="fl tr">{{fpobj.title}}</span>
          <i class="iconfont">&#xe6ab;</i>
        </h3>
        <div class="mt-40" v-show="tabOption.fp">
          <p class="mb-20">
            <span>发票类型：</span>
            <span>纸质发票</span>
          </p>
          <p class="mb-20">
            <span>发票抬头：</span>
            <a class="btn" @click="newFpFn">{{fpobj.btnName}}</a>
          </p>
          <div class="mb-20 df select">
            <select
              class="fl"
              v-show="!fpobj.newfp"
              v-model="invoiceId"
              @change="invoiceType($event)"
            >
              <option value="-1">请选择</option>
              <option value="0">个人</option>
              <option
                :value="item.id"
                v-for="(item,index) in roderData.invoiceList"
                :key="index"
              >{{item.name}}</option>
            </select>
            <div class="input-group" v-show="fpobj.newfp">
              <input type="text" v-model="newInvoiceTitleText" />
              <input type="text" v-model="invoiceTaxNumber" class="mt-20" placeholder="请填写纳税人识别号" />
            </div>
          </div>
          <p class="mb-20">
            <span>发票内容：</span>
            <span>明细</span>
          </p>
          <div>
            <a class="btn db" @click="fpSubmit">保存并使用</a>
            <a class="btn mt-20 db" @click="fpClose">不开发票</a>
          </div>
        </div>
      </div>
      <!-- <div class="content-item jf">
        <h3 class="df" @click="tabFn('jf')">
          <span>
            积分
            <em class="col-c">共可用{{member.integral}}积分</em>
          </span>
          <span class="fl tr">
            使用30积分
            <font class="db">￥3.00元</font>
          </span>
          <i class="iconfont">&#xe6ab;</i>
        </h3>
        <div class="mt-20" v-show="tabOption.jf">
          <p>
            使用规则(
            <em style="color:#edd28b;">积分满10即可使用：每次使用积分为n*10</em>)
          </p>
          <p class="mt-20">使用积分</p>
          <div class="df mt-20">
            <a class="btn">-</a>
            <input type="test" class="jf-input" v-model="jfText" disabled />
            <a class="btn">+</a>
          </div>
          <div class="mt-20">
            <a class="btn db">确定</a>
          </div>
        </div>
      </div>-->
      <div class="content-item info">
        <p class="df">
          <span class="fl">商品原价</span>
          <span class="col-red">￥{{cartInfoVO.checkedCartAmount}}</span>
        </p>
        <p class="df mt-20">
          <span class="fl">商品金额(优惠)</span>
          <span class="col-red">￥{{cartInfoVO.checkedDiscountedCartAmount}}</span>
        </p>
        <p class="df mt-20">
          <span class="fl">活动节省</span>
          <span class="col-red">-￥{{cartInfoVO.checkedDiscountedAmount}}</span>
        </p>
        <p class="df mt-20">
          <span class="fl">优惠券节省</span>
          <span class="col-red">-￥{{couponValueSum ||0.00}}</span>
        </p>
        <p class="df mt-20">
          <span class="fl">运费</span>
          <span class="col-red">+{{cartInfoVO.logisticsFeeAmount}}</span>
        </p>
        <p class="df mt-20" v-if="jfText">
          <span class="fl">积分</span>
          <span class="col-red">￥0.00</span>
        </p>
      </div>
    </div>
    <div class="footer df">
      <div class="df jc item-1 fl">
        <div class="tc">
          实付款
          <font class="fs-36">￥{{finalAmount}}</font>
        </div>
      </div>
      <div class="df jc item-3" @click="ordercommitFn">提交订单</div>
    </div>
  </div>
</template>

<script>
import {
  orderInfoJson,
  getsellercoupon,
  checksellercoupon,
  ordercommit,
  getinvoicebyid,
  payInfo
} from "api";
import commular from "@/utils";
export default {
  data() {
    return {
      roderData: {},
      cartInfoVO: {},
      cartListVOs: [],
      tabOption: {},
      selected: {},
      fpobj: {
        btnName: "新抬头",
        newfp: false,
        title: "不开发票",
        invoiceType: ""
      },
      jfText: 0,
      member: {},
      paymentCode: "ONLINE",
      paymentName: "在线支付",
      newInvoiceTitleText: "",
      invoiceTaxNumber: "",
      invoiceId: -1,
      couponValueSum: 0,
      finalAmount: ""
    };
  },
  created() {
    this.orderInfoJsonFn();
  },
  methods: {
    orderInfoJsonFn() {
      var addressId = this.$route.query.addressId;

      orderInfoJson({ addressId }).then(res => {
        let data = (this.roderData = res.data);
        this.cartInfoVO = data.cartInfoVO;
        this.cartListVOs = data.cartInfoVO.cartListVOs || [];
        this.orderCommitVO = data.orderCommitVO;
        this.member = data.member;
        this.finalAmount = this.cartInfoVO.finalAmount;
      });
    },
    fullSub(cartListVO) {
      var actFull = cartListVO.actFull || {};
      var html = `<div>满${actFull.firstFull ? actFull.firstFull : "0.00"}-${
        actFull.firstDiscount ? actFull.firstDiscount : "0.00"
      }
                  &nbsp;&nbsp;满${
                    actFull.secondFull ? actFull.secondFull : "0.00"
                  }-${actFull.secondDiscount ? actFull.secondDiscount : "0.00"}
                  &nbsp;&nbsp;满${
                    actFull.thirdFull ? actFull.thirdFull : "0.00"
                  }-${actFull.thirdDiscount ? actFull.thirdDiscount : "0.00"}
     </div>`;

      return html;
    },
    getsellercouponFn(id) {
      if (this.selected[id] ? this.selected[id].isopen : false) {
        return;
      }
      getsellercoupon({ sellerId: id }).then(res => {
        if (!this.selected[id]) {
          this.$set(this.selected, id, {
            isopen: true,
            couponSn: 0,
            options: res.data,
            tab: true,
            code: "",
            pass: "",
            couponName: "",
            couponValue: ""
          });
        } else {
          this.selected[id].isopen = true;
        }
      });
    },
    tabFn(key) {
      this.$set(this.tabOption, key, !this.tabOption[key]);
    },
    invoiceType(e) {
      this.invoiceTitle = e.target.selectedOptions[0].label;
      if (this.invoiceId != -1) {
        getinvoicebyid({ invoiceId: this.invoiceId }).then(res => {
          console.log(res);
        });
      }
    },
    fpSubmit() {
      if (this.invoiceId != -1) {
        this.fpobj.title = this.invoiceTitle + "-明细";
        this.fpobj.invoiceType = "明细";
        this;
        this.$set(this.tabOption, "fp", false);
      } else {
        this.$message("请选择发票类型");
      }
    },
    fpClose() {
      this.fpobj.title = "不开发票";
      this.$set(this.tabOption, "fp", false);
      this.fpobj.invoiceType = "";
      this.invoiceId = "";
    },
    newFpFn() {
      this.fpobj.newfp = !this.fpobj.newfp;
      this.fpobj.btnName = this.fpobj.newfp ? "取消" : "新抬头";
    },
    checksellercouponFn(orderAmount, item) {
      const data = {
        orderAmount: orderAmount,
        couponType: this.selected[item.id].tab ? 1 : 2,
        couponSn: this.selected[item.id].couponSn,
        sellerId: item.id,
        couponPassword: this.selected[item.id].pass
      };
      checksellercoupon(data)
        .then(res => {
          this.couponValueSum = 0;
          this.finalAmount = this.cartInfoVO.finalAmount;
          this.selected[item.id].couponName = res.data.couponName;
          this.selected[item.id].couponValue = res.data.couponValue;
          for (let i in this.selected) {
            this.couponValueSum += this.selected[i].couponValue;
            this.finalAmount = this.finalAmount - this.selected[i].couponValue;
          }
        })
        .catch(reject => {
          console.log(reject);
        });
      this.selected[item.id].isopen = false;
    },
    clostSeller(id) {
      this.$set(
        this.selected,
        id,
        Object.assign(this.selected[id], { isopen: false })
      );
    },
    cancelCoupon(item) {
      this.finalAmount = this.cartInfoVO.finalAmount;

      for (let i in this.selected) {
        this.couponValueSum -= this.selected[i].couponValue;
        this.selected[item.id].couponValue = 0;
        this.finalAmount = this.finalAmount + this.selected[i].couponValue;
      }
      this.selected[item.id].isopen = false;
      this.selected[item.id].couponName = false;
    },
    couponInput(id) {
      this.selected[id].tab = !this.selected[id].tab;
    },
    ordercommitFn() {
      let coupon = {};
      let useCouponSellerIds = [];
      let orderCommitVO = this.roderData.orderCommitVO;
      let address = this.roderData.address || null;
      if (!address) {
        this.$message("请选择地址");
        return;
      }
      Object.keys(this.selected).map(item => {
        coupon["couponType" + item] = this.selected[item] ? 1 : 2;
        coupon["couponSn" + item] = this.selected[item].couponSn || "";
        coupon["selectCoupon" + item] = this.selected[item].couponSn || "";
        coupon["couponValue" + item] = this.selected[item].couponValue;
        coupon["currCouponPassword" + item] = this.selected[item].pass;
        coupon["couponPassword" + item] = this.selected[item].pass;
        coupon["currCouponSn" + item] = this.selected[item].couponSn;
        if (
          this.selected[item].couponValue &&
          this.selected[item].couponValue != ""
        ) {
          useCouponSellerIds.push(item);
        }
      });
      coupon.paymentName = this.paymentName || "";
      coupon.paymentCode = this.paymentCode || "";
      coupon.addressId = address.id;
      coupon.invoiceStatus = 0;
      coupon.invoiceType = "明细";
      coupon.invoiceTitle = this.invoiceTitle;
      coupon.invoiceId = this.invoiceId == -1 ? "" : this.invoiceId;
      coupon.invoiceTaxNumber = this.invoiceTaxNumber;
      coupon.useCouponSellerIds = useCouponSellerIds.join(",");
      ordercommit(coupon).then(res => {
        console.log(res);
        if (res.success) {
          if (res.data.paymentCode == "OFFLINE") {
            this.$message("订单提交成功");
            this.$router.replace(`/personalCenter/orderCenter`);
          } else {
            this.$router.replace(
              `/order/pay?orderSn=${res.data.mainOrder.orderSn}`
            );
          }
        }
      });
    },
    payFunction(id, name) {
      this.paymentCode = id;
      this.paymentName = name;
    }
  }
};
</script>
<style lang="scss" scoped>
.order {
  margin-bottom: 136px;
  .content-item {
    padding: 20px;
    margin: 20px 0;
    background: #fffaf3;
    color: #333;
    border-top: solid 1px #dedede;
    border-bottom: solid 1px #dedede;
    font-size: 28px;
  }
  .order-adderss {
    i.iconfont {
      color: #f15353;
    }
  }
  .info {
    color: #999;
  }
  .btn-group {
    border-top: 2px solid #dedede;
  }
  .item {
    h3 {
      background: #dedede;
      padding: 20px;
      font-size: 28px;
      .full {
        font-size: 24px;
        margin-top: 10px;
        span {
          background: #f23030;
          color: #fff;
          padding: 0px 12px;
        }
      }
    }
    .box {
      padding: 20px;
      .cart-h {
        height: 160px;
      }
    }
  }
  .select {
    select {
      min-height: 60px;

      background: transparent;
      border: 2px solid #dedede;
      padding: 0 10px;
    }
  }
  .jf {
    .btn {
      min-width: 60px;
    }
    .jf-input {
      height: 60px;
      line-height: 60px;
      width: 200px;
      margin: 0 10px;
    }
  }

  .input-group {
    input {
      height: 60px;
      line-height: 60px;
      border: 2px solid #dedede;
      width: 100%;
    }
  }
  .cart-product {
    img {
      width: 160px;
      height: 160px;
    }
    h3 {
      font-size: 28px;
    }
  }
  .subtotal {
    margin: 20px 0;
    padding: 0 20px;
    font-size: 28px;
    color: #999;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    & > div {
      height: 116px;

      box-sizing: border-box;
      background: rgba($color: #000000, $alpha: 0.8);
      color: #fff;
      i.iconfont {
        color: #fff;
      }
      i.iconfont.curr {
        color: #ef3647;
      }
    }
    .item-1 {
      padding: 0 20px;
      position: relative;
      em {
        position: absolute;
        right: 6px;
        top: 6px;
        background: #fff;
        border-radius: 5px;
        padding: 0 10px;
        color: #ef3561;
        font-size: 24px;
      }
    }
    .item-2 {
      background: #ffb03f;
    }
    .item-3 {
      background: #f15353;
      padding: 0 60px;
    }
  }
}
</style>
