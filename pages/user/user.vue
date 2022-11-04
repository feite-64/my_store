<template>
	<view class="container" :style="{height:winHeight+'rpx'}">
		<view class="user">
			<view class="user_head">
				<!-- 获取微信数据 -->
				<image src="@/static/logo.png" mode=""></image>
				<text>feite</text>
			</view>
			<view class="user_list">
				<view class="user_list_item">
					<text>设置</text>
				</view>
				<view class="user_list_item">
					<text>设置</text>
				</view>
				<view class="user_list_item">
					<text>设置</text>
				</view>
				<view class="user_list_item">
					<text>设置</text>
				</view>
				<view class="user_list_item">
					<text>设置</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang='ts'>
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app';
	import {
		ref
	} from "vue";
	const winHeight = ref()
	onReady(() => {
		uni.getSystemInfo({
			success: function(res) {
				// 获取可用屏幕高度 windowHeight
				// 获取屏幕高度screenHeight
				winHeight.value = res.screenHeight * 2
			},
		});
	})
</script>

<style scoped lang='scss'>
	.container {
		width: 100%;
		overflow: hidden;
		background-color: $shop-bgc;
	}

	.user {
		/* background-color: #fff; */

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;


		&_head {
			width: 100%;
			padding: 160rpx 0 40rpx 0;
			margin-bottom: 20rpx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-shadow: 0 0 2rpx 2rpx rgba(0, 0, 0, .1);

			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
		}

		&_list {
			width: 100%;
			background-color: #fff;
			box-shadow: 0 0 2rpx 2rpx rgba(0, 0, 0, .1);

			&_item {
				border-bottom: 1px solid $shop-bgc;
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				padding-left: 60rpx;

			}
		}
	}
</style>
