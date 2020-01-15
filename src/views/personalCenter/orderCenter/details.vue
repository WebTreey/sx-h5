<template>
  <div class="order-detail">
    <div class="order-box">
      <p>
        <span>订单编号：</span>
        <em>{{order.orderSn}}</em>
      </p>
      <p>
        <span>订单类型：</span>
        <em>{{orderType}}</em>
      </p>
      <p>
        <span>订单状态：</span>
        <em>{{orderState}}</em>
      </p>
      <p>
        <span>下单时间：</span>
        <em>{{order.createTime}}</em>
      </p>
      <p v-if="order.orderState==1">
        <span>剩余时间：</span>
        <em>{{this.down}}</em>
      </p>
      <div class="tc mt-20" v-if="order.orderState==1 && order.orderType!=5">
        <a class="btn red mr-20" @click="appCancalorderFn(order)">取消订单</a>
        <a class="btn red" @click="$router.push(`/order/pay?orderSn=${order.orderSn}`)">去付款</a>
      </div>
      <div class="tc mt-20" v-if="order.orderState==2 && order.orderType!=5">
        <a class="btn red" @click="appCancalorderFn(order)">取消订单</a>
      </div>
      <div class="tc mt-20" v-if="order.orderState==3 && order.orderType!=5">
        <a class="btn red" @click="appCancalorderFn(order)">取消订单</a>
      </div>
      <div class="tc mt-20" v-if="order.orderState==4">
        <a class="btn red" @click="appGoodreceiveFn(order)">确认收货</a>
      </div>
      <div
        class="tc mt-20"
        v-if="order.orderState==5 && order.orderType!=4 && order.evaluateState != 3"
      >
        <!-- <a class="btn red mr-20">去晒单</a> -->
        <a
          class="btn red"
          v-if="order.backOrExchangeNum && order.isShowBackAndExchange"
          @click="$router.push(`/personalCenter/orderCenter/returnGoods/${order.id}`)"
        >申请退换货</a>
      </div>
    </div>
    <div class="order-box">
      <div class="mb-20" v-for="product in this.order.orderProductList" :key="product.id">
        <div class="df af pr">
          <div class="cart-product df af">
            <img class="product-img" :src="$store.state.BASE_IMG+product.productLeadLittle" />
            <div class="ml-20 df fc af jb cart-h">
              <h4 class="to-2 fs-28">{{product.productName}}{{product.specInfo}}</h4>
              <div>
                <p class="col-red fs-24">
                  <span
                    v-if="order.orderType == 6"
                  >{{(product.actIntegralNum) / (product.number)}}+￥{{(product.actIntegralMoney)/ (product.number)}}</span>
                  <span v-else>￥{{product.moneyPrice || '0.00'}}</span>
                </p>
                <div class="df jb">x{{product.number}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-box">
      <h3 class="df jb">
        <span>{{order.name || ''}}</span>
        <em>{{order.mobile}}</em>
      </h3>
      <div class="mt-20">
        <span>{{order.addressAll}}</span>&nbsp;
        <em>{{order.addressInfo}}</em>
      </div>
    </div>
    <div class="order-box paymentFn">
      <div class="df jb">
        <span>付款方式：</span>
        <span>{{order.paymentStatus==1?order.paymentName:"未付款"}}</span>
      </div>
      <div class="df jb">
        <span>商品金额：</span>
        <span class="col-red">+￥{{order.moneyProduct||'0.00'}}</span>
      </div>
      <div class="df jb">
        <span>运费：</span>
        <span class="col-red">+￥{{order.moneyLogistics||'0.00'}}</span>
      </div>
      <div class="df jb">
        <span>优惠总额：</span>
        <span class="col-red">-￥{{order.moneyDiscount||'0.00'}}</span>
      </div>
      <div class="df jb">
        <span>积分支付：</span>
        <span class="col-red">-￥{{order.moneyIntegral||'0.00'}}</span>
      </div>
      <div class="df jb">
        <span>余额支付：</span>
        <span class="col-red">-￥{{order.moneyPaidBalance||'0.00'}}</span>
      </div>
      <div class="df jb">
        <span>现金支付：</span>
        <span class="col-red">-￥{{order.moneyPaidReality||'0.00'}}</span>
      </div>
      <div class="df jb">
        <span>订单金额：</span>
        <span class="col-red">￥{{order.moneyOrder||'0.00'}}</span>
      </div>
      <div class="df jb payment" v-if="order.paymentStatus==1">
        <span>实付金额：</span>
        <span class="col-red">￥{{(order.moneyPaidReality + order.moneyPaidBalance)||'0.00'}}</span>
      </div>
      <div class="df jb payment" v-else>
        <span>应付金额：</span>
        <span class="col-red">￥{{(order.moneyOrder - order.moneyIntegral)||'0.00'}}</span>
      </div>
    </div>
    <div class="order-box">
      <h3 class="col-3 mb-20">配送信息</h3>
      <p>
        <span>配送方式：</span>
        <em>{{order.logisticsName || ''}}</em>
      </p>
      <p>
        <span>快递单号：</span>
        <em>{{order.logisticsNumber || ''}}</em>
      </p>
      <p>
        <span>发货时间：</span>
        <em>{{order.deliverTime}}</em>
      </p>
      <div class="order-info">
        <div class="order-info-item" v-for="(orderLog,index) in list" :key="index">
          <h4>{{orderLog.createTime}}</h4>
          <p>{{orderLog.content}}</p>
        </div>
      </div>
    </div>
    <div class="order-box">
      <h3 class="col-3 mb-20">发票信息</h3>
      <div v-if="order.invoiceStatus == 0">
        <p>
          发票类型：
          <font>不要发票</font>
        </p>
      </div>
      <div v-if="order.invoiceStatus == 1">
        <p>
          发票类型：
          <font>单位</font>
        </p>
        <p>
          发票抬头：
          <font>{{order.invoiceTitle||''}}</font>
        </p>
        <p>
          发票内容：
          <font>{{order.invoiceType ||''}}</font>
        </p>
      </div>
      <div v-if="order.invoiceStatus == 2">
        <p>
          发票类型：
          <font>个人</font>
        </p>
        <p>
          发票抬头：
          <font>{{order.invoiceTitle||''}}</font>
        </p>
        <p>
          发票内容：
          <font>{{order.invoiceType ||''}}</font>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import commular from "@/utils"; //timeDown
import { appOrderdetail, appCancalorder, appGoodreceive } from "api";
export default {
  data() {
    return {
      params: {},
      order: {},
      list: [],
      down: ""
    };
  },
  computed: {
    orderType() {
      switch (+this.order.orderType) {
        case 1:
          return "商城订单";
        case 2:
          return "限时抢购订单";
        case 3:
          return "团购订单";
        case 4:
          return "定金订单";
        case 5:
          return "尾款订单";
        case 6:
          return "积分商城订单";
      }
    },
    orderState() {
      switch (+this.order.orderState) {
        case 1:
          return "未付款";
        case 2:
          return "待确认";
        case 3:
          return "待发货";
        case 4:
          return "已发货";
        case 5:
          return "已完成";
        case 6:
          return "已取消";
      }
    }
  },
  created() {
    this.params = this.$route.params;
    this.appOrderdetailFn();
  },
  methods: {
    appOrderdetailFn() {
      appOrderdetail({ id: this.params.id }).then(res => {
        this.order = res.data.order || {};
        this.list = res.data.orderLogList || [];
        console.log(res);
        if (+this.order.orderState == 1) {
          this.timeDowm(res.data.order);
        }
      });
    },
    appCancalorderFn(item) {
      MessageBox.confirm("确定删除订单吗？")
        .then(active => {
          appCancalorder({ id: item.id }).then(res => {
            console.log(res);
            this.$message("取消成功");
            item.orderState = 6;
          });
        })
        .catch(err => {});
    },
    appGoodreceiveFn(item) {
      appGoodreceive({ ordersId: item.id }).then(res => {
        this.$message("确定收货成功");
        this.appOrderdetailFn();
        console.log(res);
      });
    },
    timeDowm(item) {
      let times = this.order.createTime;
      let reg = /-/gi;
      times = times.replace(reg, "/");
      let date = +new Date(times);
      let sl = setInterval(() => {
        let currDate = +new Date();
        let downDate = currDate - date;
        let intDate = 1800 - Math.floor(downDate / 1000);

        if (intDate > 0) {
          this.down = commular.timeDown(intDate);
        } else {
          clearInterval(sl);
          item.orderState = 6;
          this.down = "订单已过期";
        }
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.order-box {
  padding: 20px;
  margin: 20px 0;
  border-top: 2px solid #dedede;
  border-bottom: 2px solid #dedede;
  font-size: 28px;
  color: #666;
  p {
    padding: 8px 0;
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
  .order-info {
    .order-info-item {
      background: #ddd;
      padding: 20px;
      margin: 10px 0;
      border-radius: 10px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: -6px;
        transform: translateY(-50%);
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 6px solid #ddd;
        display: inline-block;
      }
    }
  }
}
.paymentFn {
  & > div {
    padding: 10px 0;
  }
  .payment {
    border-top: 2px solid #dedede;
  }
}
</style>
