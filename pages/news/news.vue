<template>
	<view class="news">
		<view class="news_item" v-for="item in store.newsListData" :key="item.id">
			<view class="news_item_left">
				<image :src="item.img_url" mode="aspectFit"></image>
			</view>
			<view class="news_item_right">
				<view class="news_item_right_title">
					{{item.title}}
				</view>
				<view class="news_item_right_info">
					<text>发表时间：{{item.add_time.slice(0,10)}}</text>
					<text>浏览：{{item.click}}次</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang='ts'>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		useNewsStore
	} from '../../store/newsStore';
	const store = useNewsStore()
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
					text:nth-child(2){
						margin-left: 30rpx;
					}
				}
			}
		}
	}
</style>
