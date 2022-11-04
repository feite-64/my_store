<template>
	<view class="cart">
		<view class="checkbox-group" :style="{height:winHeight+'rpx'}">
			<checkbox-group @change="checkChange" name="checkboxChange">
				<view class="cart_item" v-for="item in data" :key="item.id">
					<view class="cart_item_shop">
						<checkbox :value="item.checkValue" :checked="item.checked" />
						<text>{{item.shop}}</text>
					</view>
					<view class="cart_item_goods">
						<view class="cart_item_goods_item" v-for="items in item.children" :key="items.id">
							<checkbox :value="items.checkValue" :checked="items.checked" />
							<text>{{items.goods}}</text>
						</view>
					</view>

				</view>
			</checkbox-group>
		</view>

		<view class="CartBar">
			<view class="CartBar_price">
				<checkbox-group @click="allBtnClick" name="checkboxChange">
					<checkbox value="选中" :checked="allbtn" /><text>全选</text>
				</checkbox-group>
			</view>
			<view class="CartBar_cart">
				<text>合计：￥0</text>
				<text>结算</text>
			</view>
		</view>
	</view>
</template>

<script setup lang='ts'>
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app';
	import {
		reactive,
		ref
	} from "vue";
	const winHeight = ref < number > ()

	const allbtn = ref < boolean > (false)
	const data = reactive([{
			id: 1,
			img: '',
			checkValue: '按钮',
			checked: false,
			shop: '水果商店',
			price: 1231,
			children: [{
				id: 11,
				goods: '苹果',
				checkValue: '按钮',
				checked: false,
			}]
		},
		{
			id: 2,
			img: '',
			checkValue: '按钮',
			checked: false,
			shop: '蔬菜商店',
			price: 1231,
			children: [{
					id: 21,
					goods: '胡萝卜',
					checkValue: '按钮',
					checked: false,
				},
				{
					id: 22,
					goods: '黄瓜',
					checkValue: '按钮',
					checked: false,
				}, {
					id: 23,
					goods: '西红柿',
					checkValue: '按钮',
					checked: false,
				}
			]
		},
		{
			id: 3,
			img: '',
			checkValue: '按钮',
			checked: false,
			shop: '玩具商店',
			price: 1231,
			children: [{
					id: 31,
					goods: '高达',
					checkValue: '按钮',
					checked: false,
				},
				{
					id: 32,
					goods: '迪士尼',
					checkValue: '按钮',
					checked: false,
				},
				{
					id: 33,
					goods: '积木',
					checkValue: '按钮',
					checked: false,
				}
			]
		},
		{
			id: 4,
			img: '',
			checkValue: '按钮',
			checked: false,
			shop: '玩具商店',
			price: 1231,
			children: [{
					id: 41,
					goods: '高达',
					checkValue: '按钮',
					checked: false,
				},
				{
					id: 42,
					goods: '迪士尼',
					checkValue: '按钮',
					checked: false,
				},
				{
					id: 43,
					goods: '积木',
					checkValue: '按钮',
					checked: false,
				}
			]
		}
	])
	const checkChange = (e) => {
		console.log();
		// e.detail
		if (e.detail.value.length < data.length) {
			return allbtn.value = false
		} else {
			allbtn.value = true
		}
	}
	const allBtnClick = (e) => {
		allbtn.value = !allbtn.value
		if (allbtn.value == true) {
			return data.forEach(item => {
				item.checked = true
			})
		} else if (allbtn.value == false) {
			return data.forEach(item => {
				item.checked = false
			})
		}
	}
	onLoad(() => {

	})
	onReady(() => {
		uni.getSystemInfo({
			success: function(res) {
				// 获取可用屏幕高度 windowHeight
				// 获取屏幕高度screenHeight
				winHeight.value = res.windowHeight * 2
				//  #ifdef H5
				winHeight.value = winHeight.value - 140
				// #endif
			},
		});
	})
</script>

<style scoped lang='scss'>
	.cart {
		background-color: $shop-bgc;
		padding-bottom: 10rpx;

		.checkbox-group {
			width: 100%;
			overflow: auto;

			checkbox-group {
				width: 100%;
				display: flex;
				flex-direction: column;
				/* justify-content: start; */
				align-items: center;

			}

			.cart_item {
				width: 95%;
				margin-top: 20rpx;
				background-color: #fff;
				border-radius: 20rpx;

				&_shop {
					border-bottom: 1px solid $shop-bgc;
					padding: 10rpx;

					checkbox {
						-webkit-appearance: radio;
						border-radius: 50%;
						transform: scale(0.7)
					}
				}

				&_goods {

					display: flex;
					flex-direction: column;

					&_item {
						height: 100%;
						padding: 20rpx;

						checkbox {
							-webkit-appearance: radio;
							border-radius: 50%;
							transform: scale(0.7)
						}
					}
				}
			}
		}
	}

	.CartBar {
		height: 100rpx;
		padding: 20rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		/* #ifdef H5 */
		bottom: 100rpx;
		/* #endif */
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
