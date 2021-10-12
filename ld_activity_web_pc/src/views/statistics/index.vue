<template>
  <div class="activity-list">
    <div class="filter-box">
      <div>
        <span>请输入活动编号:</span>
        <el-input v-model="params.number" style="width: 200px; display: inline-block; margin: 0 20px;"></el-input>
      </div>
      <el-select style="width: 200px;margin-right: 20px;" class="margin-right" v-model="params.type"
        placeholder="请选择业务服务">
        <el-option v-for="(type, index) in filterList" :key="'_type_'+index" :value="type.id" :label="type.name">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
        查询
      </el-button>
    </div>
    <div class="activity-table">
      <div class="table-box">
        <el-table :data="activityList" style="width: 94%;margin: 0 auto;">
          <el-table-column prop="id" label="活动编号" align="center">
          </el-table-column>
          <el-table-column prop="activityType" label="活动类型" align="center">
          </el-table-column>
          <el-table-column prop="name" label="活动名称" align="center">
          </el-table-column>
          <el-table-column prop="start_at" label="开启时间" align="center">
          </el-table-column>
          <el-table-column prop="end_at" label="截止时间" align="center">
          </el-table-column>
          <el-table-column label="奖项详情" align="center">
            <template slot-scope="scope">
              查看
            </template>
          </el-table-column>
          <el-table-column label="抽奖记录" align="center">
            <template slot-scope="scope">
              查看
            </template>
          </el-table-column>
          <el-table-column prop="type" label="活动状态" align="center">
          </el-table-column>
          <el-table-column prop="numberOfWinners" label="活动地址" align="center">
            <template slot-scope="scope">
              预览(获取)
            </template>
          </el-table-column>
          <el-table-column prop="nickname" label="创建人员" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="editActivity(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="delActivity(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :visible.sync="dialogFlag" style="padding: 0 20px">
        <el-form ref="dialogForm" :rules="activityRules" :model="editParams" label-position="left" label-width="auto">
          <el-form-item label="活动类型:" prop="activityType">
            <el-input v-model="editParams.activityType" />
          </el-form-item>
          <el-form-item label="活动名称:" prop="name">
            <el-input v-model="editParams.name" />
          </el-form-item>
          <el-form-item label="截止时间:" prop="end_at">
            <el-input v-model="editParams.end_at" />
          </el-form-item>
          <el-form-item label="活动状态:" prop="type">
            <el-input v-model="editParams.type" />
          </el-form-item>
          <el-form-item label="创建人员:" prop="nickname">
            <el-input v-model="editParams.nickname" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFlag = false">取 消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?addPrizeSubmit():editPrizeSubmit()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activityRules: {
        activityType: [{ required: true, message: '请输入活动类型', trigger: 'blur' }],
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        end_at: [{ required: true, message: '请输入截止时间', trigger: 'blur' }],
        type: [{ required: true, message: '请输入活动状态', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入创建人员', trigger: 'blur' }],
      },
      editParams: {},
      dialogFlag: false,
      activityList: [
        {
          activityType: '抽奖',
          id: "1",
          name: "公告1",
          number: "c001",
          start_at: "1611713162",
          end_at: "1643249162",
          type: "1",
          nickname: "欧拉"
        },
        {
          activityType: '抽奖',
          id: "2",
          name: "公告1",
          number: "c001",
          start_at: "1611713162",
          end_at: "1643249162",
          type: "1",
          nickname: "欧拉11"
        },
      ],
      params: {
        number: '',
        type: 0
      },

      filterList: [
        {
          id: 0,
          name: '全部'
        },
        {
          id: 1,
          name: '中奖'
        },
        {
          id: 2,
          name: '未中奖'
        }
      ],

    }
  },
  methods: {
    search() {
     
    },
    editActivity(row) {
      this.dialogFlag = true
      this.editParams = row
      this.$nextTick(() => {
        this.$refs['dialogForm'].clearValidate()
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.filter-box {
  display: flex;
  padding: 40px 0 40px 5%;
  border-bottom: 2px solid #f9f9f9;
}
.activity-table ::v-deep .el-dialog {
  padding: 0 30px 40px;
}
.activity-table {
  margin-top: 60px;
  .table-box {
    margin: 0 auto;
    width: 90%;
    box-shadow: 0px 2px 10px #ccc;
    padding: 20px 0 40px;
    .add-button {
      margin: 0 0 20px 2%;
    }
  }
}
</style>