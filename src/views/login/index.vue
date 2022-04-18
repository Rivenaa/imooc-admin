<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="https://res.lgdsunday.club/user.svg"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          name="password"
          :type="passwordType"
        ></el-input>
        <span class="show-password" @click="onChangePwdType">
          <svg-icon
            :icon="passwordType == 'password' ? 'eye' : 'eye-open'"
          ></svg-icon>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          :loading="loading"
          @click="handleLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'

const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

/* 点击图标改变密码框状态 */
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

/* 登录操作 */
const loading = ref(false)
const loginFormRef = ref(null)
const store = useStore()
const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (!valid) return
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        /* TODO:登录后操作 */
      })
      .catch(err => {
        loading.value = false
        console.log(err)
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    //内边距
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .show-password {
      position: absolute;
      right: 22px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    :deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      box-shadow: 0;

      .el-input__inner {
        box-shadow: none;
      }

      input {
        background: transparent;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        //光标颜色
        caret-color: $cursor;
      }
    }
  }
}
</style>
