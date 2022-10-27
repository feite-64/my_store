<template>

	<view class="shop_details">
		<view class="shop_details_info">
			<text>发表时间:{{store.getFilter(store.shopDetailsData.add_time)}}</text>
			<text>浏览:{{store.shopDetailsData.click}}</text>
		</view>
		<view class="shop_details_image">
			<image :src="store.shopDetailsData.img_url" mode=""></image>
		</view>
		<view class="shop_details_active">
			<view class="shop_details_active_title">{{store.shopDetailsData.title}}</view>
			<view class="shop_details_active_price">
				<text>￥{{store.shopDetailsData.sell_price}}</text>
				<text>￥{{store.shopDetailsData.market_price}}</text>
			</view>
		</view>
		<view class="wjz">
			暂无其他数据
		</view>
	</view>


</template>

<script setup lang='ts'>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		useShopStore
	} from '@/store/shopStore';
	const store = useShopStore()
	// 获取页面跳转的传参
	onLoad((data) => {
		// 根据传参筛选符合条件的数据渲染
		store.shopDetailsData = store.shopData.find(item => item.id === parseInt(data.id))
	})
</script>

<style scoped lang='scss'>
	.shop_details {
		padding: 20rpx;

		&_image {
			text-align: center;
		}

		&_active {
			padding: 20rpx;
			background-image: linear-gradient(to right bottom, rgba(red, .8), rgba(orange, .5));
			border-radius: 20rpx;

			&_title {
				font-size: 40rpx;
			}

			&_price {
				margin-top: 10rpx;
				color: #fff;
				font-size: 40rpx;

				text:nth-child(2) {
					color: $shop-color;
					font-size: 26rpx;
					margin-left: 20rpx;
					text-decoration: line-through;
				}
			}
		}

		&_info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx;
		}

	}

	.wjz {
		padding: 20rpx;
		display: flex;
		justify-content: center;
	}
</style>
