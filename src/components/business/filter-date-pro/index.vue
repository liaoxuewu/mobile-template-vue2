<!--
 * @Description: 日期事件筛选
 * @Author BPF
 * @create 2021/11/30 15:44
 -->
<template>
  <div class="filter-date-pro">
    <div class="filter__wrap">
      <div class="filter__item" @click="visible.dateType = true">
        <span :class="[dateLabel && 'filter__item--active']">{{ dateLabel ? dateLabel : '选择日期' }}</span>
        <!--        <van-icon name="play" size="0.28rem" style="transform: rotate(90deg)" />-->
        <i class="fa fa-caret-down"></i>
      </div>
    </div>
    <van-popup v-model="visible.dateType" position="bottom" :lazy-render="false" get-container="body">
      <div class="popup-body">
        <div class="top-header">
          <div @click="visible.dateType = false">取消</div>
          <div @click="onConfirmDateType">确定</div>
        </div>
        <div class="date-type">
          <div
            v-for="(item, index) in _dateTypes"
            :key="index"
            :class="['date-type__item', value == item.value && 'date-type__item--active']"
            @click="onChooseDateType(item)"
          >
            {{ item.label }}
          </div>
        </div>
        <van-picker ref="picker" :show-toolbar="false" :columns="dateColumns" :visible-item-count="7" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { computedDays } from '@/utils/common'
import { sync } from 'vuex-pathify'

const conf = {
  年: {
    label: '按年份',
    value: '年',
    list: [...new Array(new Date().getFullYear() - 2015 + 1)].map((v, vi) => ({
      value: 2015 + vi,
      label: `${2015 + vi}年`
    }))
  },
  季: {
    label: '按季度',
    value: '季',
    list: [
      { value: '1', label: '第一季度', months: [1, 2, 3] },
      { value: '2', label: '第二季度', months: [4, 5, 6] },
      { value: '3', label: '第三季度', months: [7, 8, 9] },
      { value: '4', label: '第四季度', months: [10, 11, 12] }
    ]
  },
  月: {
    label: '按月份',
    value: '月',
    list: [...new Array(12)].map((v, vi) => ({ value: `${vi + 1}`.padStart(2, '0'), label: `${vi + 1}月` }))
  },
  日: { label: '按日期', value: '日', list: [] }
}

