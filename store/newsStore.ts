import { defineStore } from 'pinia'
import { getNewsList } from '@/utils/service'
import { newsListType } from '@/type/newsType'
export const useNewsStore = defineStore('news', {
	state() {
		return {
			newsListData: <newsListType[]>[],
			index: <number>1,
			flag: <boolean>false
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
		},
		// 下拉刷新
		async getPullData() {
			if (this.index > 4) return
			await getNewsList().then((res: any) => {

				this.newsListData = [...this.newsListData, ...res.data]
			})
		}
	}
})