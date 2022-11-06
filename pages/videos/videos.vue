<template>
	<view class="video">
		<view class="video_list">
			<view class="video_list_item" v-for="item in data" :key="item.id">
				<text>{{item.title}}</text>
				<video :src="item.video" controls danmu-btn enable-danmu :danmu-list="item.danmuList"></video>
			</view>
		</view>
	</view>
</template>

<script setup lang='ts'>
	import {
		reactive
	} from "vue";
	const data = reactive([{
			id: 1,
			video: '../../static/video/1.mp4',
			title: '学习，学个屁',
			danmuList: [{
					text: '666',
					color: '#ff0000',
					time: 1,
				},
				{
					text: '我TM社保',
					color: '#ff00ff',
					time: 3
				}
			],
		},
		{
			id: 2,
			video: '../../static/video/1.mp4',
			title: '好学',
			danmuList: [{
					text: '666',
					color: '#ff0000',
					time: 1,
				},
				{
					text: '我TM社保',
					color: '#ff00ff',
					time: 3
				}
			],
		},
		{
			id: 3,
			video: '../../static/video/1.mp4',
			title: '就是有点费营养',
			danmuList: [{
					text: '666',
					color: '#ff0000',
					time: 1,
				},
				{
					text: '我TM社保',
					color: '#ff00ff',
					time: 3
				}
			],
		}
	])
</script>

<style scoped lang='scss'>
	.video {
		background-color: $shop-bgc;
		padding: 0 0 40rpx;

		&_list {
			display: flex;
			flex-direction: column;
			align-items: center;

			&_item {
				display: flex;
				flex-direction: column;
				align-items: center;

				text {
					padding: 20rpx 0;
				}

				video {
					width: 600rpx;
					height: 400rpx;
				}
			}
		}
	}
</style>
