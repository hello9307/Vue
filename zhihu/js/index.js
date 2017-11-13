/*
* @Author: Administrator
* @Date:   2017-11-09 22:53:49
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-12 19:51:18
*/
new Vue({
	el:'#myApp',
	data:{
		informNum:5,
		messageNum:3,
		myHave1:false,
		dataList:[],
		myHave3:true,
		number:55
	},
	mounted:function(){
		let _this=this;
		this.$nextTick(function(){
			_this.refresh();
		})
	},
	filters:{
		limitC:function(value,item){
			return value.substring(0,item.limit);
		}
	},
	methods:{
		refresh:function(){
			let _this=this;
			this.$http.get('./data/test.json').then(function(res){
				_this.dataList=res.body;
				_this.limitData();
			})
		},
		limitData:function(){
			let _this=this;
			this.dataList.forEach(function(item,key){
				_this.$set(item,'limit',80);
				_this.$set(item,'myHave2',true);
			})
		},
		limit:function(item){
			this.myHave2=false;
			item.myHave2=true;
			item.limit=80;
		},
		changeLimit:function(item){
			this.myHave2=true;
			item.myHave2=false;
			item.limit=item.abstract.length;
		},
		clear:function(item){
			item.style.border=0;
		},
		addNum:function(){
			this.number++;
		},
		reduceNum:function(){
			this.number--;
		}
	}
	
})
