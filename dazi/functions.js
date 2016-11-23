/*
��ô��ı�
obj    Ҫ�����Ķ���
[val]  Ҫ���õ�ֵ
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
* ��������
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
* �����ʽ
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
* ͨ��������ȡ����
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

/*ͨ��$��ȡ��Ӧ�Ķ���*/
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

/*������õ���Ԫ��*/

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

/*��õ�һ����Ԫ��*/
function getFirst(obj,type){
   return getChilds(obj,type)[0];
}
/*������һ����Ԫ��*/
function getLast(obj,type){
    var objs= getChilds(obj,type);
    return objs[objs.length-1];
}

/*��õ�n����Ԫ��*/
function getNum(obj,num,type){
    var objs= getChilds(obj,type);
    return objs[num];
}


/*��ȡ��һ���ֵ�Ԫ��*/
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

/*��ȡ��һ���ֵ�Ԫ��*/
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

/*����ĳ��Ԫ�ص�ǰ��
* obj  Ҫ����Ķ���
* obj1 Ҫ����ǰ��Ķ���
* */
function insertBefore(obj,obj1){
    var parent=obj1.parentNode;
    parent.insertBefore(obj,obj1);
}

/*���뵽��Ԫ�ص����*/
function append(obj,parent){
    parent.appendChild(obj);
}

/*���뵽��Ԫ�ص���ǰ��*/
function pappend(obj,parent){
    var first=getFirst(parent);
    if(!first){
        parent.appendChild(obj);
    }
    parent.insertBefore(obj,first);

}
/*���뵽ĳ��Ԫ�صĺ���*/
function insertAfter(obj,obj1){
    var parent=obj1.parentNode;
    var next=getNext(obj1);
    if(next==false){
        parent.appendChild(obj);
    }
    parent.insertBefore(obj,next);
}

/*�滻*/
function replace(obj,obj1){
    var parent=obj1.parentNode;
    parent.replaceChild(obj,obj1);
}

/*ɾ����Ԫ��*/
function remove(obj,parent){
    parent.removeChild(obj);
}

/*��¡*/
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
/*�¼��ļ��ݺ��� �ִ������ addEventlistener   IE���������attachEvent*/
/*�󶨶���¼�*/
function addEvent(obj,ev,fn){
    if(obj.addEventListener){
        obj.addEventListener(ev,fn,false);
    }else if(obj.attachEvent){
        obj.attachEvent('on'+ev,fn);
    }
}
/*ɾ��������¼�  removeEventListener���ִ������ɾ���¼��ķ���  detachEvent��IE�����ɾ���¼��ķ���*/
function removeEvent(obj,ev,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(ev,fn,false);
    }else if(obj.detachEvent){
        obj.detachEvent('on'+ev,fn);
    }
}
//�������¼�
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