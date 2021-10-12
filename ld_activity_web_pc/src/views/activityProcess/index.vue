<template>
  <div class="lottery">
    <div class="step-box">
      <el-steps :active="current" align-center>
        <el-step :title="item.name" v-for="(item, index) in processList" :key="index"></el-step>
      </el-steps>
    </div>
    <div v-if="current == 2" class="basic">
      <el-form ref="basicForm" :rules="basicRules" :model="basicInfo" label-position="left" label-width="auto">
        <el-form-item label="活动名称:" prop="name">
          <el-input v-model="basicInfo.name" />
        </el-form-item>
        <el-form-item label="活动时间:" prop="time">
          <el-input v-model="basicInfo.time" />
        </el-form-item>
        <el-form-item label="活动说明:" prop="explain">
          <el-input type="textarea" v-model="basicInfo.explain" :autosize="{ minRows: 4, maxRows: 6}" />
        </el-form-item>
      </el-form>
    </div>
    <div v-if="current == 3" class="prize-setting">
      <div class="title">奖品设置</div>
      <div class="table-box">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrize" class="add-button">添加奖品
        </el-button>
        <el-table :data="prizeList" style="width: 94%;margin: 0 auto;">
          <el-table-column prop="serial" label="序号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="奖项名称" align="center">
          </el-table-column>
          <el-table-column prop="winningNumber" label="每日中奖数量" align="center">
          </el-table-column>
          <el-table-column prop="prizeNumber" label="奖品数量" align="center">
          </el-table-column>
          <el-table-column prop="numberOfWinners" label="已中奖数量" align="center">
          </el-table-column>
          <el-table-column prop="probability" label="中奖概率" align="center">
            <template slot-scope="scope">
              {{scope.row.probability}}%
            </template>
          </el-table-column>
          <el-table-column prop="value" label="价值" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="editPrize(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="delPrize(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :visible.sync="addPrizeDialogFlag" style="padding: 0 20px">
        <el-form ref="dialogForm" :rules="addPrizeRules" :model="tempPrizeParams" label-position="left"
          label-width="auto">
          <el-form-item label="奖品类型:">
            <el-radio-group v-model="tempPrizeParams.type">
              <el-radio label="1">虚拟奖品</el-radio>
              <el-radio label="2">实物奖品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="序号:">
            <el-input v-model="tempPrizeParams.serial" />
          </el-form-item>
          <el-form-item label="奖项名称:" prop="name">
            <el-input v-model="tempPrizeParams.name" />
          </el-form-item>
          <el-form-item label="每日中奖数量:" prop="winningNumber">
            <el-input v-model="tempPrizeParams.winningNumber" />
          </el-form-item>
          <el-form-item label="奖品数量:" prop="prizeNumber">
            <el-input v-model="tempPrizeParams.prizeNumber" />
          </el-form-item>
          <el-form-item label="已中奖数量:" prop="numberOfWinners">
            <el-input v-model="tempPrizeParams.numberOfWinners" />
          </el-form-item>
          <el-form-item label="中奖概率:" prop="probability">
            <el-input v-model="tempPrizeParams.probability" />
          </el-form-item>
          <el-form-item label="价值:" prop="value">
            <el-input v-model="tempPrizeParams.value" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addPrizeDialogFlag = false">取 消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?addPrizeSubmit():editPrizeSubmit()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-if="current == 4" class="advanced-setting">
      <div class="title">高级设置</div>
      <el-form ref="advancedForm" :rules="advancedRules" :model="advancedInfo" label-position="left" label-width="auto">
        <el-form-item label="每天最多抽:" prop="everyDay">
          <el-input v-model="advancedInfo.everyDay" />
        </el-form-item>
        <el-form-item label="全程最多抽:" prop="allTheWay">
          <el-input v-model="advancedInfo.allTheWay" />
        </el-form-item>
      </el-form>
    </div>
    <div v-if="current == 5" class="release">
      <p>活动名称: 参与活动赢大奖</p>
      <p>活动编号: 123456</p>
      <p>活动开启时间: 2019-08-24 16:56:00</p>
      <p>活动结束时间: 2019-08-30 16:56:00</p>
      <div><a href="https://www.baidu.com/">活动地址: www.baidu.com</a></div>
      <div class="crown">
        <span>恭喜您</span>
      </div>
      <p class="release-succeed">活动发布成功</p>
      <div class="back-button" @click="toActivityList">
        <img src="@/assets/img/back.png" alt="">
        <div>返回活动列表</div>
      </div>
    </div>
    <div class="confirm-box" v-if="confirmText[current]">
      <el-button @click="back">返回上一步</el-button>
      <el-button type="primary" @click="confirmNext">{{confirmText[current]}}</el-button>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      confirmText: {
        2: '生成并继续',
        3: '生成并继续',
        4: '发布',
      },
      dialogStatus: '',
      tempPrizeParams: {
        type: '1',
        serial: '',
        name: '',
        winningNumber: '',
        prizeNumber: '',
        numberOfWinners: '',
        probability: '',
        value: '',
      },
      addPrizeDialogFlag: false,
      prizeList: [
        {
          type: '1',
          serial: '01',
          name: '天堂雨伞',
          winningNumber: '10',
          prizeNumber: '10',
          numberOfWinners: '5',
          probability: '10',
          value: '100积分',
        },
        {
          type: '2',
          serial: '01',
          name: '天堂雨伞',
          winningNumber: '10',
          prizeNumber: '10',
          numberOfWinners: '5',
          probability: '10',
          value: '100积分',
        }
      ],
      basicInfo: {
        name: '',
        time: '',
        explain: ''
      },
      advancedInfo: {
        everyDay: '',
        allTheWay: ''
      },
      current: 2,
      processList: [
        {
          id: 1,
          name: '活动类型'
        },
        {
          id: 2,
          name: '基本信息'
        },
        {
          id: 3,
          name: '奖品设置'
        },
        {
          id: 4,
          name: '高级设置'
        },
        {
          id: 5,
          name: '发布成功'
        },
      ],
      basicRules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        time: [{ required: true, message: '请输入活动时间', trigger: 'blur' }]
      },
      advancedRules: {
        everyDay: [{ required: true, message: '请输入每天最多抽奖次数', trigger: 'blur' }],
        allTheWay: [{ required: true, message: '请输入全程最多抽奖次数', trigger: 'blur' }]
      },
      addPrizeRules: {
        type: [{ required: true, message: '请选择奖品类型', trigger: 'blur' }],
        serial: [{ required: true, message: '请输入序号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入奖项名称', trigger: 'blur' }],
        winningNumber: [{ required: true, message: '请输入每日中奖数量', trigger: 'blur' }],
        prizeNumber: [{ required: true, message: '请输入奖品数量', trigger: 'blur' }],
        numberOfWinners: [{ required: true, message: '请输入已中奖数量', trigger: 'blur' }],
        probability: [{ required: true, message: '请输入中奖概率', trigger: 'blur' }],
        value: [{ required: true, message: '请输入价值', trigger: 'blur' }],
      },
    }
  },
  methods: {
    back() {
      if (this.current == 2) {
        this.$router.push('/dashboard')
      } else {
        console.log(11);
        this.current--
      }
    },
    confirmNext() {
      switch (this.current) {
        case 2:
          this.$refs['basicForm'].validate((valid) => {
            if (valid) {
              this.current++
            }
          })
          break;
        case 3:
          this.current++
          break;
        case 4:
          this.$refs['advancedForm'].validate((valid) => {
            if (valid) {
              this.current++
            }
          })
          break;
      }
    },
    toActivityList() {
      this.$router.push('/activity-list/index')
    },

    addPrize() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.addPrizeDialogFlag = true
      this.$nextTick(() => {
        this.$refs['dialogForm'].clearValidate()
      })
    },
    resetTemp() {
      this.tempPrizeParams = {
        type: '1'
      }
    },
    addPrizeSubmit() {
      this.$refs['dialogForm'].validate(valid => {
        if (valid) {

        }
      })
    },
    editPrizeSubmit() {
      this.$refs['dialogForm'].validate(valid => {

      })
    },
    editPrize(row) {
      this.dialogStatus = 'update'
      this.addPrizeDialogFlag = true
      this.tempPrizeParams = row
      this.$nextTick(() => {
        this.$refs['dialogForm'].clearValidate()
      })
    },
    delPrize() {

    },
  }
}
</script>

