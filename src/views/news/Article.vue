<template>
  <div class="article">
      <div class="header">
        <div class="back" @click="$router.go(-1)">
          <span class="iconfont iconjiantou2"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="right">
          <span class="follow" v-if="true">关注</span>
          <span class="followed" v-else >已关注</span>
        </div>
      </div>
      <div class="content">
        <h5 class="title">{{articleInfo.title}}</h5>
        <div class="name">
          <span class="nickname">{{articleInfo.user.nickname}}</span> &nbsp;
          <span class="time">{{articleInfo.user.create_date|time}}</span>
        </div>
        <div class="info" v-if="articleInfo.type ===1" v-html="articleInfo.content">
        </div>
        <video  v-else-if="articleInfo.type===2" controls :src="getUrl(articleInfo.content)" autoplay muted></video>
        <div class="buttons">
          <div class="dianzan">
            <span class="iconfont icondianzan"></span>&nbsp;
            <span >125 </span>
          </div>
          <div class="weixin">
            <span class="iconfont iconweixin"></span>&nbsp;
            <span >微信</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleInfo: {
        user: {}
      }
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    async getArticle () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.articleInfo = data
        console.log(this.articleInfo)
      }
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    }
  }
}
</script>

<style lang='less' scoped>
.header{
  padding: 10px;
  line-height: 50px;
  height: 50px;
  display: flex;
  font-size: 18px;
  .back{
    margin-right: 10px;
  }
  .logo{
    flex: 1;
    .iconfont{
      font-size: 60px;
    }
  }
  .right{
    span{
      display: inline-block;
      width: 60px;
      height: 30px;
      background-color: #f00;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
      font-size: 14px;
    }
    .followed{
      border: 1px solid #999;
      background-color: #fff;
    }
  }
}
.content{
 /deep/ img{
    width: 100%;
  }
  video{
    width: 100%;
  }
  padding: 10px;
  .name{
    span{
      font-size: 14px;
      color: #888;
    }

  }
  .info{
    font-size: 16px;
  }
  .buttons{
    display: flex;
    padding: 20px;
    justify-content: space-around;
    .dianzan,
    .weixin{
      font-size: 16px;
      border: 1px solid #888;
      width: 90px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
    }
    .weixin{
      .iconfont{
        color: limegreen;
      }
    }
  }
}
</style>
