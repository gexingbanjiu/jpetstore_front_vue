<template>
<div>
  <div class="table" >
    <el-table :data="allCartItems" ref="multipleTable" @selection-change="handleSelectionChange" show-summary sum-text="Total" :summary-method="getSum">
      <el-table-column type="selection" width="70">
      </el-table-column>
      <el-table-column align="center" label="Item ID" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <el-link type="primary" @click="$router.push('/item?id='+scope.row.item.itemId)">{{ scope.row.item.itemId }}</el-link>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Product ID" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.item.productId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Description" width="150">
        <template slot-scope="scope">
          <span v-html="scope.row.item.attribute1+' '+scope.row.item.product.name" style="margin-left: 10px"></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="In Stock?" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.inStock }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Quantity" width="150">
        <template slot-scope="scope">
          <!-- <span style="margin-left: 10px">{{ scope.row.item.quantity }}</span> -->
          <!-- <el-input-number size="mini" v-model="scope.row.item.quantity" @change="handleChange(scope.row, scope.row.item.quantity)" :min="0"></el-input-number> -->
          <el-input-number  size="mini" v-model="scope.row.quantity" @change="handleChange(scope.row)" @blur="handleChange(scope.row)" :min="1" :precision="0"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" label="List Price" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.item.listPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Total Cost" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.item.listPrice * scope.row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Action" width="100">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"> delete </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-if="subtotal!=0" class="button">
    <el-button   type="primary" size="mini" @click="submitOrder()" >Proceed to Checkout</el-button>
  </div>
  </div>
</template>

<script>
import common from '@/utils/common';

export default {
  name : 'cartView',
  data() {
    return {
      account:{},
      allCartItems: [],
      multipleSelection:[],   // 当前选中的购物车的几项
      
    }
  },
  computed: {
   subtotal:{
            get() {
                let total=0;
                for(let cartItem of this.multipleSelection) {
                  total += cartItem.quantity * cartItem.item.listPrice;
                }
                return total;
            },

            set() {}
  }
      
  },
  methods: {
    //计算总价
    getSum() {
      let sums = [];
      let total = 0;
      for(let cartItem of this.multipleSelection) {
        total += cartItem.quantity * cartItem.item.listPrice;
      }
      sums[1] = 'Total : ';
      sums[7] = total;
      return sums;
    },
    getData() {   
        this.allCartItems=[]    // 先清空
        this.account = JSON.parse(window.sessionStorage.getItem("account"));
        if(this.account==null){
            alert("请先登陆")
        } else{
            var _this=this
            common.ajax({
                url: "accounts/"+this.account.username+"/carts",
                method: "get",
                success:e=>{   //成功回调函数
                    if(e.status==0){
                        console.log(e)
                        for (let i=0; i<e.data.length; i++){
                          _this.allCartItems.push(e.data[i]);
                        }
                    }else{
                        alert(e.msg);
                    }
                },
                error:e=>{//失败回调
                    console.log(e)
                    console.log("fail")
                }
          })
        }
    },

    // 修改购物车数量
    handleChange(row) {
      var _this=this
      common.ajax({
        url: "accounts/"+_this.account.username+"/carts",
        method: "put",
        data:{
          "itemId": row.item.itemId,
          "quantity": row.quantity
        },
        success:e=>{   //成功回调函数
            if(e.status!=0)
                alert(e.msg)
        },
        error:e=>{//失败回调
            console.log(e)
            console.log("fail")
        }

      })
    },
    submitOrder() {
      window.sessionStorage.setItem("cartItems", JSON.stringify(this.multipleSelection));
      this.$router.push('/newOrder')
      //提交订单,并跳往newOrder页面
      
    },
    handleDelete(row) {
      var con = confirm("确认删除吗？");
      if(con){
        var _this=this
        common.ajax({
          url: "accounts/"+this.account.username+"/carts/"+row.item.itemId,
          method:"delete",
          success:e=>{   //成功回调函数
              console.log(e)
              if(e.status==0){
                  // 删除表格中的这一行
                  for(let j=0; j<_this.allCartItems.length; j++){
                      if(_this.allCartItems[j].item.itemId==row.item.itemId)
                      {
                        _this.allCartItems.splice(j, 1);
                        break;
                      }
                    }
              }else{
                  alert(e.msg);
              }
          },
          error:e=>{//失败回调
              console.log(e)
              console.log("fail")
          }
        })
      }
    },
    handleSelectionChange(selection) {
        this.multipleSelection = selection;
        console.log(this.multipleSelection);
    },
   
  },
  
  created() {
    this.getData();
  },
  watch: {
            '$route'() {
                this.getData();
            }
        } 
}
</script>

<style scoped>
.input-search {
  margin: 10px auto 10px auto;
}

.el-table {
  margin: 10px auto 10px auto;
  width: 1000px;
  min-height: 300px;
}

.button {
  text-align: center;
}

.el-button {
  margin: 15px auto 15px auto;
}
</style>
