<template>
  <div
    class="newsBox"
    @scroll="onScoll"
  >
    <van-cell-group class="topIcon">
      <van-icon
        name="arrow-left"
        @click="onClickLeft"
      />
      <van-icon
        name="ellipsis"
        class="leftIcon"
      />
    </van-cell-group>
    <van-row gutter="20">
      <van-col
        offset="1"
        class="headersize"
      >
        {{ newsInfo.title }}
      </van-col>
    </van-row>
    <van-row gutter="20">
      <van-col offset="1">
        <span class="pubdatetime">{{ newsInfo.pubdate }}</span>
        <span class="pubdatetime">&nbsp; |</span> <span class="pubdatetime">{{ newsInfo.read_count }}阅读</span><span class="pubdatetime">&nbsp; |&nbsp; </span><span class="pubdatetime">{{ newsInfo.comm_count }}评论</span>
      </van-col>
    </van-row>
    <!-- 用户 头像 -->
    <van-row
      v-if="scollTop"
      type="flex"
      justify="space-between"
    >
      <van-col span="12">
        <div class="">
          <van-image
            round
            class="aut_photo"
            width="1rem"
            height="1rem"
            :src="newsInfo.aut_photo"
          /><span class="aut_name">{{ newsInfo.aut_name }}</span>
        </div>
      </van-col>
      <van-col span="6">
        <van-button
          v-if="!newsInfo.is_followed"
          color="linear-gradient(to right, #7232dd, #ccc)"
          size="small"
          round
        >&nbsp;关注&nbsp;</van-button>
        <van-button
          v-if="newsInfo.is_followed"
          size="small"
          color="linear-gradient(to right, #7232dd, #1989fa)"
          round
        >&nbsp;已关注&nbsp;</van-button>
      </van-col>
    </van-row>
    <!-- 用户 头像 -->
    <van-row
      v-else
      class="scollUser"
      type="flex"
      justify="space-between"
    >
      <van-cell class="topfiex">
        <van-icon
          name="arrow-left"
          @click="onClickLeft"
        />
        <van-col span="12">
          <div class="">
            <van-image
              round
              class="aut_photo"
              width="1rem"
              height="1rem"
              :src="newsInfo.aut_photo "
            /><span class="aut_name">{{ newsInfo.aut_name }}</span>
          </div>
        </van-col>
        <van-col span="6">
          <van-button
            v-if="!newsInfo.is_followed"
            color="linear-gradient(to right, #7232dd, #ccc)"
            size="mini"
            round
          >&nbsp;关注&nbsp;</van-button>
          <van-button
            v-if="newsInfo.is_followed"
            size="mini"
            color="linear-gradient(to right, #7232dd, #1989fa)"
            round
          >&nbsp;&nbsp;已关注&nbsp;&nbsp;</van-button>
        </van-col>
      </van-cell>

    </van-row>
    <van-cell-group class="articleBox">
      <van-cell>
        <div
          class="articleMain"
          v-html="newsInfo.content"
        >
          {{ newsInfo.content }}
        </div>
      </van-cell>
      <van-row
        type="flex"
        justify="space-around"
      >
        <van-col
          span="2"
          class="pubdatetime"
        >
        </van-col>
        <van-col
          span="14"
          class="pubdatetime"
          offset="4"
        >
          发布文章时间: {{ timeFromat(newsInfo.pubdate) }}
        </van-col>
      </van-row>
    </van-cell-group>
    <div class="footer">
      <van-row
        type="flex"
        justify="space-around"
      >
        <van-col
          span="8"
          class="alldiscuss"
          id="bottom"
        >全部评论({{ newsInfo.comm_count }})</van-col>
        <van-col
          span="6"
          offset="7"
          class="alldiscuss right"
        >{{ newsInfo.like_count }}&nbsp;点赞</van-col>
      </van-row>
      <van-list
        class="alldiscussBox"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多的评论~~~"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in allDiscuss"
          :key="index"
        >
          <!-- 评论 -->
          <div class="">
            <van-image
              round
              class="aut_photo"
              width="1rem"
              height="1rem"
              :src="item.aut_photo"
            /><span class="aut_name discussName">{{ item.aut_name }}</span>
            <div class="discussRightIcon">
              {{ item.like_count }}
              <van-icon
                v-if="item.is_liking"
                color="red"
                name="good-job"
                @click="notlikeClick(item)"
              />
              <van-icon
                v-else
                name="good-job-o"
                @click="likeClick(item)"
              />
            </div>
          </div>
          <!-- 评论 -->
          <!-- <p>{{ item.content }}</p> -->
          <van-cell :title="item.content" />

          <!-- 展开全部回复 -->
          <van-cell
            class="outsideDiscuss"
            @click="openAllDiscuss(item.com_id, item)"
          >
            <template #title>
              <span class="openReply">
                回复
              </span>
              <van-icon
                name="arrow"
                color="#1989fa"
              />
            </template>
          </van-cell>
          <!-- 全部评论 弹出 -->
          <van-popup
            class="openDisZ-index"
            closeable
            v-model="openDiscussState"
            position="bottom"
            :style="{ height: '99%' }"
          >
            <van-cell-group>
              <van-cell
                :title="
                discussReplyData.length
                + '条评论'"
                class="
                titleReply"
              />
              <van-cell>
                <div class="">
                  <van-image
                    round
                    class="aut_photo"
                    width="1rem"
                    height="1rem"
                    :src="popupItem.aut_photo"
                  />
                  <span class="aut_name discussName">{{ popupItem.aut_name }}</span>
                  <div class="discussRightIcon">
                    关注
                  </div>
                  <div>
                    <span>{{ popupItem.content }}</span>
                  </div>

                  <div>
                    <span class="discussPubdate">{{ resetTime(popupItem.pubdate) }}</span>
                    <div class="discussRightIcon">
                      <span>{{ popupItem.like_count }}&nbsp;&nbsp;</span>
                      <!-- <van-icon name="good-job-o" /> -->
                      <van-icon
                        v-if="popupItem.is_liking"
                        color="red"
                        name="good-job"
                        @click="notlikeClick(popupItem)"
                      />
                      <van-icon
                        v-else
                        name="good-job-o"
                        @click="likeClick(popupItem)"
                      />
                    </div>
                  </div>
                  <p class="pupallreply">全部回复:</p>
                  <van-loading
                    type="spinner"
                    class="loding"
                    v-if="showLoding"
                  ></van-loading>
                  <van-list
                    v-else
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                  >
                    <van-cell
                      v-for="(item, index) in discussReplyData"
                      :key="index"
                    >
                      <div class="">
                        <van-image
                          round
                          class="aut_photo"
                          width="1rem"
                          height="1rem"
                          :src="item.aut_photo"
                        />
                        <span class="aut_name discussName">{{ item.aut_name }}</span>
                        <div class="popRightIcon">
                          <span>{{ item.like_count }}&nbsp;&nbsp;</span>
                          <van-icon
                            :name=" item.is_liking ? 'good-job' : 'good-job-o'"
                            :color=" item.is_liking ? 'red' : ''"
                            @click="subLikeClick(item.com_id, item.is_liking)"
                          />
                        </div>
                        <div>
                          <span>{{ item.content }}</span>
                        </div>
                      </div>
                    </van-cell>
                  </van-list>
                  <van-goods-action>
                    <van-goods-action-icon>
                      <van-search
                        left-icon="edit"
                        shape="round"
                        v-model="discussInside"
                        @search="insideSearch"
                        placeholder="发布评论~~"
                      />
                    </van-goods-action-icon>
                    <van-goods-action-icon
                      icon="star-o"
                      text="收藏"
                    />

                    <van-goods-action-icon
                      icon="share-o"
                      text="分享"
                      @click="shareOpen"
                    />
                    <van-share-sheet
                      v-model="showShare"
                      title="立即分享给好友"
                      :options="options"
                    />
                  </van-goods-action>
                </div>
              </van-cell>
            </van-cell-group>
          </van-popup>

        </van-cell>
      </van-list>
    </div>
    <van-goods-action>
      <van-goods-action-icon>
        <van-search
          shape="round"
          left-icon="edit"
          @search="sendDiscuss"
          v-model="value"
          placeholder="发布评论~~"
        />
      </van-goods-action-icon>

      <van-goods-action-icon
        :badge="allDiscuss.length === 0 ? '' : allDiscuss.length"
        icon="chat-o"
        text="评论"
      >
        <a
          href="#bottom"
          class="discussHerf"
        >评论</a>
      </van-goods-action-icon>
      <van-goods-action-icon
        icon="good-job-o"
        v-if="newsInfo.attitude === 0"
        text="点赞"
        @click="bottomOnLike"
      />
      <van-goods-action-icon
        icon="good-job"
        color="red"
        v-else-if="newsInfo.attitude === 1"
        text="点赞"
        @click="bottomCancleLike"
      />
      <van-goods-action-icon
        icon="good-job-o"
        v-else
        text="点赞"
        @click="bottomOnLike"
      />
      <van-goods-action-icon
        v-if="newsInfo.is_collected"
        icon="star"
        color="red"
        text="收藏"
        @click="cancleCollect"
      />
      <van-goods-action-icon
        v-else
        icon="star-o"
        text="收藏"
        @click="onCollect"
      />
      <van-goods-action-icon
        icon="share-o"
        text="分享"
        @click="shareOpen"
      />
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
    </van-goods-action>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less" scoped>
@import './index.less';
</style>
