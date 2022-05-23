<template>
  <div class="index-container">
    <div class="index-search">
      <!-- <van-icon name="arrow-left" /> -->
      <div style="width: 100%">
        <van-search
          v-model="searchText"
          @input="searchFun(searchText)"
          placeholder="请输入搜索关键词"
          background="#33b8ff"
        />
      </div>
      <van-icon name="ellipsis" @click="menuShow = true" />
    </div>
    <ul class="index-content" v-if="pData.length > 0">
      <li v-for="(v, i) in pData" :key="i" @click="goToDetail(v)"></li>
    </ul>
    <div class="index-content" v-else style="text-align: center; font-size: 16px; margin-top: 30px">暂无数据</div>
    <!-- 菜单弹窗 -->
    <div class="pops" v-if="menuShow">
      <div class="pop-bg" @click="menuShow = false"></div>
      <ul class="pop pop-menu" style="text-align: center">
        <li @click="tabShow = true">切换科室</li>
        <li @click="clickPop">操作人</li>
      </ul>
    </div>
    <van-popup class="operate-info" v-model="isShowPersonInfo">
      <div class="operate-info-item">
        工号：<span>{{ userId }}</span>
      </div>
      <div class="operate-info-item">
        姓名：<span>{{ docName }}</span>
      </div>
      <div class="operate-info-item">
        openID：<span>{{ openId }}</span>
      </div>
    </van-popup>
    <van-action-sheet
      v-model="tabShow"
      :actions="areaList"
      @select="selectArea"
      cancel-text="取消"
      description="选择科室"
    />
    <van-loading type="spinner" class="van-loading-control" v-if="isShowLoading"></van-loading>
  </div>
</template>

<script>
import { Toast } from 'vant'
import api from '@/api/api'

