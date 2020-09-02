<template>
  <div class="hm-post">
       <div class="list">
          <div class="single-img-post " v-if="post.cover.length<3" >
              <div class="info">
                  <div class="title">{{post.title}}</div>
                  <div class="user">
                      <span class="nickname">{{post.user.nickname}}</span>
                      <span class="follow"> {{post.comment_length}}人跟帖</span>
                  </div>
              </div>
              <div class="img">
                  <img :src="$url(post.cover[0].url)" alt="">
              </div>
          </div>
          <div class="multiple-img-post" v-else>
              <div class="title">{{post.title}}</div>
              <div class="imgs">
                  <img :src="$url(post.cover[0].url)" alt="">
                  <img :src="$url(post.cover[1].url)" alt="">
                  <img :src="$url(post.cover[2].url)" alt="">
              </div>
              <div class="user">
                  <span>{{post.user.nickname}}</span>
                  <span>{{post.comment_length}} 人跟帖</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }

}
</script>

<style lang='less' scoped>
.single-img-post{
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
.multiple-img-post {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .title {
    font-size: 16px;
  }
  .user{
      span{
          font-size: 14px;
      }
  }
  .imgs {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 112px;
      height: 74px;
    }
  }
}
</style>
