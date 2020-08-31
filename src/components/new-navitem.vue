<template>
  <div class="nav-item" @click='selfJump'>
      <div class="title">
        <slot ></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="icon">
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    to: String
  },
  methods: {
    selfJump () {
      if (this.to) {
        this.$router.push(this.to)
      }
      this.$emit('click')
    }
  }
}
</script>

<style lang='less' scoped>
    .nav-item{
        display:flex;
        border-bottom: 1px solid #ddd;
        height: 60px;
        align-items: center ;
        font-size: 16px;
        margin-left: 15px;
        padding-right: 10px;
    }
    .content{
        flex: 1;
        text-align: right;
        color: #888;
        font-size: 14px;
    }
</style>
