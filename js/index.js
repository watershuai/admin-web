$(function () { 
    $.ajax({
        type:'get',
        url:bigapi.userdata,
        dataType:'json',
        success:function (res) {
            if(res.code == 200){
                $('.user_info span').html('欢迎&nbsp&nbsp ' + res.data.nickname)
                $('.user_info img').attr('src',res.data.userPic)
            }
        }
    });

    //文章
    $('.toggle').on('click',function () {
       $(this).next().find('ul').slideToggle()
       $(this).find('b').toggleClass('rotate0')
    })
    $('.level01').on('click',function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
    $('.level02 li').on('click',function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
})