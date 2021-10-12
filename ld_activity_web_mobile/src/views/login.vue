<template>
  <div class="login">
    <div class="login-bg">
      <img src="../assets/image/big_Turntable.png" alt="">
    </div>
    <div class="login-info">
      <div>
        <img src="../assets/image/form_number.png" alt="">
        <div class="input-box">
          <input type="text" placeholder="请输入手机号" v-model="params.phone">
        </div>
      </div>
      <div>
        <img src="../assets/image/form_password.png" alt="">
        <div class="input-box">
          <input type="text" placeholder="请输入短信验证码" v-model="params.code">
        </div>
        <div class="login-fscode" :class="isfs ? 'nocolor' : ''">
          <span v-if="isfs">{{ deltime }}重新获取验证码</span>
          <span v-else @click="fscode"> 获取验证码</span>
        </div>
      </div>
      <button>去领取奖品</button>
    </div>
  </div>
</template>
<script>
import { Toast, NumberKeyboard } from "vant";
export default {
  name: "Login",
  watch: {
    deltime: function (newval, oldval) {
      if (newval == 0) {
        clearInterval(this.inter);
        this.isfs = false;
        this.deltime = 60;
      }
    },
  },
  data() {
    return {
      params: {},
      isfs: false,
      deltime: 60,
      inter: "",
      showphone: false,
      showcode: false,
    };
  },
  methods: {
    fscode() {
      if (!this.params.phone) {
        Toast.fail("手机号不能为空");
        return;
      }
      setTimeout(() => {
        this.isfs = true;
        clearInterval(this.inter)
        this.inter = setInterval(() => {
          this.deltime--;
        }, 1000);
      }, 2000)
    },
    //登录
    login() {
      if (this.params.phone && this.params.code) {

      } else {
        Toast.fail("请将资料填写完整");
      }
    },
  },
};
</script>
<style scoped lang="scss">
.nocolor {
  color: #e2e2e2 !important;
}
.login-info {
  background: #ffffff;
  margin: -100px 12px 0;
  border-radius: 4px;
  box-shadow: 0px 2px 10px #ccc;
  padding: 30px 16px;
  & > div {
    box-sizing: border-box;
    padding: 0 0 5px 5px;
    margin-top: 30px;
    width: 100%;
    border-bottom: 1px solid #e1e1e1;
    display: flex;
    img {
      width: 16px;
    }
    .input-box {
      flex: 1;
      margin: 0 20px;
    }
    input {
      min-width: 0;
      width: 100%;
      border: 0;
    }
    .login-fscode {
      color: #48a3ff;
    }
  }
  button {
    letter-spacing: 1px;
    display: block;
    background: #48a3ff;
    border: 0;
    width: 90%;
    border-radius: 10px;
    color: #fff;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    margin: 40px auto 0;
  }
}

.login-bg {
  height: 330px;
  background: url('../assets/image/login_bg.png') no-repeat;
  background-size: 100%;
  img {
    display: inline-block;
    width: 76vw;
    margin: 48px 0 0 12px;
  }
}
</style>