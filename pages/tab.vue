<template>
  <div  style="padding:50px;margin-bottom:20px;">
      <div class="tabs">
          
          <span 
          v-for="(item,index) in [ '新闻','体育','娱乐']" 
          :key="index"
          @click="handleClick(index)"
          :class="{ active: current === index}"
          >
          {{ item }}
          </span>
      </div>

        <div  v-show=" current=== 0 ">
            <ul>
                <li>新闻1</li>
                <li>新闻2</li>
                <li>新闻3</li>
            </ul>
        </div>
   
        <div v-show=" current=== 1 ">
            <ul>
                <li>体育1</li>
                <li>体育2</li>
                <li>体育3</li>
            </ul>
        </div>

        <div  v-show=" current=== 2 ">
            <ul>
                <li>娱乐1</li>
                <li>娱乐2</li>
                <li>娱乐3</li>
            </ul>
        </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            //记录当前的状态
            current:0
        }
    },
    methods :{
       handleClick(index){
             // 修改current
            this.current = index;
       }
    }

}
</script>

<style lang="less" scoped>
tabs{
    margin-bottom:20px;
}
span{
    cursor: pointer;
}
.active{
        color:red;
    }
</style>