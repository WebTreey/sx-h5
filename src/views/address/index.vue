<template>
  <div class="address">
    <div class="list">
      <div class="address-item mb-20" v-for="(item,index) in addressList" :key="index">
        <div class="info">
          <span>{{item.memberName}}</span>
          <span style="color:#a40000">{{item.mobile}}</span>
        </div>
        <div class="info fs-24">
          <span>{{item.addAll}}</span>
          <span>{{item.addressInfo}}</span>
          <div class="operation">
            <a @click="selectAddress(item.id)">选择</a>
            <em>|</em>
            <a @click="appEditaddressFn(item.id)">编辑</a>
          </div>
        </div>
      </div>
    </div>
    <div class="btn red-bg db mt-20" @click="$router.push(`/address/newaddress?id=0`)">添加新地址</div>
  </div>
</template>
<script>
import { appAddress, orderInfoJson } from "api";
export default {
  data() {
    return {
      addressList: []
    };
  },
  created() {
    this.appAddressFn();
  },
  methods: {
    appAddressFn() {
      appAddress().then(res => {
        console.log(res);
        this.addressList = res.data.addressList;
      });
    },
    selectAddress(id) {
      this.$router.push(`/order?addressId=${id}`);
    },
    appEditaddressFn(id) {
      this.$router.push(`/address/newaddress?id=${id}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.address {
  padding: 20px;
  font-size: 28px;
  .address-item {
    border: 2px solid #dedede;
    border-radius: 10px;
    .info {
      padding: 15px;
      border-bottom: 2px solid #dedede;
      &:last-child {
        border: 0;
      }
    }
    .operation {
      text-align: right;
      margin-top: 10px;
      em {
        padding: 0 10px;
      }
    }
  }
}
</style>