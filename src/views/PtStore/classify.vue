<template>
  <div class="catelist ts" :class="{open:open}">
    <div class="header df">
      <div class="enter df" @click="$emit('close')">
        <i class="iconfont">&#xe6ab;</i>
      </div>
      <span>{{seller.sellerName}}</span>
    </div>
    <div class="box df af">
      <div class="left fs">
        <div class="swiper-container left-nav">
          <div class="swiper-wrapper">
            <div
              :class="['swiper-slide df',{active:index==indexItem}]"
              v-for="(item,index) in navList"
              :key="item.id"
              @click="hanldLeftItem(index)"
            >
              <div class="item to">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-item" v-for="item in child" :key="item.id">
          <h3 @click="RouterChild(sellerid,item.id,item.name)">{{item.name}}</h3>
          <!-- <div class="ej df fw">
            <span class="to" v-for="childItem in item.childs" :key="childItem.id">{{childItem.name}}</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import { cateListJson } from "api";
export default {
  props: ["sellerid", "open"],
  data() {
    return {
      navList: [],
      indexItem: 0,
      child: [],
      seller: {}
    };
  },
  created() {
    this.CateList();
  },
  methods: {
    CateList() {
      cateListJson({ sellerId: this.sellerid }).then(res => {
        console.log(res);
        this.seller = res.data.seller;
        this.navList = res.data.cateList;
        this.$nextTick(() => {
          const h = document.documentElement.clientHeight;
          let swiper = new Swiper(".left-nav", {
            direction: "vertical",
            slidesPerView: h / 50,
            spaceBetween: -2
          });
        });
        this.childrenList(res.data.cateList[0].childs);
      });
    },
    childrenList(data) {
      this.child = data;
    },
    hanldLeftItem(index) {
      this.indexItem = index;
      this.child = this.navList[index].childs;
    },
    RouterChild(sellerid, id, name) {
      this.$router.push(`/PtStore/list/${id}?sellerid=${sellerid}&name=${name}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.catelist {
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99;
  transform: translate(100%);
  &.open {
    transform: translate(0);
  }
  .left {
    .swiper-container {
      height: calc(100vh - 80px);
      background: #f2f2f2;
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
    padding: 0 20px;
    height: calc(100vh - 80px);
    box-sizing: border-box;
    overflow: auto;
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
}
</style>