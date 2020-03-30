<template>
  <div class="nav" :style="position">
    <ul class="df">
      <li class="df fc" @click="$router.push('/')">
        <i class="iconfont">&#xe6c4;</i>
        <span>首页</span>
      </li>
      <li class="df fc" @click="$router.push('/catelist')">
        <i class="iconfont">&#xe6dc;</i>
        <span>分类</span>
      </li>
      <li class="df fc" @click="$router.push('/cart')">
        <i class="iconfont">&#xe6c2;</i>
        <span>购物车</span>
      </li>
      <li class="df fc" @click="$router.push('/personalCenter')">
        <i class="iconfont">&#xe6a5;</i>
        <span>我的</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    props:['position'],
    created(){
        
    }
}
</script>
<style lang="scss" scoped>
.nav {
  height: 120px;
  background: #f5f5f5;
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 0;
  z-index: 9;
  border-top:1Px solid #ccc;
  ul {
    height: inherit;
    li {
      flex: 1;
      color: #333;
      .iconfont{
        color: #333;
      }
    }
  }
}
</style>
