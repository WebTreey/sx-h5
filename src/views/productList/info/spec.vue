<template>
  <div class="spec">
    <table class="spec-table">
      <tr v-for="(item) in content" :key="item.id">
        <td>{{item.name}}</td>
        <td>{{item.value}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { productSpec } from "api";
export default {
  data() {
    return {
      content: []
    };
  },
  created() {
    this.productSpec({ productId: this.$route.params.id });
  },
  methods: {
    productSpec(data) {
      productSpec(data).then(res => {
        console.log(res);
        if (res.success) {
          this.content = res.data.productAttr;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.spec-table {
  width: calc(100% - 40px);
  margin: 20px;
  box-sizing: border-box;
  border-collapse: collapse;
  td {
    border: 2px solid #dedede;
    padding: 20px;
    width: 50%;
  }
}
</style>