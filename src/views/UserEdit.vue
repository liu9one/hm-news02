<template>
  <div class="user-edit">
      <new-header>编辑信息</new-header>
      <div class="avatar">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
          <van-uploader :after-read="afterRead" />
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
    ref='nickname'
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
    ref='password'
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

<!-- 裁剪框  -->
<div class="mask" v-show="isshowMask">
  <van-button  @click='isshowMask = false' class="cancel" type="default">取消</van-button>
  <van-button  @click='crop' class="crop" type="primary">确定</van-button>
  <vueCropper
  ref="cropper"
  :img="img"
  autoCropWidth='100%'
  autoCropHeight='100%'
  fixed
  :info='false'
  autoCrop
></vueCropper>
</div>
  </div>

</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      user: '',
      isshownickname: false,
      nickname: '',
      isshowPassword: false,
      password: '',
      isshowGender: false,
      gender: 1,
      img: '',
      isshowMask: false
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 判断图片的格式个大小
    isImg (name) {
      if (name.endsWith('.gif') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('png')) {
        return true
      } else {
        return false
      }
    },
    async afterRead (file) {
      console.log(file)
      if (!this.isImg(file.file.name)) {
        return this.$toast('图片格式不正确')
      }
      if (file.file.size > 200 * 1024) {
        return this.$toast('图片内容过大')
      }
      this.isshowMask = true
      this.img = file.content
    },
    async crop () {
      this.$refs.cropper.getCropBlob(async blob => {
        console.log(blob)
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          console.log(data)
          this.updateUser({ head_img: data.url })
          this.isshowMask = false
        }
      })
    },
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
    async showNickname () {
      this.nickname = this.user.nickname
      this.isshownickname = true
      await this.$nextTick
      this.$refs.nickname.focus()
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
    async showPassword () {
      this.password = this.user.password
      this.isshowPassword = true
      await this.$nextTick
      this.$refs.password.focus()
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
.avatar {
  padding: 40px 0;
  text-align: center;
  position: relative;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translate(-50%);
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  .cancel
  .crop{
    position: fixed;
    z-index: 1;
  }
  .crop{
    right: 0;
  }
}
</style>
