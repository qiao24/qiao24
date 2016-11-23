/*attr0bj 参数对象   nandu 难度*/
function game(attrObj){
    var attrObj=attrObj||{};
    this.nandu=attrObj.nandu==undefined?1:attrObj.nandu;
    this.yinzi=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.clientW=document.documentElement.clientWidth;
    this.clientH=document.documentElement.clientHeight;
    if(this.nandu==1){
        this.num=8;
    }else if(this.nandu==2){
        this.num=12;
    }else if(this.nandu==3){
        this.num=18;
    }
    this.speed=3;
    this.currentLetter="";
    this.letterArr=[];
    this.play();
}
game.prototype={
    random:function(num){
        var newarr=[];
        for(var i=0;i<num;i++){
            var temp=this.yinzi[Math.floor(Math.random()*this.yinzi.length)];
            var span=$("<span>");
            span.innerHTML=temp;
            span.style.left=50+(this.clientW-100)*Math.random()+"px";
            span.style.top=-50-100*Math.random()+"px";
            span.style.position="absolute";
            span.style.color="#fff";
            span.style.fontSize="30px";
            span.style.border="3px solid green";
            span.style.borderRadius="50%";
            span.style.background="purple";
            span.style.width='35px';
            span.style.height='35px';
            span.style.textAlign="center";
            span.style.lineHeight="35px";
            span.style.opacity="0.8";
            document.body.appendChild(span);
            newarr.push(span);
        }
        return newarr;
    },
    play:function(){
        var that=this;
        that.key();
        setInterval(function(){
            if(that.letterArr.length==0){
                that.letterArr=that.random(that.num);
            }else if(that.letterArr.length<that.num){
                that.letterArr=that.letterArr.concat(that.random(that.num-that.letterArr.length))
            }
            for(var i=0;i<that.letterArr.length;i++){
                if(that.letterArr[i].innerHTML==that.currentLetter){
                    that.letterArr[i].style.display="none";
                    that.letterArr.splice(i,1);
                    that.currentLetter="";
                    break;
                }
                if(that.letterArr[i].offsetTop>that.clientH-100){
                    that.letterArr[i].style.display="none";
                    that.letterArr.splice(i,1);
                    break;
                }
                that.letterArr[i].style.top=that.letterArr[i].offsetTop+that.speed+"px";
            }
        },50)
    },
    key:function(){
        var that=this;
        document.onkeydown=function(e){
            var ev=e||window.event;
            that.currentLetter=String.fromCharCode(ev.keyCode);
        }
    }
}
