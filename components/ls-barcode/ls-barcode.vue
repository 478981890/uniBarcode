<template xlang="wxml" minapp="mpvue">
	<view class="ls-barcode">

		<canvas type="2d" class="ls-barcode-canvas" :canvas-id="cid"  :id="cid" :style="{width:canvasWidth+'px',height:canvasHeight+'px'}"></canvas>
		
		<image :src="imageData" :style="[getStyle]" class="image-view" />
	</view>
</template>

<script>
	import LsBarcode from './libs/LsBarcode.js'
	import JsBarcode from './libs/JsBarcode.js'
	export default {
		name: "lsBarcode",
		props: {
			cid: {
				type: String,
				default: 'ls-barcode-canvas'
			},
			unit: {
				type: String,
				default: 'px'
			},
			value: {
				type: String,
				default: 'FB19A1650-100S'
			},
			format: {
				type: String,
				default: 'CODE128'
			},
			autoGenerate: {
				type: Boolean,
				default: false
			},
			loadGenerate: {
				type: Boolean,
				default: true
			},
			options: {
				type: Object,
				default: function() {
					return {}
				}
			},
			width: {
				type: [Number,String],
				default: 0
			},
			height: {
				type:  [Number,String],
				default: 0
			}
		},
		data() {
			return {
				imageData: '',
				canvasWidth: 0,
				canvasHeight: 0,
				defaultOptions: {
					// format: "CODE128",//选择要使用的条形码类型 微信支持的条码类型有 code128\code39\ena13\ean8\upc\itf14\
					width: 4, //设置条之间的宽度
					height: 120, //高度
					displayValue: true, //是否在条形码下方显示文字
					// text: "1234567890",//覆盖显示的文本
					textAlign: "center", //设置文本的水平对齐方式
					textPosition: "bottom", //设置文本的垂直位置
					textMargin: 0, //设置条形码和文本之间的间距
					fontSize: 24, //设置文本的大小
					fontColor: "#000000", //设置文本的颜色
					lineColor: "#000000", //设置条形码的颜色
					background: "#FFFFFF", //设置条形码的背景色
					margin: 0, //设置条形码周围的空白边距
					marginTop: 0, //设置条形码周围的上边距
					marginBottom: 0, //设置条形码周围的下边距
					marginLeft: 0, //设置条形码周围的左边距
					marginRight: 0, //设置条形码周围的右边距
				}
			}
		},
		onUnload: function() {},
		methods: {
			getElement() {
				return new Promise((resolve, reject) => {

					// #ifdef MP-WEIXIN
					const query = uni.createSelectorQuery().in(this);
					query.select("#" + this.cid)
						.fields({
							node: true,
							size: true
						})
						.exec((res) => {
							let canvas = null
							if (res[0] && res[0].node) {
								canvas = res[0].node
							}
							if (canvas) {
								resolve(canvas)
							} else {
								reject();
							}

						})
					// #endif
					// #ifndef MP-WEIXIN
						const ctx = uni.createCanvasContext(this.cid)
						let canvas = {
							getContext:()=>{
								return ctx
							}
						}
						resolve(canvas)
					// #endif
					

				})

			},
			async generateCode(options) {

				Object.assign(this.defaultOptions, options || this.options)
				if (this.unit == "upx") {
					if (this.defaultOptions.width) {
						this.defaultOptions.width = uni.upx2px(this.defaultOptions.width)
					}
					if (this.defaultOptions.height) {
						this.defaultOptions.height = uni.upx2px(this.defaultOptions.height)
					}
					if (this.defaultOptions.fontSize) {
						this.defaultOptions.fontSize = uni.upx2px(this.defaultOptions.fontSize)
					}
				}
				// this.defaultOptions.text = this.value
				this.defaultOptions.format = this.format

				let canvas = await this.getElement(this.cid)
				let jsBarcode = JsBarcode(canvas, this.value, this.defaultOptions);
				this.canvasWidth = canvas.width
				this.canvasHeight = canvas.height
				
				
				// #ifndef MP-WEIXIN
					let ctx = canvas.getContext()
						setTimeout(()=>{
							ctx.draw(false,()=>{
								try {
									uni.canvasToTempFilePath({
										width: canvas.width,
										height: canvas.height,
										destWidth: canvas.width,
										destHeight: canvas.height,
										canvasId: this.cid,
										fileType: 'png',
										success: (res) => {
											this.imageData = res.tempFilePath
										},
										fail: (res) => {
											reject()
										},
										complete: (res) => {
											
											uni.hideLoading();
										},
									});
								} catch (e) {
									console.log(e)
								}
								
							})
						},100)
				// #endif
				
				// #ifdef MP-WEIXIN
					uni.canvasToTempFilePath({
						canvas: canvas,
						fileType: 'png',
						success: (res) => {
							this.imageData = res.tempFilePath
						},
						fail: (res) => {
							reject()
						},
						complete: (res) => {
							uni.hideLoading();
						},
					}, this);
				// #endif
				
				// let lsBarcode = LsBarcode("ls-barcode-test", this.value, this.defaultOptions, this);
				// let {
				// 	width,
				// 	height
				// } = lsBarcode.getCanvasData()
				// // debugger
				// this.canvasWidth = width
				// this.canvasHeight = height
				// setTimeout(() => {
				// 	let reder = lsBarcode.render()
				// 	reder.getImageData(this).then(res => {
				// 		this.imageData = res.data
				// 		console.log("------------",res)
				// 	}).catch(e => {
				// 		console.log(e)
				// 	})
				// }, 50)


			},
			clearCode() {
				this.imageData = ""
			},
			saveCode() {
				if (this.imageData != "") {
					uni.saveImageToPhotosAlbum({
						filePath: this.imageData,
						success: () => {
							uni.showToast({
								title: '条形码保存成功',
								icon: 'success',
								duration: 2000
							});
						}
					});
				}

			}
		},
		computed: {
			getStyle() {
				let style = {}
				style.width = (this.width || this.canvasWidth) + 'px'
				style.height = (this.height || this.canvasHeight) + 'px'
				return style
			},
			getCanvasStyle() {
				let style = {}
				style.width = this.canvasWidth + 'px'
				style.height = this.canvasHeight + 'px'
				return style
			}
		},
		watch: {
			value(v, old) {
				if (this.autoGenerate) {
					if (v != old && v != null && v != '') {
						setTimeout(() => {
							this.generateCode()
						}, 0);
					}
				}
			},
			opations: {
				handler(n, o) {
					if (this.autoGenerate) {
						if (n != o && n != null && n != '') {
							setTimeout(() => {
								this.generateCode()
							}, 0);
						}
					}
				},
				deep: true
			}
		},
		mounted: function() {
			if (this.loadGenerate) {
				if (this.value != null && this.value != '') {
					setTimeout(() => {
						this.generateCode()
					}, 0);
				}
			}
		},
	}
</script>

<style lang="scss">
	.ls-barcode {
		position: relative;

		.ls-barcode-canvas {
			position: fixed;
			top: -99999upx;
			left: -99999upx;
			z-index: -99999;
		}

		.image-view {
			max-width: 90vw;
		}
	}
</style>
