<template>
  <div class="pro-content-list">
    <div class="container">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
        <li class="item" v-for="(item,index) in list" :key="index">
          <div class="df jb box" style=" background: #f2f2f2">
            <span>订单号：{{item.orderSn || ''}}</span>
            <span>{{orderState(item.orderState)}}</span>
          </div>
          <div
            class="df jb box"
            v-for="(orderitem,orderindex) in item.orderProductList"
            :key="orderindex"
          >
            <img v-lazy="$store.state.BASE_IMG+orderitem.productLeadLittle" class="produc-img fs" />
            <h3 class="produc-title ml-20 to-2">{{orderitem.productName}}</h3>
          </div>
          <div class="box">
            <div class="mb-20">
              <span>商家订单，</span>
              实付款￥{{item.moneyOrder}}
            </div>
            <div class="df" style="justify-content: flex-end;">
              <a
                class="btn"
                @click="$router.push(`/personalCenter/orderCenter/details/${item.id}`)"
              >查看</a>
              <p v-if="item.orderState==1">
                <a
                  class="btn red ml-20"
                  v-if="item.orderType != 5"
                  @click="appCancalorderFn(item)"
                >取消订单</a>
                <!--   onclick="cancalOrder('${order.id}')" -->
                <a
                  class="btn red ml-20"
                  @click="$router.push(`/order/pay?orderSn=${item.orderSn}`)"
                >去付款</a>
              </p>
              <p v-if="item.orderState==2">
                <a
                  class="btn red ml-20"
                  v-if="item.orderType != 5"
                  @click="appCancalorderFn(item)"
                >取消订单</a>
              </p>
              <p v-if="item.orderState==3">
                <a
                  class="btn red ml-20"
                  v-if="item.orderType != 5"
                  @click="appCancalorderFn(item)"
                >取消订单</a>
              </p>
              <p v-if="item.orderState==4">
                <a class="btn red ml-20" @click="appGoodreceiveFn(item)">确认收货</a>
                <!-- onclick="goodsReceipt('${(order.id)!''}')" -->
              </p>
              <p v-if="item.orderState==5 && item.orderType != 4">
                <!-- <a class="btn red" v-if="item.evaluateState!= 3">评价晒单</a> -->
                <a
                  class="btn red ml-20"
                  v-if="item.backOrExchangeNum && item.isShowBackAndExchange"
                  @click="$router.push(`/personalCenter/orderCenter/returnGoods/${item.id}`)"
                >申请退换货</a>
                <!-- onclick="goodsReceipt('${(order.id)!''}')" -->
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="fs-24 col-999 tc mt-20 mb-20" v-if="loading">--没有更多数据了--</div>
    <div class="back" @click="this.backTop" v-show="isbackTop">回到顶部</div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import commular from "@/utils";
import { appMoreorder, appCancalorder, appGoodreceive } from "api";
export default {
  name: "orderCenter",
  data() {
    return {
      list: [],
      orderProductList: [],
      pageIndex: 0,
      pageSize: 10,
      loading: false,
      isbackTop: false,
      arr: []
    };
  },
  activated() {
    if (this.arr.length == this.pageSize) {
      this.loading = false;
    }
    let app = document.getElementById("app");
    app.scrollTop = this.$store.state.homeScroll;
    app.addEventListener("scroll", this.ocScroll);
  },
  deactivated() {
    let app = document.getElementById("app");
    app.removeEventListener("scroll", this.ocScroll);
    this.loading = true;
  },
  created() {
    let _this = this;
  },
  methods: {
    appMoreorderFn(data) {
      appMoreorder(data).then(res => {
        console.log(res.data);
        this.arr = res.data;
        if (res.data.length < this.pageSize) {
          this.loading = true;
        }
        this.list = this.list.concat(res.data || []);
      });
    },
    orderState(state) {
      switch (state) {
        case 1:
          return "等待付款";

        case 2:
          return "等待确认";

        case 3:
          return "备货中";

        case 4:
          return "已发货";

        case 5:
          return "完成";

        case 6:
          return "已取消";
      }
    },
    appCancalorderFn(item) {
      MessageBox.confirm("确定删除订单吗？")
        .then(active => {
          appCancalorder({ id: item.id }).then(res => {
            if (res.success) {
              this.$message("取消成功");
              item.orderState = 6;
            }
          });
        })
        .catch(err => {});
    },
    appGoodreceiveFn(item) {
      appGoodreceive({ ordersId: item.id }).then(res => {
        this.$message("确定收货成功");
        item.orderState = 5;
        console.log(res);
      });
    },
    loadMore() {
      this.appMoreorderFn({
        pageIndex: ++this.pageIndex,
        pageSize: this.pageSize
      });
    },
    backTop() {
      commular.backTop();
    },
    ocScroll(e) {
      let _this = this;
      let top = app.scrollTop || app.scrollTop;
      if (top) {
        _this.$store.state.homeScroll = top;
      }

      if (top > 300) {
        _this.isbackTop = true;
      } else {
        _this.isbackTop = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  font-size: 28px;
  margin-top: 20px;

  .box {
    padding: 20px;
    border-bottom: 2px solid #dedede;
    .produc-img {
      width: 100px;
    }
    p {
      text-align: right;
      a {
        padding: 0 10px;
      }
    }
  }
}
.back {
  position: fixed;
  right: 40px;
  bottom: 40px;
  padding: 12px 6px;
  color: #fff;
  writing-mode: vertical-rl;
  background: rgba($color: #000000, $alpha: 0.8);
}
</style>