<template>
  <div>
    <van-nav-bar :border="false">
    </van-nav-bar>
    <div>
      <van-row class="nav_name">
        <van-col
          span="4"
          offset="1"
        >
          <div class="imgMargin">
            <van-image
              round
              width="60px"
              height="60px"
              fit="cover"
              :src="profile.photo"
            />
            <!-- require('../../assets/img/rng.jpg') ||  -->
          </div>
        </van-col>

        <van-col
          span="9"
          offset="1"
        >
          <span class="custom-title">{{ profile.name }}</span>
          <button class="miniBtn">申请认证</button>
        </van-col>
        <van-col
          span="7"
          offset="2"
        >
          <div class="todayBox">
            <van-icon
              class-prefix="iconfont icon-yuedu"
              class="todayIcon"
              size="20px"
            />

            <span class="todayRead">今日阅读<br> 6分钟</span>
          </div>
        </van-col>
        <!-- 此处 占位 -->
        <van-col
          style="visibility: hidden;"
          span="8"
        >span: 8</van-col>
      </van-row>
      <van-grid
        :column-num="3"
        class="attentions"
      >
        <van-grid-item
          class="childattentions topNavbar"
          v-for="(value, index) in infoList"
          :key="index"
        >
          <span>{{ value.num }} <br>{{ value.text }}</span>
        </van-grid-item>
      </van-grid>
    </div>

    <van-grid
      :border="false"
      :column-num="3"
    >
      <van-grid-item
        v-for="(item, index) in navList"
        :text="item.text"
        :key="index"
      >
        <template #icon>
          <van-icon
            :name="item.name"
            :color="item.color"
          />
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell
      v-for="(item, index) in routerList"
      :key="index"
      :title="item.title"
      is-link
      :to="item.to"
      @click="onclick(item)"
    />
    <!-- 退出登录 按钮 -->
    <van-button
      @click="singOut"
      color="#7232dd"
      block
    >退出登录</van-button>
  </div>
</template>

<script src="./mine.js">
</script>

<style  lang="less" scoped>
@import './mine.less';
</style>
