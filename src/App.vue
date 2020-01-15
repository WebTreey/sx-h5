<template>
  <div id="app">
    <sd-header :title="$store.state.title"></sd-header>

    <transition :name="transitionName">
      <keep-alive include="orderCenter">
        <router-view class="router" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import header from "./components/header.vue";
export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  components: {
    "sd-header": header
  },
  created() {
    window.onpopstate = (e) => {
      this.$router.isBack = true;
    };
  },
  watch: {
    $route(to, from) {
      console.log(this.$router.isBack);
      let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};
</script>
<style >
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  left: 0;
  top: 0;
}
.router {
  position: absolute;
  width: 100%;
  transition: all 0.3s;
}
.slide-left-enter,
 .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>
