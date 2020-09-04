<template>
  <div class="manage">
      <new-header>栏目管理</new-header>
      <div class="active">
          <h3 class="title">
              点击删除以下频道(保留4条)
          </h3>
          <div class="content">
              <div class="item" v-for="item in activeList" :key="item.id" @click="delTab(item.id)">{{item.name}}</div>
          </div>
      </div>
      <div class="unactive">
          <h3 class="title">
              点击添加一下频道
          </h3>
          <div class="content">
              <div class="item" v-for="item in unactiveList" :key="item.id" @click="addTab(item.id)">{{item.name}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeList: [],
      unactiveList: []
    }
  },
  created () {
    this.getTabsList()
  },
  methods: {
    async getTabsList () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      const unactiveList = JSON.parse(localStorage.getItem('unactiveList'))
      if (activeList) {
        this.activeList = activeList
        this.unactiveList = unactiveList
        return
      }
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeList = data
        console.log(this.activeList)
      }
    },
    delTab (id) {
      if (this.activeList.length < 5) return
      const index = this.activeList.findIndex(item => item.id === id)
      // 往未激活栏目中添加
      this.unactiveList.push(this.activeList[index])
      //   在原栏目中删除
      this.activeList.splice(index, 1)
    },
    addTab (id) {
      const index = this.unactiveList.findIndex(item => item.id === id)
      // 往未激活栏目中添加
      this.activeList.push(this.unactiveList[index])
      //   在原栏目中删除
      this.unactiveList.splice(index, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler (val) {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('unactiveList', JSON.stringify(this.unactiveList))
      }
    }
  }
}
</script>

<style lang='less' scoped>
.active,
.unactive{
    font-size: 14px;

    .content{
    margin: 20px 0;
    padding: 5px;
    overflow: hidden;
    .item{
   float: left;
    width: 60px;
    height: 30px;
    font-size: 16px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 30px;
    margin: 5px;
}
}
}
</style>
