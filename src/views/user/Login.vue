<template>
  <div class="login">
     <new-header>登录</new-header>
     <new-logo></new-logo>
<van-form @submit="login">
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules=rules.username
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules=rules.password
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      登录
    </van-button>
  </div>
  <div class="tips">
    <p>还没有账号?,去<router-link to="/register"> 注册</router-link></p>
  </div>
</van-form>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$route)
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async login () {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      console.log(res)
      const { statusCode, message, data } = res.data
      // 登陆成功把token存储到本地
      if (statusCode === 200) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        this.$toast(message)
        this.$router.push('/user')
      } else {
        this.$toast(message)
      }
    }
  },
  data () {
    return {
      username: '',
      password: '',
      rules: {
        password: [{ required: true, message: '请填写密码', trigger: 'onChange' }, { pattern: /^\d{3,9}$/, message: '密码是3-9位', trigger: 'onChange' }],
        username: [{ required: true, message: '请填写用户名', trigger: 'onChange' }, { pattern: /^\d{5,11}$/, message: '用户名是5-11位', trigger: 'onChange' }]
      }
    }
  }
}
</script>

<style lang='less'  scoped>
.tips{
  font-size: 16px;
  text-align: right;
  margin: 16px;
  a{
    color: rgb(40, 98, 214);
  }
}
</style>
