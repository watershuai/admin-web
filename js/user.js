$(function () {
    $.ajax({
        type:'get',
        url:bigapi.userdetail,
        dataType:'json',
        success:function (res) {
          if(res.code == 200){
            $('#inputEmail1').val(res.data.username)
            $('#inputEmail2').val(res.data.nickname)
            $('#inputEmail3').val(res.data.email)
            $('#inputEmail4').val(res.data.password)
            $('.user_pic').attr('src',res.data.userPic)
          }
        }
    })
    $('#exampleInputFile').on('change',function () {
        let form = $('#exampleInputFile')[0].files[0]
        let url = URL.createObjectURL(form)
       $('.user_pic').attr('src',url)  //本地实现图片预览,blob
      
    })
    $('.btn-success').on('click',function () {
        let myform = $('#form')[0]
        let formData = new FormData(myform)  //这样可以收集不光字符串数据,还能收集图片数据
        console.log(formData);  
        
        $.ajax({ 
            url:bigapi.userpost,
            type:'post',
            dataType:'json',
            data:formData,
            processData:false,
            contentType:false,
            success:function (res) {
               if(res.code == 200){
                window.parent.location.reload()
               }
            }
        })
    })
})