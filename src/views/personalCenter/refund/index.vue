<template>
  <div class="rfund" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
    <div class="rfund-item" v-for="(item,index) in this.list" :key="index">
      <div class="rfund-header">
        <p class="df jb fs-24">
          <span>
            订单编号：
            <em>{{item.orderSn}}</em>
          </span>
          <span class="col-red">{{stateReturn(item.stateReturn)}}</span>
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
          v-if="item.stateReturn==5"
          @click="$router.push({name:'/personalCenter/refund/addcomplaint',query:{orderId:item.orderId,orderProductId:item.orderProductId,productBackId:item.id}})"
        >申述</a>
        <a
          class="btn mr-20"
          v-if="item.stateReturn==2"
          @click="$router.push({name:'/personalCenter/refund/backDeliverGoods',query:{backid:item.id}})"
        >发货</a>
        <a
          class="btn mr-20"
          v-if="item.stateReturn==3 || item.stateReturn==4"
          @click="$router.push({name:'/personalCenter/refund/lookBackLogistics',query:{backid:item.id}})"
        >查看物流</a>
      </div>
      <div class="rfund-info" v-show="look[item.id] ? look[item.id].isopen : false">
        <div class="rfund-info-row df af">
          <span class="fs mt-10">问题描述：</span>
          <textarea disabled rows="3" :value="item.question"></textarea>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">退货数量：</span>
          <span>{{item.number}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">退款金额：</span>
          <span>{{item.backMoney}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">返回积分：</span>
          <span>{{item.backIntegral}}</span>
        </div>
        <div class="rfund-info-row df" v-if="item.couponUser">
          <span class="fs">返回优惠券：</span>
          <span>{{item.couponUser.couponSn}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">退货状态：</span>
          <span>{{stateReturn(item.stateReturn)}}</span>
        </div>
        <div v-if="item.stateReturn==4">
          <div class="rfund-info-row df">
            <span class="fs">退款状态：</span>
            <span>{{stateMoney(item.stateMoney)}}</span>
          </div>
          <div class="rfund-info-row df">
            <span class="fs">退款时间：</span>
            <span>{{item.backMoneyTime ? item.backMoneyTime: '正在处理'}}</span>
          </div>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">商家收货地址：</span>
          <span>{{item.addressAll}} {{item.addressInfo}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">邮编：</span>
          <span>{{item.zipCode}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">商家联系人手机：</span>
          <span>{{item.contactPhone}}</span>
        </div>
        <div class="rfund-info-row df">
          <span class="fs">商家联系人姓名：</span>
          <span>{{item.contactName}}</span>
        </div>
        <div class="rfund-info-row df af">
          <span class="fs mt-10">处理意见：</span>
          <textarea disabled rows="3" :value="item.remark||'无'"></textarea>
        </div>
      </div>
    </div>
     <div class="fs-24 col-999 tc mt-20 mb-20" v-if="loading">--没有更多数据了--</div>
  </div>
</template>
<script>
import { appMoreback } from "api";
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
    appMorebackFn(pageIndex) {
      appMoreback({ pageIndex: this.pageIndex }).then(res => {
        console.log(res);
        if (res.success) {
          if (res.data.length < 10) {
            this.loading = true;
          }
          this.list = this.list.concat(res.data || []);
        }
      });
    },
    loadMore() {
      this.appMorebackFn(this.pageIndex++);
    },
    stateReturn(state) {
      switch (state) {
        case 1:
          return "未处理";
        case 2:
          return "审核通过";
        case 3:
          return "用户发货";
        case 4:
          return "店铺收货";
        case 5:
          return "不予处理";
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