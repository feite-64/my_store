<template>
	<view class="content">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in data.swiperData" :key="item.id">
				<image :src="item.img" class="swiper_image"></image>
			</swiper-item>
		</swiper>
		<view class="nav">
			<view @click="navItemClick(item.path)" v-for="item in data.navs" :key="item.path" class="nav_item">
				<view :class="item.icon">
				</view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="hot-shop">
			<view class="hot-shop_title">推荐商品</view>
			<goodsList></goodsList>
		</view>
	</view>
</template>

<script setup lang="ts">
	import goodsList from '@/components/goods-list/goods-list.vue'
	import {
		reactive
	} from "vue";
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		getSwiperData,
	} from "@/utils/service";
	import {
		useShopStore
	} from '../../store/shopStore';

	type swiperType = {
		src: string
		alt: string
		img: string
		id: number
	}
	type navsType = {
		icon: string,
		title: string,
		path: string
	}
	type data = {
		swiperData: swiperType[]
		navs: navsType[]
	}
	const store = useShopStore()
	const data = reactive < data > ({
		swiperData: [],
		navs: [{
				icon: 'iconfont icon-shop',
				title: '黑马超市',
				path: '/pages/goods/goods'
			}, {
				icon: 'iconfont icon-contact',
				title: '联系我们',
				path: '/pages/contact/contact'
			}, {
				icon: 'iconfont icon-i-img',
				title: '社区图片',
				path: '/pages/pics/pics'
			},
			{
				icon: 'iconfont icon-video_light',
				title: '学习视频',
				path: '/pages/videos/videos'
			}
		]
	})
	//  获取轮播图数据
	const getSwiperParcel = async () => {
		await getSwiperData().then((res: any) => {
			data.swiperData = res.data
		})
		//使用全局挂载的方式
		// instance.proxy.$server({url:'/swiper'}).then(res=>{
		// 	console.log(res);
		// })
	}
	// 点击跳转页面
	const navItemClick = (url: string) => {
		//可以返回
		uni.navigateTo({
			url: url
		})
	}
	onLoad(() => {
		getSwiperParcel()
		// 获取商品列表数据
		store.getShopListData()
	})
</script>

<style lang="scss">
	.content {
		swiper {
			width: 750rpx;
			height: 380rpx;

			.swiper_image {
				width: 100%;
				height: 100%;
			}
		}

		.nav {
			display: flex;
			justify-content: space-evenly;
			margin: 20rpx 0;

			&_item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				view {
					width: 120rpx;
					height: 120rpx;
					background-color: $shop-color;
					border-radius: 50%;
					line-height: 120rpx;
					text-align: center;
					font-size: 50rpx;
					color: #fff;
					margin-bottom: 20rpx;
				}

				text {
					font-size: 30rpx;
				}
			}

			&_item:nth-of-type(4) {
				view {
					font-size: 60rpx;
				}
			}
		}

		.hot-shop {
			background-color: $shop-bgc;
			overflow: hidden;

			&_title {
				height: 80rpx;
				width: 100%;
				text-align: center;
				line-height: 80rpx;
				margin-top: 6rpx;
				color: $shop-color;
				background-color: #fff;
				font-size: 40rpx;
				letter-spacing: 50rpx;
				font-weight: 600;
			}
		}
	}
</style>
