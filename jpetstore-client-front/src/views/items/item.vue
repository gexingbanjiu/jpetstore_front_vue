<template>
<div class="color">
    <div class="box">
        <ul class="pc-search-items-list">
            <li id='item' v-for="(item,i) in items " :key="i" @click='turnToDetail(item.id)' class="pc-items-item">
                <img class="pc-items-item-img img-loaded" fit='cover' :src="getImgUrl(item.imgUrl)">
                <div class="pc-items-item-title pc-items-item-title-row2">
                    <span>{{item.name}}</span>
                    <div>{{item.id}}</div>
                </div>
                <div class="price-con">
                    <span class="coupon-price-title">$</span>
                    <span class="coupon-price-afterCoupon">{{item.price}}</span>
                </div>
            </li>
        </ul>
        <!-- <el-pagination @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange" 
                    :current-page="currentPage" 
                    :page-sizes="pageSizes" 
                    :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                    :total="totalCount">
        </el-pagination> -->

    </div>
</div>
</template>

<script>
    export default {
        name:'Item',
        data() {
            return {
                //需要的数据
                items:[],
                keyWord : "",
                productId : "",
            }
        },
        components:{
        },
        methods: {
            getData() {
                var that = this
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0] == "keyWord") {
                        that.keyWord = pair[1]
                    }
                    if( pair[0] == "productId" ){
                        that.productId = pair[1]
                    }
                }
                let items = []
                //根据keywords获取item列表 先获取product列表再根据productId获取item列表
                if(that.keyWord != ""){
                    common.ajax({
                                //参数
                                data: {
                                    keywords: that.keyWord
                                }, // 
                                method: "get",
                                url: "/catalog/products/keywords", //""内为接口名
                                success: e => { //成功回调函数
                                      //  console.log(e)
                                        if (e.status != 0) { //代表失败
                                            alert(e.msg)
                                        } else { //代表成功       
                                            console.log(e.data);
                                            
                                            let productId = ""
                                            for (let i = 0; i < e.data.length; i++) {
                                                //   let obj = {}
                                                //   obj.id = e.data[i].productId
                                                //   obj.name = e.data[i].name
                                                //   obj.imgUrl = e.data[i].description.split('"')[2]
                                                productId = e.data.productId
                                                common.ajax({
                                                    //参数
                                                    data: {
                                                    }, // 
                                                    method: "get",
                                                    url: "/catalog/products/" + productId + "/items", //""内为接口名
                                                    success: e => { //成功回调函数
                                                        console.log(e)
                                                        if (e.status != 0) { //代表失败
                                                            alert(e.msg)
                                                        } else { //代表成功
                                                          for(let j = 0 ; j < e.data.length ; j++){
                                                              let itemObj = {}
                                                              itemObj.id = e.data[j].itemId
                                                              itemObj.name = e.data[j].attribute1
                                                              itemObj.imgUrl = e.data[j].attribute2
                                                              itemObj.price = e.data[j].listPrice
        
                                                              items.push(itemObj)
                                                          }
                                                        }
                                                    },
                                                    error: e => { //失败回调
                                                        console.log(e)
                                                    }
                                                })
                                            }
                                            console.log(items);
                                        }
                    },
                    error: e => { //失败回调
                        console.log(e)
                    }
                })

                }
                //根据productId获取item列表
                else if(that.productId != ""){
                    common.ajax({
                        //参数
                        data: {}, // 
                        method: "get",
                        url: "/catalog/products/" + that.productId + "/items", //""内为接口名
                        success: e => { //成功回调函数
                           // console.log(e)
                            if (e.status != 0) { //代表失败
                                alert(e.msg)
                            } else { //代表成功
                                for (let j = 0; j < e.data.length; j++) {
                                    let itemObj = {}
                                    itemObj.id = e.data[j].itemId
                                    itemObj.name = e.data[j].attribute1
                                    itemObj.imgUrl =e.data[j].attribute2
                                    itemObj.price = e.data[j].listPrice
                                    console.log(itemObj.imgUrl)
                                    items.push(itemObj)
                                }
                            }
                        },
                        error: e => { //失败回调
                            console.log(e)
                        }
                    })
                }
                that.items = items
            },
            turnToDetail(itemId){
                window.sessionStorage.setItem("itemId", itemId)
                this.$router.push('/itemDetail')
            },
            getImgUrl(url){
                return require("@/"+url)
            }
        },
        created() {
            this.getData()
        },
        watch: {
            '$route'() {
                this.getData();
            }
        }
    }
</script>

<style scoped>
.color{
    background-color: #d3cfd9;
}
.box{
    width:1100px;
    height:100%;
    margin-left :130px;
    margin-top :1px
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 10em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
}

.pc-search-items-list {
    width: 1000px;
    font-size: 0px;
    /* border-top: 1px solid #f2f2f2; */
    border-left: 1px solid #f2f2f2;
    
}

.pc-search-items-list .pc-items-item {
    display:inline-block;
    width: 200px;
    height: 300px;
    box-sizing: border-box;
    display: inline-block;
    font-size: 12px;
    border: 3px solid #f2f2f2;
    /* border-top: none;
    border-left: none; */
    background: #fff;
    vertical-align: top;
    padding: 10px 20px 0;
}
.pc-search-items-list .pc-items-item-img {
    width: 180px;
    height: 180px;
}
img {
    border: 0 none;
    width: auto\9;
    height: auto;
    max-width: 100%;
    vertical-align: top;
    -ms-interpolation-mode: bicubic;
    height: 100%;
    width: 100%;
    object-fit: cover;

    object-position: center;
}
.pc-search-items-list .pc-items-item-title.pc-items-item-title-row2 {
    height: 40px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.pc-search-items-list .pc-items-item-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9b9b9b;
    line-height: 20px;
    padding-top: 10px;
}
.pc-search-items-list .price-con {
    height: 25px;
    padding: 6px 0 0;
    line-height: 1.6;
}
.pc-search-items-list .price-con .coupon-price-title {
    vertical-align: baseline;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #fd3f31;
}
.pc-search-items-list .price-con {
    height: 25px;
    padding: 6px 0 0;
    line-height: 1.6;
}
.pc-search-items-list .price-con .coupon-price-afterCoupon {
    margin-left: 4px;
    vertical-align: baseline;
    text-align: left;
    line-height: 25px;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #fd3f31;
}
#item:hover{
    border-color: orange;
}
</style>