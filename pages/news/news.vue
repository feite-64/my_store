<template>
	<view class="news">
		<view @click="detailClick(item.id)" class="news_item" v-for="item in store.newsListData" :key="item.id">
			<view class="news_item_left">
				<image :src="item.img_url" mode="aspectFit"></image>
			</view>
			<view class="news_item_right">
				<view class="news_item_right_title">
					{{item.title}}
				</view>
				<view class="news_item_right_info">
					<text>发表时间: {{ store.getFilter(item.add_time)}}</text>
					<text>浏览: {{item.click}}次</text>
				</view>
			</view>
		</view>
		<view class="reachBottom" v-if="store.flag">
			-------我是有底线的-------
		</view>
	</view>
</template>

<script setup lang='ts'>
	import {
		onLoad,
		onPullDownRefresh,
		onReachBottom
	} from '@dcloudio/uni-app';
	import {
		useNewsStore
	} from '../../store/newsStore';
	const store = useNewsStore()
	// 点击跳转到详情页
	const detailClick = (id: number) => {
		uni.navigateTo({
			url: `/pages/new_details/new_details?id=${id}`
		})
	}

	// 下拉刷新
	onPullDownRefresh(() => {
		store.newsListData = []
		store.flag = false
		store.index = 1
		setTimeout(() => {
			store.getNewsListData()
			uni.stopPullDownRefresh()
		}, 500)
	})
	// 触底加载
	onReachBottom(() => {
		store.index++
		if (store.index > 4) {
			return store.flag = true
		}
		store.getPullData()
	})
	onLoad(() => {
		store.getNewsListData()
	})
</script>

<style scoped lang='scss'>
	.news {
		&_item {
			display: flex;
			padding: 10rpx 0;
			border-bottom: 1px solid $shop-bgc;

			&_left {
				width: 200rpx;

				image {
					width: 200rpx;
					height: 160rpx;
				}
			}

			&_right {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				&_info {
					padding: 0 20rpx 10rpx 0;
					font-size: 28rpx;
					color: #333333;

					text:nth-child(2) {
						margin-left: 20rpx;
					}
				}
			}
		}

		.reachBottom {
			text-align: center;
			color: #424242;
			font-size: 30rpx;
			padding-bottom: 20rpx;
		}
	}
</style>
