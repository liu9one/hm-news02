<template>
  <div class="home">
      <div class="header">
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="search">
          <span class="iconfont iconsearch"></span>
          <span > 搜索新闻 </span>
        </div>
        <div class="user">
          <span class="iconfont iconwode"></span>
        </div>
      </div>
      <van-tabs v-model="active" sticky animated swipeable>
  <van-tab :title="tab.name" v-for="tab in list" :key='tab.id'>
    <news-post :post='item' v-for="item in newsList" :key='item.id'></news-post>
  </van-tab>

</van-tabs>

  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      list: [],
      pageIndex: 1,
      pageSize: 25,
      newsList: []
    }
  },
  created () {
    this.getTabs()
  },
  methods: {
    async getTabs () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
        this.getNewsList(this.list[0].id)
      }
    },
    async getNewsList (id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newsList = data
        console.log(this.newsList)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header{
  display: flex;
  height: 50px;
  background-color: #ff0011;
  color: #fff;
  .search{
    flex:1;
    height: 34px;
     background-color: rgba(255, 255, 255, .5);
    margin-top: 8px;
    font-size: 16px;
    line-height: 34px;
    text-align: center;
    border-radius: 17px;
  }
  .logo,
  .user{
    width: 60px;
    line-height: 50px;
    text-align: center;
  }
  .logo{

      span{
        font-size: 50px;
      }

  }
  .user{
    span{
      font-size: 20px;
    }
}
}

</style>
