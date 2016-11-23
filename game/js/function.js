(function(){
	function jq(str){
		if(typeof str=='object'){
			this.length=1;
			this[0]=str;
		}else{
			var perfix=str.charAt(0);
			if(perfix=='#'){
				this[0]=document.getElementById(str.slice(1));
				this.length=1;
			}
			if(perfix=='.'){
				var $els= document.getElementsByClassName(str.slice(1));
				this.length=$els.length;
				for(var i=0;i<$els.length;i++){
					this[i]=$els[i];
				}				
			}
		}
	}
	jq.prototype.hide=function(){
		if(this.length==1){
			this[0].style.display='none'
		}else{
			for(var i=0;i<this.length;i++){
				this[i].style.display='none';
			}
		}
	}
	jq.prototype.red=function(){
		if(this.length==1){
			this[0].style.backgroundColor='red';
		}else{
			for(var i=0;i<this.length;i++){
				this[i].style.backgroundColor='red';
			}
		}
	}
	jq.prototype.blue=function(){
		if(this.length==1){
			this[0].style.border='2px solid blue';
		}else{
			for(var i=0;i<this.length;i++){
				this[i].style.border='2px solid blue';
			}
		}
	}
	jq.prototype.hasClass=function(str){
		var t=this[0].className.split(' ');
		for(var i=0;i<t.length;i++){
			if(t[i]==str){
				return true;
			}
		}
		return false;
	}
	jq.prototype.addClass=function(str){
		if(!this.hasClass(str)){
			this[0].className=this[0].className+' '+str;
		}
	}
	jq.prototype.removeClass=function(str){
		if(this.hasClass(str)){
			var t=this[0].className.split(' ');
			var r=[];
			for(var i=0;i<t.length;i++){
				if(t[i]!==str){
					r.push(t[i]);
				}
			}	
		}
		this[0].className=r.join(' ');
	}
	jq.prototype.toggleClass=function(str){
		if(this.hasClass(str)){
			this.removeClass(str);
		}else{
			this.addClass(str);
		}
	}
	//解决兼容性问题（IE）
	jq.prototype.text=function(text){
		if (this[0].textContent) {
			this[0].textContent=text;
		}else{
			this[0].innerText=text;
		}
	}
	jq.prototype.getCss=function(style){
		if(getComputedStyle){
			return getComputedStyle(this[0],null)[style];
		}else{
			return this[0].currentStyle[style];
		}
	}
	//对象  设置属性
	jq.prototype.setCss=function(obj){
		for(var i in obj){
			this[0].style[i]=obj[i];
		}
	}
	//消除节点
	jq.prototype.myChildNodes=function(){
		var oldNodes=this[0].childNodes;
		var newNodes=[];
		for(var i=0;i<oldNodes.length;i++){
			if(oldNodes[i].nodeType==3 && oldNodes[i].nodeValue.trim()==''){
				continue;
			}
			if(oldNodes[i].nodeType==3){
				oldNodes[i].nodeValue=oldNodes[i].nodeValue.trim();
			}
			newNodes.push(oldNodes[i]);
		}
		return newNodes;
	}
	jq.prototype.myFirstChild=function(){
		return this.myChildNodes()[0];
	}
	jq.prototype.myLastChild=function(){
		var tmp=this.myChildNodes();
		return tmp[tmp.length-1];
	}
	//当我们想知道坐标的那个div的一系列父元素中 
	//有某些div使用了定位属性的时候，我们使用下面这个函数
	jq.prototype.getElementPosition=function(){
		var e=this[0];
		var x=0,y=0;
		while(e!=null){
			x+=e.offsetLeft;
			y+=e.offsetTop;
			e=e.offsetParent;
		}
		return {x:x, y:y}
	}
	var contains=function(p,c){
		return p.contains?
		p!=c&&p.contains(c):
		!!(p.compareDocumentPosition(c)&16);
	}
	jq.prototype.mouseover=function(func){
		this[0].onmouseover=function(e){
			var e=e||window.event;
			var t=e.relatedTarget||e.formElement;
			if(t==this||contains(this,t)){
				return;
			}
			func.call(this,e);
		}
	}
	jq.prototype.mouseout=function(func){
		this[0].onmouseout=function(e){
			var e=e||window.event;
			var t=e.relatedTarget||e.toElement;
			if(t==this||contains(this,t)){
				return;
			}
			func.call(this,e);
		}
	}
	jq.prototype.bind=function(eventName,callBack){
		for(var i=0;i<this.length;i++){
			if(this[i],addEventListener){
				this[i],addEventListener(eventName,callBack,false);
			}else{
				this[i].attachEvent('on'+eventName,callBack);
			}
		}
	}
	function $(str){
		return new jq(str);
	}
	window.$=$;
})()