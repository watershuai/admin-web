$(function () {
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
   

    $('#inputCover').on('change',function () {
        let myimg = $('#inputCover')[0].files[0]
        let url = URL.createObjectURL(myimg)
        $('.article_cover').attr('src',url)
    })
    isquery.chajian()
    
    $('.btn-release').click(function (e) {
        e.preventDefault()
        ajaxData('已发布')
    })
    $('.btn-draft').click(function(e){
        e.preventDefault()
        ajaxData('草稿')
    })

    function ajaxData(state) {
        let formdata = new FormData($('#form')[0])
            formdata.append('content',tinymce.activeEditor.getContent())
            formdata.append('state',state)
            $.ajax({
                type:'post',
                url:bigapi.contentrelease,
                data:formdata,
                dataType:'json',
                processData:false,
                contentType:false,
                success:function (res) {
                    if(res.code == 200){
                        alert(res.msg)
                        location.href = './article_list.html'
                    }
                }
            })
    }
})