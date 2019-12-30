;
(function ($, window, document) {
  'use strict';

  function Paging(el, options) {
    this.el = el
    this.options = {
      currentPage: parseInt(options.currentPage) ? parseInt(options.currentPage) : 1,
      /* 当前页码 *必传参数 */
      total: parseInt(options.total),
      /* 总条数 *必传参数 */
      length: parseInt(options.length),
      /* 每页展示条数  *必传参数 */
      isPre: (options.isPre === undefined || options.isPre) ? true : options.isPre,
      /* 是否用上下页功能， 默认true 展示  */
      isJump: (options.isJump === undefined || options.isJump) ? true : options.isJump,
      /* 是否用跳转功能， 默认true 使用 */
      showOne: (options.showOne === undefined || options.showOne) ? true : options.showOne,
      /* 只有一页时是否展示分页， 默认true  展示 */
      buttonNum: (options.buttonNum === undefined || options.buttonNum < 5) ? 7 : options.buttonNum,
      /* 页面显示页码数量 默认为7  最少为5 */
      totalDesc: (options.totalDesc === undefined || options.totalDesc) ? true : options.totalDesc,
      /* 是否展示总页数的文案提示 默认true 展示 */
      callback: options.callback
    }
    this.init()
  }

  Paging.prototype = {
    constructor: Paging,

    /* 初始化分页 */
    init: function () {
      this.createHtml();
      this.bindClickEvent();
    },

    /* 创建dom */
    createHtml: function () {
      var _this = this
      var currentPage = this.options.currentPage
      var total = this.options.total
      var length = this.options.length
      var isPre = this.options.isPre
      var isJump = this.options.isJump
      var totalPage = Math.ceil(total / length)
      var buttonNum = this.options.buttonNum
      var totalDesc = this.options.totalDesc
      var showOne = this.options.showOne
      var content = []

      /* 当前页面不能超出 1 - totalPage 范围 */
      currentPage = totalPage < currentPage ? totalPage : currentPage
      currentPage = currentPage < 1 ? 1 : currentPage



      if (isNaN(currentPage) || isNaN(length) || isNaN(totalPage)) {
        alert('分页插件不能正常工作，检查参数是否有误')
      } else {
        if (!showOne && totalPage === 1) {
          return '';
        }
        if (isPre) {
          if (currentPage == 1) {
            content.push("<li class='prevPage disabled'><a href='javascript:void(0)'>上一页</a></li>")
          } else {
            content.push("<li class='prevPage'><a href='javascript:void(0)'>上一页</a></li>")
          }
        }


        if (totalPage <= buttonNum) {
          for (var i = 1; i <= totalPage; i++) {
            if (currentPage !== i) {
              content.push("<li><a href='javascript:void(0)'>" + i + "</a></li>");
            } else {
              content.push("<li class='active'><a href='javascript:void(0)'>" + i + "</a></li>");
            }
          }
        } else if (currentPage <= Math.floor(buttonNum / 2)) {
          for (var i = 1; i <= buttonNum - 2; i++) {
            if (currentPage !== i) {
              content.push("<li><a href='javascript:void(0)'>" + i + "</a></li>");
            } else {
              content.push("<li class='active'><a href='javascript:void(0)'>" + i + "</a></li>");
            }
          }
          content.push("<li class='disabled'><span>...</span></li>");
          content.push("<li><a href='javascript:void(0)'>" + totalPage + "</a></li>");

        } else if (totalPage - currentPage <= Math.floor(buttonNum / 2)) {
          content.push("<li><a href='javascript:void(0)'>" + 1 + "</a></li>")
          content.push("<li class='disabled'><span>...</span></li>");
          for (var i = totalPage - buttonNum + 3; i <= totalPage; i++) {
            if (currentPage !== i) {
              content.push("<li><a href='javascript:void(0)'>" + i + "</li>");
            } else {
              content.push("<li class='active'><a href='javascript:void(0)'>" + i + "</a></li>");
            }
          }
        } else {
          if (currentPage - Math.floor(buttonNum / 2) <= 0) {
            for (var i = 1; i <= Math.floor(buttonNum / 2); i++) {
              if (currentPage !== i) {
                content.push("<li><a href='javascript:void(0)'>" + i + "</a></li>");
              } else {
                content.push("<li class='active'><a href='javascript:void(0)'>" + i + "</a></li>");
              }
            }
          } else {
            content.push("<li><a href='javascript:void(0)'>" + 1 + "</a></li>");
            content.push("<li class='disabled'><span>...</span></li>");
            for (var i = currentPage - Math.floor(buttonNum / 2) + (buttonNum % 2 == 0 ? 3 : 2); i <= currentPage; i++) {
              if (currentPage !== i) {
                content.push("<li><a href='javascript:void(0)'>" + i + "</a></li>");
              } else {
                content.push("<li class='active'><a href='javascript:void(0)'>" + i + "</a></li>");
              }
            }

          }

          if (totalPage - currentPage <= 0) {
            for (var i = currentPage + 1; i <= totalPage; i++) {
              content.push("<li><a href='javascript:void(0)'>" + i + "</a></li>");
            }
          } else {
            for (var i = currentPage + 1; i <= currentPage + Math.floor(buttonNum / 2) - 2; i++) {
              content.push("<li><a href='javascript:void(0)'>" + i + "</a></li>");
            }
            content.push("<li class='disabled'><span>...</span></li>");
            content.push("<li><a href='javascript:void(0)'>" + totalPage + "</a></li>");
          }
        }
        if (isPre) {
          if (currentPage === totalPage) {
            content.push("<li class='nextPage disabled'><a href='javascript:void(0)'>下一页</a></li>");
          } else {
            content.push("<li class='nextPage'><a href='javascript:void(0)'>下一页</a></li>");
          }
        }

        if (totalDesc) {
          content.push("<li class='pagination-desc'><span>共" + totalPage + "页</span></li>");
          content.push("<li class='pagination-desc'><span style='border-top-right-radius: 4px;border-bottom-right-radius: 4px;'>共" + total + "条记录每页显示" + length + "条</span></li>");
        }
        if (isJump) {
          content.push('<div style="float: left"><input type="text" id="targetpage" class="form-control" style="display: inline-block; width: 50px; margin: 0 3px 0 10px;" value="' + currentPage + '"></div>')
          content.push('<div style="float: left"><button id="jump-page" class="btn btn-default">跳转</button></div>')
        }

        this.el.html(content.join(''))
      }
    },

    /* 绑定事件 */
    bindClickEvent: function () {
      var _this = this
      this.el.off('click', 'li')
      this.el.off('click', '#jump-page')
      this.el.on('click', 'li', function () {
        var className = $(this).attr('class')
        var num = parseInt($(this).find('a').text())
        if ($(this).hasClass('disabled') || $(this).hasClass('active') || $(this).hasClass('pagination-desc')) {
          return
        }
        if (className === 'prevPage') {
          /* 上一页 */
          _this.options.currentPage -= 1
        } else if (className === 'nextPage') {
          /* 下一页 */
          _this.options.currentPage += 1
        } else {
          _this.options.currentPage = num
        }
        _this.createHtml()
        if (_this.options.callback) {
          _this.options.callback(_this.options.currentPage)
        }
      })

      /* 跳转按钮 */
      if (this.options.isJump) {
        this.el.on('click', '#jump-page', function () {
          var num = parseInt($.trim($("#targetpage").val()))
          var totalPage = Math.ceil(_this.options.total / _this.options.length) /* 总页数 */
          if (!num || num < 1 || num > totalPage) {
            return
          } else {
            _this.options.currentPage = num
            _this.createHtml()
            if (_this.options.callback) {
              _this.options.callback(_this.options.currentPage)
            }
          }
        })
      }
    }
  }

  $.fn.paging = function (options) {
    return new Paging($(this), options);
  }


})(jQuery, window, document);