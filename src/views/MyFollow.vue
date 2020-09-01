<template>
  <div class="my-follow">
      <new-header>我的关注</new-header>
      <div class="list">
          <div class="item" v-for="item in followList" :key="item.id">
              <div class="avatar">
                  <img :src="$base + item.head_img" alt="">
              </div>
              <div class="info">
                  <div class="name"> {{item.nickname}}</div>
                  <div class="time"> {{item.create_date | time}}</div>
              </div>
              <van-button round size="small" type="warning" @click='unFollow(item.id)'>取消关注</van-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  created () {
    this.getFollow()
  },
  data () {
    return {
      followList: ''
    }
  },
  methods: {
    async getFollow () {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.followList = data
        console.log(data)
      }
    },
    async unFollow (id) {
      try {
        await this.$dialog.confirm({
          title: '标题',
          message: '弹窗内容'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        const { statusCode } = res.data
        if (statusCode === 200) {
          this.getFollow()
          this.$toast.success('已取关')
        }
      } catch {
        return this.$toast('取消操作')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.item{
    display: flex;
    height: 50px;
    border-bottom: 1px solid #ccc;
    padding: 20px;
    align-items: center;
    .avatar{
        margin-right:10px ;
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
    .info{
        flex: 1;
        font-size: 18px;
        margin-bottom: 10px;
        .time{
            font-size: 14px;
            color: #ccc;
        }
    }
}
</style>
