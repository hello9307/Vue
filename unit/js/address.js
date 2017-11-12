/*
* @Author: Administrator
* @Date:   2017-11-09 11:33:56
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-09 14:27:41
*/
new Vue({
	el:'.address',
	data:{
		addressList:[],
		limitNum:3,
		currentIndex:0,
    	selected:1
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddress();
		})
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods:{
		getAddress:function(){
			var _this=this;
			this.$http.get('../data/address.json').then(function(res){
				_this.addressList=res.body.result;
			})
		},
		setDefault:function(addressId){
			this.addressList.forEach(function(address,index){
				if(address.addressId==addressId){
					address.isDefault=true;
				}else{
					address.isDefault=false;
				}
			})
		},
		delAddress:function(item){
			let index = this.addressList.indexOf(item);
			this.addressList.splice(index,1);
		}

	}
})