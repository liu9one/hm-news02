<template>
  <div class="my-star">
      <new-header>我的收藏</new-header>
      <div class="list">
          <div class="item " v-for="item in starList" :key="item.id">
              <div class="info">
                  <div class="title">{{item.title}}</div>
                  <div class="user">
                      <span class="nickname">{{item.user.nickname}}</span>
                      <span class="follow"> {{item.comments.length}}人跟帖</span>
                  </div>
              </div>
              <div class="img">
                  <img :src="$url(item.cover[0].url)" alt="">
              </div>
          </div>
      </div>
  </div>

</template>

<script>
export default {
  async created () {
    const res = await this.$axios.get('/user_star')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.starList = data
      console.log(this.starList)
    }
  },
  data () {
    return {
      starList: []
    }
  }

}
</script>

<style lang='less' scoped>
.item{
    padding: 15px;
    display: flex;
    border-bottom: 1px solid #ccc;
    .img{
        img{
            width: 120px;
            height: 72px;

            object-fit: cover;
        }
    }
    .info{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 18px;
        .user{
            font-size: 14px;
            .nickname{
                margin-right:5px ;
            }
        }
    }
}
</style>
