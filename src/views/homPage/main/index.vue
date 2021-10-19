<template>
  <div>
    <router-view></router-view>
    <!-- 顶部 搜索框 -->
    <van-search
      shape="round"
      v-model.trim="searchVale"
      background="#30aff9"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @input="searchAuto"
    />
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-tabs
          class="tabsNav"
          v-model="activeName"
          @change="changeTabs"
        >
          <van-tab
            :name="item.id"
            v-for="item in userChannelData"
            :title="item.name"
            :key="item.id"
          >

          </van-tab>
        </van-tabs>
        <!-- 每一个 新闻 -->

        <div
          class="tabsContainer"
          v-for="item in recommendData"
          :key="item.art_id"
          @click="recommendNewsClick(item.art_id)"
        >
          <van-cell :border="false">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <h5 class="custom-title">{{ item.title }}</h5>
            </template>
          </van-cell>
          <van-image
            v-if="item.cover.type === 1"
            class="onlyImg"
            width="60%"
            height="60%"
            fit="scale-down"
            :src="item.cover.images[0]"
          />
          <van-row
            gutter="40"
            v-else-if="item.cover.type === 2"
          >
            <van-col
              span="8"
              v-for="(item, index) in item.cover.images"
              :key="index"
            >
              <van-image
                width="100%"
                height="100%"
                fit="scale-down"
                :src="item"
              />
            </van-col>
          </van-row>
          <van-row
            gutter="20"
            v-else
          >
            <van-col
              span="8"
              v-for="(item, index) in item.cover.images"
              :key="index"
            >
              <van-image
                width="100%"
                height="100%"
                fit="scale-down"
                :src="item"
              />
            </van-col>
          </van-row>

          <van-row>
            <span class="van-colvan-col--8">{{ item.aut_name }}</span>&nbsp;&nbsp;&nbsp;
            <span class="van-colvan-col--8">{{ item.comm_count }}评论</span>&nbsp;&nbsp;&nbsp;
            <span class="van-colvan-col--8">{{ timeFromNow(item.pubdate) }}</span>
            <!-- <van-col span="8">{{ item.aut_name }}</van-col>
        <van-col span="8">{{ item.comm_count }}评论</van-col>
        <van-col span="8">{{ item.pubdate }}</van-col> -->
          </van-row>
        </div>
        <div class="rightIcon">
          <van-icon
            name="bars"
            @click="iconClick"
          />
        </div>
      </van-list>
    </van-pull-refresh>
    <!--  搜索 推荐 -->
    <div>
      <van-popup
        v-model="show"
        closeable
        position="top"
        class="popup"
      >
        <van-search
          shape="round"
          v-model="searchVale"
          background="#30aff9"
          placeholder="请输入搜索关键词"
          @input="onSearch"
        />
        <div class="content">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              class="tabsContainer"
              v-for="item in searchData"
              :key="item.art_id"
            >
              <van-cell :border="false">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <h5 class="custom-title">{{ item.title }}</h5>
                </template>
              </van-cell>
              <van-image
                v-if="item.cover.type === 1"
                class="onlyImg"
                width="60%"
                height="60%"
                fit="scale-down"
                :src="item.cover.images[0]"
              />
              <van-row
                gutter="40"
                v-else-if="item.cover.type === 2"
              >
                <van-col
                  span="8"
                  v-for="(item, index) in item.cover.images"
                  :key="index"
                >
                  <van-image
                    width="100%"
                    height="100%"
                    fit="scale-down"
                    :src="item"
                  />
                </van-col>
              </van-row>
              <van-row
                gutter="20"
                v-else
              >
                <van-col
                  span="8"
                  v-for="(item, index) in item.cover.images"
                  :key="index"
                >
                  <van-image
                    width="100%"
                    height="100%"
                    fit="scale-down"
                    :src="item"
                  />
                </van-col>
              </van-row>

              <van-row>
                <span class="van-colvan-col--8">{{ item.aut_name }}</span>&nbsp;&nbsp;&nbsp;
                <span class="van-colvan-col--8">{{ item.comm_count }}评论</span>&nbsp;&nbsp;&nbsp;
                <span class="van-colvan-col--8">{{ timeFromNow(item.pubdate) }}</span>

              </van-row>
            </div>

          </van-list>
        </div>
      </van-popup>
    </div>
    <!-- 搜索 推荐 -->
    <van-popup
      v-model="Autoshow"
      closeable
      position="top"
      class="popup"
    >
      <div class="content">
        <van-search
          shape="round"
          v-model="searchVale"
          background="#30aff9"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @input="searchAuto"
        />
        <van-cell
          is-link
          v-for="item in searchAutoData"
          :key="item"
          @click="recommendbtn"
        > {{ item }}</van-cell>
      </div>
    </van-popup>
    <!-- 点击图标 跳转我的频道 -->
    <van-popup
      v-model="iconShow"
      closeable
      position="left"
      class="popup"
    >
      <!-- 我的 频道  -->
      <van-row class="topRow">
        <van-col
          span="8"
          offset="1"
        >
          <h2 class="maiChannel">我的频道: </h2>
        </van-col>
        <van-button
          class="editbtn"
          plain
          hairline
          type="primary"
          size="mini"
          v-show="btnShow"
          @click="editClick"
        >&nbsp;&nbsp;编辑&nbsp;&nbsp;</van-button>
        <van-button
          v-show="btnShow === false"
          class="editbtn"
          plain
          hairline
          type="info"
          size="mini"
          @click="successClick"
        >&nbsp;&nbsp;完成&nbsp;&nbsp;</van-button>

      </van-row>
      <van-grid>
        <van-grid-item
          v-for="item in userChannelData"
          :key="item.id"
        >
          <van-badge color="hotpink">
            <div
              class="child"
              :class="{ activeColor: item.id === activeName }"
              @click="toChannels(item.id)"
            >
              {{ item.name }}
            </div>
            <template #content>
              <van-icon
                name="cross"
                v-show="channelsIcon"
                @click="userChennel(item.id)"
                class="badge-icon"
              >
              </van-icon>
            </template>
          </van-badge>
        </van-grid-item>
      </van-grid>
      <!-- 频道 推荐 -->
      <van-row>
        <van-col
          span="8"
          offset="1"
        >
          <h2 class="maiChannel">频道推荐: </h2>
        </van-col>
      </van-row>
      <van-grid>
        <!-- <van-grid-item
          icon="add-o"
          @click="addChennels(item.id)"
          :text="item.name"
          v-for="item in allChannelData"
          :key="item.id"
        /> -->
        <van-grid-item
          v-for="item in filerAllCHannels"
          :key="item.id"
        >
          <van-badge color="lawngreen">
            <div class="child">
              {{ item.name }}
            </div>
            <template #content>
              <van-icon
                v-show="channelsIcon"
                @click="addChennels(item.id)"
                name="success"
                class="badge-icon"
              >
              </van-icon>
            </template>
          </van-badge>
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less" scoped>
@import './main.less';
</style>
