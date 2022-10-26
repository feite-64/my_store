const BASE_URL = 'https://www.fastmock.site/mock/c3b9567fecda022bc6a9a409ba0ba888/hm_shop'
export type options = {
	url: string
	method: "GET" | "POST"
	data?: Record<string, any>[]
}

export const service = (options: options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res: any) => {
				if (res.statusCode === 200 && res.data.code === 200) {
					resolve(res.data)
				}
				else {
					uni.showToast({
						title: '数据请求失败',
						icon: "error"
					})
					reject(res)
				}
			},
			fail(err) {
				uni.showToast({
					title: '请求接口失败',
					icon: "error"
				})
				reject(err)
			}
		})
	})
}