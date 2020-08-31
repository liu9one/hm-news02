<template>
  <div class="user-edit">
      <new-header>编辑信息</new-header>
      <div class="avatar">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      </div>
      <new-navitem @click='showNickname'>
          <template> 昵称 </template>
          <template #content> {{user.nickname}} </template>
      </new-navitem>
      <new-navitem @click='showPassword'>
          <template> 密码 </template>
          <template #content> ****** </template>
      </new-navitem>
      <new-navitem @click='showGender'>
          <template> 性别 </template>
          <template #content> {{user.gender ===1 ? '男' : '女'}} </template>
      </new-navitem>
      <!-- 弹出修改框组件  -->
<van-dialog
  use-slot
  title="编辑昵称"
  v-model="isshownickname"
  show-cancel-button
  confirm-button-open-type="getUserInfo"
  bind:close="onClose"
  bind:getuserinfo="getUserInfo"
  @confirm = 'updateNickname'
>
 <van-field
    v-model = 'nickname'
    placeholder="请输入昵称"
    bind:change="onChange"
  />
</van-dialog>
      <van-dialog
  use-slot
  title="编辑密码"
  v-model="isshowPassword"
  show-cancel-button
  confirm-button-open-type="getUserInfo"
  bind:close="onClose"
  bind:getuserinfo="getUserInfo"
  @confirm = 'updatePassword'
>
 <van-field
    v-model = 'password'
    placeholder="请输入密码"
    bind:change="onChange"
  />
</van-dialog>

<!-- 性别选项 -->
<van-dialog
  use-slot
  title="更改性别"
  show-cancel-button
  confirm-button-open-type="getUserInfo"
  bind:close="onClose"
  bind:getuserinfo="getUserInfo"
  v-model="isshowGender"
  @confirm = 'updateGender'
>
<van-radio-group v-model="gender" bind:change="onChange">
  <van-cell-group>
    <van-cell title="男" clickable data-name="1" bind:click="onClick">
      <van-radio slot="right-icon" :name="1" />
    </van-cell>
    <van-cell title="女" clickable data-name="0" bind:click="onClick">
      <van-radio slot="right-icon" :name="0" />
    </van-cell>
  </van-cell-group>
</van-radio-group>
</van-dialog>

<!-- 退出功能 -->
<div class="logout" @click='logout' >
    <van-button type="danger" block >退出登录</van-button>
</div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      user: '',
      isshownickname: false,
      nickname: '',
      isshowPassword: false,
      password: '',
      isshowGender: false,
      gender: 1
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
        console.log(data)
      }
    },
    // 显示nickname修改框
    showNickname () {
      this.nickname = this.user.nickname
      this.isshownickname = true
    },
    async updateUser (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    async updateNickname () {
      this.updateUser({ nickname: this.nickname })
    },
    // 显示密码框更改
    showPassword () {
      this.password = this.user.password
      this.isshowPassword = true
    },
    // 更新密码
    async updatePassword () {
      this.updateUser({ password: this.password })
    },
    // 显示更改性别框
    showGender () {
      this.gender = this.user.gender
      this.isshowGender = true
    },
    updateGender () {
      this.updateUser({ gender: this.gender })
    },
    // 退出功能
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要退出吗'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
        this.$toast.success('已退出')
      } catch {
        // on cancel
        return this.$toast('取消')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.avatar{
    padding: 40px 0;
     text-align: center;
    img{
           width: 100px;
    height: 100px;
        border-radius: 50%;
    }
}
.logout{
    padding: 10px;
}
</style>
