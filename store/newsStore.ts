import { defineStore } from 'pinia'
import { getNewsList } from '@/utils/service'
import { newsListType } from '@/type/newsType'
export const useNewsStore = defineStore('shop', {
	state() {
		return {
			newsListData: <newsListType[]>[]
		}
	},
	getters: {

	},
	actions: {
		// 获取资讯列表
		async getNewsListData() {
			await getNewsList().then((res: any) => {
				this.newsListData = res.data
			})
		}
	}
})