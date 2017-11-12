window.onload = function() {
	let vm = new Vue({
		el: "#app",
		data: {
			title: [],
			loading: true,
			time:null,
			i: 0
		},
		mounted: function() {
			this.loadData();
			document.addEventListener("scroll",this.scroll);
		},
		methods: {
			reload() {
				window.location.reload();
			},
			scroll(){
				let self=this;
				if((document.body.scrollTop || document.documentElement.scrollTop) >= document.body.offsetHeight-1000) {
					self.loading=true;
					self.loadData();
				}
			},
			loadData() {
				if(this.time){
					clearTimeout(this.time);
				}
				this.time=setTimeout(()=>{
				this.$http.get('https://cnodejs.org/api/v1/topics').then((response) => {
					if(this.i===response.data.data.length){
						this.loading=false;
						document.removeEventListener("scroll",this.scroll);
						return;
					}
					var temp=response.data.data.slice(this.i,this.i+10);
					this.title=this.title.concat(temp);
					this.loading = false;
					this.i+=10;
				}, (response) => {
					console.log(response);
				});
				},300)
			}
		}
	});
	Vue.filter("content", (value) => {
		let reg = /([\u4e00-\u9fa5])/g,
			val = "";
		while(reg.exec(value)) {
			val += RegExp.$1;
		}
		if(val.length > 43) {
			return val.slice(0, 43) + "......";
		}
		return val;
	});
	Vue.filter("date", (value) => {
		let reg = /(\d+\-\d+)T(\d+\:\d+\:\d+)/g,
			result = "";
		reg.test(value) && (result = `${RegExp.$1} ${RegExp.$2}`);
		return result;
	});
}