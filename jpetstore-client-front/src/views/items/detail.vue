<template>
    <el-row class="box">
        <el-col :span="3"><div class="grid-content bg-purple"><div>&nbsp;</div> </div></el-col>
        <el-col :span="9">
            <div class="grid-content bg-purple-light">
                <div class="focus-banner-con-wrq">
                    <el-image style='width:400px;height:290px;' fit='cover' :src="getImgUrl(item.imgUrl)"></el-image>
                </div>
            </div></el-col>
        <el-col :span="8"> 
            <div class="grid-content bg-purple " style="margin-top:20px">
                <el-descriptions title="商品详细信息" :column="1" size="normal" border>
                <el-descriptions-item label="ProductId" >{{item.productId}}</el-descriptions-item>
                <el-descriptions-item label="ItemId">{{item.itemId}}</el-descriptions-item>
                <el-descriptions-item label="PetName">{{item.name}}</el-descriptions-item>
                <el-descriptions-item label="Price">{{item.price}}</el-descriptions-item>
                <el-descriptions-item label="Description">{{item.attr}}</el-descriptions-item>
                <el-descriptions-item label="Number"> 
                    <el-input-number v-model="num"  size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
                </el-descriptions-item>
                </el-descriptions>
                <el-button class="buttom" type="primary" @click="addToCart()">Add to Cart</el-button>
            </div></el-col>
        </el-row>
</template>

<script>
    export default {
        name:'Detail',
        data() {
            return {
                num:1,
                itemId:"",
                item:{
                    // productId:"AV-CB-02",
                    // itemId:this.$route.query.itemId,
                    // name:'13',
                    // price:99.00,
                    // attr:"pretty bird",
                    // imgURL: 'assets/Bird.png'
                },
                account:{}
            }
        },
        methods: {
            getData(){
                // var that = this
                // var query = window.location.search.substring(1);
                // var vars = query.split("&");
                // for (var i = 0; i < vars.length; i++) {
                //     var pair = vars[i].split("=");
                //     if (pair[0] == "itemId") {
                //         that.itemId = pair[1]
                //     }
                // }
                console.log("getdata")
                this.itemId = window.sessionStorage.getItem("itemId");
                var that=this
                common.ajax({
                    //参数
                    data: {}, // 
                    method: "get",
                    url:  "catalog/items/" + this.itemId, //""内为接口名
                    success: e => { //成功回调函数
                       // console.log(e)
                            let temp = {}
                              temp.imgUrl  =e.data.attribute2
                              temp.productId = e.data.productId
                              temp.itemId = e.data.itemId
                              temp.name = e.data.product.name
                              temp.price = e.data.listPrice
                              temp.attr = e.data.attribute1
                              that.item = temp
                             // console.log(this.item);
                        if (e.status != 0) { //代表失败
                            alert(e.msg)
                        } else { //代表成功     
                              
                        }
                    },
                    error: e => { //失败回调
                        console.log(e)
                    }
                })
                },
            addToCart(){
              var that = this
              this.account = JSON.parse(window.sessionStorage.getItem("account"));
              console.log(this.account)
              if(this.account.username==null || this.account.username==""){
                alert("请先登陆");
                this.$router.push('/signin')
              }
              else {
                  common.ajax({
                    //参数
                    data:{
                    }, // 
                    method:"post",
                    url: "/accounts/" + that.account.username + "/carts/" + that.itemId, //""内为接口名
                    success:e=>{//成功回调函数
                      console.log(e)
                      if(e.status!=0){//代表失败
                        alert(e.msg)
                      } else {//代表成功 
                        alert(e.data)        
                      }
                    },
                    error:e=>{//失败回调
                      console.log(e)
                    }
                  })
              }
            },
            getImgUrl(url){
                console.log(url)
                return require("@/"+url)
            }
        },
        // created(){
        //     this.getData()
        // },
        beforeRouteEnter (to, from, next) {
			console.log(to);
			next(vm => {
				vm.getData();
        //vm.isCapable=JSON.parse(window.sessionStorage.getItem("admin")).authority==1;
			})
		}
    }

</script>

<style scoped>
.box{
    height: 500px;
    background-color: #d3cfd9;
}
.image{
    border:1px solid #f2f2f2;
    width : 250px;
    height: 250px;
    margin-top: 60px;
    padding: 15px;
}

.focus-banner-con-wrq {
    margin-top: 40px;
    padding: 12px;
    padding-bottom: 0;
    background: #fff;
    background: rgba(255,255,255,.86);
    width: 400px;
    height: 300px;
    position: relative;
    box-shadow: 0 1px 3px rgb(167 167 167 / 40%);
}
.fontStyle{
    font-size:20px;
    font-weight: 600;
}
.buttom{
    margin-top:20px;
    margin-left:100px;
}


</style>