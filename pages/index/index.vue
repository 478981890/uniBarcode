<template>
	<view class="content">
		<ls-barcode cid="ls-barcode" :loadGenerate="true" :options="options" :autoGenerate="true" :format="barcodeData.format"  :value="barcodeData.code" ref="lsbarcode" />
		
		<ls-barcode cid="EAN13" :loadGenerate="true" :options="options" :autoGenerate="true" format="EAN13" value="123456789012"  />
		
		<ls-barcode cid="CODE39" :loadGenerate="true" :options="options" :autoGenerate="true" format="CODE39" value="123456789012"  />
		
		<ls-barcode cid="EAN8" :loadGenerate="true" :options="options" :autoGenerate="true" format="EAN8" value="29012343"  width="300" height="200"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barcodeData: {
					format: "CODE128",
					code: "FB19A1650-100S"
				},
				options: {
					// format: "CODE128",//选择要使用的条形码类型 微信支持的条码类型有 code128\code39\ena13\ean8\upc\itf14\
					width: 2, //设置条之间的宽度
					// height: 170, //高度
					displayValue: true, //是否在条形码下方显示文字
					// text: "FB19A1650-100S",//覆盖显示的文本
					textAlign: "center", //设置文本的水平对齐方式
					textPosition: "bottom", //设置文本的垂直位置
					textMargin: 10, //设置条形码和文本之间的间距
					fontSize: 24, //设置文本的大小
					// fontColor: "#0000ef",//设置文本的颜色
					// lineColor: "#0000ef",//设置条形码的颜色
					lineColor: "#990000",
					background: "#FFFFFF", //设置条形码的背景色
					margin: 0, //设置条形码周围的空白边距
					// marginTop: 10,//设置条形码周围的上边距
					// marginBottom: 20,//设置条形码周围的下边距
					// marginLeft: 30,//设置条形码周围的左边距
					// marginRight: 40,//设置条形码周围的右边距
				}
			}
		},
		onShow() {
			setTimeout(() => {
				try{
					console.log(this.$refs["lsbarcode"])
					this.$refs["lsbarcode"].generateCode()
				}catch(e){
					console.log(e)
				}
				
			},2000)
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
