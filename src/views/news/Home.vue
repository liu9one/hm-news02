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
        <div class="user" @click="$router.push('/user')">
          <span class="iconfont iconwode"></span>
        </div>
      </div>

      <!-- 管理栏图标  -->
<van-sticky class="more-sticky" >
    <div class="more" @click="$router.push('/manage')">
      <span class="iconfont iconlianjie"></span>
    </div>
    </van-sticky>

      <van-tabs v-model="active" sticky animated swipeable>

  <van-tab :title="tab.name" v-for="tab in list" :key='tab.id'>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <news-post :post='item' v-for="item in newsList"  :key='item.id'></news-post>
    </van-list>
  </van-pull-refresh>
  </van-tab>

</van-tabs>

  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      list: [],
      pageIndex: 1,
      pageSize: 6,
      newsList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created () {
    this.getTabs()
  },
  methods: {
    async getTabs () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.list = activeList

        return
      }
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
        if (this.pageIndex === 1) {
          this.newsList = []
        }
        this.newsList = [...this.newsList, ...data]
        console.log(this.newsList)

        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      this.pageIndex++
      this.getNewsList(this.list[this.active].id)
    },
    onRefresh () {
      this.newsList = []
      this.finished = false
      this.pageIndex = 1
      this.loading = true
      setTimeout(() => {
        this.getNewsList(this.list[this.active].id)
      }, 1000)
    }
  },
  watch: {
    active (val) {
      this.newsList = []
      this.pageIndex = 1
      this.loading = true
      this.finished = false
      setTimeout(() => {
        this.getNewsList(this.list[this.active].id)
      }, 1000)
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
.more{
  position: absolute;
   right: 0;
  width: 15%;
  height: 43px;
  z-index: 9999;
  text-align: center;
  background-color: #fff;
  span{
     font-size: 18px;
  }
}
.more-sticky {
  /deep/ .van-sticky--fixed {
    z-index: 100;
  }
}
/deep/ .van-tabs__wrap {
  width: 85%;
}

</style>
