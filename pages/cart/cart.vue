<template>
	<view class="shop-card">
		<shopCard @delect="delect" @accounts="accounts">
			<text>
				-------我是有底线的-------
			</text>
		</shopCard>
		<image src="" mode=""></image>
	</view>
</template>

<script setup>
	import shopCard from '@/components/shopCard/shopCard.vue'
	import {
		reactive
	} from "vue";

	const delect = (e) => {
		console.log(e);
	}
	const accounts = (e) => {
		console.log(e);
	}
</script>

<style lang="scss" scoped>
	.shop-card {
		width: 750rpx;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #F5F5F5;
	}
</style>