<style lang="scss" scoped>
.basic ::v-deep .el-form-item {
  margin-bottom: 50px;
}
.prize-setting ::v-deep .el-dialog {
  padding: 0 30px 40px;
}
.lottery {
  .confirm-box {
    display: flex;
    justify-content: space-around;
    margin-top: 100px;
  }
  .step-box {
    padding: 50px 0;
    border-bottom: 2px solid #f9f9f9;
  }
  .basic {
    width: 30%;
    margin: 100px auto 0;
  }
  .prize-setting {
    .title {
      margin: 50px;
      text-align: center;
    }
    .table-box {
      margin: 0 auto;
      width: 80%;
      box-shadow: 0px 2px 10px #ccc;
      padding: 20px 0 40px;
      .add-button {
        margin: 0 0 20px 2%;
      }
    }
  }
  .advanced-setting {
    width: 50%;
    margin: 0 auto;
    .title {
      margin: 50px;
      text-align: center;
    }
  }
  .release {
    font-size: 16px;
    text-align: center;
    margin-top: 50px;
    p {
      line-height: 50px;
    }
    a {
      color: #35bafd;
    }
    .crown {
      background: url('../../assets/img/release_crown.png') no-repeat;
      background-size: 100%;
      width: 160px;
      height: 64px;
      margin: 46px auto 0;
      span {
        margin-top: 32px;
        display: inline-block;
        color: #ffffff;
      }
    }
    .release-succeed {
      font-size: 36px;
      font-weight: 700;
      line-height: unset;
      margin: 16px;
    }
    .back-button {
      width: 150px;
      border: 1px solid #35bafd;
      margin: 40px auto;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #35bafd;
      padding: 3px 5px;
      height: 26px;
      line-height: 26px;
      font-weight: 700;
      font-size: 15px;
      img {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }
    }
  }
}
</style>
