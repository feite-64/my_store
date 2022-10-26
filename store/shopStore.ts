import { defineStore } from 'pinia'
import { getShopData } from '@/utils/service'
import { shopType } from '@/type/shop'
export const useShopStore = defineStore('shop', {
	state() {
		return {
			shopData: <shopType[]>[],
		}
	},
	getters: {

	},
	actions: {
		// 获取商品数据
		async getShopParcel(callBack: () => void) {
			await getShopData().then((res: any) => {
				this.shopData = res.data
			})
			callBack && callBack()
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