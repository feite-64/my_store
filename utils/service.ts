import { service } from './request'
export const getSwiperData = () => {
	return service({
		url: '/swiper',
		method: "GET"
	})
}
export const getShopData = () => {
	return service({
		url: '/shop',
		method: "GET"
	})
}
export const getGoodsData = (index: string) => {
	return service({
		url: `/shop/${index}`,
		method: "GET"
	})
}