window.addEventListener('load',function(){

    //1.获取元素
    var focus = document.querySelector('.focus');
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var ul = document.querySelector('.focus ul');
    var circle = document.querySelector('.circle');

    //2.鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮

    focus.addEventListener('mouseover',function(){
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
    })

    focus.addEventListener('mouseout',function(){
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
    })

    //3.生成小圆圈 数量和图片数量一样
    for(var i = 0 ; i < ul.children.length ; i++){
        var li = document.createElement('li');
        circle.appendChild(li);
        //插入节点
        circle.children[0].className = 'current';
        //设置当前节点 只用将类名设置为current 具体设置在css里面写了
        li.setAttribute('index',i);
        //给圆圈设置序号 方便后面使用 注意从0开始
    }

    //4.给小圆圈添加点击效果 使用排他算法
    for(var i = 0 ; i < circle.children.length ; i++){
        circle.children[i].addEventListener('click',function(){
            for(var j = 0 ; j < circle.children.length ; j++){
                circle.children[j].className = '';
            }
            //清楚所有点击效果
            this.className = 'current';
            //设置当前点击按钮



            //5.实现点击圆圈切换图片 和4一样写在点击事件里面
            //移动是通过让ul移动实现的
            var index = this.getAttribute('index');//获取序号 注意要用方法 不能直接this.index 因为这是自己设置的
            animate(ul,-focus.offsetWidth*index)
            //由于绝对定位 因此ul的left是0 在函数里只需要写向左移动多少就可以了
            //移动index个focus的宽度
        })
    }

    //复制第一张图片
    var last = ul.children[0].cloneNode(true);
    ul.appendChild(last);


    //6.点击左侧按钮 图片滚动
    arrowl.addEventListener('click',function(){
        // animate(ul,focus.offsetWidth);
        //这样是不行的 focus.offsetWidth)的位置是相对于[初始]绝对定位地位置
        //比如现在是轮播图地四个 点击左按钮 会移动到最左边

        var nowbutton = document.querySelector('.circle .current');
        var nowbuttonindex = nowbutton.getAttribute('index');//得到现在图片的位置
        if(nowbuttonindex != 0){ //不等于第一张图才能向左移动
            animate(ul,-focus.offsetWidth*(nowbuttonindex-1));
            //移动到现在图片的左边张图片的位置


            //7.点击左侧按钮 小圆圈对应改变
            nowbutton.className = '';//消除本圆圈的current
            circle.children[nowbuttonindex-1].className = 'current';//设置左边圆圈的current
            
        }
    })

    //8.点击右侧按钮 图片滚动

    arrowr.addEventListener('click',function(){
        var nowbutton = document.querySelector('.circle .current');
        var nowbuttonindex = nowbutton.getAttribute('index');
        nowbuttonindex = parseInt(nowbuttonindex);
        //转化
        if(nowbuttonindex != (circle.children.length-1)){ 
            animate(ul,-focus.offsetWidth*(nowbuttonindex+1));
            //这里nowbuttonindex是string 加号被误认为是连接符号 所以上面减号得到的是num 这里得到的是连接后的string


            // //9.点击右侧按钮 小圆圈对应改变
            nowbutton.className = '';
            circle.children[nowbuttonindex+1].className = 'current';
           
            console.log('上面的函数' , nowbuttonindex ,circle.children.length-1);
            
        }
        else{
            nowbutton.className = '';
            circle.children[0].className = 'current';
            //按钮跳转到第一个

            animate(ul,-focus.offsetWidth*(nowbuttonindex+1));

            
                ul.style.left = 0 ;
            
            //bug 代码执行太快 定时器还没执行玩 就执行了ul.style.left = 0 吗?

        }
    })    
    


})