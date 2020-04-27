<template>
  <div class="pay">
    <h2 class="tc mt-40 col-999" v-if="+payData.payStatus==2">
      <span class="db">订单处理中。请等待</span>
      <a class="btn red-bg mt-40" @click="$router.push('/')">去逛逛</a>
    </h2>
    <div v-else>
      <div class="pay-top">
        <p>
          订单提交成功，请您尽快付款！ 订单号：
          <font>{{payData.orderSn}}</font>
        </p>
        <p class="fs-24 mt-20">
          请您在提交订单后
          <font class="col-red">24小时内</font>完成支付,否则订单会自动取消
        </p>
      </div>
      <div class="pay-fn">
        <h3 class="df jb">
          <span>选择支付方式</span>
          <font class="col-red">{{payData.payAmount}}元</font>
        </h3>
        <ul>
          <li class="df jb" v-if="+mechannelInfo.alipayPay">
            <label class="fl" for="zfb">支付宝</label>
            <input class="fs" type="radio" id="zfb" :value="0" v-model="payFn" />
          </li>
          <li class="df jb" v-if="+mechannelInfo.wechatPay">
            <label class="fl" for="wx">微信支付</label>
            <input class="fs" type="radio" id="wx" :value="1" v-model="payFn" />
          </li>
          <li class="df jb" v-if="+mechannelInfo.walletPay">
            <label class="fl" for="lq">零钱</label>
            <input class="fs" type="radio" id="lq" :value="2" v-model="payFn" />
          </li>
        </ul>
        <div class="btn red-bg db mt-40" @click="paySubmint">立即支付</div>
      </div>
    </div>
  </div>
</template>
<script>
import commular from "@/utils";
import { payInfo } from "api";
export default {
  data() {
    return {
      query: this.$route.query,
      payData: {},
      payFn: 0,
      mechannelInfo: {}
    };
  },
  created() {
    this.payInfoFn();
  },
  methods: {
    payInfoFn() {
      payInfo({ orderSn: this.query.orderSn }).then(res => {
        console.log(res);
        if (res.success) {
          this.payData = res.data;
          this.mechannelInfo = res.data.mechannelInfo || {};
        } else {
          this.$message(res.message);
        }
      });
    },
    paySubmint() {
      let data = {
        payChannel: +this.payFn,
        tradeNo: this.payData.tradeNo,
        amount: this.payData.amount + "",
        orderId: this.payData.orderId
      };
      let isIos = commular.isIphone();
      if (isIos) {
        this.$bridge.callhandler("toPayFunction", data, function() {
          console.log("toPayFunction方法IOS调用成功");
        });
      } else {
        try {
          window.Androids.toPayFunction(JSON.stringify(data));
        } catch (err) {
          console.log("window.Androids.toPayFunction方法未执行或者执行出错");
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.pay-top {
  padding: 20px;
  background: #fdf5f5;
  box-shadow: 3px 3px 3px #dedede;
  font-size: 28px;
}
.pay-fn {
  padding: 20px;
  margin: 20px 0 0 0;
  ul {
    margin: 20px 0 0 0;
    li {
      padding: 16px 0;
      border-bottom: 1px solid #dedede;
    }
  }
}
</style>