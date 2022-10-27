import { defineStore } from 'pinia'
import { getNewsList } from '@/utils/service'
import { newsListType } from '@/type/newsType'
export const useNewsStore = defineStore('news', {
	state() {
		return {
			newsListData: <newsListType[]>[],
			index: <number>1,
			flag: <boolean>false,
			newsDetailsData: <newsListType>{}
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