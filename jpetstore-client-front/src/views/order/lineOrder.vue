<template>
<div>

    <el-divider>My Orders</el-divider>
    <el-table :data="orderList" @row-click="clickData">
      <el-table-column align="center" label="Order ID" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <el-link type="primary">{{ scope.row.orderId }}</el-link>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.orderDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Total Price" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.totalPrice}}</span>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import common from '@/utils/common';
export default {
  data() {
    return {
      account:{},
      orderList: [],
    }
  },

  methods: {
    getData() {
      this.account=JSON.parse(window.sessionStorage.getItem("account"));
 
      common.ajax({
        url: "/accounts/"+this.account.username+"/orders",
        method:"get",
        success:e=>{
          this.orderList=e.data
        }
      })
    },

    // 点击表格
      clickData(row, event, column) {   
         console.log(row,  event,  column)
         window.sessionStorage.setItem("orderId", row.orderId);   // 放到session
         // 页面跳转
         this.$router.push('orderDetail')
     }    
    },
  created() {
    this.getData();
  },
  }
</script>

<style scoped>
.input-search {
  margin: 10px auto 10px auto;
}

.el-divider {
  margin: 20px auto 20px auto;
  width: 400px;
}

.el-table {
  width: 700px;
  margin: 0 auto;
  min-height: 350px;
}
</style>
