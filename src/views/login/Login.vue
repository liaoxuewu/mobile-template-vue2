<template>
  <div id="login">
    <div class="login-top">
      <b class="mb">欢迎登录</b>
      <div v-text="sysName"></div>
    </div>
    <div class="login-admin">
      <div class="login-box">
        <input type="text" v-model="userName" placeholder="请输入用户名" maxlength="16" />
      </div>
      <div class="login-box">
        <input :type="pwType ? 'password' : 'text'" maxlength="24" v-model="password" placeholder="请输入密码" />
        <img src="../../assets/img/pwno.png" v-if="pwType" @click="pwType = false" />
        <img src="../../assets/img/pwyes.png" v-else @click="pwType = true" />
      </div>
      <van-button size="large" type="primary" :loading="isShowLoading" @click="loginSubmit">登录 </van-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Toast } from 'vant'
import api from '@/api/api'
import constkey from '@/api/constkey'
import { setLocalStorage } from '@/plugins/modules/local-storage'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      isShowLoading: false,
      userName: '', // 登录名
      password: '', // 密码
      sysName: '', // 系统名称
      pwType: true,
      isBack: false
    }
  },
  methods: {
    // 声明Vuex的mutations的方法
    ...mapMutations(['updateTokenStatus']),
    /**
     * @description: 提交登录
     * @param {*}
     * @return {*}
     */
    loginSubmit() {
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
      let wxUserId = sessionStorage.getItem('userId')
      // wxUserId = '1000005'

      const baseParams = {
        WxUserId: wxUserId,
        hospcode: this.hospCode,
        userid: this.userName,
        password: this.password,
        systype: config.sysType
      }
      api.login
        .BindCode({ params: baseParams })
        .then(res => {
          if (res.data.Code === 0 && res.data.Rst_Data) {
            Toast('登录成功')

            //写入token等等
            setLocalStorage({
              [constkey.Key_Auth]: res.data.Rst_Data.AccessToken
            })
            sessionStorage.setItem('accessToken', res.data.Rst_Data.AccessToken)
            //更新vuex状态
            // 改变Vuex.state.tokenStatus的值
            this.updateTokenStatus(true)

            //跳转
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

.login-box {
  margin-bottom: 30px;
  border-bottom: 1px solid #ccc;
  height: 40px;
  line-height: 40px;
  position: relative;
  padding-right: 40px;
}

.login-box input {
  height: 40px;
  line-height: 40px;
  background: transparent;
  color: #333;
}

.login-box img {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
}
</style>
