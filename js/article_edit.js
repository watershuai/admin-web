$(function () {
  
   let id = isquery.querystring(location.search).id
   console.log(id);
   
   $.ajax({
    type:'get',
    url:bigapi.artclecategory,
    dataType:'json',
    success:function (res) {
       if(res.code == 200){
        let html = template('detailselect',res)
        $('.form-control').html(html)
       }
    }
})
   $.ajax({
       type:'get',
       url:bigapi.contentsearch,
       data:{id},
       dataType:'json',
       success:function (res) {
            if(res.code == 200){
                $('#inputTitle').val(res.data.title)
                // 下拉列表
                $('.category').val(res.data.categoryId)
                // 文章封面
                $('.article_cover').attr('src',res.data.cover)
                // 发布时间
                $('#articleDate').val(res.data.date)
                // 富文本框:当赋值给文本域之后，插件会默认的将数据镜像到插件中
                $('#articleContent').val(res.data.content)
            }
       }
   })
   $('#inputCover').on('change',function () {
    let myimg = $('#inputCover')[0].files[0]
    let url = URL.createObjectURL(myimg)
    $('.article_cover').attr('src',url)
    })
   isquery.chajian()
     
   $('.btn-success').click(function (e) {
    e.preventDefault()
    ajaxData('已发布')
})
$('.btn-default').click(function(e){
    e.preventDefault()
    ajaxData('草稿')
})

function ajaxData(state) {
    let formdata = new FormData($('#form')[0])
    // 追加富文本框的数据
    formdata.append('content',tinymce.activeEditor.getContent())
    // 追加id
    formdata.append('id',id)
    // 追加状态
    formdata.append('state',state)
        $.ajax({
            type:'post',
            url:bigapi.articleedit,
            data:formdata,
            dataType:'json',
            processData:false,
            contentType:false,
            success:function (res) {
                if(res.code == 200){
                    location.href = './article_list.html'
                }
                alert(res.msg)
            }
        })
}
})