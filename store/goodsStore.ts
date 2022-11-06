import { defineStore } from 'pinia'
import { getCartList } from '@/utils/service'
type data = {
	id: number,
	checked: number,
	name: string,
	goods: goods[]
}
type goods = {
	id: number,
	title: string,
	price: string,
	remark: string,
	checked: number,
	checkValue: string,
	img: string,
	number: 1,
}
export const useGoodsStore = defineStore('goods', {
	state() {
		return {
			data: <data[]>[
			],
			// 计算总价
			totalPrice: <number>0
		}
	},
	getters: {
	},
	actions: {
		// 获取购物车数据
		async getCartData() {
			await getCartList().then((res: any) => {
				this.data = res.data
				console.log(this.data);
			})
		},
		deleteData(idList: number[]) {
			// 发送请求让后端删除数据
			this.data.forEach((item: data) => {
				item.goods.forEach((items: goods) => {
					idList.forEach(id => {
						if (items.id === id) {
							console.log(items);
						}
					})
				})
			})
		},
		// 结算
		settlementCart(idList: number[]) {
			this.data.forEach((item: data) => {
				item.goods.forEach((items: goods) => {
					idList.forEach(id => {
						if (items.id === id) {
							console.log(items);
						}
					})
				})
			})
		}
	}
})