<template>
	<view class="pics">
		<scroll-view :style="{height:winHeight+'rpx'}" class="pics_left" scroll-y enable-flex>
			<view :class="store.active===item.id?'active':''" @click="titleClick(item.id)"
				v-for="item in store.titleData" :key="item.id">
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view :style="{height:winHeight+'rpx'}" class="pics_right" scroll-y enable-flex>
			<view class="pics_right_item" v-for="item in store.imageData" :key="item.id">
				<image @click="previewClick(item.src)" :src="item.src" mode=""></image>
				<text>{{item.alt}}</text>
			</view>
			<text class="pics_right_text" v-if="store.imageData.length===0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script setup lang='ts'>
	import {
		usePicsStore
	} from '../../store/picsStore';
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app';
	import {
		ref
	} from "vue";
	// app可用屏幕宽度
	const winHeight = ref()
	const store = usePicsStore()
	// 根据手机自适应高度
	const titleClick = (id: number) => {
		store.active = id
		// 动态获取图片展示
		store.getPicsImageData()
	}
	const previewClick = (current: string) => {
		uni.previewImage({
			urls: store.imageData.map(item => item.src),
			current: current
		})
	}
	onLoad(() => {
		// 首次加载数据
		store.getPicsTitleData()
		store.getPicsImageData()
	})
	onReady(() => {
		uni.getSystemInfo({
			success: function(res) {
				// 获取可用屏幕高度
				winHeight.value = res.windowHeight * 2
			},
		});
	})
</script>

<style scoped lang='scss'>
	page {
		height: 100%;
	}

	.pics {
		display: flex;
		height: 100%;

		&_left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid $shop-bgc;

			view {
				height: 120rpx;
				line-height: 120rpx;
				color: $shop-color;
				text-align: center;
				font-size: 30rpx;
				border-bottom: 1px solid $shop-bgc;
			}

			.active {
				background-color: $shop-color;
				color: #fff;
			}
		}

		&_right {
			flex: 1;
			height: 100%;

			&_item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				image {
					width: 520rpx;
					height: 520rpx;
					margin: 10rpx auto;
				}

				text {
					line-height: 60rpx;
					font-size: 30rpx;
				}
			}

			&_text {}
		}
	}
</style>
