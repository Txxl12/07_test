<template>
  <div class="">
    <div class="create">
      <div v-for="(item, index) in activity" :key="index" @click="toPath()">
        <div class="item">
          <svg-icon :icon-class="item.icon" />
          <div>{{item.name}}</div>
        </div>
      </div>
      <div @click="addActivity()">
        <div class="item">
          <svg-icon icon-class="chart" />
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <el-form ref="dataForm" :rules="rules" :model="params" label-position="left" label-width="auto">
        <el-form-item label="请输入活动类型:" prop="activityName">
          <el-input v-model="params.activityName" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>


export default {
  data() {
    return {
      rules: {
        activityName: [{ required: true, message: '请输入活动类型', trigger: 'blur' }]
      },
      params: {
        activityName: '',
      },
      dialogVisible: false,
      activity: [
        {
          name: '答题活动',
          icon: 'dashboard'
        },
        {
          name: '投票活动',
          icon: 'dashboard'
        },
        {
          name: '抽奖',
          icon: 'dashboard'
        },
        {
          name: '秒杀',
          icon: 'dashboard'
        },
      ]
    }
  },
  methods: {
    toPath() {
      this.$router.push('/activityProcess/index')
    },
    addActivity() {
      this.dialogVisible = true
    },
    submit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.params = {}
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  padding: 0 50px;
}
.create {
  padding: 2%;
  display: flex;
  flex-wrap: wrap;
  & > div {
    margin: 30px 3%;
    width: 18%;
    height: 130px;
    box-shadow: 0px 2px 10px #ccc;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      text-align: center;
      line-height: 26px;
      font-size: 14px;
      font-weight: 700;
    }
  }
  .svg-icon {
    color: #409eff;
    width: 28px;
    height: 28px;
  }
}
</style>
