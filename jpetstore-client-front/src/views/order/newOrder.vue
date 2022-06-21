<template>
   <!-- <div class="orderForm">
        
        <div class="order-wrapper">
        <el-form
         label-position="left"
         :model="ruleForm"
         :rules="rules"
         label-width="160px"
         status-icon
         ref="ruleForm">
            <el-row :gutter="40" type="flex" justify="center">
                <el-col :span="20" class="col">
                  
                <el-divider>Payment Details</el-divider>
                <el-form-item label="Card Type" prop="cardType">
                  <el-select v-model="ruleForm.cardType" placeholder="Pick a card type">
                    <el-option label="Visa" value="Visa"></el-option>
                    <el-option label="Mastercard" value="Mastercard"></el-option>
                    <el-option label="American Express" value="American Express"></el-option>
                    <el-option label="Discover" value="Discover"></el-option>
                    <el-option label="JCB" value="JCB"></el-option>
                    <el-option label="UnionPay" value="UnionPay"></el-option>
                    <el-option label="Maestro" value="Maestro"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Card Number" prop="cardNumber">
                  <el-input v-model="ruleForm.creditCard"></el-input>
                </el-form-item>
                <el-form-item label="Expiry Date" required>
                  <el-form-item prop="expiryTime">
                    <el-date-picker type="month" placeholder="Pick a month" v-model="ruleForm.expiryDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-form-item>

                <el-divider>Billing Address</el-divider>
                <el-form-item label="First Name" prop="firstName">
                  <el-input v-model="ruleForm.billToFirstName"></el-input>
                </el-form-item>
                <el-form-item label="Last Name" prop="lastName">
                  <el-input v-model="ruleForm.billToLastName"></el-input>
                </el-form-item>
                <el-form-item label="Address 1" prop="addr1">
                  <el-input v-model="ruleForm.billAddress1"></el-input>
                </el-form-item>
                <el-form-item label="Address 2">
                  <el-input v-model="ruleForm.billAddress2"></el-input>
                </el-form-item>
                <el-form-item label="City" prop="city">
                  <el-input v-model="ruleForm.billCity"></el-input>
                </el-form-item>
                <el-form-item label="State" prop="state">
                  <el-input v-model="ruleForm.billState"></el-input>
                </el-form-item>
                <el-form-item label="Zip" prop="zip">
                  <el-input v-model="ruleForm.billZip"></el-input>
                </el-form-item>
                <el-form-item label="Country" prop="country">
                  <el-input v-model="ruleForm.billCountry"></el-input>
                </el-form-item>

                <el-form-item label="Ship to different address">
                  <el-switch align="center"  v-model="shipToDifferenentPlace"></el-switch>
                </el-form-item>

                <template v-if="shipToDifferenentPlace">
                      <el-divider>Shipping Address</el-divider>
                      <el-form-item label="First Name" prop="shipFirstName">
                        <el-input v-model="ruleForm.shipToFirstName"></el-input>
                      </el-form-item>
                      <el-form-item label="Last Name" prop="shipLastName">
                        <el-input v-model="ruleForm.shipToLastName"></el-input>
                      </el-form-item>
                      <el-form-item label="Address 1" prop="shipAddr1">
                        <el-input v-model="ruleForm.shipAddress1"></el-input>
                      </el-form-item>
                      <el-form-item label="Address 2">
                        <el-input v-model="ruleForm.shipAddress2"></el-input>
                      </el-form-item>
                      <el-form-item label="City" prop="shipCity">
                        <el-input v-model="ruleForm.shipCity"></el-input>
                      </el-form-item>
                      <el-form-item label="State" prop="shipState">
                        <el-input v-model="ruleForm.shipState"></el-input>
                      </el-form-item>
                      <el-form-item label="Zip" prop="shipZip">
                        <el-input v-model="ruleForm.shipZip"></el-input>
                      </el-form-item>
                      <el-form-item label="Country" prop="shipCountry">
                        <el-input v-model="ruleForm.shipCountry"></el-input>
                      </el-form-item>
                </template>

                  <el-table
                    stripe
                    ref="multipleTable"
                    :data="lineItems"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                    <el-table-column
                      prop="itemId"
                      label="itemId"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="description"
                      label="description"
                      width="160"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="quantity"
                      label="quantity"
                      width="100"
                      show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                      prop="listPrice"
                      label="price"
                      width="100"
                      show-overflow-tooltip>                  
                    </el-table-column>
                    
                    <el-table-column
                      prop="total"
                      label="total"
                      width="115"
                      show-overflow-tooltip>                  
                    </el-table-column>
                    
                  </el-table>
               
                

                <el-form-item label="Total: " prop="totalPrice">
                      <el-input v-model="ruleForm.totalPrice" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-col :span="10">
                        <el-button type="primary" round @click="submitForm()" >确认订单</el-button>
                    </el-col>
                    <el-col :span="10" >
                        <el-button type="primary" round @click="returnToCart()">取消订单</el-button>
                    </el-col>
                </el-form-item>
                
                </el-col>
            </el-row>
        </el-form>
        </div>
        <div class="emptyDiv">
        </div>
    </div> -->
    <div>
    <div class="form-table-container">
      <el-form  :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm">
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
              
              <el-form-item label="Ship to different address">
                  <el-switch align="center"  v-model="shipToDifferenentPlace"></el-switch>
                </el-form-item>

              <template v-if="shipToDifferenentPlace">
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
              </template>
              </div>
            </el-col>
          
        </el-row>
      </el-form>
        <el-divider>Your Pets</el-divider>
        <el-table :data="lineItems">
          <el-table-column align="center" label="Item ID" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">
                <el-link type="primary" @click="$router.push('/item?id='+scope.row.itemId)">{{ scope.row.itemId }}</el-link>
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Description" width="180">
            <template v-slot="scope">
              <span v-html="scope.row.description" style="margin-left: 10px"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Quantity" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">{{ scope.row.quantity }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Price" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">${{ scope.row.listPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Total Cost" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">${{ scope.row.quantity * scope.row.listPrice }}</span>
            </template>
          </el-table-column>
        </el-table>
        
        <div align = "center">
          Total: ${{ ruleForm.totalPrice }}
        </div>

        <div align = "center">
          <el-button type="primary" round @click="submitForm()">确认订单</el-button>
          <el-button type="primary" round @click="returnToCart()">取消订单</el-button>
        </div>
</div>
</div>
</template>

<script>
import common from '@/utils/common';

export default{
   name : 'newOrder',
   data(){
       return {
           shipToDifferenentPlace:false,
           lineItems:[],
           account:{},
           committed: false,
      ruleForm: {
           username:'',
           orderId:'',
           orderDate:'',

           shipAddress1:'',
           shipAddress2:'',
           shipCity:'',
           shipState:'',
           shipZip:'',
           shipCountry:'',

           billAddress1:'',
           billAddress2:'',
           billCity:'',
           billState:'',
           billZip:'',
           billCountry:'',         

           courier:'',
           totalPrice:'',
           billToFirstName:'',
           billToLastName:'',
           shipToFirstName:'',
           shipToLastName:'',

           creditCard:'',
           expiryDate:'',
           cardType: '',
           locale: '',
           expiryDate: '',

      },
      rules: {
        cardType: [{
          required: true,
          message: 'Please pick your card type',
          trigger: 'change'
        }],
        cardNumber: [{
          required: true,
          message: 'Please enter your card number',
          trigger: 'blur'
        }],
        expiryDate: [{
          type: 'date',
          required: true,
          message: 'Please pick a month',
          trigger: 'change'
        }],
        firstName: [{
          required: true,
          message: 'Please enter your firstname',
          trigger: 'blur'
        }],
        lastName: [{
          required: true,
          message: 'Please enter your lastname',
          trigger: 'blur'
        }],
        addr1: [{
          required: true,
          message: 'Please enter your address',
          trigger: 'blur'
        }],
        city: [{
          required: true,
          message: 'Please enter your city',
          trigger: 'blur'
        }],
        state: [{
          required: true,
          message: 'Please enter your state',
          trigger: 'blur'
        }],
        zip: [{
          required: true,
          message: 'Please enter your zip',
          trigger: 'blur'
        }],
        country: [{
          required: true,
          message: 'Please enter your country',
          trigger: 'blur'
        }],
        shipFirstName: [{
          required: true,
          message: 'Please enter a firstname',
          trigger: 'blur'
        }],
        shipLastName: [{
          required: true,
          message: 'Please enter a lastname',
          trigger: 'blur'
        }, ],
        shipAddr1: [{
          required: true,
          message: 'Please enter a address',
          trigger: 'blur'
        }],
        shipCity: [{
          required: true,
          message: 'Please enter a city',
          trigger: 'blur'
        }],
        shipState: [{
          required: true,
          message: 'Please enter a state',
          trigger: 'blur'
        }],
        shipZip: [{
          required: true,
          message: 'Please enter a zip',
          trigger: 'blur'
        }],
        shipCountry: [{
          required: true,
          message: 'Please enter a country',
          trigger: 'blur'
        }],
      }
    }
   },
    methods:{
       getData(){
          this.account = JSON.parse(window.sessionStorage.getItem("account"));

          this.ruleForm.username=this.account.username;
          this.ruleForm.orderDate= new Date()

          this.ruleForm.shipToFirstName=this.account.firstName;
          this.ruleForm.shipToLastName=this.account.lastName;
          this.ruleForm.shipAddress1=this.account.address1;
          this.ruleForm.shipAddress2=this.account.address2;
          this.ruleForm.shipCity=this.account.city;
          this.ruleForm.shipState=this.account.state;
          this.ruleForm.shipZip=this.account.zip;
          this.ruleForm.shipCountry=this.account.country;

          this.ruleForm.billToFirstName=this.account.firstName;
          this.ruleForm.billToLastName=this.account.lastName;
          this.ruleForm.billAddress1=this.account.address1;
          this.ruleForm.billAddress2=this.account.address2;
          this.ruleForm.billCity=this.account.city;
          this.ruleForm.billState=this.account.state;
          this.ruleForm.billZip=this.account.zip;
          this.ruleForm.billCountry=this.account.country;

          this.ruleForm.totalPrice=0;

          this.ruleForm.creditCard = "999 9999 9999 9999";
          this.ruleForm.expiryDate = "12/03";
          this.ruleForm.cardType = "Visa";
          this.ruleForm.courier = "UPS";
          this.ruleForm.locale = "CA";

          // 设置lineItems
          this.lineItems=[]
          var cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
          for(let i=0; i<cartItems.length; i++){
            var lineTiem = {};
            lineTiem.itemId=cartItems[i].item.itemId;
            lineTiem.description=cartItems[i].item.product.name+cartItems[i].item.attribute1;
            lineTiem.quantity=cartItems[i].quantity;
            lineTiem.listPrice=cartItems[i].item.listPrice;
            lineTiem.total=cartItems[i].total;
            this.lineItems.push(lineTiem)
            this.ruleForm.totalPrice = this.ruleForm.totalPrice+ lineTiem.total
          }
            
       },
       submitForm() {
            
          this.ruleForm.lineItems=this.lineItems;
          common.ajax({
            // 向服务器发送请求 插入订单
            url: "orders",
            method: "post",
            data:{
              orderStr: JSON.stringify(this.ruleForm)
            },
            dataType:"json",
            success:e=>{
              console.log(e.msg)
              if(e.status==0){
                alert("购买成功！") 
                this.$router.push('/lineOrder') 
              }
              else{
                alert(e.msg)
              }
            },
            console:e=>{
              console.log("fail")
            }
          })
                         
       },
       returnToCart(){
         this.$router.push('/cart')
       }
   },
   created(){
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