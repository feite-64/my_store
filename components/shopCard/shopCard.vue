<template>
	<view class="common-car">
		<view class="empty-shop-car" v-if="store.data.length===0">
			<image src="../../static/empty_shop_car.png" class="empty-shop-car-image" mode=""></image>
			<text>当前您的购物车是空的</text>
			<view class="empty-shop-car-btn">
				<text>去逛逛</text>
			</view>
		</view>
		<view class="shop-car" v-else>
			<view class="shop-car-header">
				<text @tap="cut">{{data.isCut?'编辑':'完成'}}</text>
			</view>
			<view class="store-box" v-for="(itemq,indexq) in store.data" :key="indexq">
				<view class="store-header">
					<image src="@/static/select.png" v-if="itemq.checked == 2" class="checked-image" mode=""
						@tap="storeCheck(indexq,itemq.checked)"></image>
					<image src="@/static/not_select.png" v-else class="checked-image" mode=""
						@tap="storeCheck(indexq,itemq.checked)">
					</image>
					<text>{{itemq.name}}</text>
					<image src="../../static/youjiantou1.png" class="label" mode=""></image>
				</view>
				<view class="goodsInfo" v-for="(itemw,indexw) in itemq.goods" :key="indexw">
					<image src="@/static/select.png" v-if="itemw.checked == 2" class="checked-image" mode=""
						@tap="goodsCheck(indexq,indexw,itemw.checked)"></image>
					<image src="@/static/not_select.png" v-else class="checked-image" mode=""
						@tap="goodsCheck(indexq,indexw,itemw.checked)"></image>
					<view class="goodsInfo-right">
						<image :src="itemw.img" class="goods-image" mode=""></image>
						<view class="goodsInfo-box">
							<text class="goods-name">{{itemw.title}}</text>
							<text class="spe">规格：{{itemw.remark}}</text>
							<view class="goods-box">
								<text class="goods-price">¥{{itemw.price}}</text>
								<view class="goods-num-box">
									<view class="goods-image" @tap="sub(indexq,indexw,itemw.number)">
										<text>-</text>
									</view>
									<view class="goods-num">
										<text>{{itemw.number}}</text>
									</view>
									<view class="goods-image" @tap="add(indexq,indexw,itemw.number)">
										<text>+</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="statistics-box">
				<view class="statistics">
					<view class="statistics-left" v-if="data.statisticsIndex" @tap="allCheck">
						<image src="@/static/select.png" class="checked-image" mode="">
						</image>
						<text>全选</text>
					</view>
					<view class="statistics-left" v-else @tap="allCheck">
						<image src="@/static/not_select.png" class="checked-image" mode="">
						</image>
						<text>全选</text>
					</view>
					<view class="statistics-right" v-if="data.isCut" @tap="accounts">
						<text>总计：</text><text class="text-color">¥{{data.total}}</text>
						<view class="btn">
							<text>结算</text>
						</view>
					</view>
					<view class="statistics-right" v-else @tap="delect">
						<view class="btn">
							<text>删除</text>
						</view>
					</view>
				</view>
				<!-- <view class="gap"></view> -->
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script setup lang="ts">
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app';
	import {
		reactive
	} from "vue";
	import {
		useGoodsStore
	} from '../../store/goodsStore';
	const store = useGoodsStore()
	const data = reactive({
		iPhoneX: false,
		statisticsIndex: false,
		total: '0',
		isCut: true,
		winHeight: 0
	})
	// 商品选择
	const goodsCheck = (storeIndex: number, goodsIndex: number, goodsChecked: number) => {
		if (goodsChecked == 1) {
			store.data[storeIndex].goods[goodsIndex].checked = 2
		} else {
			store.data[storeIndex].goods[goodsIndex].checked = 1
		}
		//判断是否该店铺全选
		let storeChecked = true
		store.data[storeIndex].goods.map((item, index) => {
			if (item.checked === 1) {
				storeChecked = false
			}
			if (storeChecked === false) {
				store.data[storeIndex].checked = 1
			} else {
				store.data[storeIndex].checked = 2
			}
		})


		//判断是否全选
		let statisticsIndex = true
		store.data.find((item, index) => {
			if (item.checked == 1) {
				statisticsIndex = false
			}
			if (statisticsIndex == false) {
				data.statisticsIndex = false
			} else {
				data.statisticsIndex = true
			}
		})

		statistics()
	}
	//店铺选择
	const storeCheck = (storeIndex: number, storeCheck: number) => {
		if (storeCheck == 1) {
			store.data[storeIndex].checked = 2
			store.data[storeIndex].goods.find((item, index) => {
				item.checked = 2
			})
		} else {
			store.data[storeIndex].checked = 1
			store.data[storeIndex].goods.find((item, index) => {
				item.checked = 1
			})
		}
		//判断是否全选
		let statisticsIndex = true
		store.data.find((item, index) => {
			if (item.checked == 1) {
				statisticsIndex = false
			}
			if (statisticsIndex == false) {
				data.statisticsIndex = false
			} else {
				data.statisticsIndex = true
			}
		})
		statistics()
	}
	//减少
	const sub = (storeIndex: number, goodsIndex: number, goodsnum: number) => {
		if (goodsnum == 1) {
			return
		} else {
			store.data[storeIndex].goods[goodsIndex].number--
		}
		if (store.data[storeIndex].goods[goodsIndex].checked === 2) {
			statistics()
		}
	}
	//增加
	const add = (storeIndex: number, goodsIndex: number, goodsnum: number) => {
		store.data[storeIndex].goods[goodsIndex].number++
		// 判断是否需要计算总价  即是否选中
		if (store.data[storeIndex].goods[goodsIndex].checked === 2) {
			statistics()
		}
	}
	//全选
	const allCheck = () => {
		if (data.statisticsIndex) {
			store.data.find((item, index) => {
				item.checked = 1
				item.goods.find((itemq, indexq) => {
					itemq.checked = 1
				})
			})
			data.statisticsIndex = false
		} else {
			store.data.find((item, index) => {
				item.checked = 2
				item.goods.find((itemq, indexq) => {
					itemq.checked = 2
				})
			})
			data.statisticsIndex = true
		}
		statistics()
	}
	// 统计
	const statistics = () => {
		let total = 0
		store.data.find((item, index) => {
			item.goods.find((itemq, indexq) => {
				if (itemq.checked == 2) {
					total = total + parseFloat(itemq.price) * itemq.number
				}
			})
		})
		data.total = total.toFixed(2)
	}
	const cut = () => {
		data.isCut = !data.isCut
		data.statisticsIndex = true
		allCheck()
	}
	// 结算
	const accounts = () => {
		let {
			judge,
			idList
		} = judgeSelect()
		if (judge) {
			// data.$emit('delect', store.data)
			store.settlementCart(idList)
		} else {
			uni.showToast({
				title: '您当前未选择任何商品,结算失败',
				icon: 'none'
			})
		}
	}
	// 删除
	const delect = () => {
		// 判断是否选中
		// 获取需要删除商品的id
		let {
			judge,
			idList
		} = judgeSelect()
		if (judge) {
			store.deleteData(idList)
			uni.showToast({
				title: '删除成功',
				icon: 'none'
			})
			// data.$emit('delect', store.data)
		} else {
			uni.showToast({
				title: '您当前未选择任何商品,删除失败',
				icon: 'none'
			})
		}

	}
	const judgeSelect = () => {
		let judge = false
		let idList = []
		store.data.find((item, index) => {
			item.goods.find((itemq, indexq) => {
				if (itemq.checked == 2) {
					idList.push(itemq.id)
					judge = true
				}
			})
		})
		return {
			judge,
			idList
		}
	}
	onLoad(() => {
		// 获取商品数据
		store.getCartData()
	})
	onReady(() => {
		uni.getSystemInfo({
			success: function(res) {
				// 获取可用屏幕高度 windowHeight
				// 获取屏幕高度screenHeight
				data.winHeight = res.windowHeight * 2
				//  #ifdef H5
				data.winHeight = data.winHeight - 140
				// #endif
			},
		});
	})
