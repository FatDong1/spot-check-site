<template>
  <el-dialog 
    title="添加人员" 
    :visible="dialogFormVisible"
    @close="closeDialog">
    <el-form :model="form" :rules="rule" :label-width="formLabelWidth" ref="ruleForm" status-icon>
      <el-form-item label="姓名" >
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.sex" label="1">男</el-radio>
        <el-radio v-model="form.sex" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="登录账号" >
        <el-input v-model="form.account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="pass">
        <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirmAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback();
      }
    }
    return {
      form: {
        name: '',
        pass: '',
        account: '',
        checkPass: '',
        sex: ''
      },
      rule: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      formLabelWidth: '80px'
    }
  },
  props: {
    dialogFormVisible: {
      type: Boolean
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeCompanyDialog')
    },
    confirmAdd () {
      this.$emit('successAdd', this.form)
      this.$emit('closeCompanyDialog')
    }
  }
}
</script>

<style>

</style>
