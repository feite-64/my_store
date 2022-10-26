import { defineStore } from 'pinia'
import { getPicsImage, getPicsTitle } from '@/utils/service'
type titleType = {
	id: number
	title: string
}
type imageType = {
	id: number
	src: string
	alt: string
}
export const usePicsStore = defineStore('pics', {
	state() {
		return {
			titleData: <titleType[]>[],
			imageData: <imageType[]>[],
			active: <number>1
		}
	},
	getters: {

	},
	actions: {
		// 获取标签数据
		getPicsTitleData() {
			getPicsTitle().then((res: any) => {
				this.titleData = res.data
			})
		},
		// 动态获取图片数据
		getPicsImageData() {
			getPicsImage(this.active).then((res: any) => {
				this.imageData = res.data
			})
		}
	}
})