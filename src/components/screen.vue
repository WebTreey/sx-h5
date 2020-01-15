<template>
  <div :class="{open:open}" class="screen">
    <div class="header df">
      <div class="enter df">
        <i class="iconfont" @click="close()">&#xe6ab;</i>
      </div>
      <span>筛选</span>
      <em @click="clearData()">清除</em>
    </div>
    <div class="btn-group df jc">
      <div class="btn" :class="{active:lines['5']}" @click="selectFn(0)">仅显示有货</div>
      <div class="btn" :class="{active:lines['4']}" @click="selectFn(1)">自营平台</div>
    </div>
    <div class="list" id="list">
      <div class="item">
        <h3 class="df" @click="hanldItem('ulid-'+ 0,productBrands.length)">
          <span class="fl">商品品牌</span>
          <i class="iconfont">&#xe6ab;</i>
        </h3>
        <ul :class="['ts']" :id="'ulid-'+ 0">
          <li
            :id="`child-${0}-0`"
            @click="hanldchildItem('ulid-'+ 0,'child-'+0+'-'+ 0,0)"
            class="df"
          >
            <span class="fl">全部</span>
            <i :class="['r-icon']"></i>
          </li>

          <li
            v-for="(childItem,cindex) in productBrands"
            :id="'child-'+ 0+'-'+(cindex+1)"
            :key="(cindex+1)"
            class="df"
            @click="hanldchildItem('ulid-'+ 0,'child-'+0+'-'+ (cindex+1),childItem.id)"
          >
            <span class="fl">{{childItem.name}}</span>
            <i :class="['r-icon']"></i>
          </li>
        </ul>
      </div>
      <div class="item" v-for="(item,index) in list" :key="item.id">
        <h3 class="df" @click="hanldItem('ulid-'+ (index+1),item.value.length)">
          <span class="fl">{{item.name}}</span>
          <i class="iconfont">&#xe6ab;</i>
        </h3>
        <ul :class="['ts']" :id="'ulid-'+ (index+1)">
          <li
            :id="`child-${(index+1)}-0`"
            @click="hanldchildItem('ulid-'+ (index+1),'child-'+(index+1)+'-'+ 0,``)"
            class="df"
          >
            <span class="fl">全部</span>
            <i :class="['r-icon']"></i>
          </li>

          <li
            v-for="(childItem,cindex) in item.value"
            :id="'child-'+ (index+1)+'-'+(cindex+1)"
            :key="(cindex+1)"
            class="df"
            @click="hanldchildItem('ulid-'+ (index+1),'child-'+(index+1)+'-'+ (cindex+1),`${index+1}_${(cindex+1)}`)"
          >
            <span class="fl">{{childItem}}</span>
            <i :class="['r-icon']"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getTypeList } from "api";
export default {
  props: ["open", "parid", "lines"],
  data() {
    return {
      list: [],
      isItem: {},
      lih: [],
      productBrands: []
    };
  },
  created() {
    this.typeList();
  },
  methods: {
    typeList() {
      getTypeList({ id: this.parid }).then(res => {
        if (res.success) {
          var data = res.data.productTypeAttrs || {};
          for (let i in data) {
            data[i].value = data[i].value.split(",");
          }
          this.list = data;
          this.productBrands = res.data.productBrands;
        }
      });
    },
    hanldItem(id, len) {
      var ulid = document.getElementById(id);
      var h = ulid.children[0].clientHeight;

      if (!this.isItem[id]) {
        ulid.style.height = h * len + "px";
        this.isItem[id] = true;
      } else {
        ulid.style.height = 0;
        this.isItem[id] = false;
      }
    },
    hanldchildItem(parid, id, index) {
      var ulid = document.getElementById(parid);
      var thisli = document.getElementById(id);
      var li = ulid.children;
      for (let i = 0; i < li.length; i++) {
        li[i].classList.remove("curr");
      }
      thisli.classList.add("curr");
      var liId = parseInt(thisli.id.match(/\d/)[0]);
      var obj = { type: liId, value: index };
      this.close(obj, 1);
    },
    close(value, type) {
      if (value || value == "") {
        this.$emit("close", value, type);
      } else {
        this.$emit("close", false);
      }
    },
    selectFn: function(index) {
      if (index == 1) {
        this.$set(this.lines, 4, this.lines[4] ? 0 : 1);
      } else {
        this.$set(this.lines, 5, this.lines[5] ? 0 : 1);
      }
      this.close(this.lines, 2);
    },
    clearData() {
      let list = document.getElementById("list");
      let item = list.getElementsByClassName("item");
      for (var i = 0; i < item.length; i++) {
        let ul = document.getElementById("ulid-" + i);
        if (ul) {
          ul.style.height = 0;
          let li = ul.getElementsByTagName("li");
          for (var k = 0; k < li.length; k++) {
            li[k].classList.remove("curr");
           
          }
        }
      }
      this.isItem = {};
      this.$emit("clearData");
    }
  }
};
</script>
<style lang="scss" scoped>
.screen {
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  z-index: 99;
  height: 100vh;
  overflow: auto;
  transform: translate(100%);
  &.open {
    transform: translate(0);
  }
  background: #fff;
}
.header {
  height: 80px;
  padding: 0 20px;
  background: #fff;
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
.btn-group {
  padding: 20px;
  background: #f2f2f2;
  .btn {
    margin: 0 10px;
    background: #fff;
    &.active {
      border-color: #ec5252;
      color: #ec5252;
    }
  }
}
.list {
  .item {
    h3 {
      font-size: 32px;
      border-bottom: 2px solid #dedede;
      padding: 20px 40px;
      i {
        color: inherit;
      }
    }
    ul {
      height: 0;
      overflow: hidden;
    }
    li {
      padding: 20px 40px;
      border-bottom: 1px dashed #dedede;
      margin: 0 20px;
      font-size: 28px;
      .r-icon {
        width: 16px;
        height: 16px;
        display: block;
        border-radius: 16px;
      }
    }
    .curr {
      color: #ec5252;
      .r-icon {
        background: #ec5252;
        width: 16px;
        height: 16px;
        display: block;
        border-radius: 16px;
      }
    }
  }
}
</style>