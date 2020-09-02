<template>
  <div class="user">
      <div class="user-header" @click='$router.push("/user-edit")'>
          <div class="avatar">
              <img :src='$axios.defaults.baseURL + user.head_img' alt="">
          </div>
          <div class="info">
              <span class="iconfont " :class='user.gender === 1 ? "iconxingbienan" : "iconxingbienv"'></span>
              <span>{{user.nickname}}</span>
               <div class="time">
              {{user.create_date | time}}
               </div>
          </div>
          <div class="icon">
              <span class="iconfont iconjiantou1"></span>
          </div>
      </div>
    <new-navitem to='/my-follow'>
        <template>我的关注</template>
        <template #content>关注的用户</template>
    </new-navitem>
    <new-navitem to='/my-comment'>
        <template >我的跟帖</template>
        <template #content>跟帖/回复</template>
    </new-navitem>
    <new-navitem>
        <template>我的收藏</template>
        <template #content>文章/视频</template>
    </new-navitem>
    <new-navitem>
        <template>设置</template>
        <template #content></template>
    </new-navitem>

  </div>
</template>

<script>
export default {
// 在创建完成之后获取token和id
  data () {
    return {
      user: ''
    }
  },
  async created () {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    // console.log(token, userId)
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  }
}
</script>

<style lang='less' scoped>
.user{
    .user-header{
        padding: 10px;
        display: flex;
        align-items: center;
        border-bottom: 4px solid #ccc;
    }
    .avatar{
        width: 70px;
        height: 70px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .info{
        flex:1;
        font-size: 16px;
        padding-left: 15px;
        .time{
            padding-top: 6px;
        }
        .iconxingbienan{
            color: rgb(63, 198, 252);
            padding-right: 5px;
        }
        .iconxingbienv{
            color: hotpink;
             padding-right: 5px;
        }
    }
}
</style>
