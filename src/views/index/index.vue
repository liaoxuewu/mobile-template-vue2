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
    <van-pull-refresh v-model="isShowLoading" @refresh="onRefresh" v-if="dataList.length">
      <ul class="index-content">
        <li v-for="(item, index) in dataList" :key="index" @click="goToDetail(item)">
          <div>姓名：{{ item.name }}</div>
          <div>年龄：{{ item.age }}</div>
          <div>首页</div>
        </li>
      </ul>
      <div class="menu-list"></div>
      <!--      <h3>扫码登录</h3>-->
      <!--      <div class="qrcode-container-total d-f a-c j-c">-->
      <!--        &lt;!&ndash;前端生成二维码，需要给二维码一个容器  &ndash;&gt;-->

      <!--        <div class="qrcode-container" ref="qrCodeContainer"></div>-->
      <!--        <div class="qrcode-phone">-->
      <!--          &lt;!&ndash;          <img src="@/assets/img/scan-phone.png" alt="" />&ndash;&gt;-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="dust d-f f-d a-c j-c" v-if="needUpdate">-->
      <!--        <h4>二维码已失效</h4>-->
      <!--        <a-button type="primary" @click="update"> 点击刷新 </a-button>-->
      <!--      </div>-->
      <!--      <div class="dust d-f f-d a-c j-c" v-if="hasScan">-->
      <!--        <h4>已扫描</h4>-->
      <!--        <h4>请在手机上确认登录</h4>-->
      <!--      </div>-->
      <!--      <div class="dust d-f f-d a-c j-c" v-if="hasSuccess">-->
      <!--        <h4>登录成功，跳转中…</h4>-->
      <!--      </div>-->
      <!--      <p>请使用 微信扫一扫 扫描二维码登录</p>-->
      <!--      <a class="ReturnLogin" @click="goLogin">返回登录</a>-->
    </van-pull-refresh>
    <g-empty v-else style="margin-top: 50%"></g-empty>
    <!-- 菜单弹窗 -->
    <div class="pops" v-if="menuShow">
      <div class="pop-bg" @click="menuShow = false"></div>
      <ul class="pop pop-menu" style="text-align: center">
        <li @click="tabShow = true">切换</li>
        <li @click="clickPop">操作人</li>
      </ul>
    </div>
    <van-popup class="operate-info" v-model="isShowPersonInfo">
      <div class="operate-info-item">
        工号：<span>{{ userInfo.id }}</span>
      </div>
      <div class="operate-info-item">
        姓名：<span>{{ userInfo.name }}</span>
      </div>
    </van-popup>
    <van-loading type="spinner" class="van-loading-control" v-if="isShowLoading"></van-loading>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import permissionPlane from '../../assets/json/permission_plane.json'
