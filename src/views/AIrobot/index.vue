<template>
  <div class="aiStudent">
    <van-cell
      class="centerTitle"
      title="贾坤明同学"
      to="/mine"
      icon="arrow-left"
    >
    </van-cell>
    <!-- 对话列表 -->

    <van-cell class="bottomSerch">
      <van-search
        show-action
        shape="round"
        left-icon="edit"
        action-text="发送"
        placeholder="请输入搜索关键词"
      />
    </van-cell>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less" scoped>
@import './index.less';
</style>
