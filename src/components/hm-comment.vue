<template>
  <div class="hm-comment">
       <div class="header">
          <div class="avatar">
            <img src="../assets/01.png" alt="">
          </div>
          <div class="user">
            <p>{{comment.user.nickname}} </p>
            <p>{{comment.create_date | timeNow}}</p>
          </div>
          <div class="right">
            <span>回复</span>
          </div>
        </div>
        <hm-floor :floor='comment.parent' v-if="comment.parent"></hm-floor>
        <div class="content">
           {{comment.content}}
        </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>

<style lang='less' scoped>
.hm-comment{
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    padding: 10px;
    .header{
        display: flex;
       height: 50px;
       margin-bottom: 15px;
        .avatar{
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
            }
        }
        .user{
            margin-left: 15px;
            font-size: 16px;
            flex: 1;
            p:last-child{
                line-height: 30px;
                font-size: 14px;
                color:#ccc;
            }
        }
        .right{
            color: #666;
        }
    }
    .content{
        margin-top: 20px;
    }
}
</style>
