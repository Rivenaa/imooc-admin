<template>
  <div class="login-container">
    <el-from class="login-form">
      <div class="title">
        <h3>用户登录</h3>
      </div>
      <el-from-item>
        <span>
          <el-icon><avatar /></el-icon>
        </span>
        <el-input placeholder="username" name="username"></el-input>
      </el-from-item>
      <el-from-item>
        <span>
          <el-icon><avatar /></el-icon>
        </span>
        <el-input placeholder="password" name="password"></el-input>
        <span>
          <el-icon class="show-password"><avatar /></el-icon>
        </span>
      </el-from-item>
      <el-from-item>
        <el-button style="width: 100%" type="primary">登录</el-button>
      </el-from-item>
    </el-from>
  </div>
</template>

<script setup>
import { Avatar } from '@element-plus/icons-vue'
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

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }
}
</style>
