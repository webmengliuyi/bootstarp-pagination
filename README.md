# bootstarp-pagination

只需传入3个参数，便可控制分页的宽度，防止分页过多溢出
=====
<br>  

具体参数如下
-----
<br>  

  $('.pagination').paging({<br>  
      currentPage: 1, //当前页  必传<br>  
      length: 10, // 一页列表数量  必传<br>  
      total: 123, // 总列表数量  必传<br>  
      isPre: true, //是否用上下页功能， 默认true 展示 可不传<br>  
      isJump: true, //是否用跳转功能， 默认true 使用  可不传<br>  
      showOne: false, //只有一页时是否展示分页， 默认true  展示 可不传<br>  
      buttonNum: 9,  // 页面li标签数量 默认为7  最少为5 可不传<br>  
      totalDesc:  true, //是否展示总页数的文案提示 默认true 展示  可不传<br>  
      callback: function (page) { //回调  返回页码<br>  
        $('h1 span').text(page)<br>  
      }<br>  
    })<br>  


