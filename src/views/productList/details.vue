<template>
  <div class="prod">
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in bannerList" :key="index">
            <img :src="$store.state.BASE_IMG+item" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="df seckil-time" v-if="timeData">
        <div class="bannerInfo">
          <p class="first">
            <em>￥</em>
            <span>{{product.malMobilePrice?product.malMobilePrice:'0.00'}}</span>
          </p>
          <p class="last">
            <em>特写易卖</em>
            <span>￥{{product.marketPrice}}</span>
          </p>
        </div>
        <div class="times df fc jc">
          <p>距结束还剩:</p>
          <div class="tm df">
            <span>{{day}}</span>
            <em>:</em>
            <span>{{hours}}</span>
            <em>:</em>
            <span>{{minutes}}</span>
            <em>:</em>
            <span>{{seconds}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="po-title">
        <h3 class>{{product.name1}}</h3>
        <p class="col-red">{{product.name2}}</p>
        <p v-if="!timeData" class="col-red mt-20 fs-48">￥{{product.malMobilePrice}}</p>
      </div>
      <div class="discount-box" v-if="couponList.length">
        <p class="df jb col-999 fs-28">
          <span>领卷</span>
          <span>供{{couponList.length}}张</span>
        </p>
        <ul class="df fw jb list">
          <li v-for="item in couponList" :key="item.id" @click="reveivecouponFn(item.id)">
            <div class="item">
              <div class="df jb top">
                <p>
                  <em>￥</em>
                  <span>{{item.couponValue}}</span>
                </p>
                <p>领</p>
              </div>
              <div class="bottom df jb">
                <p>满{{item.minAmount}}元可用</p>
                <p>取</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="discount-box" v-if="Object.keys(actSingle).length">
        <div class="reduce">
          <p>
            <em>立减</em>
            <span>下单即享{{actSingle.discount}}元优惠</span>
          </p>
          <p>
            <em>满减</em>
            <span v-html="reduce"></span>
          </p>
        </div>
      </div>
      <div class="discount-box">
        <div class="count-info">
          <div class="item df" v-if="norms.length">
            <span class="left">已选：</span>
            <div class="right df">
              <em class="fl" v-for="(item,index) in selected" :key="index">{{item}}</em>
              <em>{{countValue}}</em>
            </div>
          </div>
          <div class="item df af size" v-for="(item,index) in norms" :key="index">
            <span class="left">{{item.name}}：</span>
            <div class="right df" :id=" 's'+index">
              <span
                v-for="attrList in item.attrList"
                :key="attrList.id"
                :id="attrList.id"
                @click="normsSecelt($event,'s'+index)"
              >{{attrList.name}}</span>
            </div>
          </div>
          <div class="item df count">
            <span class="left">数量：</span>
            <div class="right df">
              <subtractor @countAdd="countAddFn"></subtractor>
              <div>(库存{{goods.productStock}}件)</div>
            </div>
          </div>
        </div>
      </div>
      <div class="discount-box df jb">
        <div class="address">
          <p>
            送至
            <span class="col-3 ml-10" @click="isopen=true">{{this.address}}</span>
          </p>
          <p v-html="transportFn"></p>
        </div>
        <i class="iconfont tr-90" style="color:#333">&#xe6af;</i>
        <div class="picker-open" v-show="isopen">
          <mt-picker
            :slots="provinceList"
            value-key="regionName"
            style="background:#fff"
            @change="onPickerChange"
            :showToolbar="true"
          >
            <div class="df jb btn-grounp">
              <div class="btn" @click="isopen=false">取消</div>
              <p class="fs-24">{{cityName}}</p>
              <div class="btn" @click="userTrue">确定</div>
            </div>
          </mt-picker>
        </div>
      </div>
      <div class="discount-box" v-show="money">
        <h3 class="fs-28">
          <span>运费</span>
          <span>{{money || 0}}元</span>
        </h3>
      </div>
      <div class="discount-box">
        <h3
          class="df jb fs-28"
          @click="$router.push(`/productList/details/info/${productInfo.productId}?tab=0`)"
        >
          <span>详情介绍</span>
          <i class="iconfont tr-90" style="color:#333">&#xe6af;</i>
        </h3>
      </div>
      <div class="discount-box">
        <h3
          class="df jb fs-28"
          @click="$router.push(`/productList/details/info/${productInfo.productId}?tab=1`)"
        >
          <span>规格参数</span>
          <i class="iconfont tr-90" style="color:#333">&#xe6af;</i>
        </h3>
      </div>
      <div
        class="discount-box"
        @click="$router.push(`/productList/details/info/${productInfo.productId}?tab=2`)"
      >
        <div class="df jb fs-28">
          <span>
            商品评价
            <font class="col-red pl-10">{{statisticsVO.productCommentsHighProportion || 0}}%</font>好评
          </span>
          <span class="fl tr mr-10">{{statisticsVO.productCommentsAllCount || 0}} 评价人</span>
          <i class="iconfont tr-90" style="color:#333">&#xe6af;</i>
        </div>
      </div>
      <div class="discount-box">
        <div
          class="df jb fs-28"
          @click="$router.push(`/productList/details/info/${productInfo.productId}?tab=3`)"
        >
          <span>
            商品咨询
            <font class="col-red pl-10">{{statisticsVO.productAskCount || 0}}%</font>好评
          </span>
          <i class="iconfont tr-90" style="color:#333">&#xe6af;</i>
        </div>
      </div>
      <div class="seller-info">
        <h3 class="df mr-20 ml-10">
          <i class="iconfont">&#xe6c4;</i>
          <span>{{seller.sellerName}}</span>
        </h3>
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
        <div class="btn-groupt df jc">
          <div class="btn red" @click="$router.push(`/store/${seller.id}`)">进入店铺</div>
          <div
            class="btn red"
            @click="collectionShopFn"
            v-show="!this.statisticsVO.collectedShop"
          >收藏店铺</div>
          <div
            class="btn red"
            @click="collectionShopFn"
            v-show="this.statisticsVO.collectedShop"
          >取消收藏</div>
        </div>
      </div>
    </div>
    <div class="footer df">
      <div class="df jb item-1">
        <div class="df fc" @click="collectionProductFn" v-show="!statisticsVO.collectedProduct">
          <i class="iconfont">&#xe6b5;</i>
          <span>关注</span>
        </div>
        <div class="df fc" @click="collectionProductFn" v-show="statisticsVO.collectedProduct">
          <i class="iconfont curr">&#xe6b5;</i>
          <span>取消</span>
        </div>
        <div class="df fc" @click="$router.push('/cart')">
          <em>{{cartNumber}}</em>
          <i class="iconfont">&#xe6c2;</i>
          <span>购物车</span>
        </div>
      </div>
      <div class="df jc item-2" @click="addCart">
        <span>加入购物车</span>
      </div>
      <div class="df jc item-3" @click="timelySubmit">立即购买</div>
    </div>
  </div>
</template>
<script>
import {
  getProduct,
  getproductactinfo,
  getproductflashinfo,
  getTransportPrice,
  getSpecialEndTime,
  addtocart,
  reveivecoupon,
  collectionProduct,
  cancelCollectionProduct,
  collectionShop,
  cancelCollectionShop,
  getGoodsInfo
} from "api";
import Swiper from "swiper";
import commular from "@/utils";
import axios from "axios";
import subtractor from "@/components/subtractor";
export default {
  data() {
    return {
      productInfo: {},
      bannerList: [],
      product: {},
      day: "",
      hours: "",
      minutes: "",
      seconds: "",
      actFull: {},
      actSingle: {},
      couponList: [],
      transport: {},
      seller: {},
      statisticsVO: {},
      norms: [],
      goods: {},
      countValue: 1,
      selected: {},
      provinceList: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot1"
        },
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot1"
        },
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      isopen: false,
      address: "请选择",
      fagl: false,
      cityName: "",
      money: 0,
      timeData: "",
      cartNumber: 0
    };
  },
  computed: {
    reduce() {
      var fullInfo = "";
      var actFull = this.actFull;
      if (actFull.firstFull != null && actFull.firstFull > 0) {
        fullInfo += "满" + actFull.firstFull + "减" + actFull.firstDiscount;
      }
      if (actFull.secondFull != null && actFull.secondFull > 0) {
        fullInfo += "，满" + actFull.secondFull + "减" + actFull.secondDiscount;
      }
      if (actFull.thirdFull != null && actFull.thirdFull > 0) {
        fullInfo += "，满" + actFull.thirdFull + "减" + actFull.thirdDiscount;
      }
      return fullInfo;
    },
    transportFn() {
      var html = "";
      var transport = this.transport;
      if (
        transport.transTime &&
        (transport.transTime == 5 || transport.transTime == 7)
      ) {
        html = `<div class="zfkmy">付款成功后，预计<i>${transport.transTime ||
          ""}天</i>内发货</div>`;
      } else {
        html = `<div class="zfkmy">付款成功后，预计<i style="color:red; font-style:normal">${transport.transTime ||
          ""}小时</i>内发货</div>`;
      }
      return html;
    }
  },
  components: {
    subtractor
  },
  created() {
    let id = this.$route.params.id;
    this.ProductFn(id);
  },
  methods: {
    ProductFn(id) {
      getProduct({ id }).then(res => {
        console.log(res);
        if (res.success) {
          let productInfo = (this.productInfo = res.data);
          this.bannerList = res.data.productLeadPicList || [];
          this.product = res.data.product || {};
          this.norms = productInfo.norms || [];
          this.goods = productInfo.goods || {};
          this.transport = productInfo.transport || {};
          this.statisticsVO = productInfo.statisticsVO;
          this.seller = productInfo.seller;
          this.cartNumber = productInfo.cartNumber || 0;
          productInfo.provinceList.map(item => {
            this.provinceList[0].values.push(item);
          });
          this.productactinfoFn({
            productId: productInfo.productId,
            sellerId: productInfo.seller.id
          });
          this.productflashinfoFn({
            productId: productInfo.productId
          });
          this.SpecialEndTimeFn({ productId: productInfo.productId });
          this.fagl = true;
          this.$nextTick(() => {
            let swiper = new Swiper(".swiper-container", {
              loop: true,
              slidesPerView: "auto",
              autoplay: 3000,
              pagination: ".swiper-pagination"
            });
          });
        }
      });
    },
    productactinfoFn(data) {
      getproductactinfo(data).then(res => {
        if (res.success) {
          let data = res.data;
          this.actFull = data.actFull || {};
          this.actSingle = data.actSingle || {};
          this.couponList = data.couponList || [];
        }
      });
    },
    normsSecelt(e, parid) {
      let id = document.getElementById(parid);
      let span = id.getElementsByTagName("span");
      for (let i = 0; i < span.length; i++) {
        span[i].classList.remove("curr");
      }
      getGoodsInfo({
        productId: this.$route.params.id,
        normAttrId: e.target.id
      }).then(res => {});
      e.target.classList.add("curr");
      this.$set(this.selected, parid, e.target.innerHTML);
    },
    countAddFn(value) {
      this.countValue = value;
    },
    onPickerChange(picker, values) {
      const _this = this;
      if (this.fagl) {
        _this.getRegionByParentId({ parentId: values[0]["id"] }).then(res => {
          picker.setSlotValues(1, res.data.data);
        });
        if (values[1]) {
          _this.getRegionByParentId({ parentId: values[1]["id"] }).then(res => {
            picker.setSlotValues(2, res.data.data);
          });
        }
        var arr = picker.getValues();
        if (arr[0] && arr[1] && arr[2]) {
          this.cityName = `${arr[0].regionName}-${arr[1].regionName}-${arr[2].regionName}`;
          this.cityid = [arr[0].id, arr[1].id, arr[2].id];
        }
      }
    },
    userTrue() {
      this.isopen = false;
      this.address = this.cityName;
      getTransportPrice({
        productId: this.cityid[0],
        cityId: this.cityid[1]
      }).then(res => {
        this.money = res.data;
      });
    },
    productflashinfoFn(data) {
      getproductflashinfo(data).then(res => {});
    },
    getRegionByParentId(data) {
      return axios({
        method: "get",
        url:
          process.env.BASE_URL +
          "/getRegionByParentId?parentId=" +
          data.parentId +
          "&_=" +
          +new Date()
      });
    },
    SpecialEndTimeFn(data) {
      getSpecialEndTime(data).then(res => {
        this.timeData = res.data;
        this.timeDown(this.timeData);
      });
    },
    addCart() {
      if (
        this.norms.length == 0 ||
        Object.keys(this.selected).length == this.norms.length
      ) {
        addtocart({
          productId: this.productInfo.productId,
          productGoodId: this.goods.id,
          sellerId: this.seller.id,
          count: this.countValue,
          buyFlag: 0
        }).then(res => {
          if (res.success) {
            this.$message("加入购物车成功");
            this.cartNumber += this.countValue;
          } else {
            this.$message(res.message);
          }
        });
      } else {
        this.$message("请选择尺寸等信息");
      }
    },
    reveivecouponFn(id) {
      reveivecoupon({ couponId: id })
        .then(res => {
          this.$message("领取成功");
        })
        .catch(e => {});
    },
    docollectshopFn() {
      docollectshop({ sellerId: this.seller.id }).then(res => {});
    },
    cancelcollectshopFn() {
      cancelcollectshop({ sellerId: this.seller.id }).then(res => {});
    },
    collectionProductFn() {
      if (this.statisticsVO.collectedProduct) {
        cancelCollectionProduct({ productId: this.productInfo.productId }).then(
          res => {
            if (res.success) {
              this.statisticsVO.collectedProduct = false;
            }
          }
        );
      } else {
        collectionProduct({ productId: this.productInfo.productId }).then(
          res => {
            if (res.success) {
              this.statisticsVO.collectedProduct = true;
            }
          }
        );
      }
    },
    collectionShopFn() {
      if (this.statisticsVO.collectedShop) {
        cancelCollectionShop({ sellerId: this.seller.id }).then(res => {
          if (res.success) {
            this.$message("已取消收藏");
            this.statisticsVO.collectedShop = false;
          }
        });
      } else {
        collectionShop({ sellerId: this.seller.id }).then(res => {
          if (res.success) {
            this.$message("收藏成功");
            this.statisticsVO.collectedShop = true;
          }
        });
      }
    },
    timelySubmit() {
      if (
        this.norms.length == 0 ||
        Object.keys(this.selected).length == this.norms.length
      ) {
        addtocart({
          productId: this.productInfo.productId,
          productGoodId: this.goods.id,
          sellerId: this.seller.id,
          count: this.countValue,
          buyFlag: 1
        }).then(res => {
          if (res.success) {
            this.cartNumber += this.countValue;
            this.$router.push("/order");
          } else {
            this.$message(res.message);
          }
        });
      } else {
        this.$message("请选择尺寸等信息");
      }
    },
    timeDown(s) {
      s--;
      let day = Math.floor(s / (24 * 60 * 60));
      let seconds = s % (24 * 60 * 60);
      let hours = Math.floor(seconds / (60 * 60));
      seconds = seconds % (60 * 60);
      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      this.day = day < 10 ? "0" + day : day;
      this.hours = hours < 10 ? "0" + hours : hours;
      this.minutes = minutes < 10 ? "0" + minutes : minutes;
      this.seconds = seconds < 10 ? "0" + seconds : seconds;
      if (s > 0) {
        setTimeout(() => {
          this.timeDown(s);
        }, 1000);
      } else {
        this.timeData = 0;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.banner {
  .swiper-wrapper {
    touch-action: none;

    img {
      width: 100%;
    }
  }
  .seckil-time {
    .bannerInfo {
      padding: 0 20px;
      background: linear-gradient(90deg, #ef3390, #ef3647);
      height: 100px;
      color: #fff;
      flex: 1;
      .first {
        span {
          font-size: 52px;
          line-height: 52px;
        }
      }
      .last {
        em {
          border: 1px solid #fff;
          font-size: 10px;
          padding: 0 4px;
        }
        span {
          text-decoration: line-through;
          font-size: 24px;
        }
      }
    }
    .times {
      font-size: 24px;
      background: #feeae9;
      padding: 0 20px;
      height: 100px;
      p {
        color: #ef3561;
      }
      .tm {
        height: 48px;
        line-height: 48px;
        color: #ef3561;
        span {
          background: #ef3561;
          padding: 0 10px;
          height: inherit;
          display: block;
          color: #fff;
          border-radius: 8px;
        }
        em {
          padding: 6px;
        }
      }
    }
  }
}
.main {
  padding-bottom: 180px;
  .po-title {
    padding: 20px;
    border-bottom: 1px solid #dedede;
    h3,
    p {
      font-size: 28px;
    }
  }
  .discount-box {
    padding: 20px 0;
    margin: 0 20px;
    border-bottom: 1px solid #dedede;
    .list {
      li {
        width: 32%;
        box-sizing: border-box;
        border: 2px solid #dcf4ff;
        color: #60bbf5;
        margin-top: 10px;
        flex-wrap: wrap;
        .item {
          .top {
            padding: 10px;
            span {
              font-size: 48px;
            }
            p:last-child {
              font-size: 22px;
            }
          }
          .bottom {
            padding: 0 10px;
            background-color: #dcf4ff;
            font-size: 22px;
          }
        }
      }
    }
    .reduce {
      p {
        padding: 5px 0;
        font-size: 28px;
        em {
          font-size: 24px;
          background: #f15353;
          color: #fff;
          padding: 0 10px;
        }
      }
    }
    .count-info {
      .item {
        padding: 10px 0;
        font-size: 28px;
        .left {
          flex-shrink: 0;
          padding-top: 12px;
        }
        .right {
          flex: 1;
          em {
            flex: 1;
          }
        }
        &.size {
          .right {
            flex-wrap: wrap;
            span {
              padding: 12px 20px;
              border: 2px solid #dedede;
              margin: 0 10px 20px 0;
              min-width: 30%;
              box-sizing: border-box;
              display: block;
              border-radius: 10px;
              text-align: center;
              box-shadow: 0 5px 8px inset rgba($color: #000000, $alpha: 0.1);
              &.curr {
                border-color: #f15353;
                color: #f15353;
              }
            }
          }
        }
      }
    }
    .picker-open {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($color: #000000, $alpha: 0.5);
      z-index: 99;
      .picker {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
      }
      .btn-grounp {
        padding: 10px;
        background: #fff;
      }
    }
    .address {
      font-size: 28px;
      color: #999;
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
      margin-top: 40px;
      .btn {
        margin: 0 20px;
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f2f2f2;
  z-index: 8;
  & > div {
    height: 116px;
    flex: 1;
    box-sizing: border-box;
    background: rgba($color: #000000, $alpha: 0.8);
    color: #fff;
    i.iconfont {
      color: #fff;
    }
    i.iconfont.curr {
      color: #ef3647;
    }
  }
  .item-1 {
    padding: 0 20px;
    position: relative;
    em {
      position: absolute;
      right: 6px;
      top: 6px;
      background: #fff;
      border-radius: 5px;
      padding: 0 10px;
      color: #ef3561;
      font-size: 24px;
    }
  }
  .item-2 {
    background: #ffb03f;
  }
  .item-3 {
    background: #f15353;
  }
}
</style>