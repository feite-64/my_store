<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
		font-family: 'iconfont';
		/* Project id 3725445 */
		src: url('//at.alicdn.com/t/c/font_3725445_c99qjjs2jnq.woff2?t=1666937714482') format('woff2'),
			url('//at.alicdn.com/t/c/font_3725445_c99qjjs2jnq.woff?t=1666937714482') format('woff'),
			url('//at.alicdn.com/t/c/font_3725445_c99qjjs2jnq.ttf?t=1666937714482') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-kefu:before {
		content: "\e60b";
	}

	.icon-weizhi:before {
		content: "\e600";
	}

	.icon-video_light:before {
		content: "\e7e9";
	}

	.icon-i-img:before {
		content: "\e616";
	}

	.icon-contact:before {
		content: "\e604";
	}

	.icon-shop:before {
		content: "\e75f";
	}

	.icon-home:before {
		content: "\e696";
	}

	.icon-zixun:before {
		content: "\e6f9";
	}

	.icon-gouwuche:before {
		content: "\e70b";
	}

	.icon-user:before {
		content: "\e99e";
	}
</style>
