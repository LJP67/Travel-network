<template>
  <!-- 轮播图页面 -->
  <div class="lunbo">
    <!-- 幻灯片 -->
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-img"
          :style="`
        background:url(${ $axios.defaults.baseURL + item.url}) center center no-repeat;
        background-size:contain contain;
          `"
        >
          <!-- contain特定值会保持图像本身的宽高比例，将图片缩放到宽度或高度正好适应定义背景的区域。 -->
          <!-- $axios.defaults.baseURL: 后台默认请求路径  -->
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- 中间tab搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item, index) in options"
            :key="index"
            :class="{active : index === currentOption}"
            @click="handleOption(index)"
          >
            <!-- :class 动态绑定  -->
            <!-- 显示内容 -->
            <i>{{item.name}}</i>
          </span>
        </el-row>
        <!-- 输入框 -->
        <el-row type="flex" alingn="middle" class="search-input">
          <input
            :placeholder="options[currentOption].placeholder"
            v-model="searchValue"
            @keyup.enter="handleSearch"
          />
          <!-- 按回车键时跳转 @keyup.enter="handleSearch" -->
          
          <!-- options:数组的类名 -->
          <!-- currentOption:选中 -->
          <!-- placeholder:input里面的文字效果 -->
          <i class="el-icon-search" @click="handleSearch"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 方法
  methods: {
    // 切换tab栏触发
    handleOption(index) {
      // 设置当前tab
      this.currentOption = index;
      // 如果切换的机票tab,那么直接跳转到机票首页
      const item = this.options[index];
      if (item.name === "机票") {
       this.$router.push(item.pageUrl);
      }
    },
    // 搜索时触发
    handleSearch() {
      const item = this.options[this.currentOption];
      // 跳转时候给对应的页面url加上搜索内容参数
      this.$router.push(item.pageUrl + this.searchValue);
    }
  },
  // 数据
  mounted() {
    //  this.$axios:发请求
    this.$axios({
      url: "scenics/banners"
    })
      // 接收回调
      .then(res => {
        const { data } = res.data;
        this.banners = data;
      });
  },
  data() {
    return {
      // banners: [
      //   {
      //     url: "http://157.122.54.189:9095/assets/images/th02.jfif"
      //   },
      //   {
      //     url: "http://157.122.54.189:9095/assets/images/th03.jfif"
      //   },
      //   {
      //     url: "http://157.122.54.189:9095/assets/images/th04.jfif"
      //   }
      // ]
      banners: [], // 轮播图数据
      options: [
        // 搜索框tab选项
        {
          name: "攻略",
          placeholder: "搜索城市",
          pageUrl: "/post?city="
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店",
          pageUrl: "/hotel?city="
        },
        {
          name: "机票",
          placeholder: "请输入出发地",
          pageUrl: "/air"
        }
      ],
      searchValue: "", // 搜索框的值
      currentOption: 0 // 当前选中的选项
    };
  }
};
</script>

<style lang="less" scoped>
// 设置段落的最小宽度：min-width
.lunbo {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-img {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }
    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
        padding-top: 12px
      }
    }
  }
}
</style>