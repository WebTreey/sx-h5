<template>
  <div>
    <div class="search">
      <div class="df">
        <div class="enter df" @click="$router.go(-1)">
          <i class="iconfont">&#xe6ab;</i>
        </div>
        <div class="search-content">
          <input type="text" v-model="searchValue" placeholder="请输入内容" @blur="searchJsonFn" />
          <i class="iconfont pa" @click="searchJsonFn">&#xe6a3;</i>
        </div>
      </div>
    </div>
    <div class="list">
      <div
        class="scroll"
        v-infinite-scroll="scrollAdd"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <div
          class="item df"
          v-for="item in searchList"
          :key="item.id"
          @click="$router.push(`/productList/details/${item.id}`)"
        >
          <img v-lazy="$store.state.BASE_IMG+item.masterImg" />
          <div class="df fc af jb list-right">
            <p class="to-2" v-html="item.name1"></p>
            <div>
              <p class="col-red mb-10">￥{{item.malMobilePrice ? item.malMobilePrice : '0.00'}}</p>
              <p class="fs-24">
                <span>{{item.productStock ? '有货':'无货'}}</span>
                <em>{{item.commentsNumber}}条评价</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { searchJson } from "api";
export default {
  data() {
    return {
      searchValue: "",
      pageIndex: 1,
      searchList: [],
      loading: false
    };
  },
  methods: {
    searchJsonFn() {
      if (this.searchValue) {
        searchJson({ keyword: this.searchValue, pageNum: 1 }).then(res => {
          this.searchList = res.rows;
          if (res.total < 20) {
            this.loading = true;
          }
          console.log(res);
        });
      }
    },
    scrollAdd() {
      if (this.searchValue) {
        searchJson({
          keyword: this.searchValue,
          pageNum: ++this.pageIndex
        }).then(res => {
          console.log(res);
          this.searchList = this.searchList.concat(res.rows);
          if (res.total < 20) {
            this.loading = true;
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.search {
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
  span {
    flex: 1;
    text-align: center;
  }
  .search-content {
    flex: 1;
    position: relative;
    input {
      height: 68px;
      box-sizing: border-box;
      padding: 0 10px;
      width: 100%;
      border-radius: 10px;
      background: #fff;
      border: 2px solid #dedede;
    }
    i.iconfont {
      right: 20px;
      top: 10px;
      z-index: 9;
    }
  }
}
.list {
  .scroll {
    height: calc(100vh - 90px);
    overflow: auto;
    touch-action: auto;
  }
  .item {
    padding: 20px;
    box-sizing: border-box;
    font-size: 28px;
    border-bottom: 2px solid #dedede;
    .list-right {
      height: 200px;
      margin-left: 20px;
    }
    p {
      font-size: 28px;
    }
    img:first-child {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
    }
  }
}
</style>