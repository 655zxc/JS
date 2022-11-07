function animate(obj,target,callback){

    clearInterval(obj.timer);
    //首先清除定时器 如果鼠标在移入动画还未完成时移出 可能同时存在两个定时器


    obj.timer = setInterval(function(){
        var step = (target - (obj.offsetLeft ))/10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft  + step + 'px';


        if(target == (obj.offsetLeft )){
            
            clearInterval(obj.timer);

            callback && callback();
        }
     
    },15)

    
}
