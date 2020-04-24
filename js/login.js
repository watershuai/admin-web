$(function(){
    $('.input_sub').on('click',function () {
        let username = $('.input_txt').val()
        let password = $('.input_pass').val()
        $.ajax({
            url:bigapi.login,
            type:'post',
            dataType:'json',
            data:{username,password},
            success(res) {
                if(res.code == 200){
                    $('#myModal').modal('show')
                    $('#tipinfo').text(res.msg)
                    $('#myModal').on('hidden.bs.modal',function (e) {
                        localStorage.setItem('bignews_token',res.token)
                        location.href = './index.html'
                    })
                }else{
                    $('#myModal').modal('show')
                    $('#tipinfo').text(res.msg)
                }
            }
        })
    })
})