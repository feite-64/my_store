import { service } from './request'
// 获取轮播图数据
export const getSwiperData = () => {
	return service({
		url: '/swiper',
		method: "GET"
	})
}
// 获取商品数据
export const getShopData = () => {
	return service({
		url: '/shop',
		method: "GET"
	})
}
// export const getGoodsData = (index: string) => {
// 	return service({
// 		url: `/shop/${index}`,
// 		method: "GET"
// 	})
// }
// 获取左侧标签
export const getPicsTitle = () => {
	return service({
		url: `/title`,
		method: "GET"
	})
}
// 动态获取图片
export const getPicsImage = (id:number) => {
	return service({
		url: `/image/${id}`,
		method: "GET"
	})
}