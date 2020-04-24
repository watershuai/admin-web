$(function () {
   function init() {
    $.ajax({
        url:bigapi.artclecategory,
        type:'get',
        dataType:'json',
        success:function (res) {
            if(res.code == 200){
                let html = template('contentcategory',res)
                $('tbody').html(html)
            }
        }
    })
   }
   init()
    $('.btn-primary').on('click',function () {
       let name = $('#exampleInputEmail1').val()
       let slug = $('#exampleInputPassword1').val()
        if(name == '' || slug == ''){
            alert('重新输入')
            return
        }
        if($('.modal-title-select').text() == '新增'){
            $('.display').attr('data-id','')
            ops(bigapi.categoryadd,{name,slug})
        }else{
            ops(bigapi.categoryedit,{name,slug,id:$('input[name=id]').val()})
        }
    })
  
          function ops(url,data) {
            $.ajax({
                url:url,
                type:'post',
                dataType:'json',
                data:data,
                success:function (res) {
                    if(res.code == 201 || res.code == 200){
                        $('#myModal').modal('hide')
                        $('.formbody')[0].reset()
                        init()
                    }else{
                        alert('已存在')
                    }
                }
            })
          }
    
    $('tbody').on('click','.btn-danger',function () {
        const id = $(this).data('id')
        $.ajax({
            url:bigapi.categoyrdelete,
            type:'post',
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
    $('tbody').on('click','.btn-info',function () {
        const id = $(this).data('id')
        $('.display').val(id)
        $.ajax({
            url:bigapi.categoryselect,
            type:'get',
            dataType:'json',
            data:{id},
            success:function (res) {
               if(res.code == 200){
                   console.log(res);
                $('.modal-title-select').text('编辑')
                $('#exampleInputEmail1').val(res.data[0].name)
                $('#exampleInputPassword1').val(res.data[0].slug)
              
               }
            }
        })
        $('#myModal').modal('show')
    })
    
})