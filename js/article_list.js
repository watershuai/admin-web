$(function () {
    let page = 1
    let perpage = 10
    function init() {
        $.ajax({
            type:'get',
            url:bigapi.contentdetail,
            dataType:'json',
            data:{
                page,
                perpage,
                // 添加分类筛选条件
                type:$('#selCategory').val(),
                // 添加文章状态筛选条件
                state:$('#selStatus').val()
            },
            success:function (res) {
               let html = template('contentlist',res)
               $('tbody').html(html)
               let pagesum = res.data.totalPage
               setPage(page,pagesum)
            }
        })
    }
    init()
   
    function setPage(pageCurrent, pageSum) {
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: pageCurrent,
            // 总页数
            totalPages: pageSum,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event,originalEvent,type,cpage) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                page = cpage
                init()
            }
        })
    }

    $.ajax({
        type:'get',
        url:bigapi.artclecategory,
        dataType:'json',
        success:function (res) {
            console.log(res);
            
            let html = template('selectlist',res)
            $('#selCategory').html(html)
        }
    })
  $('#btnSearch').on('click',function (e) {
        e.preventDefault()
        page = 1
        init()
  })

  $('tbody').on('click','.delete',function () {
      let id = $(this).data('id')
      $.ajax({
          type:'post',
          url:bigapi.contentdelete,
          dataType:'json',
          data:{id},
          success:function (res) {
           if(res.code == 204){
               alert(res.msg)
               init()
           }
          }
      })
  })
})