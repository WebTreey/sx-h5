<template>
  <div>
    <div class="banner">
      <div class="swiper-container store-banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in bannerList" :key="index">
            <img :src="$store.state.BASE_IMG+item.image" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="seller-info">
      <div class="df jb mr-20 ml-10">
        <h3 class="df">
          <i class="iconfont">&#xe6c4;</i>
          <span>{{seller.sellerName}}</span>
        </h3>
        <div class="btn-groupt df jc">
          <div class="btn red" @click="openClassifyFn">店铺分类</div>
          <div
            class="btn red"
            @click="collectionShopFn"
            v-show="this.storeList.collected=='false'"
          >收藏店铺</div>
          <div
            class="btn red"
            @click="collectionShopFn"
            v-show="this.storeList.collected=='true'"
          >取消收藏</div>
        </div>
      </div>
      <div class="mr-20 ml-20 content">
        <p class="df jb">
          <span>
            商品评分：
            <font>{{seller.scoreDescription}}</font>
          </span>
          <span>
            服务态度：
            <font>{{seller.scoreService}}</font>
          </span>
        </p>
        <p class="df jb">
          <span>
            物流速度：
            <font>{{seller.scoreDeliverGoods}}</font>
          </span>
          <span>
            关注：
            <font>{{seller.collectionNumber}}</font>
          </span>
        </p>
      </div>
    </div>
    <div class="home-list">
      <div class="mt-20" v-for="item in floorList" :key="item.id">
        <h3 class="home-title df jc">
          <span></span>
          <p>{{item.name}}</p>
          <span></span>
        </h3>
        <ul class="df">
          <li v-for="(datas,index) in item.datas" :key="index">
            <div
              class="list-item"
              @click="$router.push(`/productList/details/${datas.product.id}`)"
            >
              <img v-lazy="$store.state.BASE_IMG+datas.product.masterImg" />
              <div>
                <p class="to-2 title">{{datas.product.name1}}</p>
                <p class="money">￥{{datas.product.malMobilePrice || '0.00'}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <classify :sellerid="this.$route.params.id" :open="openClassify" @close="openClassify=false"></classify>
  </div>
</template>
<script>
import Swiper from "swiper";
import { storeSeller, cancelCollectionShop, collectionShop } from "api";
import classify from "./classify";

export default {
  data() {
    return {
      storeList: [],
      bannerList: [],
      seller: {},
      floorList: {},
      openClassify: false
    };
  },
  created() {
    let id = this.$route.params.id;
    this.storeSellerFn(id);
  },
  components: {
    classify
  },
  methods: {
    storeSellerFn(sellerId) {
      storeSeller({ sellerId }).then(res => {
        console.log(res);
        let data = (this.storeList = res.data);
        this.bannerList = data.banners;
        this.seller = data.seller;
        this.floorList = data.floors;
        this.$nextTick(() => {
          let swiper = new Swiper(".store-banner", {
            loop: true,
            slidesPerView: "auto",
            autoplay: 3000,
            pagination: ".swiper-pagination"
          });
        });
      });
    },
    openClassifyFn() {
      this.openClassify = true;
    },
    collectionShopFn() {
      if (this.storeList.collected == "true") {
        cancelCollectionShop({ sellerId: this.seller.id }).then(res => {
          if (res.success) {
            this.$message("已取消收藏");
            this.storeList.collected = "false";
          }
        });
      } else {
        collectionShop({ sellerId: this.seller.id }).then(res => {
          if (res.success) {
            this.$message("收藏成功");
            this.storeList.collected = "true";
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.banner {
  .swiper-slide {
    img {
      width: 100%;
    }
  }
}
.seller-info {
  margin-top: 40px;
  h3 {
    font-size: 28px;
  }
  .content {
    margin-top: 20px;
    p {
      line-height: 48px;
      font-size: 28px;
      color: #999;
      font {
        color: #ef3561;
      }
    }
  }
  .btn-groupt {
    .btn {
      margin: 0 20px;
    }
  }
}
.home-list {
  margin: 0 10px;
  margin-top: 20px;
  .home-title {
    font-size: 28px;
    padding: 35px 0;
    p {
      padding: 0 14px;
    }
    span {
      position: relative;
      width: 12%;
      height: 2px;
      background: #dcdcdc;
    }
    span:first-child::after {
      content: "";
      position: absolute;
      right: 0;
      top: -2px;
      width: 6px;
      height: 6px;
      border-radius: 100%;
      background: #dcdcdc;
    }
    span:last-child::before {
      content: "";
      position: absolute;
      left: 0;
      top: -2px;
      width: 6px;
      height: 6px;
      border-radius: 100%;
      background: #dcdcdc;
    }
  }
  ul {
    flex-wrap: wrap;
  }
  li {
    flex-shrink: 0;
    width: 50%;
    padding: 10px;
    box-sizing: border-box;
    .list-item {
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
    }
    img {
      width: 100%;
    }
    & > div {
      p.title {
        font-size: 26px;
        height: 70px;
        padding: 0 10px;
        margin-top: 10px;
      }
      .money {
        color: red;
        padding: 10px;
      }
    }
  }
}
</style>