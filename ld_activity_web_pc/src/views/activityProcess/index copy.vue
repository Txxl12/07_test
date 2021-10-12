<template>
  <div class="">
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
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrize">添加奖品</el-button>
        <el-table :data="prizeList" style="width: 94%;margin: 0 auto;">
          <el-table-column prop="serial" label="序号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="奖项名称" align="center">
          </el-table-column>
          <el-table-column prop="winningNumber" label="每日中奖数量" align="center">
          </el-table-column>
          <el-table-column prop="numberOfWinners" label="已中奖数量" align="center">
          </el-table-column>
          <el-table-column prop="probability" label="中奖概率" align="center">
          </el-table-column>
          <el-table-column prop="value" label="价值" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editPrize">编辑</el-button>
              <el-button type="text" size="small" @click="delPrize">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :visible.sync="addPrizeDialogFlag">
        <el-form ref="dataForm" :rules="addPrizeRules" :model="addPrizeParams" label-position="left" label-width="auto">
          <el-form-item label="请输入活动类型:" prop="activityName">
            <el-input v-model="params.activityName" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addPrizeDialogFlag = false">取 消</el-button>
          <el-button type="primary" @click="addPrizeSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-if="current == 4">
      4
    </div>
    <div v-if="current == 5">
      5
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      addPrizeParams: {
        type: '',
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
          serial: '01',
          name: '天堂雨伞',
          winningNumber: '10',
          prizeNumber: '10',
          numberOfWinners: '5',
          probability: '10',
          value: '100积分',
        },
        {
          serial: '01',
          name: '天堂雨伞',
          winningNumber: '10',
          prizeNumber: '10',
          numberOfWinners: '5',
          probability: '10',
          value: '100积分',
        }
      ],
      basicRules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        time: [{ required: true, message: '请输入活动时间', trigger: 'blur' }]
      },
      addPrizeRules: [],
      basicInfo: {
        name: '',
        time: '',
        explain: ''
      },
      current: 3,
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
      ]
    }
  },
  methods: {
    addPrize() {
      this.addPrizeDialogFlag = true
    },
    addPrizeSubmit() {

    },
    editPrize() {

    },
    delPrize() {

    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin-bottom: 50px;
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
    button {
      margin: 0 0 20px 2%;
    }
  }
}
</style>
