<template>
  <div class="pro-content">
    <div class="menu">
      <ul>
        <li @click="$router.push('/personalCenter/orderCenter')">我的订单</li>
        <li @click="$router.push('/personalCenter/refund')">我的退货</li>
        <li @click="$router.push('/personalCenter/rechange')">我的换货</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { appMoreorder } from "api";
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.menu {
  ul {
    li {
      border-bottom: 2px solid #dedede;
      padding: 20px;
    }
  }
}
</style>