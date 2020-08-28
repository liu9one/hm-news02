<template>
<div class="register">
<new-header> 注册 </new-header>
<new-logo></new-logo>
<van-form @submit="register">
  <van-field
    v-model="user.username"
    label="用户名"
    placeholder="用户名"
    :rules=rules.username
  />
  <van-field
    v-model="user.nickname"
    label="昵称"
    placeholder="昵称"
    :rules=rules.nickname
  />
  <van-field
    v-model="user.password"
    type="password"
    label="密码"
    placeholder="密码"
    :rules=rules.password
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      提交
    </van-button>
  </div>
  <div class="tips">
    <p>已经有帐号了,去 <router-link to="/login"> 登录</router-link></p>
  </div>
</van-form>
</div>
</template>

<script>
export default {
  methods: {
    async register () {
      const res = await this.$axios.post('/register', this.user)
      console.log(res)
      console.log(this.user)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.$router.push('/login')
      } else {
        this.$toast(message)
      }
    }
  },
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      },
      rules: {
        password: [{ required: true, message: '请填写密码', trigger: 'onChange' }, { pattern: /^\d{3,9}$/, message: '密码是3-9位', trigger: 'onChange' }],
        username: [{ required: true, message: '请填写用户名', trigger: 'onChange' }, { pattern: /^\d{5,11}$/, message: '用户名是5-11位', trigger: 'onChange' }],
        nickname: [{ required: true, message: '请填写昵称', trigger: 'onChange' }, { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '昵称是2-6位', trigger: 'onChange' }]
      }
    }
  }

}
</script>

<style>

</style>
