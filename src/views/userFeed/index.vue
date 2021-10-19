<template>
  <div class="userFeddBack">
    <van-cell
      class="centerTitle"
      title="意见反馈"
      to="/mine"
      icon="arrow-left"
    >
    </van-cell>
    <div class="introduction">
      <span>简介</span>
      <van-field
        v-model="introductionInfo"
        rows="2"
        type="textarea"
        maxlength="100"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-uploader :after-read="afterRead" />
      <p class="discriptionPic"> 最多6张, 单个图片不超过20M</p>
    </div>
    <div class="contactInformation">
      <span>联系方式</span>
      <van-field
        v-model="phoneNum"
        placeholder="请输入手机号码~~~"
        input-align="left"
      />
    </div>
    <van-button
      class="commitBtn"
      type="primary"
      block
      color="linear-gradient(to right, #137c5d, #ee0a24)"
    >提交反馈</van-button>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less" scoped>
@import './index';
</style>
