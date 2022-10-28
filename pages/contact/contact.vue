<template>
	<view class="contact">
		<image class="contact_img"
			src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg95.699pic.com%2Fphoto%2F50058%2F8421.jpg_wh300.jpg&refer=http%3A%2F%2Fimg95.699pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669342673&t=d4dfb3b17b3c2eee3c35c9734f404451"
			mode="">
		</image>
		<view class="contact_info">
			<view class="contact_info_phone">
				<text>联系电话：199-299-9999</text> <text @click="phoneClick">(点击拨打)</text>
			</view>
			<view class="contact_info_area">
				<text>校区地址：江苏省徐州市贾汪区徐州经济开发区站南路</text>
			</view>
		</view>
		<view class="contact_map">
			<map :key="data.id" :latitude="data.latitude" :scale="data.scale" :longitude="data.longitude" :markers="data.coves"></map>
			<!-- <map name=""></map> -->
		</view>
	</view>
</template>

<script setup lang='ts'>
	import {
		reactive
	} from "vue";
	// 地址
	const data = reactive({
		id:1,
		latitude: 34.272011,
		longitude: 117.312622,
		scale: 12,
		coves: [{
			latitude: 34.272011,
			longitude: 117.312622,
			iconPath: '../../static/fonts/position.png',
			width: 30,
			height: 30
		}]

	})
	// 点击拨打电话
	const phoneClick = () => {
		uni.makePhoneCall({
			phoneNumber: '199-299-9999',
			success() {
				console.log('成功');
			},
			fail() {
				console.log('失败');
			}
		})
	}
</script>

<style scoped lang='scss'>
	.contact {
		width: 100%;

		&_img {
			width: 750rpx;
			/* 		height: 400rpx; */
		}

		&_info {
			font-size: 30rpx;
			padding: 10rpx 20rpx;
			line-height: 80rpx;

			&_phone {
				text {
					padding-right: 20rpx;
				}

				text:nth-child(2) {
					color: $shop-color;
				}
			}
		}

		&_map {
			map {
				width: 750rpx;
				height: 600rpx;
			}
		}
	}
</style>