export default {
  name: 'index',
  data() {
    return {
      isShowLoading: false,
      searchText: '', // 搜索内容
      menuShow: false, // 菜单是否显示
      code: '', // 企业号返回的code
      agentId: '',
      userCode: '',
      openId: '',
      userId: '',
      tabShow: false,
      isShowPersonInfo: false, // 操作人信息弹窗
      areaList: [],
      pData: [],
      imgIndex: 0
    }
  },
  mounted() {
    this.hospCode = config.hospCode
  },
  methods: {
    /**
     * 企业微信登录
     */
    openWeChatFun() {
      this.isShowLoading = true
      let url = window.location.href
      // url = "http://bi.lzszyyy.com:9802/?agentid=201000006&code=RFwznmZRlZ3wPqHxDfKT45M3kiBcn86nRAHsw8Igpk4&state=STATE#/ydcf/ydcf_index";
      if (url.indexOf('agentid') > -1 && url.indexOf('code') > -1) {
        if (url.indexOf('#') > -1) {
          let arr = url.split('#')
          if (arr[0].indexOf('?') > -1) {
            let arr2 = arr[0].split('?')[1]
            this.code = this.getQueryString(arr2, 'code')
            let newAgentId = this.getQueryString(arr2, 'agentid')
            console.log(newAgentId + '这是newAgentId')
            // 判断code是否和上次一样
            if (newAgentId.substr(newAgentId.length - 1, 1) === '/') {
              this.agentId = newAgentId.substr(0, newAgentId.length - 1)
            } else {
              this.agentId = newAgentId
            }
            this.verifyToken(newAgentId)
          }
        }
      } else {
        // this.checkCodeFun();
        // this.getAreaList()
        this.isShowLoading = false
        Toast({
          message: '请使用企业微信登录',
          duration: 1000
        })
      }
    },
    openDingTalkFun() {
      console.log('钉钉调试开始')
      // 钉钉sdk 初始化
      // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
      dd.ready(() => {
        // 获取当前网页的url
        // http://ding-web.lnexin.cn/?corpid=ding46a9582af5b7541b35c2fxxxxxxxxxx8f
        console.log('初始化函数')
        const currentUrl = document.location.toString()
        console.log(currentUrl + 'currentUrl----')
        // 解析url中包含的corpId
        if (currentUrl.split('corpid=')[1]) {
          const corpId = currentUrl.split('corpid=')[1]
          console.log(corpId + 'corpId----')
          // 使用SDK 获取免登授权码
          dd.runtime.permission.requestAuthCode({
            corpId: corpId,
            onSuccess: result => {
              this.code = result.code
              console.log(this.code + 'code dingding----')
              this.verifyToken('')
              //请求我们服务端的登陆地址
              // $.get("https://nethosp.mandalat.cn:9443/assistant/Author/CheckCode?code="+code+"&hospcode=wxey&systype=DD&agentid=1", function (response) {
              //
              // });
            }
          })
        } else {
          // this.checkCodeFun();
          // this.getAreaList()
          this.verifyToken('')
          this.isShowLoading = false
          // Toast({
          //   message: '请使用钉钉登录',
          //   duration: 1000
          // })
        }
      })
    },
    verifyToken(newAgentId) {
      let accessToken = sessionStorage.getItem('accessToken')
      if (accessToken === null || accessToken === undefined || accessToken === '') {
        console.log(this.code + '新code')
        console.log(sessionStorage.getItem('code') + '缓存code')
        if (this.code === sessionStorage.getItem('code')) {
          // code和上次一样
          window.location.href =
            'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
            config.appId +
            '&redirect_uri=' +
            config.indexUrl +
            '&response_type=code&scope=SCOPE&agentid=' +
            newAgentId +
            '&state='
          this.isShowLoading = false
          // this.getAreaList();
        } else {
          // code和上次不一样
          console.log('code和上次不一样')
          sessionStorage.setItem('agentId', '')
          sessionStorage.setItem('code', this.code)
          this.checkCodeFun()
        }
      } else {
        this.getAreaList()
      }
    },
    /**
     * 判断用户是否绑定账号
     */
    checkCodeFun() {
      if (config.sysType === 'DD') {
        this.agentId = config.agentId
      }
      const baseParams = {
        code: this.code,
        hospcode: this.hospCode,
        agentid: this.agentId,
        systype: config.sysType // QYWX：企业微信 DD：钉钉
      }
      console.log(baseParams + 'checkcode函数baseParams')
      // this.getAreaList()
      api.login.CheckCode({ params: baseParams }).then(res => {})
    },
    /**
     * 搜索函数
     */
    searchFun(content) {
      const baseParams = {
        hosp_code: this.hospCode,
        areacode: this.areaCode,
        search: content
      }
      GetInHospPatientLike({ params: baseParams }).then(res => {
        this.pData = []
      })
    },
    /**
     * 获取列表
     */
    getList() {
      const baseParams = {
        hosp_code: this.hospCode,
        doct_code: this.userId
      }
    },
    /**
     * 企业微信登录时截取url中的code和agentid
     */
    getQueryString: function (url, name) {
      if (url.indexOf('&') > -1) {
        let arr = url.split('&')
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].indexOf('=') > -1) {
            let arr2 = arr[i].split('=')
            if (arr2[0] == name) {
              return arr2[1]
            }
          }
        }
      }
      return false
    },
    clickPop() {
      this.isShowPersonInfo = true
    },
    /**
     * 跳转详情
     */
    goToDetail() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style type="text/css" scoped>
.index-search {
  position: fixed;
  top: 0;
  width: calc(100% - 20px);
  height: 50px;
  background: #33b8ff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
  color: #fff;
  font-size: 20px;
  z-index: 4;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.index-content {
  overflow: auto;
  margin-top: 55px;
  padding: 0 5px 0 5px;
}

.index-content li {
  float: left;
  text-align: left;
  width: calc(50% - 8px);
  border-radius: 3px;
  border: 1px solid #ccc;
  margin: 0 0 5px 5px;
  padding: 5px;
  line-height: 20px;
  font-size: 12px;
}

.index-content li p {
  color: #454545;
}

.pop-menu {
  top: 40px;
  right: 5px;
  width: 100px;
}

.pop-menu li {
  line-height: 48px;
  font-size: 16px;
  color: #454545;
  border-bottom: 1px solid #ccc;
}

.pop-menu li:nth-child(last) {
  border-bottom: 0;
}
</style>

<style type="text/css">
.index-search .van-search {
  padding: 3px 10px;
}
.operate-info {
  font-size: 18px;
  width: 50%;
  padding: 0 0 5px 5px;
}
.operate-info-item {
  padding: 5px 5px 0 0;
}
</style>
