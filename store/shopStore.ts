import { defineStore } from 'pinia'
import { getShopData } from '@/utils/service'
import { shopType } from '@/type/shop'
export const useShopStore = defineStore('shop', {
	state() {
		return {
			shopData: <shopType[]>[],
			shopDetailsData: <shopType>{},
			shopNavsData: [
				{
					icon: 'iconfont icon-kefu',
					title: '客服',
					path: '/pages/CSP/CSP'
				}, {
					icon: 'iconfont icon-shop',
					title: '店铺',
					path: '/pages/shop_details/shop_details'
				}, {
					icon: 'iconfont icon-gouwuche',
					title: '购物车',
					path: '/pages/cart/cart'
				}
			]
		}
	},
	getters: {
		// 过滤日期格式
		getFilter: () => {
			return function(data: string) {
				const newDate = new Date(data)
				const newYear = newDate.getFullYear().toString().padStart(2, '0')
				const newMouth = newDate.getMonth().toString().padStart(2, '0')
				const newDay = newDate.getDate()
				return `${newYear}-${newMouth}-${newDay}`
			}
		}
	},
	actions: {
		// 获取商品数据
		async getShopListData() {
			await getShopData().then((res: any) => {
				this.shopData = res.data
			})
		},
		// 触底加载新数据 正常通过getShopData(index)实现动态获取接口数据,此处只是模拟
		async getNewsSgop(index: number) {
			await getShopData().then((res: any) => {
				if (index > 4) return
				this.shopData = [...this.shopData, ...res.data]
			})
		}
	}
})