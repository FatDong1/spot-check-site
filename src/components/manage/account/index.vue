<template>
  <view-container>
    <el-form class="account-form" :rules="rule" status-icon ref="accountForm" :model="accountForm" label-width="80px" center>
      <el-form-item label="账户" prop="name">
        <span>{{accountForm.name}}</span>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="accountForm.pass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="accountForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </view-container>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.accountForm.checkPass !== '') {
          this.$refs.accountForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.accountForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        name: '小明',
        pass: '',
        checkPass: ''
      },
      rule: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style>
.account-form {
  width: 30%;
  margin: 10px 0;
}
</style>
