<template>
 <div>
     <div class="holder">
     </div>
      <div class="new-header">
      <div class="back" @click='$router.go(-1)'>
          <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title">
          <slot> 登录 </slot>
      </div>
      <div class="extra"></div>
  </div>
 </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.holder{
    width: 100%;
    height: 50px;
}
.new-header{
    display: flex;
    position: fixed;
    top: 0;
    height: 50px;
    width: 100%;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px #ccc solid;
    background-color: #ffffff;
    z-index: 999;
    .back,
    .extra {
        width: 50px;
    }
    .title{
        flex: 1;
        font-size: 20px;
        font-weight: 700;
    }
}
</style>
