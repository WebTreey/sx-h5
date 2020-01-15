<template>
  <div class="newaddress">
    <div class="box">
      <m-input title="收货人" placeholder="请输入收货人" v-model="memberName"></m-input>
      <m-input title="手机号码" placeholder="请输入手机号码" v-model="mobile" type="mobile" maxlength="11"></m-input>
      <div class="m-adderss">
        <label>收货地址</label>
        <input placeholder="请选择收货地址" :value="adderss" readonly @click="isopen=true" />
      </div>
      <div class="m-adderss">
        <label>街道</label>
        <textarea rows="3" v-model="addressInfo "></textarea>
      </div>
      <m-input title="邮编" placeholder="请输入邮编" v-model="zipCode" type="mobile" maxlength="6"></m-input>
      <div class="btn red-bg db mt-40" @click="appSaveAddressFn">{{+query.id ? '修改地址':'添加新地址'}}</div>
    </div>
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
</template>
<script>
import mInput from "@/components/comInput";
import axios from "axios";
import { appNewaddress, appSaveaddres, appEditaddress } from "api";

export default {
  data() {
    return {
      isopen: false,
      cityName: "",
      adderss: "",
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
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ],
      fagl: false,
      cityid: [],
      memberName: "",
      mobile: "",
      addressInfo: "",
      zipCode: "",
      addAll: "",
      query: this.$route.query || {}
    };
  },
  created() {
    this.init();
    this.appNewaddressFn();
  },
  components: {
    mInput
  },
  methods: {
    init() {
      if (+this.query.id) {
        appEditaddress({ id: this.$route.query.id }).then(res => {
          console.log(res);
          let address = res.data.address;
          this.memberName = address.memberName;
          this.mobile = address.mobile;
          this.zipCode = address.zipCode;
          this.adderss = address.addAll;
          this.addressInfo = address.addressInfo;
          this.provinceId = address.provinceId;
          this.cityId = address.cityId;
          this.areaId = address.areaId;
        });
      }
    },
    appNewaddressFn() {
      appNewaddress({ id: this.query.id }).then(res => {
        this.provinceList[0].values = res.data.provinceList;
        this.fagl = true;
      });
    },
    appSaveAddressFn() {
      if (!this.memberName) {
        this.$message("请输入姓名");
        return;
      }
      if (!this.mobile) {
        this.$message("请输入手机号码");
        return;
      }
      if (!this.adderss) {
        this.$message("请选择地址");
        return;
      }
      if (!this.addressInfo) {
        this.$message("请输入街道");
        return;
      }

      var data = {
        id: this.$route.query.id || 0,
        memberName: this.memberName,
        mobile: this.mobile,
        provinceId: this.cityid[0],
        cityId: this.cityid[1],
        areaId: this.cityid[2],
        addressInfo: this.addressInfo,
        addAll: this.adderss || this.cityName.split("-").join(""),
        zipCode: this.zipCode
      };

      appSaveaddres(data).then(res => {
        this.$message(+this.query.id ? "修改成功" : "添加成功");
        console.log(res);
        this.$router.go(-1);
      });
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
          console.log(this.cityName, this.cityid);
        }
      }
    },
    userTrue() {
      this.adderss = this.cityName;
      this.isopen = false;
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
    }
  }
};
</script>
<style lang="scss" scoped>
.newaddress {
  .box {
    padding: 20px;
    font-size: 28px;
    color: #333;
    .m-adderss {
      margin-bottom: 20px;
      label {
        display: block;
        margin-bottom: 10px;
      }
      input {
        width: 100%;
        height: 60px;
        line-height: 60px;
      }
      textarea {
        width: 100%;
        border: 2px solid #dedede;
        padding: 10px;
        box-sizing: border-box;
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
    color: #333;
  }
}
</style>