</script>

<style lang="scss" scoped>
	.common-car {
		width: 750rpx;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #F5F5F5;
	}

	.empty-shop-car {
		width: 750rpx;
		min-height: 680rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.empty-shop-car-image {
			width: 340rpx;
			height: 278rpx;
			margin-top: 102rpx;
		}

		text {
			margin-top: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #666666;
		}

		.empty-shop-car-btn {
			width: 240rpx;
			height: 90rpx;
			background: #FBBC02;
			border-radius: 200rpx;
			margin-top: 40rpx;
			text-align: center;
			line-height: 90rpx;
			font-size: 30rpx;
			font-weight: 400;
			color: #313133;
		}
	}

	.shop-car {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.shop-car-header {
			width: 690rpx;
			height: 80rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;

			text {
				font-size: 28rpx;
				font-weight: 400;
				color: #313133;
			}
		}

		.store-box {
			width: 750rpx;
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #FFFFFF;

			.store-header {
				width: 690rpx;
				height: 78rpx;
				padding: 0 30rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #313133;

				.checked-image {
					width: 36rpx;
					height: 36rpx;
				}

				text {
					font-size: 28rpx;
					font-weight: 400;
					color: #313133;
					margin-left: 20rpx;
				}

				.label {
					width: 14rpx;
					height: 24rpx;
					margin-left: 10rpx;
					margin-top: 5rpx;
				}
			}

			.goodsInfo {
				width: 690rpx;
				height: 246rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				border-bottom: 2rpx solid #EDEDED;

				&:nth-last-child(1) {
					border: none;
				}

				.checked-image {
					width: 36rpx;
					height: 36rpx;
				}

				.goodsInfo-right {
					width: 634rpx;
					height: 246rpx;
					margin-left: 20rpx;
					display: flex;
					flex-direction: row;
					align-items: center;

					.goods-image {
						width: 180rpx;
						height: 180rpx;
					}

					.goodsInfo-box {
						width: 428rpx;
						margin-left: 24rpx;
						display: flex;
						flex-direction: column;
						align-items: center;

						.goods-name {
							width: 428rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #313133;
						}

						.spe {
							width: 428rpx;
							margin-top: 10rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #919298;
						}

						.goods-box {
							width: 428rpx;
							margin-top: 18rpx;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-between;

							.goods-price {
								font-size: 32rpx;
								font-weight: 400;
								color: #313133;
							}

							.goods-num-box {
								width: 168rpx;
								height: 46rpx;
								display: flex;
								flex-direction: row;
								align-items: center;

								.goods-image {
									width: 46rpx;
									height: 44rpx;
									text-align: center;
									line-height: 44rpx;
									border: 1rpx solid #CFCFCF;
									font-size: 38rpx;
								}

								.goods-num {
									width: 76rpx;
									height: 44rpx;
									text-align: center;
									line-height: 44rpx;
									font-size: 33rpx;
									font-weight: 400;
									color: #666666;
									border-top: 1px solid #CFCFCF;
									border-bottom: 1px solid #CFCFCF;
								}
							}
						}
					}
				}
			}
		}

		.statistics-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			/* #ifdef H5 */
			bottom: 100rpx;
			/* #endif */

			.statistics {
				width: 720rpx;
				padding: 0 0 0 30rpx;
				height: 98rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.statistics-left {
					width: 120rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					image {
						width: 36rpx;
						height: 36rpx;
					}

					text {
						font-size: 30rpx;
						font-weight: 400;
						color: #313133;
					}
				}

				.statistics-right {
					width: 600rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-end;

					.btn {
						width: 218rpx;
						height: 98rpx;
						background: #FBBC02;
						text-align: center;
						line-height: 98rpx;
						font-size: 30rpx;
						font-weight: 400;
						color: #313133;
						margin-left: 40rpx;
					}

					text {
						font-size: 30rpx;
						font-weight: 400;
						color: #313133;
					}

					.text-color {
						color: rgb(242, 18, 18);
					}
				}
			}

			.gap {
				width: 750rpx;
				height: 40rpx;
			}
		}
	}
</style>
