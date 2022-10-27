<template>
	<view class="hot-shop_list">
		<view @click="shopDetailClick(item.id)" v-for="item in store.shopData" :key="item.id" class="hot-shop_list_item">
			<image :src="item.img_url"></image>
			<view class="hot-shop_list_item-price">
				<text>￥{{item.sell_price}}</text>
				<text>￥{{item.market_price}}</text>
			</view>
			<view class="hot-shop_list_item-name">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		useShopStore
	} from '../../store/shopStore';
	const shopDetailClick=(id:number)=>{
		uni.navigateTo({
			url:`/pages/shop_details/shop_details?id=${id}`
		})
	}
	const store = useShopStore()
</script>

<style lang="scss">
	.hot-shop_list {
		padding: 0 15rpx;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		&_item {
			background-color: #fff;
			width: 355rpx;
			margin: 10rpx 0;

			image {
				width: 80%;
				height: 300rpx;
				display: block;
				margin: 0 auto;
			}

			&-price {
				color: $shop-color;
				font-size: 40rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 26rpx;
					margin-left: 18rpx;
					text-decoration: line-through;
				}
			}

			&-name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding: 10rpx;
			}
		}
	}
</style>
