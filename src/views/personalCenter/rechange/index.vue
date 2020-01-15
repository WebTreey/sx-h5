<template>
  <div class="rfund" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
    <div class="rfund-item" v-for="(item,index) in this.list" :key="index">
      <div class="rfund-header">
        <p class="df jb fs-24">
          <span>
            订单编号：
            <em>{{item.orderSn}}</em>
          </span>
          <span class="col-red">{{stateReturn(item.state)}}</span>
        </p>
        <p class="df jb fs-24">
          <span>
            申请时间：
            <em>{{item.createTime}}</em>
          </span>
        </p>
      </div>
      <div class="df product-content">
        <img v-lazy="$store.state.BASE_IMG+item.product.masterImg" class="fs" />
        <div class="df fc af">
          <h3 class="to-2">{{item.product.name1}}</h3>
          <p class="mt-20">x{{item.ordersProduct.number||0}}</p>
        </div>
      </div>
      <div class="mt-20 tr">
        <a class="btn mr-20" @click="lookOver(item)">查看</a>
        <a
          class="btn mr-20"
          v-if="item.state==6 || item.state==7"
          @click="$router.push({name:'/personalCenter/refund/addcomplaint',query:{orderId:item.orderId,orderProductId:item.orderProductId,productBackId:item.id}})"
        >投诉</a>
        <a
          class="btn mr-20"
          v-if="item.state==2"
          @click="$router.push({name:'/personalCenter/rechange/exchangeDeliverGoods',query:{backid:item.id}})"
        >发货</a>
        <a
          class="btn mr-20"
          v-if="item.state==3 || item.state==4 || item.state==5 || item.state==6"
          @click="$router.push({name:'/personalCenter/rechange/lookExchangeLogistics',query:{backid:item.id}})"
        >查看物流</a>
      </div>
      <div class="rfund-info" v-show="look[item.id] ? look[item.id].isopen : false">
        <div class="rfund-info-row df">
          <span class="fs">换货数量：</span>
          <span>{{item.number}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">问题描述：</span>
          <span>{{item.question}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">换件收货地址：</span>
          <span>{{item.addressAll}}{{item.addressInfo}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">换件收货邮编：</span>
          <span>{{item.zipCode}}</span>
        </div>
        <div class="rfund-info-row df" v-if="item.couponUser">
          <span class="fs">换件收货人姓名：</span>
          <span>{{item.changeName}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">换件收货人电话：</span>
          <span>{{item.phone}}</span>
        </div>
        <div v-if="item.stateReturn==4">
          <div class="rfund-info-row df">
            <span class="fs">换件物流公司：</span>
            <span>{{item.logisticsName}}</span>
          </div>
          <div class="rfund-info-row df">
            <span class="fs">换件物流单号：</span>
            <span>{{item.logisticsNumber}}</span>
          </div>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">退件收货地址：</span>
          <span>{{item.addressAll2}} {{item.addressInfo2}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">退件收货邮编：</span>
          <span>{{item.zipCode2}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">退件收货人姓名：</span>
          <span>{{item.changeName2}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">退件收货人电话：</span>
          <span>{{item.phone2}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">退件物流公司</span>
          <span>{{item.logisticsName2}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">退件物流单号</span>
          <span>{{item.logisticsNumber2}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">处理意见</span>
          <span>{{item.remark || '无'}}</span>
        </div>
      </div>
    </div>
    <div class="fs-24 col-999 tc mt-20 mb-20" v-if="loading">--没有更多数据了--</div>
  </div>
</template>
<script>
import { appMoreexchange } from "api";
export default {
  data() {
    return {
      list: [],
      pageIndex: 0,

      loading: false,
      canComplain: false,
      look: {}
    };
  },
  created() {},
  methods: {
    appMoreexchangeFn(pageIndex) {
      appMoreexchange({ pageIndex: this.pageIndex }).then(res => {
        console.log(res);
        this.list = this.list.concat(res.data);
        if (res.data.length < 10) {
          this.loading = true;
        }
      });
    },
    loadMore() {
      this.appMoreexchangeFn(this.pageIndex++);
    },
    stateReturn(state) {
      switch (state) {
        case 1:
          return "未处理";
        case 2:
          return "审核通过";
        case 3:
          return "用户发回退件";
        case 4:
          return "商家收到退件";
        case 5:
          return "商家发出换件";
        case 6:
          return "原件退还";
        case 7:
          return "不处理";
      }
    },
    stateMoney(state) {
      switch (state) {
        case 1:
          return "未退款";
        case 2:
          return "退款到账户";
        case 3:
          return "退款到银行";
      }
    },
    lookOver(item) {
      if (!this.look[item.id]) {
        this.$set(this.look, item.id, { isopen: true });
      } else {
        this.look[item.id].isopen = !this.look[item.id].isopen;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.rfund-header {
  padding: 20px;
  color: #666;
  p {
    padding: 10px 0;
  }
}
.rfund-item {
  font-size: 24px;
  img {
    width: 160px;
    margin-right: 20px;
  }
  .product-content {
    padding: 20px;
    border-top: 2px solid #dedede;
    border-bottom: 2px solid #dedede;
    h3 {
      line-height: 40px;
    }
  }
  .rfund-info {
    padding: 20px;
    margin: 20px;
    background: #edf9e5;
  }
  .rfund-info-row {
    padding: 20px 0;
    textarea {
      border: 2px solid #dedede;
      padding: 10px;
      border-radius: 10px;
      resize: none;
      flex: 1;
    }
  }
}
</style>