export default {
  name: 'filter-date-pro',
  props: {
    dateTypes: {
      type: Array,
      default: () => ['年', '季', '月', '日']
    },
    value: {
      type: String,
      default: '日'
    }
  },

  model: {
    prop: 'value',
    event: 'setValue'
  },

  data() {
    return {
      dateLabel: '',
      visible: {
        dateType: false
      },
      dateColumns: []
    }
  },

  computed: {
    _filterDateObj: sync('user/filterDateObj'),

    _dateTypes() {
      return this.dateTypes.map(v => conf[v])
    }
  },

  watch: {
    value: {
      handler(newVal) {
        this.handlerAllDate(newVal)
      }
    }
  },

  async mounted() {
    const { type, indexes } = this._filterDateObj || {}
    if (type) this.$emit('setValue', type)
    this.handlerAllDate(this.value)
    this.$nextTick(async () => {
      if (Array.isArray(indexes) && indexes?.length && this.$refs.picker) {
        this.$refs.picker.setIndexes(indexes)
      }
      const { dateLabel } = await this.getDate()
      this.dateLabel = dateLabel
    })
  },

  methods: {
    // @expose 获取日期
    getDate() {
      return new Promise(resolve => {
        this.$nextTick(() => {
          let params = {}
          let dateLabel = ''
          switch (this.value) {
            case '年': {
              const [yIndex] = this.$refs.picker.getIndexes()
              const year = this.dateColumns[yIndex]?.value
              params = computedDays(this.value, `${year}-01-01`)
              dateLabel = `${year}年`
              break
            }
            case '季': {
              const [yIndex, qIndex] = this.$refs.picker.getIndexes()
              const year = this.dateColumns[yIndex]?.value
              const quarter = this.dateColumns[yIndex]?.children[qIndex]?.value
              const quarterLabel = this.dateColumns[yIndex]?.children[qIndex]?.text
              params = computedDays(this.value, `${year}-${quarter.slice().pop().toString().padStart(2, '0')}`)
              dateLabel = `${year}年${quarterLabel}`
              break
            }
            case '月': {
              const [yIndex, mIndex] = this.$refs.picker.getIndexes()
              const year = this.dateColumns[yIndex]?.value
              const month = this.dateColumns[yIndex]?.children[mIndex]?.value
              const monthLabel = this.dateColumns[yIndex]?.children[mIndex]?.text
              params = computedDays(this.value, `${year}-${month}`)
              dateLabel = `${year}年${monthLabel}`
              break
            }
            case '日': {
              const [yIndex, mIndex, dIndex] = this.$refs.picker.getIndexes()
              const year = this.dateColumns[yIndex]?.value
              const month = this.dateColumns[yIndex]?.children[mIndex]?.value
              const day = this.dateColumns[yIndex]?.children[mIndex]?.children[dIndex]?.value
              params = computedDays(
                this.value,
                this.$dayjs(`${year}-${month}-${day}`).add(1, 'day').format('YYYY-MM-DD')
              )
              dateLabel = `${year}年${month}月${day}日`
              break
            }
          }
          resolve({
            ...params,
            dateLabel
          })
        })
      })
    },

    /**
     * 确认
     */
    async onConfirmDateType() {
      const params = await this.getDate()
      this.dateLabel = params.dateLabel
      this.visible.dateType = false
      this.$emit('confirm', params)
      console.log('params', params)
      this.$nextTick(() => {
        this._filterDateObj = {
          type: this.value,
          indexes: this.$refs.picker.getIndexes()
        }
      })
    },

    /**
     * 选择日期类别
     * @param val
     */
    onChooseDateType(val) {
      this.$emit('setValue', val.value)
    },

    /**
     *处理所有日期
     * @param date
     */
    handlerAllDate(date = '日') {
      const handlersFn = {
        年: this.handleYear.bind(this),
        季: this.handleQuarter.bind(this),
        月: this.handlerMonth.bind(this),
        日: this.handlerDay.bind(this)
      }
      date ? handlersFn[date]?.() : (this.dateColumns = [])
    },

    /**
     * 处理年
     */
    handleYear() {
      this.$nextTick(() => {
        this.$refs.picker && this.$refs.picker.setIndexes([conf.年.list.length - 1])
      })
      this.dateColumns = conf.年.list.map(v => {
        return {
          text: v.label,
          value: v.value
        }
      })
    },

    /**
     * 处理月
     */
    handlerMonth() {
      const year = new Date().getFullYear()
      const curMonth = new Date().getMonth() + 1
      this.$nextTick(() => {
        this.$refs.picker && this.$refs.picker.setIndexes([conf.年.list.length - 1, curMonth - 1])
      })
      this.dateColumns = conf.年.list.map(v => {
        return {
          text: v.label,
          value: v.value,
          children: conf.月.list.map(o => {
            return {
              text: o.label,
              value: o.value,
              disabled: +v.value >= year && o.value > curMonth - 1
            }
          })
        }
      })
    },

    /**
     * 处理季
     */
    handleQuarter() {
      const year = new Date().getFullYear()
      const quarterIndex = conf.季.list.findIndex(v => {
        return v.months.includes(Number(new Date().getMonth() + 1))
      })
      this.$nextTick(() => {
        this.$refs.picker && this.$refs.picker.setIndexes([conf.年.list.length - 1, quarterIndex || 0])
      })
      this.dateColumns = conf.年.list.map(v => {
        return {
          text: v.label,
          value: v.value,
          children: conf.季.list.map((o, oi) => {
            return {
              text: o.label,
              value: o.months,
              disabled: +v.value >= year && oi > quarterIndex - 1
            }
          })
        }
      })
    },

    /**
     * 处理日
     */
    handlerDay() {
      const date = new Date()
      const curYear = date.getFullYear()
      const curMonth = date.getMonth() + 1
      const curDay = date.getDate()
      this.$nextTick(() => {
        this.$refs.picker && this.$refs.picker.setIndexes([conf.年.list.length - 1, curMonth - 1, curDay - 1])
      })
      this.dateColumns = conf.年.list.map(v => {
        return {
          text: v.label,
          value: v.value,
          disabled: +v.value > curYear,
          children: conf.月.list.map(o => {
            return {
              text: o.label,
              value: o.value,
              disabled: +v.value >= curYear && o.value > curMonth,
              children: [...new Array(Number(dayjs(`${v.value}-${o.value}`).daysInMonth()))].map((k, ki) => {
                return {
                  text: `${ki + 1}日`,
                  value: `${ki + 1}`.padStart(2, '0'),
                  disabled:
                    +v.value >= curYear &&
                    o.value >= curMonth &&
                    Number(`${o.value.toString().padStart(2, '0')}${ki.toString().padStart(2, '0')}`) >
                      Number(`${curMonth.toString().padStart(2, '0')}${(curDay - 2).toString().padStart(2, '0')}`)
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
