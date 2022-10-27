<template>
	<view class="news_detail">
		<text class="news_detail_title">{{store.newsDetailsData.title}}</text>
		<view class="news_detail_info">
			<text>发表时间:{{store.getFilter(store.newsDetailsData.add_time)}}</text>
			<text>浏览:{{store.newsDetailsData.click}}</text>
		</view>
		<view class="news_detail_content">
			<rich-text :nodes="store.newsDetailsData.zhaiyao"></rich-text>
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
	// 获取页面跳转的传参
	onLoad((data) => {
		// 根据传参筛选符合条件的数据渲染
		store.newsDetailsData = store.newsListData.find(item => item.id === parseInt(data.id))
		store.getNewsListData()
	})
</script>

<style scoped lang='scss'>
	.news_detail {
		padding: 20rpx;
		&_title {
			text-align: center;
			display: block;
			font: bold 40rpx songti;
		}
		&_info{
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
