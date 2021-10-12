<template>
  <div class="zp-box">
    <div class="turntable" :style="rotateStyle">
      <div class="bck-box" :style="`transform: rotate(${-90+180/prizeList.length}deg)`">
        <div class="bck" v-for="(i,index) in prizeList" :key="index"
          :style="`transform: rotate(${-index*360/prizeList.length}deg) skew(${-90 + 360/prizeList.length}deg);`"></div>
      </div>
      <div class="prize-item" v-for="(item,index) in prizeList" :key="index"
        :style="`transform: rotate(${-index*360/prizeList.length}deg) translateY(-1.35rem);width:${280 * Math.sin(Math.PI / prizeList.length)/37.5}rem`">
        <div class="prize-type">
          <span>{{item.name}}</span>
        </div>
        <div class="prize-pic">
          <img :src="item.icon" />
          <!-- <img src="../assets/image/test.png" /> -->
        </div>
      </div>
    </div>
    <img src="../assets/image/pointer.png" alt="" class="start-btn" @click="beginRotate()">
  </div>
</template>
<script>
import { luckyitems, setLottery, acquireRemain } from '../Api/index'
import { prizeList } from './config'
const CIRCLE_ANGLE = 360

const config = {
  // 总旋转时间
  duration: 4000,
  // 旋转圈数
  circle: 8,
  mode: 'ease-in-out'
}

export default {
  data() {
    return {
      count: 10, // 剩余抽奖次数
      duration: 3000, // 转盘旋转时间
      prizeList: [], // 奖品列表
      rotateAngle: 0, // 旋转角度
      index: 0,
      prize: null,
      id: ''
    };
  },
  created() {
    luckyitems().then((res) => {
      this.prizeList = res.data
      console.log(res);
    })
    // 是否正在旋转
    this.isRotating = false
    // 基本配置
    this.config = config
    this.prizeList = prizeList
  },
  computed: {
    rotateStyle() {
      return `
        -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
        transition: transform ${this.config.duration}ms ${this.config.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
            transform: rotate(${this.rotateAngle}deg);`
    },
  },
  methods: {

    beginRotate() {
      if (this.count === 0) return
      // this.id = parseInt(Math.random() * 10 + 3)
      // this.index = this.setIndex();
      this.index = 2
      this.count--
      this.rotating()
    },
    setIndex() {
      return this.prizeList.findIndex((item) => item.id == this.id);
    },
    rotating() {
      const { isRotating, config, rotateAngle, index } = this
      if (isRotating) return
      this.isRotating = true

      // 计算角度   初始角度    多旋转圈数                           // 奖项的角度
      const angle = rotateAngle + config.circle * CIRCLE_ANGLE + CIRCLE_ANGLE / prizeList.length * index - (rotateAngle % CIRCLE_ANGLE)
      this.rotateAngle = angle

      // 旋转结束后，允许再次触发
      setTimeout(() => {
        this.rotateOver()
      }, config.duration + 1000)
    },
    rotateOver() {
      this.isRotating = false
      this.prize = prizeList[this.index]
      console.log(this.prize, this.index)
    },
  }
};
</script>
<style lang="scss" scoped>
.zp-box {
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 340px;
  height: 340px;
  margin: 30px auto 0;

  // 转盘
  .turntable {
    overflow: hidden;
    border-radius: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 10px solid #a4d8ff;
    background: url('../assets/image/bg2.png');
    box-sizing: border-box;
    background-size: 100% 100%;
    .bck-box {
      width: 305px;
      height: 305px;
      border-radius: 50%;
      overflow: hidden;

      /* 转盘扇形背景 */
      .bck {
        position: absolute;
        width: 100%;
        height: 100%;
        top: -50%;
        left: 50%;
        transform-origin: 0% 100%;
      }
      /* 转盘背景色 */
      .bck:nth-child(2n) {
        background: #bbdcf3;
      }
      .bck:nth-child(2n + 1) {
        background: #2f99ff;
        box-shadow: 0 0 5px #2f99ff;
      }
    }
    .prize-item {
      // font-size: 12px;
      position: absolute;
      height: 60%;
      text-align: center;
      font-weight: 700;
      word-wrap: break-word;
      .prize-type {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 40px;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      /* 转盘背景色 */
      .prize-pic {
        width: 60%;
        margin: 0 auto;
      }
      img {
        width: 100%;
      }
    }
    .prize-item:nth-child(2n) {
      color: #fff;
    }
    .prize-item:nth-child(2n + 1) {
      color: #a98558;
    }
  }

  // 开始按钮
  .start-btn {
    width: 114px;
    height: 130px;
    z-index: 2;
    margin-bottom: 5px;
  }
}
</style>

