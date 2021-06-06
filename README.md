# uniapp 条码生成器

## 支持平台

1. 支持H5、微信小程序、支付宝小程序、APP等

## 说明

​	组件对jsBarcode.js进行二次封装，使其能够在uni-app中运行。

## 支持生成的条码格式

1. **CODE128**
   - CODE128
   - CODE128 A/B/C
2. **EAN**
   - EAN-13
   - EAN-8
   - EAN-5
   - EAN-2
   - UPC (A)
   - UPC (E)
3. **CODE39**
4. **ITF**
   - ITF
   - ITF-14
5. **MSI**
   - MSI10
   - MSI11
   - MSI1010
   - MSI1110
6. **Pharmacode**
7. **Codabar**

## 开始使用

```bash
git clone https://github.com
```

### 使用方法

在 `script` 中引入组件

```js
import tkiBarcode from "@/components/ls-barcode/ls-barcode.vue"
export default {
    components: {lsBarcode}
}
```

在 `template` 中使用

```js
<view>
   <ls-barcode cid="EAN8" :loadGenerate="true" :options="options" :autoGenerate="true" format="EAN8" value="29012343"  width="300" height="200"/>
</view>
```

### 属性

| 属性名       | 类型    | 默认值            | 可选值 | 说明                                                         |
| ------------ | ------- | ----------------- | ------ | ------------------------------------------------------------ |
| cid          | String  | ls-barcode-canvas |        | canvasId，页面存在多个条形码组件时需设置不同的ID             |
| unit         | String  | upx               | px     | 单位                                                         |
| format       | String  | code128           |        | 条形码类型[（参照jsBarcode）](https://github.com/lindell/JsBarcode) |
| value        | String  | FB19A1650-100S    |        | 要生成的内容                                                 |
| options      | JSON    |                   |        | [参照jsBarcode](https://github.com/lindell/JsBarcode)        |
| autoGenerate | Boolean | false             |        | 监听value值变化自动重新生成条形码                            |
| loadGenerate | Boolean | true              |        | 组件初始化完成后自动生成条形码，value需要有值                |
| width        | Number  | 0                 |        | 宽度（默认0时为canvas画布生成的条码实际宽度）                |
| height       | Number  | 0                 |        | 条码高度（默认0时为canvas画布生成的条码实际高度）            |

###  



### 方法

| 方法名         | 说明                                        |
| -------------- | ------------------------------------------- |
| generateCode() | 生成条形码                                  |
| clearCode()    | 清空生成条形码时生成的图片数据（imagedata） |
| saveCode()     | 保存条形码到图库                            |

### 感谢

[uni-app](https://uniapp.dcloud.io/) [jsBarcode](https://github.com/lindell/JsBarcode)