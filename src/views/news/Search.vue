<template>
  <div class="search">
      <div class="header">
          <div class="back" @click="goBack">
              <span class="iconfont iconjiantou2"></span>
          </div>
          <div class="center">
              <input type="search" v-model="key"
              @input="recommend" class="input" @keyup.enter="search" placeholder="搜索关键字">
              <span class="iconfont iconsearch"></span>
          </div>
          <div class="right" @click="search">
              <span>搜索</span>
          </div>
      </div>
      <div class="recommend-list"  v-if="recommendList.length">
          <div class="item one-txt-cut" @click="goSearch(item.title)" v-for="item in recommendList" :key="item.id">
              {{item.title}}
          </div>
      </div>
       <div class="list" v-else-if="list.length" >
              <news-post :post='item' v-for="item in list" :key='item.id'></news-post>
          </div>
      <div class="content" v-else>
          <div class="history">
               <h6>历史记录</h6>
               <div class="list">
                   <div class="item" @click="goSearch(item)" v-for="item in history" :key="item">{{item}}</div>
               </div>
          </div>
          <hr>
          <div class="hot">
              <h6>热门搜索</h6>
              <div class="list">
                  <div class="item">大威天龙</div>
                  <div class="item">大威天龙</div>
                  <div class="item">大威天龙</div>
                  <div class="item">大威天龙</div>
              </div>
          </div>

      </div>
  </div>
</template>

<script>

import { debounce } from '../../utils/tools'
export default {
  created () {
    // 从本地获取历史浏览词条 如果没有历史记录获取一个空数组
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  data () {
    return {
      key: '',
      // 搜索后请求回来的列表
      list: [],
      // histroy存放历史词条列表
      history: [],
      recommendList: []
    }
  },
  methods: {
    async search () {
      if (this.key.trim() === '') return this.$toast('输入内容')
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (data.length === 0) return this.$toast('找不到相关关键字')
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
      //   把key 添加到缓存中去
      // 1.先筛选如果key一样的
      // 2.把新的值放到history最前面
      // 3. 存入本地缓存
      this.history = this.history.filter(item => item !== this.key)
      this.history.unshift(this.key)
      localStorage.setItem('history', JSON.stringify(this.history))
      //   console.log(this.history)

      // 清空推荐
      this.recommendList = []
    },
    goBack () {
      if (this.key) {
        this.key = ''
      } else {
        this.$router.go(-1)
      }
    },
    goSearch (item) {
      this.key = item
      this.search()
    },
    recommend: debounce(async function () {
      if (this.key === '') return
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
        console.log(this.recommendList)
      }
    }, 1000)
  },
  //   监听key值的变化
  watch: {
    key (val) {
      if (val === '') {
        this.list = []
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header{
    height: 50px;
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #cccccc;
    .center{
        position: relative;
        .input{
            // margin-top: 5px;
            width: 240px;
            height: 36px;
            border: 1px #ccc solid;
            border-radius: 18px;
            font-size: 14px;
            text-indent: 2em;
        }
        .iconfont{
            position: absolute;
            left: 10px;
            top: 18px;
        }
    }
    .right,
    .back{
        width: 50px;
        text-align: center;
        line-height: 50px;
    }
    .right{
        font-size: 18px;
        line-height: 50px;
    }
}
.content,
.hot{
    padding: 10px;
    h6{
        margin-bottom: 10px;
        font-size: 16px;
    }
    margin: 15px 0;
    .list{
        overflow: hidden;
        font-size: 16px;
        margin-bottom: 10px;
        .item{
            float: left;
            margin: 0 10px;
             float: left;
    width: 60px;
    height: 30px;
    // border: 1px solid #ccc;
    // background-color: #ddd;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    margin: 5px;
        }
    }
}
// .hot {
//     .list{
//         .item{
//         margin: 0 25px;
//     }
//     }
// }
.recommend-list{
    padding: 10px 5px;
    font-size: 16px;
    .item{
        border-bottom: 1px solid #ccc;
    text-indent: 1.5em;
    line-height: 30px;
    }
}
</style>
