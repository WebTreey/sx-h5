<template>
  <div>
    <div class="tab">
      <ul class="df">
        <li
          v-for="(item,index) in tab"
          :key="index"
          :class="['ts',{curr:tabIndex==index}]"
          @click="tabFn(index)"
        >{{item}}</li>
      </ul>
    </div>
    <div class="main">
     <keep-alive>
         <component :is="currCom"></component>
     </keep-alive>
    </div>
  </div>
</template>
<script>
import ask from "./ask";
import comment from "./comment";
import introduce from "./introduce";
import spec from "./spec";
export default {
  data() {
    return {
      tab: ["详细介绍", "规格参数", "商品评价", "商品咨询"],
      tabIndex: 0,
      currCom: "introduce"
    };
  },
  components: {
    ask,
    comment,
    introduce,
    spec
  },
  created() {
    var tabIndex = this.$route.query.tab;
    this.productId = this.$route.params.id;
    this.tabFn(+tabIndex);
  },
  methods: {
    tabFn(index) {
      this.tabIndex = index;
      switch (index) {
        case 0:
          this.currCom = "introduce";
          break;
        case 1:
          this.currCom = "spec";
          break;
        case 2:
          this.currCom = "comment";
          break;
        case 3:
          this.currCom = "ask";
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tab {
  li {
    box-sizing: border-box;
    height: 84px;
    line-height: 84px;
    flex: 1;
    text-align: center;
    border-right: 2px solid #dedede;
    border-bottom: 2px solid #dedede;
    font-size: 28px;
    &:last-child {
      border-right: 0;
    }
    &.curr {
      border-bottom-color: #f15353;
      color: #f15353;
    }
  }
}
</style>