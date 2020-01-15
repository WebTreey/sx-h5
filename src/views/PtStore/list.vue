<template>
  <div class="catelist-details">
    <div class="tab">
      <ul class="df">
        <li :class="['df jc',{active:tabIndex==0}]" @click="hanldTab(0)">
          <span>默认</span>
        </li>
        <li :class="['df jc',{active:tabIndex==1 || tabIndex==2}]" @click="hanldTab(1)">
          <span>价格</span>
          <div :class="{ro:price,'tr-180':tabIndex==2,ts:true}" v-if="tabIndex==1 || tabIndex==2">
            <i :class="['iconfont']">&#xe6ab;</i>
          </div>
        </li>
        <li :class="['df jc',{active:tabIndex==3}]" @click="hanldTab(3)">
          <span>销量</span>
        </li>
        <li :class="['df jc',{active:tabIndex==5}]" @click="hanldTab(5)">
          <span>发布时间</span>
        </li>
      </ul>
    </div>
    <div
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="item df" v-for="(item,index) in detailsList" :key="index" @click="$router.push(`/productList/details/${item.id}`)">
        <img v-lazy="$store.state.BASE_IMG+item.masterImg" />
        <div class="df fc af jb list-right">
          <p class="to-2">{{item.name1}}</p>
          <div>
            <p class="col-red mb-10">￥{{item.malMobilePrice ? item.malMobilePrice : '0.00'}}</p>
            <p class="fs-24 col-999">
              <span>{{item.productStock ? '有货':'无货'}}</span>
              <em>{{item.commentsNumber}}条评价</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import srceen from "../../components/screen";
import { getChildrenListDetails, storeJsonVisitPath } from "api";
export default {
  data() {
    return {
      tabIndex: 0,
      price: false,
      detailsList: [],
      id: -1,
      isopen: false,
      store: 0,
      brand: "",
      lines: [0, 0, 0, 0],
      loading: false,
      pageIndex: 0
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.$route.meta.title = this.$route.query.name;
    this.sellerId = this.$route.query.sellerid;
    this.lines = [this.sellerId, this.id, 1, 0];
  },
  methods: {
    hanldTab(index) {
      if (this.tabIndex == 1 && index == 1) {
        this.tabIndex = 2;
        this.$set(this.lines, 3, 2);
      } else {
        if (this.tabIndex == index) return;
        this.tabIndex = index;
        this.$set(this.lines, 3, index);
      }
      this.$set(this.lines, 2, 1);
      this.getData(true);
    },
    getData(isTab) {
      storeJsonVisitPath(this.lines.join("-")).then(res => {
        console.log(res)
        if (res.data) {
          if (isTab) {
            this.detailsList = res.data.producListVOs;
          } else {
            this.detailsList = this.detailsList.concat(res.data.producListVOs);
          }
        }
        if (res.total < 20) {
          this.loading = true;
        }
      });
    },

    loadMore() {
      this.$set(this.lines, 2, ++this.pageIndex);
      let id = this.lines.join("-");
      this.getData();
    }
  }
};
</script>
<style lang="scss" scoped>
.tab {
  ul {
    height: 80px;
    text-align: center;
    font-size: 28px;
    color: #999;
    border-bottom: 2px solid #dedede;
    li {
      flex: 1 0;
      border-right: 2px solid #dedede;
      i {
        color: inherit;
      }
      &:last-child {
        border: 0;
      }
      &.active {
        color: #f15353;
      }
      .ro {
        transform: rotate(180deg);
      }
      .ro-2 {
        transform: rotate(-90deg);
      }
    }
  }
}
.list {
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