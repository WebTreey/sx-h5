import axios from './server'
import qs from 'qs';
let HOST = process.env.BASE_URL;

export function getBanner(data) {
    return axios({
        url: HOST + '/index-app-banner.html',
        method: 'get',
        params: data
    })
}
export function getRecommend(data) {
    return axios({
        url: HOST + '/index-app-recommend.html',
        method: 'get',
        params: data
    })
}
export function getfloor(data) {
    return axios({
        url: HOST + '/index-app-floor.html ',
        method: 'get',
        params: data
    })
}
export function getCateList(data) {
    return axios({
        url: HOST + '/cateListJson.html',
        method: 'get',
        data: qs.stringify(data)
    })
}
export function getChildrenList(data) {
    return axios({
        url: HOST + '/cateListJson.html?pid=' + data.id,
        method: 'get',
    })
}
export function getChildrenListDetails(data) {
    return axios({
        url: HOST + '/listjson-' + data.id + '.html',
        method: 'get',
    })
}
export function getTypeList(data) {
    return axios({
        url: HOST + '/cate/getTypeList/' + data.id + '.html',
        method: 'get',
    })
}
export function getProduct(data) {
    return axios({
        url: HOST + '/product/json/' + data.id + '.html',
        method: 'get',
    })
}
export function getproductactinfo(data) {
    return axios({
        url: HOST + '/getproductactinfo.html',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function getproductflashinfo(data) {
    return axios({
        url: HOST + '/getproductflashinfo.html',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function getTransportPrice(data) {
    return axios({
        url: HOST + `/getTransportPrice?productId=${data.productId}&cityId=${data.cityId}&num=1&_= ${+new Date()}`,
        method: 'get',
    })
}
export function getSpecialEndTime(data) {
    return axios({
        url: HOST + `/getSpecialEndTime.html?productId=${data.productId}`,
        method: 'get',
    })
}
export function addtocart(data) {
    return axios({
        url: HOST + `/cart/addtocart.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function reveivecoupon(data) {
    return axios({
        url: HOST + `/member/coupon/reveivecoupon.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function collectionProduct(data) {
    return axios({
        url: HOST + `/member/collectionProduct.html?productId=${data.productId}`,
        method: 'get',

    })
}
export function cancelCollectionProduct(data) {
    return axios({
        url: HOST + `/member/cancelCollectionProduct.html?productId=${data.productId}`,
        method: 'get',

    })
}
export function collectionShop(data) {
    return axios({
        url: HOST + `/member/collectionShop.html?sellerId=${data.sellerId}`,
        method: 'get',

    })
}
export function cancelCollectionShop(data) {
    return axios({
        url: HOST + `/member/cancelCollectionShop.html?sellerId=${data.sellerId}`,
        method: 'get',

    })
}
export function storeSeller(data) {
    return axios({
        url: HOST + `/store/json/${data.sellerId}.html`,
        method: 'get',

    })
}
export function cateListJson(data) {
    return axios({
        url: HOST + `/store/cateListJson.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function storeJsonVisitPath(data) { // 店铺分类
    return axios({
        url: HOST + `/store/json/1-${data}.html`,
        method: 'get',
    })
}
export function productInfo(data) {
    return axios({
        url: HOST + `/product/info/json/${data.productId}.html`,
        method: 'get',

    })
}
export function productSpec(data) {
    return axios({
        url: HOST + `/product/spec/json/${data.productId}.html`,
        method: 'get',

    })
}
export function productComment(data) {
    return axios({
        url: HOST + `/product/json/comment.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function searchJson(data) {
    return axios({
        url: HOST + `/searchJson.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function getcartinfoJson(data) {
    return axios({
        url: HOST + `/cart/getcartinfoJson.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function deleteCartById(data) {
    return axios({
        url: HOST + `/cart/deleteCartById.html?id=${data.id} `,
        method: 'get',
        data: qs.stringify(data)
    })
}
export function updateCartById(data) {
    return axios({
        url: HOST + `/cart/updateCartById.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function cartcheckedall(data) {
    return axios({
        url: HOST + `/cart/cartcheckedall.html?checked=${data.checked}`,
        method: 'get',
        data: qs.stringify(data)
    })
}
export function cartchecked(data) {
    return axios({
        url: HOST + `cart/cartchecked.html?id=${data.id}&checked=${data.checked}`,
        method: 'get',
        data: qs.stringify(data)
    })
}
export function ordercommit(data) {
    return axios({
        url: HOST + `/order/ordercommit.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function payInfo(data) {
    return axios({
        url: HOST + `/order/payInfo.html`,
        method: 'get',
        params: data
    })
}
export function orderInfoJson(data) {
    return axios({
        url: HOST + `/order/infoJson.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function getinvoicebyid(data) {//选择发票类型
    return axios({
        url: HOST + `order/getinvoicebyid.html`,
        method: 'get',
        params: data
    })
}
export function getsellercoupon(data) {
    return axios({
        url: HOST + `/order/getsellercoupon.html?sellerId=${data.sellerId}`,
        method: 'get',

    })
}
export function checksellercoupon(data) {
    return axios({
        url: HOST + `/order/checksellercoupon.html`,
        method: 'get',
        params: data
    })
}
export function appAddress(data) {
    return axios({
        url: HOST + `/member/app-address.html`,
        method: 'get',
        data: qs.stringify(data)
    })
}
export function appNewaddress(data) {
    return axios({
        url: HOST + `/member/app-newaddress.html`,
        method: 'get',
        data: qs.stringify(data)
    })
}
export function appSaveaddres(data) {
    return axios({
        url: HOST + `/member/app-saveaddress.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function appEditaddress(data) {
    return axios({
        url: HOST + `/member/app-editaddress.html`,
        method: 'get',
        params: data
    })
}
export function couponAppList(data) {
    return axios({
        url: HOST + `/member/coupon/app-list.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function appMoreorder(data) {
    return axios({
        url: HOST + `/member/app-moreorder.html`,
        method: 'get',
        params: data
    })
}
export function appCancalorder(data) {
    return axios({
        url: HOST + `/member/app-cancalorder.html`,
        method: 'get',
        params: data
    })
}
export function appOrderdetail(data) {
    return axios({
        url: HOST + `/member/app-orderdetail.html`,
        method: 'get',
        params: data
    })
}
export function appGoodreceive(data) {
    return axios({
        url: HOST + `/member/app-goodreceive.html`,
        method: 'get',
        params: data
    })
}
export function appBackapply(data) {
    return axios({
        url: HOST + `/member/app-backapply.html`,
        method: 'get',
        params: data
    })
}
export function appCanbackorexchange(data) {
    return axios({
        url: HOST + `/member/app-canbackorexchange.html`,
        method: 'get',
        params: data
    })
}
export function appDoproductexchange(data) {
    return axios({
        url: HOST + `/member/app-doproductexchange.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function appDoproductback(data) {
    return axios({
        url: HOST + `/member/app-doproductback.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function appMoreback(data) {//退货--列表页
    return axios({
        url: HOST + `/member/app-moreback.html`,
        method: 'get',
        params: data
    })
}
export function appBackDeliverGoods(data) {//退货--发货页
    return axios({
        url: HOST + `/member/app-backDeliverGoods.html`,
        method: 'get',
        params: data
    })
}
export function appDoBackDeliverGoods(data) {//退货--发货提交
    return axios({
        url: HOST + `/member/app-doBackDeliverGoods.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function appLookBackLogistics(data) {//退货--查看物流页
    return axios({
        url: HOST + `/member/app-lookBackLogistics.html`,
        method: 'get',
        params: data
    })
}
export function appAddcomplaint(data) {//退货--申述页
    return axios({
        url: HOST + `/member/app-addcomplaint.html`,
        method: 'get',
        params: data
    })
}
export function appSavecomplaint(data) {//退货--申述提交 
    return axios({
        url: HOST + `/member/app-savecomplaint.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function appMoreexchange(data) {//换货--列表页 
    return axios({
        url: HOST + `/member/app-moreexchange.html`,
        method: 'get',
        params: data
    })
}
export function appExchangeDeliverGoods(data) {//换货--发货页 
    return axios({
        url: HOST + `/member/app-exchangeDeliverGoods.html`,
        method: 'get',
        params: data
    })
}
export function appDoExchangeDeliverGoods(data) {//换货--发货提交 
    return axios({
        url: HOST + `/member/app-doExchangeDeliverGoods.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
export function appLookExchangeLogistics(data) {//换货--查看物流页 
    return axios({
        url: HOST + `/member/app-lookExchangeLogistics.html`,
        method: 'get',
        params: data
    })
}
export function getGoodsInfo(data) {//换货--查看物流页 
    return axios({
        url: HOST + `/getGoodsInfo.html`,
        method: 'post',
        data: qs.stringify(data)
    })
}
























