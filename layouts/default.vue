<template>
  <div>
    <!-- 头部组件 -->
    <Header />

    <!-- 内容占位键 -->
    <nuxt />
    <!-- 页脚部分 -->
    <Foter />
  </div>
</template>

<script>
// 导入头部组件
import Header from "@/components/header";
import Foter from "@/components/foter";


export default {
  // 注册组件
  components: {
    Header,
    Foter,

  }
};
</script>

<style lang="less">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
// 清除内外边距
* {
  margin: 0;
  padding: 0;
}
// 去掉列表前面的小点
ul,
li,
ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  color: aqua;
}
//让所有斜体 不倾斜
em,
i {
  font-style: normal;
}
//让button 按钮 变成小手
button {
  cursor: pointer;
}
//图片没有边框   去掉图片底侧的空白缝隙
img {
  border: 0; /*ie6*/
  vertical-align: middle;
}

input,
img,
textarea {
  outline: none;
}
// 属性显示隐藏
.hide,
.none {
  display: none;
}
</style>
