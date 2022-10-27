<template>
	<view class="goods">
		<goodList></goodList>
		<view class="reachBottom" v-if="flag">
			-------我是有底线的-------
		</view>
	</view>
</template>

<script setup lang='ts'>
	import goodList from '@/components/goods-list/goods-list.vue'
	import {
		onLoad,
		onReachBottom,
		onPullDownRefresh
	} from '@dcloudio/uni-app';
	import {
		ref
	} from "vue";
	import {
		useShopStore
	} from '../../store/shopStore';
	const flag = ref < boolean > (false)
	// 请求后端接口页数 此处只是模拟
	const index = ref < number > (1)
	const store = useShopStore()

	onLoad(() => {
		store.getShopListData()
	})
	// 触底函数
	onReachBottom(() => {
		index.value++
		store.getNewsSgop(index.value)
		if (index.value > 4) {
			return flag.value = true
		}
	})
	// 下拉刷新
	onPullDownRefresh(() => {
		flag.value = false
		index.value = 1
		store.shopData = []
		setTimeout(() => {
			store.getShopListData()
			uni.stopPullDownRefresh()
		}, 500)
	})
</script>

<style scoped lang='scss'>
	.goods {
		background-color: $shop-bgc;
	}

	.reachBottom {
		text-align: center;
		color: #424242;
		font-size: 30rpx;
		padding-bottom: 20rpx;
	}
</style>
