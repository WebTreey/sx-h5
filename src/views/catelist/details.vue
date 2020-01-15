<template>
  <div class="catelist-details">
    <div class="tab">
      <ul class="df">
        <li :class="['df jc',{active:tabIndex==0}]" @click="hanldTab(0)">
          <span>默认</span>
        </li>
        <li :class="['df jc',{active:tabIndex==1}]" @click="hanldTab(1)">
          <span>价格</span>
          <div :class="{ro:price}" v-if="tabIndex==1">
            <i class="iconfont">&#xe6ab;</i>
          </div>
        </li>
        <li :class="['df jc',{active:tabIndex==2}]" @click="hanldTab(2)">
          <span>销量</span>
        </li>
        <li :class="['df jc',{active:tabIndex==3}]" @click="hanldTab(3)">
          <span>评论</span>
        </li>
        <li :class="['df jc',{active:tabIndex==4}]" @click="open(4)">
          <span>筛选</span>
          <div class="to-2 tr-90">
            <i class="iconfont">&#xe6af;</i>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div
        class="item df"
        v-for="(item,index) in detailsList"
        :key="index"
        @click="$router.push(`/productList/details/${item.id}`)"
      >
        <img v-lazy="$store.state.BASE_IMG+item.masterImg" />
        <div class="df fc af jb list-right">
          <p class="to-2">{{item.name1}}</p>
          <div>
            <p class="col-red mb-10">￥{{item.malMobilePrice ? item.malMobilePrice : '0.00'}}</p>
            <p class="fs-24">
              <span>{{item.productStock ? '有货':'无货'}}</span>
              <em>{{item.commentsNumber}}条评价</em>
            </p>
          </div>
        </div>
      </div>
      <div v-show="loading" class="mt-20 mb-20 tc col-999">-- 没有更多数据 --</div>
    </div>
    <srceen
      class="ts"
      :lines="lines"
      :open="isopen"
      :parid="this.id"
      @close="openClose"
      @clearData="clear"
    ></srceen>
  </div>
</template>
<script>
import srceen from "@/components/screen";
import { getChildrenListDetails } from "api";
import commaler from "@/utils";
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
      lines: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      strLine: "",
      loading: false,
      pageIndex: 0
    };
  },
  components: {
    srceen
  },
  created() {
    this.id = this.$route.params.id;
    this.$route.meta.title = this.$route.query.name;
    this.$set(this.lines, 1, this.id);
    // this.getData(this.lines.join("-"));
  },
  methods: {
    hanldTab(index) {
      this.sort = 0;
      if (index == 1 && this.tabIndex == index) {
        this.price = !this.price;
        if (this.price) {
          this.sort = 4;
        } else {
          this.sort = 3;
        }
      } else {
        this.price = false;
        this.sort = 3;
      }
      switch (index) {
        case 0:
          this.sort = 0;
          break;
        case 2:
          this.sort = 1;
          break;
        case 3:
          this.sort = 2;
          break;
      }

      if (index != 1 && this.tabIndex == index) return;
      this.$set(this.lines, 3, this.sort);
      this.$set(this.lines, 2, 0);
      this.getData(this.lines.join("-") + this.strLine);
      this.tabIndex = index;
    },
    getData(id) {
      getChildrenListDetails({ id }).then(res => {
      
        if (res.success) {
          this.detailsList = res.data;
        }
      });
    },
    open(index) {
      this.tabIndex = index;
      this.isopen = true;
    },
    openClose(value, type) {
      if (!type) {
        this.isopen = value;
      } else if (type == 1) {
        if (value["type"] == 0) {
          this.brand = value["value"];
          this.$set(this.lines, 6, this.brand);
          this.$set(this.lines, 2, 0);
        } else {
          var reg = new RegExp(`(-${value.type}_)` + `(\\d)`);
          let isReg = reg.test(this.strLine);
          if (value.value) {
            if (isReg) {
              this.strLine = this.strLine.replace(
                reg,
                "$1" + value["value"].split("_")[1]
              );
            } else {
              this.strLine = `${this.strLine}-${value["value"]}`;
            }
          } else {
            this.strLine = this.strLine.replace(reg, "");
          }
        }
        this.getData(this.lines.join("-") + this.strLine);
      } else if (type == 2) {
        this.lines = value;
        this.$set(this.lines, 2, 0);
        this.getData(this.lines.join("-") + this.strLine);
      }

      this.isopen = false;
    },
    clear() {
      this.strLine = "";
      this.isopen = false;
      this.$set(this.lines, 4, 0);
      this.$set(this.lines, 5, 0);
      this.$set(this.lines, 6, 0);
      this.getData(this.lines.join("-"));
    },
    loadMore() {
      this.$set(this.lines, 2, ++this.pageIndex);
      let id = this.lines.join("-") + this.strLine;
      getChildrenListDetails({ id }).then(res => {
        if (res.data) {
          this.detailsList = this.detailsList.concat(res.data);
        }
        if (res.total < 20) {
          this.loading = true;
        }
      });
    },
    storage() {
      commaler.localStorage.set("lines", JSON.stringify(this.lines));
      commaler.localStorage.set("strLine", this.strLine);
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
      height: 40px;
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