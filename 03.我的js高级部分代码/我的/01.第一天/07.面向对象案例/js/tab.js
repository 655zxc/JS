var that;
class Tab{
    constructor(id){
        that = this;
        this.main = document.querySelector(id);
        //这里犯了两个错误
        //1.     this.main = id
        //2.     this.main = document.querySelector('id')
        //传入盒子的字符串 获取这个盒子



        // this.li = document.querySelectorAll('this.main li');
        // this.section = document.querySelectorAll('this.main section');
        //不可以




        // this.li = this.main.querySelectorAll('li');
        // this.section = this.main.querySelectorAll('section');
        //在构造函数中获取li section 会导致添加li时无法更新 因为构造函数只会在new时使用
        
        this.ul = this.main.querySelector('ul');
        this.tabadd = this.main.querySelector('.tabadd');
        this.tabscon = this.main.querySelector('.tabscon');
        

        this.init();//调用初始化函数

        
    }//构造函数

    getnode(){
        this.li = this.main.querySelectorAll('li');
        this.section = this.main.querySelectorAll('section');
        this.iconfont = this.main.querySelectorAll('.iconfont');
    }//获取li section的函数

    init(){
        
        this.getnode();//在初始化里面 获取li和section 因为这两个值是需要更新的 别写死了


        for(var i = 0; i< this.li.length ; i++){
            this.li[i].setAttribute('index',i);
            this.section[i].setAttribute('index',i);
            //设置索引


            this.li[i].onclick = this.changeTab;
            //给li绑定点击事件 点击的时执行切换函数 记得不加括号


            this.iconfont[i].onclick = this.removeTab;
            //给x绑定删除事件
        }


        this.tabadd.onclick = this.addTab;
        //给tabadd绑定点击事件 增加li


        
       
    }//初始化 这个函数里的this是main

    changeTab(){
        
        for(var i = 0; i< that.li.length ; i++){
            that.li[i].className = '';
            that.section[i].className = '';
        }//清除className

        that.li[this.getAttribute('index')].className = 'liactive';
        that.section[this.getAttribute('index')].className = 'conactive';
        //设置当前li和section
        
    }//切换函数 这里面的this是li[i]
    
    addTab(){
        

        for(var i = 0; i< that.li.length ; i++){
            that.li[i].className = '';
            that.section[i].className = '';
        }//清除className

        // (1) 创建li元素和section元素 
        var random = Math.random();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试 ' + random + '</section>';
        //注意添加的内容 都是带有liactive 或 conactive

        // (2) 把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.tabscon.insertAdjacentHTML('beforeend', section);
        //insertAdjacentHTML这个方法可以将字符串添加到父元素中


        that.init();
        //li section更新了 初始化
        
        
    }//增加li函数 this是tabadd

    removeTab(e){
        e.stopPropagation();
        //点击x号的同时 会点击到li触发切换操作 需要阻止冒泡

        var index = this.parentNode.getAttribute('index');
        that.ul.removeChild(that.ul.children[index]);
        that.tabscon.removeChild(that.tabscon.children[index]);

        that.init();
        //初始化

        // that.ul.children[index-1].className = 'liactive';
        // that.tabscon.children[index-1].className = 'conactive';
        //让被删除的前一个处于选定状态

        
        (index == that.ul.children.length) && that.li[index-1] && that.li[index-1].click();
        //也可以这样 自动点击前一个
        //但是注意 当index = 0会出问题 加一条判断语句即可 index = 0不会触发that.li[index-1].click()
        // (index == that.ul.children.length) 如果删除的不是最后一个 则不会执行后面的内容



    }//删除li和section this是iconfont

    editTab(){
        //懒得写了
        //原理是li添加双击事件 用innerHTML = '...'生成一个文本框 失去焦距的时候赋值且删掉文本框
    }
}
new Tab('#tab');