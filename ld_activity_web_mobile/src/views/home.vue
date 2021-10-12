<template>
  <div class="home">
    <div class="top-bg">
      <img src="../assets/image/big_Turntable.png" alt="">
      <LuckyWheel></LuckyWheel>
    </div>
    <div class="card" @click="resultShow = true">
      <div class="card-info">
        <div class="logo">
          <img src="../assets/image/logo_img.png" alt="">
          <img src="../assets/image/logo_text.png" alt="">
        </div>
        <div class="info">
          <img src="../assets/image/head.png" alt="">
          <div>
            <p>游客233333</p>
            <p>188****2222</p>
          </div>
        </div>
        <div class="integrate">
          累计已获得<span>200</span>积分
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="card-shop">
        <img src="../assets/image/shop_mall.png" alt="">
        <div>立即进入积分商城</div>
      </div>
    </div>
    <div class="activity-rule" @click="ruleShow = true">活动规则
      <van-icon name="arrow" />
    </div>
    <div class="participate">
      <div class="head-box">
        <img src="../assets/image/head1.png" alt="">
        <img src="../assets/image/head2.png" alt="">
        <img src="../assets/image/head1.png" alt="">
        <img src="../assets/image/head2.png" alt="">
        <img src="../assets/image/head1.png" alt="">
      </div>
      <!-- TODO -->
      <div class="participate-number"><b>...</b><span>528,789</span>人已参与</div>
    </div>

    <van-popup v-model="ruleShow">
      <div class="rule-box">
        <div>活动规则</div>
        <div>
          假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字假文字
        </div>
      </div>
    </van-popup>
    <van-popup v-model="resultShow">
      <div class="result-box">

        <div class="result-img">
          <div class="winning-box" v-if="isWinning">
            <div>
              <i></i>
              <span>恭喜您</span>
              <i></i>
            </div>
          </div>
          <img src="../assets/image/losing_img.png" alt="" v-else>
        </div>

        <p>{{isWinning ? '抽到20积分' : '谢谢参与'}}</p>
        <p>{{isWinning ? '共计30积分' : '中奖不是最终追求，重要的是要开心啊'}}</p>
        <div class="mall-button">立即进入积分商城</div>
        <div class="tips">
          <van-icon name="volume" />积分可兑换：网络药学视频
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Icon, Popup } from 'vant'
import LuckyWheel from '../components/luckywheel.vue'
export default {
  name: "Home",
  components: {
    LuckyWheel,
    [Icon.name]: Icon,
    [Popup.name]: Popup
  },
  data() {
    return {
      isWinning: true,
      ruleShow: false,
      resultShow: false
    }
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.result-box {
  padding-bottom: 20px;
  text-align: center;
  color: #fff;
  background: #35bafd;
  width: 80vw;
  .result-img {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    height: 210px;
    // border-radius: 100% 100% 100% 100% / 0 0 15% 15%;
    border-radius: 100% 100% 200% 200% / 0 0 80% 80%;
    margin-bottom: 5px;
    & > img {
      height: 80%;
    }
    .winning-box {
      height: 100%;
      width: 100%;
      color: #ff9d2b;
      background: url('../assets/image/winning_img.png') no-repeat;
      background-size: 100%;
      background-position: 0 -82px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      div {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        span {
          font-family: 'SourceHanSansCN-Medium';
          margin: 0 25px 3px;
          letter-spacing: 2px;
        }
        i {
          width: 30px;
          height: 2px;
          background: #ff9d2b;
        }
      }
    }
  }
  p:nth-child(2) {
    font-size: 28px;
    line-height: 54px;
  }
  .mall-button {
    display: inline-block;
    background: #0074ee;
    border-radius: 10px;
    line-height: 36px;
    font-size: 18px;
    padding: 0 10px;
    margin: 20px 0;
    letter-spacing: 1px;
  }
  .tips {
    // text-align: left;
    i {
      margin-right: 5px;
    }
  }
}

.home {
  padding-bottom: 30px;
}

.top-bg {
  height: 605px;
  background: url('../assets/image/lottery_bg.png') no-repeat;
  background-size: 100%;
  img {
    width: 76vw;
    margin: 48px 0 0 12px;
  }
}

.card {
  display: flex;
  background: #ffffff;
  margin: -60px 12px 0;
  border-radius: 10px;
  box-shadow: 0px 2px 10px #ccc;
  padding: 10px 16px 20px;
  .card-info {
    width: 56%;
    .logo {
      display: flex;
      align-items: center;
      img:nth-child(1) {
        width: 36px;
        margin-right: 8px;
      }
      img:nth-child(2) {
        height: 18px;
      }
    }
    .info {
      border-right: 2px solid #d8d8d8;
      margin: 32px 0;
      align-items: center;
      display: flex;
      img {
        width: 56px;
        margin-right: 10px;
      }
      p:nth-child(1) {
        font-weight: 700;
        margin-bottom: 2px;
      }
      p:nth-child(2) {
        font-size: 10px;
      }
    }
    .integrate {
      font-weight: 700;
      margin-left: 5px;
      span {
        font-size: 22px;
      }
    }
  }
  .card-shop {
    flex: 1;
    margin-left: 12px;
    img {
      width: 78%;
      margin: 10px auto 0;
      display: block;
    }
    div {
      font-weight: 700;
      line-height: 22px;
      text-align: center;
      border: 1px solid #333333;
      border-radius: 8px;
    }
  }
}

.activity-rule {
  color: #b8b9bf;
  text-align: center;
  line-height: 64px;
}

.participate {
  display: flex;
  align-items: center;
  justify-content: center;
  .head-box {
    display: flex;
    align-items: center;
    img {
      width: 28px;
      margin-left: -10px;
    }
  }
  .participate-number {
    color: #b8b9bf;
    span {
      color: #005eea;
      margin-left: 10px;
    }
  }
}

/deep/ .van-popup {
  border-radius: 10px;
  overflow: hidden;
}
.rule-box {
  box-sizing: border-box;
  padding: 20px 25px;
  width: 92vw;
  height: 50vh;
  div:nth-child(1) {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  div:nth-child(2) {
    height: 86%;
    overflow-y: scroll;
    word-wrap: break-word;
  }
}
</style>
