window.onload=function(){
	var row=7;
	var da=document.getElementsByClassName('saolei')[0];
	da.style.width=50*row+'px';
	da.style.height=50*row+'px';
	da.style.padding='20px';
	// da.style.marginTop=(document.documentElement.offsetHeight-(row*50+40))/2+'px';
	//让窗口始终居中
	window.onresize=function(){
		da.style.marginTop=(window.innerHeight-(row*50+40))/2+'px';
		da.style.marginLeft=-(row*50+40)/2+'px';
	}
	window.onresize();
	var zhezhao=document.getElementById('zhezhao');

	//生成数组
	var a=[];
	for(var i=0;i<row;i++){
		a[i]=[];
		for(var j=0       ;j<row;j++){
			var d=Math.random();
			if(d>0.8){
				a[i].push(1);
			}else{
			a[i].push(0);}
		}
	}
	//将二维数组a转化为提示数组b
	var lei='lei';
	var b=[];
	for(var i=0;i<row;i++){
		b[i]=[];
		for(var j=0;j<row;j++){
			var c=0;
			if(a[i][j]==1){
				b[i].push(lei);
				continue;
			}
			var s1=(i>0 && j>0)	?a[i-1][j-1]:0;
			var s2=(i>0)		?a[i-1][j]:0;
			var s3=(i>0 && j<row-1) ?a[i-1][j+1]:0;
			var s4=(j>0)		?a[i][j-1]:0;
			var s5=(j<row-1)		?a[i][j+1]:0;
			var s6=(i<row-1 && j>0) ?a[i+1][j-1]:0;
			var s7=(i<row-1)		?a[i+1][j]:0;
			var s8=(i<row-1 && j<row-1) ?a[i+1][j+1]:0;
			c=s1+s2+s3+s4+s5+s6+s7+s8;
			b[i].push(c);
		}
		//console.log(b[i]);	
	}
	//将二维数组b转化为一维数组lei
	var lei=[];
	for(var i=0;i<row;i++){
		for(var j=0;j<row;j++){
			lei.push(b[i][j]);
		}
	}

	
	var colors=['red','green','yellow','pink','blue','gray','orange','purple'];
	var _i=0;
	var intervalId=setInterval(function(){
		var div=document.createElement('div');	
		if(lei[_i]=='lei'){
			div.setAttribute('class','block lei');
		}else{
			div.setAttribute('class','block other');
		}

		/*--------------------*/
		div.textContent=lei[_i];
		/*--------------------*/

		da.appendChild(div);
		setTimeout(function(){
			var k=parseInt(Math.random()*colors.length);
			div.style.webkitTransform='rotateX(360deg)';
			div.style.color=colors[k];
			div.style.background=colors[k];
		},10);
		_i++;
		if(_i>row*row-1){
			clearInterval(intervalId);
		}
	},100);
	da.onmousedown=function(e){	
		if(e.target==this){
				return;
			}
		var div=e.target;		
		if(e.which==1){				
			zujiandanjihanshu(div);			
		}
		if(e.which==3){			
			youjiandanjihanshu(div);
		}		
	}
	function zujiandanjihanshu(div){					
			if(div.textContent!='lei'){
				div.style.background='white';
				div.style.color='black';
				div.style.boxShadow='0 0 3px black inset';
			}
			if(div.textContent=='lei'){
				da.onmousedown=null;
				var $leis=document.getElementsByClassName('lei');
				var $other=document.getElementsByClassName('other');
				for (var i =0; i<$other.length; i++) {
					$other[i].style.opacity=0.3;
				}
				var _x=0;
				var intervalID=setInterval(function(){
					$leis[_x].style.webkitTransform='scale(1.2,1.2)';
					_x++;
					if(_x==$leis.length){
						zhezhao.style.display='block';	
						setTimeout(function(){
							zhezhao.style.webkitTransform='scale(1,1)';
						},60);
						game.style.display='block';
						restart.style.display='block';
						clearInterval(intervalID);
					}
				},90);			
			}
	}
	function youjiandanjihanshu(div){
		var leis=document.getElementsByClassName('lei');
			if(div.textContent=='lei'){
				div.style.color='black';
				div.setAttribute('class','block');
			}
			if(div.textContent!='lei'){
				zhezhao.style.display='block';	
				setTimeout(function(){
					zhezhao.style.webkitTransform='scale(1,1)';
				},60);
				game.style.display='block';
				restart.style.display='block';
			}
			if(leis.length==0){
				zhezhao.style.display='block';	
				setTimeout(function(){
					zhezhao.style.webkitTransform='scale(1,1)';
				},60);
				game.textContent='YOU WIN !!!';
				game.style.display='block';
				restart.style.display='block';
			}
	}
	 //让页面中不能再选择文字
	document.onselectstart=function(){
		return false;
	}
	//让页面右键不再起作用
	document.oncontextmenu=function(){
		return false;
	}
	var restart=document.getElementById('restart');
	restart.onclick=function(){
		window.location.reload();
	}
/*	var _i=0;
	var intervalId=setInterval(function(){
		var div=document.createElement('div');
		// div.setAttribute('class','block');
		var num=(Math.random()>0.8)?1:0;
		console.log(num);
		div.setAttribute('class',(num)?'lei block':'block other');
		div.setAttribute('tip',num);
		div.textContent=num;
		da.appendChild(div);
		setTimeout(function(){
			var k=parseInt(Math.random()*colors.length);
			div.style.background=colors[k];
			div.style.color=colors[k];
			div.style.webkitTransform='rotateY(360deg)';
		},100)
		_i++;
		if(_i>row*row-1){
			clearInterval(intervalId);
			// var divs=document.getElementsByClassName('block');
			// for(var i=0;i<divs.length;i++){
			// 	divs[i].onclick=function(){
			// 		if(this.textContent=='0'){
			// 			this.style.background='white';
			// 			this.style.boxShadow='0 0 3px black inset';
			// 			this.style.color='black';
			// 		}else{
			// 			alert('game over!');
			// 			window.location.reload();
			// 		}
			// 	}
			// }
		}		
	},100);
*/
/*	da.onmousedown=function(e){
		var div=e.target;
		// console.log(e.which)
		if(e.which==1){
			if (e.target==this) {
				return;
			}
			
			div.textContent=div.getAttribute('tip');
			if(div.textContent=='0'){
				div.style.background='white';
				div.style.boxShadow='0 0 3px black inset';
				div.style.color='black';
			}
			if(div.textContent=='1'){
				da.onmousedown=null;
				var $leis=document.getElementsByClassName('lei');
				var $others=document.getElementsByClassName('other');
				for(var i=0;i<$others.length;i++){
					$others[i].style.opacity='0.1';
				}
				// console.log($leis);
				var _j=0;
				var ddd=setInterval(function(){
					$leis[_j].style.webkitTransform='scale(1.2,1.2)';
					// console.log($leis)
					_j++;
					if(_j==$leis.length){
						clearInterval(ddd);
						zhezhao.style.display='block';
						setTimeout(function(){
							// zhezhao.style.marginTop='0px';
							zhezhao.style.webkitTransform='scale(1,1)'
						},50)
					}
				},100)
					// for(var i=0;i<leis.length;i++){
					// 	leis[i].style.webkitTransform='scale(1.2,1.2)';
					// }
			}
		}
		if(e.which==3){
			var leis=document.getElementsByClassName('lei');
			if(div.textContent==1){
				div.style.color='black';
				div.textContent='7';
				div.setAttribute('class','block');
			}
			if(div.textContent==0){
				alert('game over!');
				window.location.reload();
			}
			if(leis.length==0){
				alert('你赢了！');
			}
		} 
	}
*/

   
}