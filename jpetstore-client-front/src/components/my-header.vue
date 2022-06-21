<template>
  <el-menu :default-active="$route.path" 
          class="el-menu-demo" 
          mode="horizontal" 
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>
  <el-menu-item index="/">JPetStore</el-menu-item>
  
  <el-submenu v-for="(item,i) in categories" :key ='i' :index='item.categoryId'>
    <template slot='title'>{{item.categoryId}}</template>
    <el-menu-item v-for="(product,subIndex) in item.products" :key='subIndex' :index="`/item?productId=${product.productId}`">
      {{product.productId}}</el-menu-item>
  </el-submenu>

  <!-- <el-submenu v-for='(item ,i) in categories' :key="i" :index='item' > 
    <template slot='title'>{{item}}</template>

  </el-submenu> -->
  <el-col :span="3">
    <el-autocomplete
      style="margin-top :7px"
      prefix-icon="el-icon-search"
      class="inline-input"
      v-model="keyWord"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @keyup.enter.native="search"></el-autocomplete>
  </el-col>

  <el-col :span="2"><el-button style="margin-top :7px" type="primary" @click="search">搜索</el-button></el-col>
  <el-menu-item index="/user">个人中心</el-menu-item>
  <el-menu-item index="/cart">购物车</el-menu-item>
  <el-menu-item index="/lineOrder">订单管理</el-menu-item>
  <el-menu-item v-if='isSigned' @click="signOut" >登出</el-menu-item>
  <el-menu-item v-else index='/signin' @click="signIn">登入</el-menu-item>
</el-menu>

</template>

<script>
    export default {
        name:'MyHearder',
        data() {
            return {
              isSigned:false,   // 用户是否已经登陆
              keyWord:'',
              productList:[],
              // categories:['Birds','Cats','Dogs','Fish','Reptiles']
              categories:[]
              
            };
        },
        methods: {
            getData(){  //页面初始化加载数据
              var account= JSON.parse(window.sessionStorage.getItem("account"));
              console.log(account);
              if(account==null)
                this.isSigned=false;
              else
                this.isSigned=true;  

              var that = this
              common.ajax({
                //参数
                data:{
                },
                method:"get",
                url:"/catalog/products", //""内为接口名
                success:e=>{//成功回调函数
                  console.log(e)
                  if(e.status!=0){//代表失败
                   alert("错误")
                  } else {//代表成功        
                    console.log(e.data)
                    let categories = []
                    let list = ["DOGS","BIRDS","CATS","FISH","REPTILES"]
                    for(let i = 0 ; i < 5 ; i++){
                      let obj = {}
                      obj.categoryId = list[i]
                      categories.push(obj)
                      categories[i].products = []
                    }
                    for(let i = 0 ; i < e.data.length ; i++){
                      if(e.data[i].categoryId == "DOGS"){
                        let obj = {}
                        obj.productId = e.data[i].productId
                        obj.value = e.data[i].name
                        categories[0].products.push(obj)
                      }
                      if(e.data[i].categoryId == "BIRDS"){
                        let obj = {}
                        obj.productId = e.data[i].productId
                        obj.value = e.data[i].name
                        categories[1].products.push(obj)
                      }
                      if(e.data[i].categoryId == "CATS"){
                        let obj = {}
                        obj.productId = e.data[i].productId
                        obj.value = e.data[i].name
                        categories[2].products.push(obj)
                      }
                      if(e.data[i].categoryId == "FISH"){
                        let obj = {}
                        obj.productId = e.data[i].productId
                        obj.value = e.data[i].name
                        categories[3].products.push(obj)
                      }
                      if(e.data[i].categoryId == "REPTILES"){
                        let obj = {}
                        obj.productId = e.data[i].productId
                        obj.value = e.data[i].name
                        categories[4].products.push(obj)
                      }
                    }
                    that.categories = categories
                  }
                },
                error:e=>{//失败回调
                  console.log(e)
                }
              })
              console.log("getData");   
            },
            querySearch(queryString, cb) {
              // var productList = this.productList
              // this.categories.forEach(item => {
              //   for(var i=0;i<item.products.length;i++)
              //   {
              //     if(productList.indexOf(item.products[i]) === -1)
              //       productList.push(item.products[i])
              //   }
              // });
              // var results = queryString ? productList.filter(this.createFilter(queryString)) : productList;
              //  // 调用 callback 返回建议列表的数据
              // cb(results);
            },
            createFilter(queryString) {
              // return (item) => {
              //   return (item.value.toLowerCase().match(queryString.toUpperCase()))
              // }
            },
            search(){
              // this.$router.push('/item?keyWord='+this.keyWord)
              // this.keyWord =''
            },
            signOut(){
              var con=confirm("是否确认登出？");
              if(con){
                window.sessionStorage.removeItem("account");
                this.$router.push('/');
                alert("登出成功");
                this.$router.go(0)
              }
            },
            
            signIn(){   // 登陆函数
                this.$router.push('/signin');
            },
            handleSelect(key, keyPath) {
            }
        },
        created() {
          this.getData()
        },
    }
</script>

<style>

</style>