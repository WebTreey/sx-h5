<template>
  <div class="comment mt-40">
    <div class="box df">
      <div class="left">
        <div class="df fc">
          <span>10%</span>
          <p>好评度</p>
        </div>
      </div>
      <div class="right">
        <m-progress :value="60" :bg-height="10" bg-color="#f15353">
          <div slot="start" class="mr-20">好评</div>
          <div slot="end" class="ml-20">10%</div>
        </m-progress>
        <m-progress :value="60" :bg-height="10" bg-color="#f15353">
          <div slot="start" class="mr-20">中评</div>
          <div slot="end" class="ml-20">10%</div>
        </m-progress>
        <m-progress :value="60" :bg-height="10" bg-color="#f15353">
          <div slot="start" class="mr-20">差评</div>
          <div slot="end" class="ml-20">10%</div>
        </m-progress>
      </div>
    </div>
    <div class="box">
      <div class="comment-count">
        <ul class="df">
          <li
            :class="['df fc',{curr:index==commentIndex}]"
            v-for="(item,index) in comments"
            :key="index"
            @click="commentFn(index)"
          >
            <span>{{item.name}}</span>
            <p>{{item.count}}</p>
          </li>
        </ul>
      </div>
      <div class="list">
        <div class="item mt-20" v-for="item in content" :key="item.id">
          <div class="df jb">
            <h3 class="df">
              <span>{{item.userName}}</span>
              <span class="xx"></span>
            </h3>
            <em>{{item.createTime}}</em>
          </div>
          <div class="content mt-10">{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { productComment } from "api";
import progress from "@/components/progress ";
export default {
  data() {
    return {
      content: "",
      comments: [
        { count: 0, name: "全部" },
        { count: 0, name: "好评" },
        { count: 0, name: "中评" },
        { count: 0, name: "差评" }
      ],
      commentIndex: 0
    };
  },
  created() {
    var productId = (this.productId = this.$route.params.id);
    this.productCommentFn({ productId, type: "high", pageIndex: 1 });
  },
  components: {
    "m-progress": progress
  },
  methods: {
    productCommentFn(data) {
      productComment(data).then(res => {
        if (res.success) {
          this.content = res.data.commentList;
        }

        console.log(res);
      });
    },
    commentFn(index) {
      this.commentIndex = index;
    }
  }
};
</script>
<style lang="scss" scoped>
.comment {
  .box {
    font-size: 28px;
    padding: 20px;
    .left {
      flex-shrink: 0;
      margin-right: 20px;
      span {
        font-size: 60px;
        color: #d5124a;
      }
    }
    .right {
      flex: 1;
    }
    .comment-count {
      height: 120px;
      background: #f2f2f2;
      ul {
        height: inherit;
        font-size: 28px;
        li {
          flex: 1 0;
          box-sizing: border-box;
          border-right: 2px solid #dedede;
          &:last-child {
            border: 0;
          }
          &.curr {
            color: #f15353;
          }
        }
      }
    }
    .item {
      .content {
        color: #999;
      }
    }
  }
}
</style>