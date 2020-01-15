<template>
  <div class="search-box df">
    <input type="text" v-model="search" class="search fl" placeholder="搜索" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.search-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  .search {
    background: #F4F5F9;
    height: 60px;
    padding: 0 0 0 80px;
    border-radius: 60px;
  }
}
</style>