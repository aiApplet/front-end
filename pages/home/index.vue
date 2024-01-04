<template>
  <view class="container">
    <view class="head">
      <image src="https://cdn.uviewui.com/uview/album/1.jpg" mode="aspectFill" class="avatar"></image>
      <view class="text-box">
        <text class="nickname">name</text>
        <text class="uid">ID:&nbsp;10000</text>
      </view>
      <button size="default" type="default"
              style="color:#ffffff;backgroundColor:#1AAD19;borderColor:#1AAD19; display: inline-table"
              hover-class="is-hover" @click="SignIn">签到</button>
    </view>
    <text class="intro">我的，主要是
      用户头像、昵称、积分、积分记录、充值（跳到联系我们）、卡密兑换（充值后我们给他的）、绘图记录、分享记录（分享增加积分）
    </text>
  </view>
</template>

<script setup>
const SignIn = async () => {
  const result = await uni.request(
      {
        url: 'http://localhost:8000/api/user/signIn/', //仅为示例，并非真实接口地址。
        data: {},
        header: {
          'custom-header': 'hello' //自定义请求头信息
        },
        success: (res) => {
          console.log(res.data);
        },
        fail: (err) => {
          console.log(err);
        }
      }
  )
  console.log(result)
}
</script>

<style lang="scss">
.head {
  width: 100%;
  height: 300rpx;
  background-color: #007AFF;
  padding-top: 13%;
  display: flex;

  .text-box {
    flex-direction: column;
    display: flex;

    text {
      margin-left: 15%;
      color: white;
      letter-spacing: 2rpx;
    }

    .nickname {
      font-size: 40rpx;
      font-weight: bold;
    }

    .uid {
      font-size: 20rpx;
    }
  }

  .avatar {
    width: 100rpx;
    height: 100rpx;
    display: block;
    margin-left: 5%;
    border: 2rpx white solid;
    border-radius: 50%;
  }

}
</style>
