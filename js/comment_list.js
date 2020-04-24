$(function () {
    let page = 1
    let perpage = 10
  function init() {
    $.ajax({
        type:'get',
        url:bigapi.commentsearch,
        data:{
            page,
            perpage
        },
        dataType:'json',
        success:function (res) {
            console.log(res);
            
           let html = template('commentData',res.data)
           $('tbody').html(html)
           setPage(null,res.data.totalPage)
        }
    })
  }
  init()


    function setPage(pageCurrent, pageSum) {
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage:page,
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

    $('tbody').on('click','.btngender',function () {
        $.ajax({
            type:'post',
            url:bigapi.commentgender,
            data:{id:$(this).data('id')},
            dataType:'json',
            success:function (res) {
                if(res.code == 200){
                    init()
                }
                alert(res.msg)
            }
        })
    })
    $('tbody').on('click','.btnsuccess',function () {
        $.ajax({
            type:'post',
            url:bigapi.commentsuccess,
            data:{id:$(this).data('id')},
            dataType:'json',
            success:function (res) {
                if(res.code == 200){
                    init()
                }
                alert(res.msg)
            }
        })
    })
    $('tbody').on('click','.btndelete',function () {
        $.ajax({
            type:'post',
            url:bigapi.commentdelete,
            data:{id:$(this).data('id')},
            dataType:'json',
            success:function (res) {
                if(res.code == 200){
                    init()
                }
                alert(res.msg)
            }
        })
    })
})