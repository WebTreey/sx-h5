<template>
  <div class="addcomplaint">
    <div class="order-box">
      <p>
        <span>订单编号：</span>
        <em>{{order.orderSn}}</em>
      </p>
      <p>
        <span>下单时间：</span>
        <em>{{order.createTime}}</em>
      </p>
      <div class="mt-20">
        <div class="df af pr">
          <div class="cart-product df af">
            <img class="product-img fs" :src="$store.state.BASE_IMG+product.masterImg" />
            <div class="ml-20 df fc af cart-h">
              <h4 class="to-2 fs-28">{{product.name1}}</h4>
              <div class="df jb mt-10">x{{ordersProduct.number}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="df mt-40 af">
        <span class="fs">投诉内容：</span>
        <textarea
          class="textarea"
          rows="3"
          v-model="content"
          placeholder="请输入10-100个字符"
          maxlength="100"
        ></textarea>
      </div>
      <!-- <div class="df mt-40 af">
        <span class="fs">投诉图片：</span>
        <input type="file" name="pic" @change="upLoadFile($event)" />
      </div>-->
      <div class="btn-group mt-40 df">
        <a class="btn fl red-bg" @click="appSavecomplaintFn">提交</a>
        <a class="btn fl red-bg" @click="$router.go(-1)">取消</a>
      </div>
    </div>
  </div>
</template>
<script>
import { appAddcomplaint, appSavecomplaint } from "api";
export default {
  data() {
    return {
      query: this.$route.query,
      order: {},
      product: {},
      ordersProduct: {},
      content: ""
    };
  },
  created() {
    this.appAddcomplaintFn();
  },
  methods: {
    appAddcomplaintFn() {
      appAddcomplaint(this.query).then(res => {
        console.log(res);
        let data = res.data;
        this.order = data.order;
        this.product = data.product;
        this.ordersProduct = data.ordersProduct;
        this.productExchangeId = data.productExchangeId;
      });
    },
    appSavecomplaintFn() {
      // let form = new FormData();
      // form.append('sellerId',this.order.sellerId);
      // form.append('orderProductId',this.ordersProduct.id);
      // form.append('productBackId',this.query.productBackId);
      // form.append('productExchangeId',this.productExchangeId || "");
      // form.append('content',this.content);
      // form.append('orderId',this.order.id);
      // form.append('pic',this.pic);
      if (this.content.length < 10) {
        this.$message("投诉内容不能低于10个字");
        return;
      }
      let data = {
        sellerId: this.order.sellerId,
        orderProductId: this.ordersProduct.id,
        productBackId: this.query.productBackId,
        productExchangeId: this.productExchangeId || "",
        content: this.content,
        orderId: this.order.id
      };
      appSavecomplaint(data).then(res => {
        console.log(res);
      });
    },
    upLoadFile(e) {
      this.pic = e.target.files[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.order-box {
  padding: 20px;
  margin: 20px 0;
  border-top: 2px solid #dedede;

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
  .textarea {
    width: 100%;
  }
}
</style>