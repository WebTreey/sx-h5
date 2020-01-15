<template>
  <div class="pages">
    <h2 :class="[this.query.state == 0? 'col-green' : 'col-red','title']">{{text}}</h2>
    <p class="mt-40" v-if="this.query.state == -1">{{time}}后自动跳转到订单页面</p>
    <div class="mt-40 btn-group" v-if="this.query.state != -1">
      <a
        class="btn"
        @click="$router.replace(`/personalCenter/orderCenter/details/${query.id}`);"
      >查看订单</a>
      <a class="btn" @click="$router.replace('/')">继续购物</a>
    </div>
  </div>
</template>
<script>
import commular from "@/utils";
export default {
  data() {
    return {
      query: this.$route.query,
      text: "",
      time: 5
    };
  },
  created() {
    switch (+this.query.state) {
      case 0:
        this.text = "支付成功";
        break;
      case -1:
        this.text = "支付取消";
        break;
      case -2:
        this.text = "支付失败";
        break;
    }

    if (+this.query.state == -1) {
      this.timeDown();
    }
  },
  methods: {
    timeDown() {
      if (this.time == 0) {
        this.$router.replace(`/personalCenter/orderCenter/details/${this.query.id}`);
      }
      if (this.time > 0) {
        window.setTimeout(() => {
          this.time--;
          commular.timeDown(this.time);
          this.timeDown();
        }, 1000);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.pages {
  padding: 40px;
  text-align: center;
  .title {
    margin-bottom: 40px;
  }
  p {
    padding: 10px;
    background: #f1f1f1;
  }
}
</style>