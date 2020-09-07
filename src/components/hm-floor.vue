<template>
  <div>
      <!-- <hm-floor :floor='floor.parent'  @reply='onReply' :count ='count - 1' v-if="floor.parent"></hm-floor> -->
      <hm-floor :floor='floor.parent'   :count ='count - 1' v-if="floor.parent"></hm-floor>
      <div class="hm-floor">
      <div class="title">
          <div class="name">
             {{count}}. {{floor.user.nickname}}
          </div>
          <div class="time">
              {{floor.create_date | timeNow}}
          </div>
          <div class="right" @click="reply">回复</div>
      </div>
      <div class="content">
          {{floor.content}}
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    floor: Object,
    count: Number
  },
  methods: {
    reply () {
      this.$bus.$emit('reply', this.floor.id, this.floor.user.nickname)
    }
    // onReply (id, nickname) {
    //   this.$emit('reply', id, nickname)
    // }
  }
}
</script>

<style lang='less' scoped>
.hm-floor{
    border: 1px solid #666;
    padding: 10px;
    margin-top: -1px;
    .title{
        display: flex;
        font-size: 14px;
    .time{
        flex: 1;
        font-size: 12px;
        color: #666;
        padding-left: 10px;
    }
    .right{
        color: #ccc;
    }
    }
    .content{
        font-size: 14px;
    margin-top: 10px;
    }
}
</style>
