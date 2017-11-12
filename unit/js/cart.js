new Vue({
  el:'#app',
  data:{
    totalMoney:0,
    productList:[],
    checkAll:false,
    delFlag:false,
    curProduct:''
  },
  filters:{
    formatMoney:function(value){
      return '￥'+value.toFixed(2)+'元';
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      this.cartView();
    })
  },
  methods:{
    cartView:function(){
      var _this = this;
      this.$http.get('data/cartData.json').then(function(res){
        _this.productList = res.body.result.list;
        // _this.totalMoney = res.body.result.totalMoney;
        console.log(res.body.result.totalMoney)
      })
    },
    change:function(item,key){
      if(key==1){
        item.productQuantity++;
      }else{
        item.productQuantity--;
        if(item.productQuantity<1){
          item.productQuantity=1;
        }
      }
      this.totalPrice();
    },
    selectedProduct:function(item){
      if(typeof item.checked == 'undefined'){
        Vue.set(item,'checked',true)
        // this.$set(item,'checked',true)
      }else{
        item.checked=!item.checked;
      }
      this.totalPrice();
    },
    selectAll:function(){
      this.checkAll = !this.checkAll;
      if(this.checkAll){
        let _this=this;
        this.productList.forEach(function(item,key){
          if(typeof item.checked == 'undefined'){
            _this.$set(item,'checked',true);
          }else{
            item.checked=true;
          }
        })
      //   for(x in this.productList){
      //     x.checked=true;
      //   }
      // }else{
      //   for(x in this.productList){
      //     x.checked=false;
      //   }
      }else{
        this.productList.forEach(function(item,key){
          item.checked=false;
        })
      }
      this.totalPrice();
    },
    totalPrice:function(){
      let _this=this;
      this.totalMoney=0;
      this.productList.forEach(function(item,key){
        if(item.checked){
          _this.totalMoney += item.productPrice*item.productQuantity;
        }
      })
    },
    close:function(item){
      this.delFlag=true;
      this.curProduct=item;
    },
    delProduct:function(){
      var index = this.productList.indexOf(this.curProduct);
      this.productList.splice(index,1);
      this.delFlag=false;
    }

  }
})

Vue.filter('formatM',function(value,key){
  return '￥'+value+key;
})