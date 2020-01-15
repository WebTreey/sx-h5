<template>
  <div class="look-back-logistics">
    <div class="order-box">
      <h3 class="col-3 mb-20">换货操作记录</h3>
      <div class="order-info">
        <div class="order-info-item" v-for="(item,index) in memberProductExchangeLogList" :key="index">
          <h4>{{item.createTime}}</h4>
          <p>{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { appLookExchangeLogistics } from "api";
export default {
  data() {
    return {
      query: this.$route.query,
      memberProductExchangeLogList: [],
      
    };
  },
  created() {
    this.appLookExchangeLogisticsFn();
  },
  methods: {
    appLookExchangeLogisticsFn() {
      appLookExchangeLogistics({ exchangeid: this.query.backid }).then(res => {
        let data = res.data;
        this.memberProductExchangeLogList = data.memberProductExchangeLogList;
        console.log(res);
      });
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
  h3 {
    font-weight: bold;
  }
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
      font-weight: 400;
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
</style>