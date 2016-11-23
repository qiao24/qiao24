/*
获得纯文本
obj    要操作的对象
[val]  要设置的值
* */
function getText(obj,val){
    if(obj.innerText!==undefined){
        if(val==undefined){
            return obj.innerText;
        }else{
            obj.innerText=val;
        }

    }else{
        if(val==undefined){
            return obj.textContent;
        }else{
            obj.textContent=val;
        }
    }
}

/*
* 操作属性
*
* */
function attr(){
    var obj=arguments[0];
    if(arguments.length==2){
        if(typeof arguments[1]=="string"){
            return obj.getAttribute(arguments[1]);
        }else if(typeof arguments[1]=="object"){
           for(var i in arguments[1]){
               obj.setAttribute(i,arguments[1][i])
           }

        }
    }else if(arguments.length==3){
        obj.setAttribute(arguments[1],arguments[2])
    }
}

/*
* 获得样式
* */
function getStyle(obj,attr){
    if(window.getComputedStyle!=undefined){
        return getComputedStyle(obj,null)[attr];
    }else{
        return obj.currentStyle[attr];
    }
}


/*
*
* 通过类名获取对象
*
* */
function getClass(classname,obj){
    var obj=obj||document;
    if(obj.getElementsByClassName){
        return obj.getElementsByClassName(classname)
    }else{
        var arr=[];
        var all=obj.getElementsByTagName("*");
        for(var i=0;i<all.length;i++){
            if(check(all[i].className,classname)){
                arr.push(all[i])
            }
        }
        return arr;

    }
}

function check(oldclass,newclass){
    var arr=oldclass.split(" ");
    for(var i=0;i<arr.length;i++){
        if(arr[i]==newclass){
            return true;
        }
    }
    return false;
}

/*通过$获取相应的对象*/
function $(selector,obj){
    var obj=obj||document;
    if(typeof selector=="string"){
        var selector=selector.replace(/^\s*|\s*$/g,"");
        if(selector.charAt(0)=="#"){
            return document.getElementById(selector.substr(1));
        }else if(selector.charAt(0)=="."){
          return  getClass(selector.substr(1),obj)
        }else if(/^[a-z][1-6a-z]{0,10}/.test(selector)){
            return obj.getElementsByTagName(selector);
        }else if(/^<[a-z][1-6a-z]{0,10}>$/.test(selector)){
            return document.createElement(selector.slice(1,-1))
        }

    }else if(typeof selector=="function"){
        addEvent(window,'load',function(){
            selector();
        })
    }
}

/*获得所用的子元素*/

function getChilds(obj,type){
    var type=type==undefined?false:type;
    var sons=obj.childNodes;
    var arr=[];
    for(var i=0;i<sons.length;i++){
        if(type==false) {
            if (sons[i].nodeType == 1) {
                arr.push(sons[i])
            }
        }else if(type==true){
            if (sons[i].nodeType == 1||(sons[i].nodeType==3&&trim(sons[i].nodeValue)!=="")) {
                arr.push(sons[i])
            }

        }
    }

    return arr;
}

/*获得第一个子元素*/
function getFirst(obj,type){
   return getChilds(obj,type)[0];
}
/*获得最后一个子元素*/
function getLast(obj,type){
    var objs= getChilds(obj,type);
    return objs[objs.length-1];
}

/*获得第n个子元素*/
function getNum(obj,num,type){
    var objs= getChilds(obj,type);
    return objs[num];
}


/*获取下一个兄弟元素*/
function getNext(obj,type){
    var type=type==undefined?false:type;
    var next=obj.nextSibling;
    if(next==null){
        return false;
    }
    if(type==false) {
        while (next.nodeType == 3 || next.nodeType == 8) {
            next = next.nextSibling;
            if (next == null) {
                return false;
            }
        }
    }else if(type==true){
        while ((next.nodeType == 3 &&trim(next.nodeValue)=="")|| next.nodeType == 8) {
            next = next.nextSibling;
            if (next == null) {
                return false;
            }
        }
    }

    return next;

}

/*获取上一个兄弟元素*/
function getUp(obj,type){
    var type=type==undefined?false:type;
    var up=obj.previousSibling;
    if(up==null){
        return false;
    }
    if(type==false) {
        while (up.nodeType == 3 || up.nodeType == 8) {
            up=up.previousSibling;
            if (up == null) {
                return false;
            }
        }
    }else if(type==true){
        while ((up.nodeType == 3 &&trim(up.nodeValue)=="")|| up.nodeType == 8) {
            up=up.previousSibling;
            if (up == null) {
                return false;
            }
        }
    }
    return up;
}

/*插入某个元素的前面
* obj  要插入的对象
* obj1 要插入前面的对象
* */
function insertBefore(obj,obj1){
    var parent=obj1.parentNode;
    parent.insertBefore(obj,obj1);
}

/*插入到父元素的最后*/
function append(obj,parent){
    parent.appendChild(obj);
}

/*插入到父元素的最前面*/
function pappend(obj,parent){
    var first=getFirst(parent);
    if(!first){
        parent.appendChild(obj);
    }
    parent.insertBefore(obj,first);

}
/*插入到某个元素的后面*/
function insertAfter(obj,obj1){
    var parent=obj1.parentNode;
    var next=getNext(obj1);
    if(next==false){
        parent.appendChild(obj);
    }
    parent.insertBefore(obj,next);
}

/*替换*/
function replace(obj,obj1){
    var parent=obj1.parentNode;
    parent.replaceChild(obj,obj1);
}

/*删除子元素*/
function remove(obj,parent){
    parent.removeChild(obj);
}

/*克隆*/
function clone(obj,type){
    var type=type==undefined?true:type;
    return obj.cloneNode(type);
}
/*scroll*/
function scroll(){
    if(document.documentElement.scrollTop==undefined){
        return document.body.scrollTop;
    }
    return document.documentElement.scrollTop;
}
/*事件的兼容函数 现代浏览器 addEventlistener   IE浏览器中用attachEvent*/
/*绑定多个事件*/
function addEvent(obj,ev,fn){
    if(obj.addEventListener){
        obj.addEventListener(ev,fn,false);
    }else if(obj.attachEvent){
        obj.attachEvent('on'+ev,fn);
    }
}
/*删除多个绑定事件  removeEventListener是现代浏览器删除事件的方法  detachEvent是IE浏览器删除事件的方法*/
function removeEvent(obj,ev,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(ev,fn,false);
    }else if(obj.detachEvent){
        obj.detachEvent('on'+ev,fn);
    }
}
//鼠标滚轮事件
function mousewheel(obj,upcall,downcall){

    if(obj.attachEvent){
        obj.attachEvent('onmousewheel',fn);
    }else if(obj.addEventListener){
        obj.addEventListener('mousewheel',fn,false);
        obj.addEventListener('DOMMouseScroll',fn,false);
    }
    function fn(e){
        var ev=e||window.event;
        var dir=ev.detail||ev.wheelDelta;
        if(dir==-3||dir==120){
            if(upcall){
            upcall();
            }
        }else if(dir==3||dir==-120){
           if(downcall){
               downcall();
           }
        }
        if(ev.preventDefault){
            ev.preventDefault();
        }else{
            ev.returnValue=false;
        }
    }

}
function trim(str,type){
    var type=type||"side";
    if(type=="side") {
        return str.replace(/^\s*|\s*$/g, "");
    }else if(type=="left"){
        return str.replace(/^\s*/g, "");
    }else if(type=="right"){
        return str.replace(/\s*$/g, "");
    }else if(type=="all"){
        return str.replace(/\s*/g, "");
    }
}