<template>
<div>
    <div class="form-table-container">
      <el-form :disabled="true" :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-row :gutter="40" type="flex" justify="center">
          <el-col :span="10">
            <div>
              <el-divider>Payment Details</el-divider>
              <el-form-item label="Card Type">
                <el-select v-model="ruleForm.cardType">
                  <el-option label="Visa" value="Visa"></el-option>
                  <el-option label="Mastercard" value="Mastercard"></el-option>
                  <el-option label="American Express" value="American Express"></el-option>
                  <el-option label="Discover" value="Discover"></el-option>
                  <el-option label="JCB" value="JCB"></el-option>
                  <el-option label="UnionPay" value="UnionPay"></el-option>
                  <el-option label="Maestro" value="Maestro"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Card Number">
                <el-input v-model="ruleForm.creditCard"></el-input>
              </el-form-item>
              <el-form-item label="Expiry Date">
                <el-form-item>
                  <el-date-picker type="month" v-model="ruleForm.expiryDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-form-item>
              
              <el-divider>Billing Address</el-divider>
              <el-form-item label="First Name">
                <el-input v-model="ruleForm.billToFirstName"></el-input>
              </el-form-item>
              <el-form-item label="Last Name">
                <el-input v-model="ruleForm.billToLastName"></el-input>
              </el-form-item>
              <el-form-item label="Address 1">
                <el-input v-model="ruleForm.billAddress1"></el-input>
              </el-form-item>
              <el-form-item label="Address 2">
                <el-input v-model="ruleForm.billAddress2"></el-input>
              </el-form-item>
              <el-form-item label="City">
                <el-input v-model="ruleForm.billCity"></el-input>
              </el-form-item>
              <el-form-item label="State">
                <el-input v-model="ruleForm.billState"></el-input>
              </el-form-item>
              <el-form-item label="Zip">
                <el-input v-model="ruleForm.billZip"></el-input>
              </el-form-item>
              <el-form-item label="Country">
                <el-input v-model="ruleForm.billCountry"></el-input>
              </el-form-item>
              
              
        
                <el-divider>Shipping Address</el-divider>
                <el-form-item label="First Name">
                  <el-input v-model="ruleForm.shipToFirstName"></el-input>
                </el-form-item>
                <el-form-item label="Last Name">
                  <el-input v-model="ruleForm.shipToLastName"></el-input>
                </el-form-item>
                <el-form-item label="Address 1">
                  <el-input v-model="ruleForm.shipAddress1"></el-input>
                </el-form-item>
                <el-form-item label="Address 2">
                  <el-input v-model="ruleForm.shipAddress2"></el-input>
                </el-form-item>
                <el-form-item label="City">
                  <el-input v-model="ruleForm.shipCity"></el-input>
                </el-form-item>
                <el-form-item label="State">
                  <el-input v-model="ruleForm.shipState"></el-input>
                </el-form-item>
                <el-form-item label="Zip">
                  <el-input v-model="ruleForm.shipZip"></el-input>
                </el-form-item>
                <el-form-item label="Country">
                  <el-input v-model="ruleForm.shipCountry"></el-input>
                </el-form-item>
                
              </div>
            </el-col>
          
        </el-row>
      </el-form>
        <el-divider>Your Pets</el-divider>
        <el-table :data="ruleForm.lineItems">
          <el-table-column align="center" label="Item ID" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">
                <el-link type="primary" @click="$router.push('/item?id='+scope.row.itemId)">{{ scope.row.itemId }}</el-link>
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Description" width="180">
            <template v-slot="scope">
              <span v-html="scope.row.item.product.name+' '+scope.row.item.attribute1" style="margin-left: 10px"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Quantity" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">{{ scope.row.quantity }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Price" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">${{ scope.row.unitPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Total Cost" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">${{ scope.row.quantity * scope.row.unitPrice }}</span>
            </template>
          </el-table-column>
        </el-table>
        
        <div align = "center">
          Total: ${{ total }}
        </div>



        <div align = "center">
          <el-button type="primary" round @click="returnToLineitem()">返回订单列表</el-button>
        </div>
      </div>
</div>
</template>

<script>
import common from '@/utils/common'

export default {
  name : 'orderView',
  
  data() {
    return {
      ruleForm:{},
    }
  },
  computed:{
      total(){
          // let total = 0;
          //   this.order.forEach(item => {
          //       total += item.quantity * item.unitPrice;
          //   });
          //   return total;
          return this.ruleForm.totalPrice;
      }
  },
  methods: {
    getData(){
      var orderId=window.sessionStorage.getItem("orderId");
      common.ajax({
        url:"orders/"+ orderId,
        success:e=>{
          console.log(e)
          this.ruleForm=e.data
        }
      })
    },
    returnToLineitem(){
      this.$router.push('/lineOrder');
    }
  },
  created ()  {
    this.getData()
  }
  
}
</script>

<style scoped>
.form-table-container{
  margin: 50px auto 100px auto;
  width: 1000px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.el-divider {
  width: 400px;
  margin: 30px auto;
}
.el-table {
  width: 900px;
  margin: 0 auto;
  padding-bottom: 50px;
}
</style>
