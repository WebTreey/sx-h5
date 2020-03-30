<template>
  <div class="header df" :style="options" v-if="$route.meta.title">
    <div class="enter df" @click="$router.goBack()">
      <i class="iconfont">&#xe6ab;</i>
    </div>
    <span>{{$route.meta.title}}</span>
    <i class="iconfont" @click="isnav = !isnav">&#xe6dc;</i>
    <sd-nav :position="style" v-show="isnav"></sd-nav>
  </div>
</template>
<script>
import nav from "./nav";
export default {
  props: ["options", "show"],
  data() {
    return {
      style: {
        top: ".8rem",
        position:'absolute',
        borderTop:0,
        borderBottom:'1px solid #ccc',
        boxShadow:'0 3px 5px 0px rgba(0,0,0,.2)'
      },
      isnav: false
    };
  },
  components: {
    "sd-nav": nav
  },
  watch: {
    $route(to, from) {
      this.isnav = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 80px;
  padding: 0 20px;
  background: #f2f2f2;
  border-bottom: 2px solid #dedede;
  .enter {
    transform: rotate(90deg);
    margin-left: -20px;
    i {
      font-size: 72px;
    }
  }
  i {
    color: #000;
  }
  span {
    flex: 1;
    text-align: center;
  }
}
</style>