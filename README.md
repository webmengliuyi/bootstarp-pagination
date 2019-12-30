# bootstarp-pagination

好用的分页
====

只需传入3个参数，便可控制分页的宽度，防止分页过多溢出
----

```javascript
$('.pagination').paging({
      currentPage: 1, //当前页  必传
      length: 10, // 一页列表数量  必传
      total: 123, // 总列表数量  必传
      isPre: true, //是否用上下页功能， 默认true 展示 可不传
      isJump: true, //是否用跳转功能， 默认true 使用  可不传
      showOne: false, //只有一页时是否展示分页， 默认true  展示 可不传
      buttonNum: 9,  // 页面li标签数量 默认为7  最少为5 可不传
      totalDesc:  true, //是否展示总页数的文案提示 默认true 展示  可不传
      callback: function (page) { //回调  返回页码
      console.log(page)
    }
  })
```

