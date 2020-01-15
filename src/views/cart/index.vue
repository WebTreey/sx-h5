<template>
  <div class="cart">
    <div class="cart-list" v-if="cartList.length">
      <div class="item" v-for="(item,index) in cartList" :key="index">
        <h3>{{item.seller.sellerName}}</h3>
        <div class="box">
          <div class="df af full">
            <span class="mr-20">满减</span>
            <div v-html="fullSub(item)"></div>
          </div>
          <div class="mt-40" v-for="cart in item.cartList" :key="cart.id">
            <div class="df af pr">
              <div class="mt-50">
                <span
                  :class="['check-icon',cart.checked ? 'icon-2':'icon-1']"
                  @click="cartcheckedFn(cart.id,cart.checked)"
                ></span>
                <!-- <i class="iconfont">{{cart.checked?'&#xe654;':'&#xe6ba;'}}</i> -->
              </div>
              <div
                class="cart-product ml-20 df af"
                @click="$router.push(`/productList/details/${cart.product.id}`)"
              >
                <img class="product-img" :src="$store.state.BASE_IMG+cart.product.masterImg" />
                <div class="ml-10">
                  <h4 class="to-2 fs-28">{{cart.product.name1}}</h4>
                  <div>
                    <p class="col-red mt-10 fs-28">￥{{cart.productGoods.mallMobilePrice || '0.00'}}</p>
                    <div class="mt-10 df jb">
                      <subtractor
                        @countAdd="addCounts"
                        :count="[cart.count,cart.id]"
                        :cart-info="cart"
                      ></subtractor>
                      <i class="iconfont col-999" @click="deleteCartByIdFn(cart.id)">&#xe645;</i>
                    </div>
                    <p class="fs-28 mt-10">(库存{{cart.productGoods.productStock || '0'}}件)</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="subtotal">
              <span>小计¥{{cart.currDiscountedAmount}}</span>
              <span class="pr-20">已省{{cart.currDiscounted}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-data df fc" v-else>
      <i class="iconfont">&#xe6f2;</i>
      <p>购物车是空的，去挑一件中意的商品吧！</p>
      <div class="btn red mt-40" @click="$router.push('/')">去逛逛</div>
    </div>
    <div class="footer df">
      <div class="df jb item-1">
        <div class="df" @click="cartcheckedallFn()">
          <span :class="['check-icon',checkedAll ? 'icon-w2':'icon-w1']"></span>
          <span class="ml-20 db">全选</span>
        </div>
        <div>
          合计
          <font>￥{{cartInfoVO.checkedDiscountedCartAmount}}</font>
        </div>
      </div>
      <div class="df jc item-3" @click="ordercommitFn">去结算({{cartInfoVO.totalCheckedNumber}})</div>
    </div>
  </div>
</template>
<script>
import subtractor from "@/components/subtractor";
import {
  getcartinfoJson,
  deleteCartById,
  updateCartById,
  cartcheckedall,
  cartchecked
} from "api";
export default {
  data() {
    return {
      cartList: [],
      seller: [],
      counts: {},
      checkeds: false,
      checkedAll: true,
      cartInfoVO: {}
    };
  },
  created() {
    this.getcartinfoJsonFn();
  },
  components: {
    subtractor
  },
  methods: {
    getcartinfoJsonFn() {
      getcartinfoJson().then(res => {
        this.checkedAll = true;
        var data = res.data;
        this.cartInfoVO = data.cartInfoVO || {};
        this.cartList = data.cartInfoVO.cartListVOs || [];
        this.cartList.map(item => {
          let arr = item.cartList || [];
          arr.map(item => {
            this.counts[item.id] = item.count;
            if (!item.checked) {
              this.checkedAll = false;
            }
          });
        });
      });
    },
    fullSub(cartListVO) {
      var actFull = cartListVO.actFull || {};
      var html;
      if (cartListVO.orderDiscount) {
        html = `<div>满${actFull.firstFull ? actFull.firstFull : "0.00"}-${
          actFull.firstDiscount ? actFull.firstDiscount : "0.00"
        }
                  &nbsp;&nbsp;满${
                    actFull.secondFull ? actFull.secondFull : "0.00"
                  }-${actFull.secondDiscount ? actFull.secondDiscount : "0.00"}
                  &nbsp;&nbsp;满${
                    actFull.thirdFull ? actFull.thirdFull : "0.00"
                  }-${actFull.thirdDiscount ? actFull.thirdDiscount : "0.00"}
     <p class="mt-10">(已减:${
       cartListVO.orderDiscount ? cartListVO.orderDiscount : "0.00"
     }元)</p>
	              	
     </div>`;
      } else {
        html = `<div>满${actFull.firstFull ? actFull.firstFull : "0.00"}-${
          actFull.firstDiscount ? actFull.firstDiscount : "0.00"
        }
                  &nbsp;&nbsp;满${
                    actFull.secondFull ? actFull.secondFull : "0.00"
                  }-${actFull.secondDiscount ? actFull.secondDiscount : "0.00"}
                  &nbsp;&nbsp;满${
                    actFull.thirdFull ? actFull.thirdFull : "0.00"
                  }-${actFull.thirdDiscount ? actFull.thirdDiscount : "0.00"}
     </div>`;
      }

      return html;
    },
    deleteCartByIdFn(id) {
      deleteCartById({ id }).then(res => {
        if (res.success) {
          this.$message("删除成功");
          this.getcartinfoJsonFn();
        }
      });
    },
    addCounts(cart) {
      this.counts[cart.id] = cart.count;

      this.updateCartByIdFn(cart);
    },
    updateCartByIdFn(cart) {
      updateCartById({ id: cart.id, count: cart.count }).then(res => {
        if (res.success) {
          this.getcartinfoJsonFn();
        }
      });
    },
    cartcheckedallFn() {
      let isCheckedAll = this.checkedAll ? "0" : "1";
      cartcheckedall({ checked: isCheckedAll }).then(res => {
        if (res.success) {
          this.getcartinfoJsonFn();
        }
      });
    },
    cartcheckedFn(id, checkeds) {
      let che = checkeds ? 0 : 1;
      cartchecked({ id, checked: che }).then(res => {
        if (res.success) {
          console.log(res);
          this.getcartinfoJsonFn();
        }
      });
    },
    ordercommitFn() {
      if (this.cartList.length) {
        this.$router.push("/order");
      } else {
        this.$message("购物车没有任何物品");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.cart-list {
  .item {
    h3 {
      background: #dedede;
      padding: 20px;
      font-size: 28px;
    }
    .box {
      padding: 20px;
      .full {
        font-size: 24px;
        span {
          background: #f23030;
          color: #fff;
          padding: 0px 12px;
        }
      }
      .checkbox {
        height: 40px;
        width: 40px;
        border: 2px solid #dedede;
        i.iconfont {
          font-size: 36px;
        }
      }
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
    color: #f15353;
    margin: 20px;
    padding: 20px;
    font-size: 28px;
    border-top: 2px solid #dedede;
  }
}
.no-data {
  i {
    color: #333;
    font-size: 200px;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f2f2f2;
  & > div {
    height: 116px;
    flex: 1;
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
  }
}
.check-icon {
  width: 40px;
  height: 40px;
  display: block;
  opacity: 0.8;
  &.icon-1 {
    background: url("../../assets/images/check.png") no-repeat center;
    background-size: 100%;
  }
  &.icon-2 {
    background: url("../../assets/images/checked.png") no-repeat center;
    background-size: 100%;
  }
  &.icon-w1 {
    background: url("../../assets/images/check-w.png") no-repeat center;
    background-size: 100%;
  }
  &.icon-w2 {
    background: url("../../assets/images/checked-w.png") no-repeat center;
    background-size: 100%;
  }
}
</style>