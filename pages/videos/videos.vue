<template>
	<view class="video">
		<view class="video_list">
			<view class="video_list_item" v-for="item in data" :key="item.id">
				<text>{{item.title}}</text>
				<button @click="upLoadVideo(item.id)">点击上传视频</button>
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
			id: 0,
			video: '',
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
			id: 1,
			video: '',
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
			id: 2,
			video: '',
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
	// 上传视频
	const upLoadVideo = (id: number) => {
		// 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
		uni.chooseVideo({
			// album相册上传 ，camera 使用相机拍摄
			sourceType: ['album'],
			// 压缩
			compressed: true,
			success(res) {
				data[id].video = res.tempFilePath
			}
		})
	}
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
					padding-top: 20rpx;
				}

				button {
					font-size: 30rpx;
					margin: 20rpx;
				}

				video {
					width: 600rpx;
					height: 400rpx;
				}
			}
		}
	}
</style>
