<template>
  <div class="back-deliver-goods">
    <div class="df product">
      <img :src="$store.state.BASE_IMG+orderProduct.productLeadLittle" />
      <div class="df fc af">
        <h3>{{orderProduct.productName}}</h3>
        <span class="fs-24 mt-10">
          购买时间：
          <font>{{orderProduct.createTime}}</font>
        </span>
      </div>
    </div>
    <div class="rfund-info">
      <div class="df">
        <span>快递公司：</span>
        <select class="bor" v-model="logisticsId">
          <option
            v-for="(option,index) in courierCompanyList"
            :key="index"
            :value="option.id"
          >{{option.companyName}}</option>
        </select>
      </div>
      <div class="df mt-20">
        <span>快递单号：</span>
        <input type="text" class="bg-fff" v-model="logisticsNumber" placeholder="请输入快递号"/>
      </div>
      <div class="df mt-20">
        <span class="vh">快递单号：</span>
        <a class="btn" @click="appDoExchangeDeliverGoodsFn">提交</a>
      </div>
    </div>
  </div>
</template>
<script>
import { appExchangeDeliverGoods,appDoExchangeDeliverGoods } from "api";
export default {
  data() {
    return {
      query: this.$route.query || {},
      getData: {},
      orderProduct: {},
      memberProductBack: {},
      courierCompanyList: [],
      logisticsId: "",
      logisticsNumber:''
    };
  },
  created() {
    this.appExchangeDeliverGoodsFn();
  },
  methods: {
    appExchangeDeliverGoodsFn() {
      appExchangeDeliverGoods({ exchangeid: this.query.backid }).then(res => {
        console.log(res);
        let data = (this.getData = res.data);
        this.orderProduct = data.orderProduct || {};
        this.memberProductBack = data.memberProductBack || {};
        this.courierCompanyList = data.courierCompanyList || [];
        if (data.courierCompanyList.length) {
          this.logisticsId = data.courierCompanyList[0].id;
        }
      });
    },
    appDoExchangeDeliverGoodsFn(){
        let data = {
            id:this.query.backid,
            logisticsId2:this.logisticsId,
            logisticsNumber2:this.logisticsNumber
        }
        console.log(data)
        appDoExchangeDeliverGoods(data).then(res=>{
            this.$message('换货成功');
            this.$router.go(-1);
            console.log(res);
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.back-deliver-goods {
  padding: 20px;
  font-size: 28px;
  .product {
    img {
      width: 160px;
      height: 160px;
      flex-shrink: 0;
      margin-right: 20px;
    }
  }
  .rfund-info {
    background: #edf9e5;
    padding: 20px;
    margin-top: 20px;
  }
}
</style>