<template>
  <div class="catelist">
    <div class="box df af">
      <div class="left fs">
        <div class="swiper-container left-nav">
          <div class="swiper-wrapper">
            <div
              :class="['swiper-slide df',{active:index==indexItem}]"
              v-for="(item,index) in navList"
              :key="item.id"
              @click="hanldLeftItem(index,item.id)"
            >
              <div class="item to">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div v-if="child.length">
          <div class="right-item" v-for="item in child" :key="item.id">
            <h3>{{item.name}}</h3>
            <div class="ej df fw">
              <span
                class="to"
                v-for="childItem in item.childs"
                :key="childItem.id"
                @click="RouterChild(childItem.id,childItem.name)"
              >{{childItem.name}}</span>
            </div>
          </div>
        </div>
        <div v-else>暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import { getCateList, getChildrenList } from "api";
export default {
  data() {
    return {
      navList: [],
      indexItem: 0,
      child: []
    };
  },
  created() {
    this.CateList();
  },
  methods: {
    CateList() {
      getCateList().then(res => {
        this.navList = res.data;
        this.$nextTick(() => {
          const h = document.documentElement.clientHeight;
          let swiper = new Swiper(".left-nav", {
            direction: "vertical",
            slidesPerView: h / 50,
            spaceBetween: -1,
            preventClicks: true
          });
        });
        this.childrenList(res.data[0].id);
      });
    },
    childrenList(url) {
      getChildrenList({ id: url }).then(res => {
        if (res.success) {
          this.child = res.data;
        }
      });
    },
    hanldLeftItem(index, id, name) {
      this.indexItem = index;
      this.childrenList(id);
    },
    RouterChild(id, name) {
      this.$router.push(`catelist/details/${id}?name=${name}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.catelist {
  box-sizing: border-box;
  height: calc(100% - 82px);
  overflow: hidden;
  .left {
    .swiper-container {
      height: calc(100vh - 82px);
    }
    width: 180px;
    .swiper-slide {
      background: #f2f2f2;
      border-top: 2px solid #dededd;
      border-bottom: 2px solid #dededd;
      box-sizing: border-box;
      padding: 0 10px;
      &.active {
        color: #f15353;
        background: #fff;
      }
      &:first-child {
        border: 0;
      }
    }
  }
  .right {
    padding: 20px;
    height: calc(100vh - 82px);
    box-sizing: border-box;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    h3 {
      color: #888;
      font-size: 28px;
      margin: 20px 0;
    }
    .ej {
      span {
        width: 33.33%;
        flex-shrink: 0;
        display: block;
        padding: 10px;
        font-size: 28px;
        box-sizing: border-box;
      }
    }
  }
}
</style>