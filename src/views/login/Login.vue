<template>
  <div id="login">
    <div class="login-top">
      <b class="mb">欢迎登录</b>
      <div v-text="sysName"></div>
    </div>
    <div class="login-admin">
      <div class="login-item">
        <input type="text" v-model="userName" placeholder="请输入用户名" maxlength="16" />
      </div>
      <div class="login-item">
        <input :type="passwordType ? 'password' : 'text'" maxlength="24" v-model="password" placeholder="请输入密码" />
        <img src="../../assets/images/password_hide.png" v-if="passwordType" @click="passwordType = false" />
        <img src="../../assets/images/password_show.png" v-else @click="passwordType = true" />
      </div>
      <van-button size="large" type="primary" :loading="isShowLoading" @click="loginSubmit">登录 </van-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Toast } from 'vant'
import api from '@/api/index'

export default {
  name: 'Login',
  data() {
    return {
      isShowLoading: false,
      userName: '', // 登录名
      password: '', // 密码
      sysName: '', // 系统名称
      passwordType: true,
      isBack: false
    }
  },
  methods: {
    /**
     * @description: 提交登录
     * @param {*}
     * @return {*}
     */
    loginSubmit() {
      this.$router.push('/')
      this.isShowLoading = true
      try {
        this.login()
        this.isShowLoading = false
      } catch (err) {
        console.log(err.message)
        this.isShowLoading = false
      }
    },
    login() {
      if (!this.userName) {
        Toast({
          message: '未填写用户名',
          duration: 2000
        })
        return false
      }
      if (!this.password) {
        Toast({
          message: '未填写密码',
          duration: 2000
        })
        return false
      }

      const baseParams = {
        userid: this.userName,
        password: this.password,
      }
      api.login({ params: baseParams })
        .then(res => {
          if (res.data.Code === 0 && res.data.Rst_Data) {
            Toast('登录成功')
            // 跳转
            // that.routerRedirect();
            this.$router.push('/index/index')
          } else {
            Toast.fail(res.data.ErrorMsg)
            // 跳转
            // this.routerRedirect();
          }
        })
        .catch(err => {
          console.log(err)
          // Toast.fail('发生异常');
          //跳转
          // this.routerRedirect();
        })
    },
    /**
     * @description: 跳转处理
     * @param {*}
     * @return {*}
     */
    routerRedirect() {
      const { query } = this.$route
      this.$router.replace({
        name: query.redirect || 'home',
        query: {}
      })
      this.$router.push({ name: query.redirect }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style type="text/css" scoped>
.login-top {
  margin: 50px 20px 70px;
  font-size: 16px;
  text-align: center;
}

.login-top b {
  font-size: 20px;
}

.login-admin {
  margin: 0 30px;
}

.login-item {
  margin-bottom: 30px;
  border-bottom: 1px solid #ccc;
  height: 40px;
  line-height: 40px;
  position: relative;
  padding-right: 40px;
}

.login-item input {
  height: 40px;
  line-height: 40px;
  background: transparent;
  color: #333;
}

.login-item img {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
}
</style>
