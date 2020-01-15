<template>
  <div class="return-goods">
    <div class="goods-box">
      <div class="goods-item" v-for="(item,index) in list" :key="index">
        <div class="df">
          <img v-lazy="$store.state.BASE_IMG+item.productLeadLittle" />
          <div class="ml-20">
            <h3 class="fs-28">{{item.productName}}</h3>
            <div class="fs-24 df jb mt-20">
              <span>
                购买时间：
                <font>{{item.createTime}}</font>
              </span>
              <a class="fs-24 col-red" @click="appCanbackorexchangeFn(item.id)">我要退换货</a>
            </div>
          </div>
        </div>
        <div class="goods-options" v-if="orderItem[item.id]?orderItem[item.id].isopen:false">
          <div class="goods-options-item df">
            <label>服务类型：</label>
            <div class="btn-group">
              <a
                class="btn"
                :class="{red:orderItem[item.id].goodFn==1}"
                @click="goodsTab(item.id,1)"
              >换货</a>
              <a
                class="btn"
                :class="{red:orderItem[item.id].goodFn==2}"
                @click="goodsTab(item.id,2)"
              >退货</a>
            </div>
          </div>
          <div class="goods-options-item df">
            <label>数量：</label>
            <input type="text" :value="orderItem[item.id].count" @input="countFn($event,item.id)" />
          </div>
          <div class="goods-options-item df">
            <label>问题类型：</label>
            <textarea rows="3" v-model="orderItem[item.id].queryType"></textarea>
          </div>
          <div class="goods-options-item df">
            <label></label>
            <a class="btn red" @click="appDoproductexchangeFn(item)">提交</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commular from "@/utils";
let { verifyUtils } = commular;
import {
  appBackapply,
  appCanbackorexchange,
  appDoproductexchange,
  appDoproductback
} from "api";
export default {
  data() {
    return {
      params: this.$route.params,
      order: "",
      list: [],
      orderItem: {},
      maxCount: 0
    };
  },
  created() {
    this.appMorebackFn();
  },
  methods: {
    appMorebackFn() {
      appBackapply({ id: this.params.id }).then(res => {
        this.order = res.data;
        this.list = res.data.orderProductList || [];
        console.log(res);
      });
    },
    appCanbackorexchangeFn(id) {
      appCanbackorexchange({ orderId: this.order.id, orderProductId: id }).then(
        res => {
          console.log(res);
          this.maxCount = res.data;
          if (!this.orderItem[id]) {
            this.$set(this.orderItem, id, {
              isopen: true,
              goodFn: 1,
              count: res.data,
              queryType: ""
            });
          } else {
            this.orderItem[id].isopen = !this.orderItem[id].isopen;
          }
        }
      ); //每点击一次都会执行

      //   if (!this.orderItem[id]) { //只有第一次点击才会执行
      //     appCanbackorexchange({
      //       orderId: this.order.id,
      //       orderProductId: id
      //     }).then(res => {
      //       console.log(res);
      //       this.$set(this.orderItem, id, {
      //         isopen: true,
      //         goodFn: 1,
      //         count: 1,
      //         queryType: ""
      //       });
      //     });
      //   } else {
      //     this.orderItem[id].isopen = !this.orderItem[id].isopen;
      //   }
    },
    goodsTab(id, index) {
      this.orderItem[id].goodFn = index;
    },
    countFn(e, id) {
      this.orderItem[id].count = e.target.value;
      let value = verifyUtils.pureInt(e.target.value);
      value = !value ? 1 : value;
      this.orderItem[id].count = value > this.maxCount ? this.maxCount : value;
    },
    appDoproductexchangeFn(item) {
      const data = {
        orderId: this.order.id,
        orderProductId: item.id,
        sellerId: this.order.sellerId,
        productId: item.productId,
        orderSn: this.order.orderSn,
        sellerName: this.order.sellerName,
        productName: item.productName,
        number: this.orderItem[item.id].count,
        question: this.orderItem[item.id].queryType
      };
      if (this.orderItem[item.id].goodFn == 1) {
        appDoproductexchange(data).then(res => {
          console.log(res);
          this.$message("换货成功");
        });
      } else {
        appDoproductback(data).then(res => {
          console.log(res);
          this.$message("退货成功");
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-item {
  padding: 20px;
  img {
    width: 160px;
  }
  .goods-options {
    background: #edf9e5;
    padding: 20px;
    font-size: 28px;
    margin: 20px 0;
    .goods-options-item {
      padding: 10px 0;
      label {
        width: 140px;
        text-align: justify;
        text-align-last: justify;
        flex-shrink: 0;
      }
      input,
      textarea {
        width: 100%;
        background: #fff;
      }
      textarea {
        border: 2px solid #dedede;
        box-sizing: border-box;
        padding: 10px;
      }
    }
  }
}
</style>