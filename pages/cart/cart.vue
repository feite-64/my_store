<template>
	<view class="cart">
		
		
		<view class="CartBar">
			<view class="CartBar_price">
				<input type="checkbox" name="" id=""><text>全选</text>
			</view>
			<view class="CartBar_cart">
				<text>合计：￥0</text>
				<text>结算</text>
			</view>
		</view>
	</view>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
	body {
		width: 100%;
		height: 100%;
		background-color: $shop-bgc;
	}

	.CartBar {
		height: 120rpx;
		padding: 20rpx;
		background-color: #fff;
		position: fixed;
		bottom: 100rpx;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
