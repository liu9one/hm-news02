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
          <span class="follow" @click="follow" v-if="!articleInfo.has_follow">关注</span>
          <span class="followed" @click="unfollow" v-else >已关注</span>
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
          <div class="dianzan " @click="good" :class="{activeLike: articleInfo.has_like}">
            <span class="iconfont icondianzan"></span>&nbsp;
            <span >{{articleInfo.like_length}}</span>
          </div>
          <div class="weixin">
            <span class="iconfont iconweixin"></span>&nbsp;
            <span >微信</span>
          </div>
        </div>
      </div>
      <div class="comment">

        <!-- 评论区组件 -->

        <h4>精彩回帖</h4>
       <hm-comment v-for="item in  commentList "   @reply='onReply' :key="item.id" :comment='item'></hm-comment>
      </div>
       <div class="footer-textarea" v-if="isshowTextarea">
      <textarea :placeholder="'回复：' + nickname" ref="textarea" v-model="content"></textarea>
      <van-button type="primary" @click="publish">发送</van-button>
    </div>
      <div class="footer" v-else>
          <div class="input">
            <input type="text " placeholder="回复" @focus="onFocus">
          </div>
          <span class="iconfont  iconpinglun-"><i>{{articleInfo.comment_length}}</i></span>
          <span class="iconfont iconshoucang" :class="{activeStar:articleInfo.has_star}" @click="star"></span>
          <span class="iconfont  iconfenxiang"></span>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleInfo: {
        user: {}
      },
      commentList: [],
      isshowTextarea: false,
      content: '',
      nickname: '',
      replyId: ''
    }
  },
  created () {
    this.getArticle()
    this.getCommentList()
    // 给bus注册自定义事件
    // this.$bus.$on('reply', async (id, nickname) => {
    //   this.isshowTextarea = true
    //   await this.$nextTick()
    //   this.$refs.textarea.focus()
    //   // 回显nickname
    //   this.nickname = '@' + nickname
    //   this.replyId = id
    // })
    this.$bus.$on('reply', this.onReply)
  },
  beforeDestroy () {
    this.$bus.$off('reply', this.onReply)
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
    },
    noLogin () {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      } else {
        return false
      }
    },
    async follow () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/user_follows/${this.articleInfo.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('关注成功')
        this.getArticle()
      }
    },
    async unfollow () {
      const res = await this.$axios.get(`/user_unfollow/${this.articleInfo.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('已取关')
        this.getArticle()
      }
    },
    async good () {
      if (this.noLogin()) return
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post_like/${id}`)
      if (res.data.statusCode === 200) {
        this.getArticle()
        this.$toast.success('点赞成功')
      }
    },
    async star () {
      if (this.noLogin()) return
      const { id } = this.$route.params
      const res = this.$axios.get(`/post_star/${id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('收藏成功')
        this.getArticle()
      }
    },
    async getCommentList () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    },
    async onFocus () {
      this.isshowTextarea = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async publish () {
      if (this.content.trim() === '') return this.$toast('内容不能为空')
      const res = await this.$axios.post(`/post_comment/${this.articleInfo.id}`, {
        content: this.content,
        parent_id: this.replyId
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.content = ''
        this.replyId = ''
        this.nickname = ''
        this.isshowTextarea = false
        this.getCommentList()
      }
    },
    async onReply (id, nickname) {
      console.log(id, nickname)
      this.isshowTextarea = true
      await this.$nextTick()
      this.$refs.textarea.focus()
      this.replyId = id
      this.nickname = '@' + nickname
    }
  }
}
</script>

<style lang='less' scoped>
.article{
  padding-bottom: 50px;
}
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
border-bottom: 3px solid #ccc;
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
    .activeLike{
  color: red;
  border:1px solid red;
}
  }
}
.footer{
  display: flex;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: space-around;
  padding:0 10px;
  height: 50px;
  background-color: #fff;
  .input{
    padding-right: 15px;
    input{
      text-indent: 1em;
      width: 180px;
      height: 30px;
      // border: 1px solid #ccc;
      background-color: #ddd
      ;
      border: none;
      border-radius: 15px;
      font-size: 14px;
    }
  }
  .iconfont{
    position: relative;
    margin: 15px;
    font-size: 24px;
    i{
      top: 0;
      right: -5px;
      padding: 0 3px;
      position: absolute;
      background-color: #f00;
      color: #ffffff;
      font-style: normal;
      font-size: 10px;
      border-radius: 7px;
    }
  }
  .activeStar{
    color: red;
  }
}
.comment{
  h4{
    text-align: center;
    margin-top:20px ;
  }
}
.footer-textarea {
  width: 100%;
  height: 100px;
  display: flex;
  position: fixed;
  z-index: 999;
  bottom: 0;
  padding: 10px;
  align-items: flex-end;
  background-color: #fff;
  border-top: 1px solid #ccc;
  justify-content: space-around;
  textarea {
    width: 260px;
    height: 80px;
    background-color: #ccc;
    border-radius: 5px;
    border: none;
    padding: 10px;
    font-size: 14px;
  }
}

</style>
