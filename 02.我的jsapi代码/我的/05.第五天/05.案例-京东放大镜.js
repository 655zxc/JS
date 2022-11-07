
window.addEventListener('load',function(){
var preview_img = document.querySelector('.preview_img');
var mask = document.querySelector('.mask');
var big = document.querySelector('.big');
var img = document.querySelector('.big img');

preview_img.addEventListener('mousemove',function(e){
    
    //画四个正方形
    //mask可移动的范围比左边img(框)范围小
    //右边img移动的范围比big(框)的范围大
    //这样想就明白了











    // mask.style.left = e.pageX - mask.style.width/2;
    // mask.style.top = e.pageY - mask.style.height/2;
    //取值不能用style 
    //e.page减去了方框离边距xy的固定数值
    //记住加px


    var x = e.pageX - this.offsetLeft ;
    var y = e.pageY - this.offsetTop ;
    //获得鼠标在盒子里的坐标

    if(x < mask.offsetWidth/2){//如果超出左边界
        mask.style.left = 0 +'px';//设置mask左边刚好和pic左边重叠


        img.style.left = 0 +'px';
    }
    else if (x > this.offsetWidth - mask.offsetWidth/2){//如果超出右边界
        mask.style.left = this.offsetWidth - mask.offsetWidth +'px'; //设置mask右边刚好和pic右边重叠



        img.style.left = big.offsetWidth - img.offsetWidth +'px';
    }
    else{
        mask.style.left = x - mask.offsetWidth/2 + 'px';//边距未重叠 正常移动


        // img.style.left =  - (x - mask.offsetWidth)/2 * (img.offsetWidth - big.offsetWidth) / (preview_img.offsetWidth - mask.offsetWidth) + 'px';
        // 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
    }

    if(y < mask.offsetHeight/2){//如果超过上方边界
        mask.style.top = 0 + 'px';//mask上边和pic重叠



     img.style.top = 0 +'px';
    }
    else if(y > this.offsetHeight - mask.offsetHeight/2){//如果超过下边边界
        mask.style.top = this.offsetHeight - mask.offsetHeight + 'px';//如mask下边和pic重叠



        img.style.top = big.offsetHeight - img.offsetHeight + 'px';
    }
    else{
        mask.style.top = y - mask.offsetHeight/2 + 'px';//边距未重叠 正常移动
    }
   






})

preview_img.addEventListener('mouseout',function(){
    mask.style.display = 'none';
    big.style.display = 'none';
})

preview_img.addEventListener('mouseover',function(){
    mask.style.display = 'block';
    big.style.display = 'block';
})
//要写在鼠标移入 不能写在鼠标移动函数里面
})
