<template>
	<view class="goods_details">
		<view class="goods_details_info">
			<text>发表时间:{{store.getFilter(store.shopDetailsData.add_time)}}</text>
			<text>浏览:{{store.shopDetailsData.click}}</text>
		</view>
		<view class="goods_details_image">
			<image :src="store.shopDetailsData.img_url" mode=""></image>
		</view>
		<view class="goods_details_active">
			<view class="goods_details_active_title">{{store.shopDetailsData.title}}</view>
			<view class="goods_details_active_price">
				<text>￥{{store.shopDetailsData.sell_price}}</text>
				<text>￥{{store.shopDetailsData.market_price}}</text>
			</view>
		</view>
		<view class="wjz">
			暂无其他数据
		</view>
		<view class="goods_details_flxed">
			<view class="goods_details_flxed_left">
				<view @click="navigatorClick(item.path)" v-for="item in store.shopNavsData" :key="item.title"
					class="goods_details_flxed_left_icon">
					<text :class="item.icon"></text>
					<text>{{item.title}}</text>
				</view>
			</view>

			<view class="goods_details_flxed_btn">
				<view class="goods_details_flxed_btn_addToCart">
					<text>加入购物车</text>
				</view>
				<view class="goods_details_flxed_btn_buyNow">
					<text>立即购买</text>
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
		useShopStore
	} from '@/store/shopStore';
	const store = useShopStore()
	// 点击底部工具栏跳转
	const navigatorClick = (url: string) => {
		if (url.includes('/cart')) {
			uni.switchTab({
				url: url
			})
		} else {
			uni.navigateTo({
				url: url
			})
		}

	}
	// 获取页面跳转的传参
	onLoad((data) => {
		// 根据传参筛选符合条件的数据渲染
		store.shopDetailsData = store.shopData.find(item => item.id === parseInt(data.id))
	})
</script>

<style scoped lang='scss'>
	.goods_details {
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

		&_flxed {
			padding: 6rpx 20rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			align-items: center;
			border-top: 1px solid $shop-bgc;
			color: #444444;

			&_left {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-around;

				&_icon {

					display: flex;
					flex-direction: column;
					align-items: center;

					text:nth-child(1) {
						font-size: 40rpx;
					}

					text:nth-child(2) {
						font-size: 22rpx;

					}
				}
			}

			&_btn {
				height: 70rpx;
				color: #fff;
				display: flex;
				align-items: center;

				&_addToCart {
					width: 160rpx;
					height: 70rpx;
					line-height: 70rpx;
					font-size: 26rpx;
					text-align: center;
					padding: 0 10rpx;
					background-color: red;
					border-radius: 35rpx 0 0 35rpx;
				}

				&_buyNow {
					width: 160rpx;
					height: 70rpx;
					line-height: 70rpx;
					font-size: 26rpx;
					text-align: center;
					padding: 0 10rpx;
					border-radius: 0 35rpx 35rpx 0;
					background-color: orange;
				}

				/* width: 50%; */
			}
		}
	}


	.wjz {
		padding: 20rpx;
		display: flex;
		justify-content: center;
	}
</style>
