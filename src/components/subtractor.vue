<template>
  <div class="sub df">
    <label @click="countAdd">-</label>
    <input type="text" v-model="countValue" />
    <label @click="countRemove">+</label>
  </div>
</template>
<script>
export default {
  props: ["cartInfo"],
  data() {
    return {
      countValue: 1
    };
  },
  created() {
    if (this.cartInfo) {
      this.countValue = this.cartInfo.count || 1;
    }
  },
  methods: {
    countAdd() {
      if (this.countValue > 1) {
        if (this.cartInfo) {
          this.countValue = this.cartInfo.count - 1;
          this.cartInfo.count--;
          this.$emit("countAdd", this.cartInfo);
        } else {
          this.countValue = this.countValue - 1;
          this.$emit("countAdd", this.countValue);
        }
      } else {
        this.$message("只有一个宝贝啦，不能再少了");
      }
    },
    countRemove() {
      if (this.cartInfo) {
        this.countValue = this.cartInfo.count + 1;
        this.cartInfo.count++;
        this.$emit("countAdd", this.cartInfo);
      } else {
        this.countValue = this.countValue + 1;
        this.$emit("countAdd", this.countValue);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.sub {
  input {
    width: 100px;
    border: 2px solid #dedede;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    margin-right: 10px;
    border-radius: 10px;
    text-align: center;
  }
  label {
    height: 50px;
    line-height: 40px;
    width: 50px;
    text-align: center;
    background: #f2f2f2;
    margin-right: 10px;
    border-radius: 10px;
    font-size: 48px;
  }
}
</style>