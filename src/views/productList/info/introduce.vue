<template>
  <div v-html="content" class="product-img"></div>
</template>
<script>
import { productInfo } from "api";
export default {
  data() {
    return {
      content: ""
    };
  },
  created() {
    this.productInfoFn({ productId: this.$route.params.id });
  },
  methods: {
    productInfoFn(data) {
      productInfo(data).then(res => {
        console.log(res);
        if (res.success) {
          this.content = res.data.product.description;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  .gomeImgLoad {
    width: 100%;
  }
}
</style>