export default {
  name: 'index',
  data() {
    return {
      isShowLoading: false,
      searchText: '', // 搜索内容
      menuShow: false, // 菜单是否显示
      appId: '',
      userInfo: {
        id: '',
        name: ''
      },
      tabShow: false,
      isShowPersonInfo: false, // 操作人信息弹窗
      areaList: [],
      dataList: [],
      imgIndex: 0,
      uuid: '',
      timer: null,
      baseUrl: process.env.VUE_APP_BASEURL,
      needUpdate: false,
      hasScan: false,
      hasSuccess: false
    }
  },
  mounted() {
    this.appId = config.appId
    const mySet = new Set()
    mySet.add(1)
    mySet.add('苟利国家生死以')
    mySet.add('岂因祸福避趋之')
    // console.log(mySet)
    // this.getUuid()
    // this.timer = setInterval(() => {
    //   this.checkUuid()
    // }, 1000)
    class User {
      static #MAX_INSTANCES = 2
      static #instances = 0
      name
      constructor(name) {
        User.#instances++
        if (User.#instances > User.#MAX_INSTANCES) {
          throw new Error('Unable to create User instance')
        }
        this.name = name
      }
      getPublicName() {
        return this.name
      }
    }
    const arr = [1, 2, 3, 4, 5]
    delete arr[2]
    // 清空数组
    // arr.splice(0)
    // arr.length = 0
    // console.log(arr)
    // 返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键/值对
    const iter = arr.entries()
    // console.log(iter.next())
    for (let [k, v] of arr.entries()) {
      // console.log(k, v)
    }

    class Player {
      constructor(name, score) {
        this.name = name
        this.score = score
      }
      setName(name) {
        this.name = name
      }
      setScore(score) {
        this.score = score
      }
      getName() {
        return this.name
      }
      getScore() {
        return this.score
      }
    }
    const player = new Player()
    player.setName('刘备')
    player.setScore(10)
    // console.log(player)
    // console.log(player.getName())

    const obj = {
      name: '赵云',
      age: 20
    }
    // console.log(Object.values(obj))

    const required = () => {
      throw new Error('Function need a parameter')
    }
    function fun(value = required()) {
      return value * 2
    }
    // fun()

    function once(fn) {
      let called = false
      return function () {
        if (called) {
          called = true
          fn.apply(this, arguments)
        }
      }
    }
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      this.isShowLoading = true
      try {
        // console.log(permissionPlane)
        // this.exportEx()
        this.indexedDBFun()
        this.reset()
        this.getDataList()
      } catch (e) {
        console.log(e)
      } finally {
        this.isShowLoading = false
      }
    },
    /**
     * json转换成xls文件
     */
    exportEx() {
      // val:需要导出的json数据
      let JSONData = permissionPlane
      let ShowLabel = [
        'id',
        'p_id',
        'menu_name',
        'menu_type',
        'sort',
        'permission_code',
        'api',
        'path',
        'params',
        'status',
        'visible',
        'is_link',
        'icon',
        'route',
        'activeIcon'
      ] // 导出的excel的表头数据
      // 先转化json
      let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData
      // 给数组内容换好位置
      let finalData = [] // 最终要导出的json数据，其中json数据顺序要和表头数据顺序一致
      arrData.forEach(item => {
        let obj = {
          id: item.id,
          pId: item.pId,
          name: item.name,
          type: item.type,
          sort: item.sort,
          code: item.code,
          api: item.api,
          path: item.path,
          params: item.params,
          status: item.status,
          visible: item.visible,
          isLink: item.isLink,
          icon: item.icon,
          route: item.route,
          activeIcon: item.activeIcon
        }
        finalData.push(obj)
      })
      let excel = '<table>'
      //设置表头
      let row = '<tr>'
      for (let i = 0; i < ShowLabel.length; i++) {
        row += '<td>' + ShowLabel[i] + '</td>'
      }
      //换行
      excel += row + '</tr>'
      //设置数据
      for (let i = 0; i < finalData.length; i++) {
        let row = '<tr>'
        for (let index in finalData[i]) {
          let value = finalData[i][index]
          if (index === 'imei') {
            // 当数字超过一定长度就科学计数法可以使用style='mso-number-format:"\@"'
            // 这个属性指定某单元格的数据格式，避免Excel自动转换格式
            row += `<td style='mso-number-format:\"\\@\"'>${value}</td>`
          } else {
            row += '<td>' + value + '</td>'
          }
        }
        excel += row + '</tr>'
      }
      excel += '</table>'
      let excelFile =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>"
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel'
      excelFile += '; charset=UTF-8">'
      excelFile += '<head>'
      excelFile += '<!--[if gte mso 9]>'
      excelFile += '<xml>'
      excelFile += '<x:ExcelWorkbook>'
      excelFile += '<x:ExcelWorksheets>'
      excelFile += '<x:ExcelWorksheet>'
      excelFile += '<x:Name>'
      excelFile += '{worksheet}'
      excelFile += '</x:Name>'
      excelFile += '<x:WorksheetOptions>'
      excelFile += '<x:DisplayGridlines/>'
      excelFile += '</x:WorksheetOptions>'
      excelFile += '</x:ExcelWorksheet>'
      excelFile += '</x:ExcelWorksheets>'
      excelFile += '</x:ExcelWorkbook>'
      excelFile += '</xml>'
      excelFile += '<![endif]-->'
      excelFile += '</head>'
      excelFile += '<body>'
      excelFile += excel
      excelFile += '</body>'
      excelFile += '</html>'
      let uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile)
      let link = document.createElement('a')
      link.href = uri
      link.style = 'visibility:hidden'
      link.download = 'menu_auth.xls'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    indexedDBFun() {
      let db
      window.onload = function () {
        let request = window.indexedDB.open('notes', 1)
        // onerror handler signifies that the database didn't open successfully
        request.onerror = function () {
          console.log('Database failed to open')
        }

        // onsuccess handler signifies that the database opened successfully
        request.onsuccess = function () {
          console.log('Database opened successfully')
          // Store the opened database object in the db variable. This is used a lot below
          db = request.result

          // Run the displayData() function to display the notes already in the IDB
          addData()
          displayData()
        }
        // Setup the database tables if this has not already been done
        request.onupgradeneeded = function (e) {
          // Grab a reference to the opened database
          let db = e.target.result

          // Create an objectStore to store our notes in (basically like a single table)
          // including a auto-incrementing key
          let objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true })

          // Define what data items the objectStore will contain
          objectStore.createIndex('title', 'title', { unique: false })
          objectStore.createIndex('body', 'body', { unique: false })

          console.log('Database setup complete')
        }
        // Define the addData() function
        function addData(e) {
          // prevent default - we don't want the form to submit in the conventional way
          // e.preventDefault()

          // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
          let newItem = { title: '国籍', body: '中国' }

          // open a read/write db transaction, ready for adding the data
          let transaction = db.transaction(['notes'], 'readwrite')

          // call an object store that's already been added to the database
          let objectStore = transaction.objectStore('notes')

          // Make a request to add our newItem object to the object store
          let request = objectStore.add(newItem)
          request.onsuccess = function () {
            // Clear the form, ready for adding the next entry
          }

          // Report on the success of the transaction completing, when everything is done
          transaction.oncomplete = function () {
            console.log('Transaction completed: database modification finished.')
            // update the display of data to show the newly added item, by running displayData() again.
            displayData()
          }

          transaction.onerror = function () {
            console.log('Transaction not opened due to error')
          }
        }
        // Define the displayData() function
        function displayData() {
          // Here we empty the contents of the list element each time the display is updated
          // Open our object store and then get a cursor - which iterates through all the
          // different data items in the store
          let objectStore = db.transaction('notes').objectStore('notes')
          objectStore.openCursor().onsuccess = function (e) {
            // Get a reference to the cursor
            let cursor = e.target.result

            // If there is still another data item to iterate through, keep running this code
            if (cursor) {
              // Create a list item, h3, and p to put each data item inside when displaying it
              // structure the HTML fragment, and append it inside the list
              let listItem = document.createElement('li')
              let h3 = document.createElement('h3')
              let para = document.createElement('p')
              // Put the data from the cursor inside the h3 and para
              h3.textContent = cursor.value.title
              para.textContent = cursor.value.body

              // Store the ID of the data item inside an attribute on the listItem, so we know
              // which item it corresponds to. This will be useful later when we want to delete items
              listItem.setAttribute('data-note-id', cursor.value.id)

              // Create a button and place it inside each listItem
              let deleteBtn = document.createElement('button')
              listItem.appendChild(deleteBtn)
              deleteBtn.textContent = 'Delete'
              // Iterate to the next item in the cursor
              cursor.continue()
            } else {
              // if there are no more cursor items to iterate through, say so
              console.log('Notes all displayed')
            }
          }
        }
      }
    },
    /**
     * 搜索函数
     */
    searchFun(content) {
      const baseParams = {}
    },
    /**
     * @description: 获取数据
     * @return list
     */
    getDataList() {
      this.dataList = [
        { name: '曹操', age: 18 },
        { name: '刘备', age: 16 }
      ]
    },
    /**
     * 刷新获取数据
     */
    onRefresh() {
      setTimeout(() => {
        this.init()
      }, 1000)
    },
    clickPop() {
      this.isShowPersonInfo = true
    },
    /**
     * 重置
     */
    reset() {},
    /**
     * 跳转详情
     */
    goToDetail() {
      this.$router.push({
        path: '/detail'
      })
    },
    /**
     * 点击刷新
     */
    update() {
      this.$refs.qrCodeContainer.innerHTML = ''
      this.needUpdate = false
      this.getUuid()
      this.timer = setInterval(() => {
        this.checkUuid()
      }, 1000)
    },
    /**
     * 生成二维码
     */
    bindQRCode() {
      new QRCode(this.$refs.qrCodeContainer, {
        //这里很重要，在网上看了这里都是微信重定向的地址，我们的需求实现不了，其实是后端的地址！！！！！！给后端去判断重定向
        //https://open.weixin.qq.com/connect/qrconnectappid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect  就是这一串，这里重定向的地址就是h5页面

        text: this.baseUrl + '/acl/wx/wxScan/?uuid=' + this.uuid,
        width: 140,
        height: 140,
        colorDark: '#333333', //二维码颜色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      })
    },
    /**
     * 获取uuid
     */
    getUuid() {
      this.$api.getUUID().then(res => {
        if (res.success) {
          this.uuid = res.data.uuid
          this.bindQRCode()
        }
      })
    },
    /**
     * 检查uuid状态
     */
    checkUuid() {
      this.$api.checkUUID({ UUID: this.uuid }).then(res => {
        if (res.data.ret === '3') {
          clearInterval(this.timer)
          this.hasSuccess = true
          this.$ls.set('token', res.data.token)
          if (this.$ls.get('token')) {
            //路由跳转
            this.$router.push({ name: 'main' })
          }
        } else if (res.data.ret === '2') {
          clearInterval(this.timer)
          this.needUpdate = true
        } else if (res.data.ret === '1') {
          clearInterval(this.timer)
          this.hasScan = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-list {
  width: 100px;
  height: 50px;
  background: yellowgreen;
  border-radius: 0px 300px 0px 300px;
}
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
  li {
    float: left;
    text-align: left;
    width: calc(50% - 8px);
    border-radius: 3px;
    border: 1px solid #ccc;
    margin: 0 0 5px 5px;
    padding: 5px;
    line-height: 20px;
    font-size: 12px;
    p {
      color: #454545;
    }
  }
}

.pop-menu {
  top: 40px;
  right: 5px;
  width: 100px;
  li {
    line-height: 48px;
    font-size: 16px;
    color: #454545;
    border-bottom: 1px solid #ccc;
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>

<style>
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
