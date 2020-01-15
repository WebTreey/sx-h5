<template>
  <div class="home">
    <div class="header df">
      <div class="search df fl" @click="$router.push('/search')">
        <img src="../assets/images/search.png" class="search-icon" />
        <span class="ml-10">搜索</span>
      </div>
      <div class="login">{{loginText}}</div>
    </div>
    <div class="main">
      <div class="swiper-container banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in bannerList" :key="index">
            <a href="javascript:;">
              <img :src="$store.state.BASE_IMG+item.image" />
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="box main-menu df jb">
        <div class="df fc" @click="$router.push('/catelist')">
          <div class="menu-item icon-1 df jc bg-red">
            <i class="iconfont">&#xe6dc;</i>
          </div>
          <p class="to">分类查询</p>
        </div>
        <div class="df fc" @click="$router.push('/cart')">
          <div class="menu-item icon-2 df jc bg-green">
            <i class="iconfont">&#xe6c2;</i>
          </div>
          <p class="to">购物车</p>
        </div>
        <div class="df fc" @click="$router.push('/personalCenter')">
          <div class="menu-item icon-2 df jc bg-blue">
            <i class="iconfont">&#xe6dd;</i>
          </div>
          <p class="to">会员中心</p>
        </div>
        <div class="df fc">
          <div class="menu-item icon-2 df jc bg-red">
            <i class="iconfont">&#xe703;</i>
          </div>
          <p class="to">特卖场</p>
        </div>
        <div class="df fc">
          <div class="menu-item icon-2 df jc bg-orange">
            <i class="iconfont">&#xe6cc;</i>
          </div>
          <p class="to">优券集市</p>
        </div>
        <div class="df fc">
          <div class="menu-item icon-2 df jc bg-blue">
            <i class="iconfont">&#xe701;</i>
          </div>
          <p class="to">拼多多</p>
        </div>
        <div class="df fc">
          <div class="menu-item icon-2 df jc bg-red">
            <i class="iconfont">&#xe6fd;</i>
          </div>
          <p class="to">积分商城</p>
        </div>
        <div class="df fc">
          <div class="menu-item icon-2 df jc bg-violet">
            <i class="iconfont">&#xe6f2;</i>
          </div>
          <p class="to">团购</p>
        </div>
      </div>
      <div class="box mt-20 recomment">
        <div class="title df">
          <i class="iconfont col-red">&#xe6d8;</i>
          <span class="ml-10 fl">多惠部落</span>
          <!-- <em class="fs-24 col-666">更多优惠 ></em> -->
        </div>
        <div>
          <div class="swiper-container recomment-list">
            <div class="swiper-wrapper mt-20">
              <div class="swiper-slide" v-for="(item,index) in recommentList" :key="index">
                <div
                  class="pr item"
                  @click="$router.push(`/productList/details/${item.productId}`)"
                >
                  <div class="badge pa df fc fs-24 jc">
                    <span>省</span>
                    <p>{{item.discount}}</p>
                  </div>
                  <img v-lazy="$store.state.BASE_IMG+item.product.masterImg" />
                  <p class="to-2 fs-24 mt-10">{{item.product.name1}}</p>
                  <div class="money mt-10">￥{{item.product.malMobilePrice}}</div>
                </div>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <div class="home-list">
        <div class="mt-20" v-for="item in floorList" :key="item.productId">
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
      <div class="footer">
        <div class="fs-24">
          <p>Copyright©2018 京ICP备15046458号-1</p>
          <p></p>
        </div>
      </div>
    </div>
    <sd-nav></sd-nav>
  </div>
</template>
<script>
import Swiper from "swiper";
import { getBanner, getRecommend, getfloor } from "api";
import commault from "../utils";
export default {
  data() {
    return {
      bannerList: [],
      recommentList: [],
      floorList: [],
      loginText: this.$store.state.userInfo.name || "登录"
    };
  },
  mounted() {
    var _this = this;
    
    if (commault.isIphone()) {
      this.$bridge.callhandler("getUserKey", {}, function(data) {
        _this.$store.state.userInfo =
          typeof data == "string" ? JSON.parse(data) : data;
        _this.loginText = _this.$store.state.userInfo.name;
        _this.bannerData();
        _this.recommentData();
        _this.floorData();
      });
    } else {
      this.times = setTimeout(() => {
        this.bannerData();
        this.recommentData();
        this.floorData();
      }, 30);
    }
  },
  methods: {
    bannerData() {
      getBanner().then(res => {
        if (res.success) {
          this.bannerList = res.data;
          this.$nextTick(() => {
            var swiper = new Swiper(".banner", {
              loop: true,
              slidesPerView: "auto",
              observer: true,
              observeParents: true,
              autoplay: {
                disableOnInteraction: false,
                delay: 3000
              },
              pagination: {
                el: ".swiper-pagination",
                clickable: true
              }
            });
          });
        }
      });
    },
    recommentData() {
      getRecommend().then(res => {
        if (res.success) {
          this.recommentList = res.data;
          this.$nextTick(() => {
            var swiper = new Swiper(".recomment-list", {
              slidesPerView: 2.3,
              spaceBetween: 10,
              observer: true,
              observeParents: true
            });
          });
        }
      });
    },
    floorData() {
      getfloor().then(res => {
        if (res.success) {
          this.floorList = res.data;
        }
      });
    },
    backTop() {
      commault.backTop();
    }
  },
  destroyed() {
    this.times = null;
  }
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  background: #fff;
  height: 80px;
  .search {
    background: #f4f5f9;
    height: 60px;
    line-height: 60px;
    padding: 0 0 0 30px;
    border-radius: 60px;
    font-size: 24px;
    margin-left: 10px;
    .search-icon {
      width: 35px;
    }
  }
  .login {
    margin: 0 10px;
  }
}
.main {
  padding-top: 80px;
  .box {
    box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.2);
    padding: 20px;
  }

  .swiper-container {
    &.banner {
      height: 360px;
    }
    .swiper-slide {
      transition: 300ms;
      img {
        width: 100%;
      }
    }
  }
  .main-menu {
    padding: 20px 0;
    font-size: 28px;
    background: #fff;
    flex-wrap: wrap;
    & > div {
      width: 25%;
      margin: 10px 0;
      .menu-item {
        width: 80px;
        height: 80px;
        border-radius: 25px;
        .iconfont {
          color: #fff;
        }
      }
    }
    img {
      width: 80px;
      border-radius: 5px;
      overflow: hidden;
    }
    p {
      margin-top: 10px;
    }
  }
  .recomment-list {
    .badge {
      right: 10px;
      top: 10px;
      height: 76px;
      width: 76px !important;
      color: #fff;
      background: url("http://172.16.0.113:8083/resources/h5/img/pricespread.png")
        no-repeat;
      background-size: 100%;
      line-height: 28px;
    }
    .money {
      color: #ed5657;
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
}
.footer {
  text-align: center;
  padding-bottom: 130px;
  color: #848689;
  font-size: 28px;
  div:first-child {
    margin-bottom: 20px;
    span {
      border-right: 1px solid #dedede;
      height: 60px;
      line-height: 60px;
      display: block;
      flex: 1;
      &:last-child {
        border: 0;
      }
    }
  }
}
</style>