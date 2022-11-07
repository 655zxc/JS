window.addEventListener('load',function(){

    //1.获取元素
    var focus = document.querySelector('.focus');
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var ul = document.querySelector('.focus ul');
    var circle = document.querySelector('.circle');
    var num = 0;//num代表当前是第几张图 取值0-4
    var mycircle = 0;//mycircle代表哪个小圆点变色 取值 0-3

    //2.鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮

    focus.addEventListener('mouseover',function(){
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';

        clearInterval(timer);//关闭定时器
        timer = null;
    })

    focus.addEventListener('mouseout',function(){
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';

        timer = setInterval(function(){
            arrowr.click();//手动点击右键
        },2000)
        //开启定时器 注意不要加var 已经声明过了
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
            num = index;//num代表当前是第几张图
            mycircle = index;//mycircle代表哪个小圆点变色
            //这里不用担心num变成第五张图 因为通过小圆点点击 无法切换到第五张图
            animate(ul,-focus.offsetWidth*index);
            //由于绝对定位 因此ul的left是0 在函数里只需要写向左移动多少就可以了
            //移动index个focus的宽度
        })
    }

    //复制第一张图片
    var last = ul.children[0].cloneNode(true);
    ul.appendChild(last);


    //6.右侧按钮

    arrowr.addEventListener('click',function(){
        if(num == ul.children.length -1){
            //一共有五张图 如果到了最后一张 也就是第一张的克隆
            //将当前图片设置为第一张 并且移动到第一张
            num = 0;
            ul.style.left = 0;
        }
        //如果点击按钮时候图片是第四张 这次num++ 图片变成第五张(仿第一张) 
        //下一次点击按钮会直接跳到0的位置 然后num++ 触发移动到第二张的函数
        num++;
        animate(ul,-focus.offsetWidth*num);



        //7.改变小圆点
        
        if(mycircle == circle.children.length-1){
            mycircle = 0;//跳到第一个
        }
        else{
            mycircle++;//点击一次 小圆点++
        }

        for(var i = 0; i< circle.children.length;i++){
            circle.children[i].className = '';
        }

        circle.children[mycircle].className = 'current';
        
    })
    
    


      //8.左侧按钮

      arrowl.addEventListener('click',function(){
        if(num == 0){
           
            num = ul.children.length -1 ;
            ul.style.left = -num * focus.offsetWidth + 'px';
            //当num等于0 num立即变成4(4和0是一张图片) 然后在滚
            //与上面不同 上面是先滚后跳 这里是先跳后滚
        }
      
        num--;
        animate(ul,-focus.offsetWidth*num);



        //9.改变小圆点
        
        if(mycircle == 0){
            mycircle = circle.children.length-1;
        }
        else{
            mycircle--;
        }

        for(var i = 0; i< circle.children.length;i++){
            circle.children[i].className = '';
        }

        circle.children[mycircle].className = 'current';
        
    })


    // 10.自动播放
    var timer = setInterval(function(){
        arrowr.click();//手动点击右键
    },2000)
    //然后再鼠标移入 移出里面关闭 开启
})


    //11.节流阀
    //设置一个flag 给右侧按钮 如果flag为真 进入函数 且变false
    //在回调函数中flag = true 
    //保证动画结束后 才能触发点击函数