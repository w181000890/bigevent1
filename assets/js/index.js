$(function(){

  getUserInfo()
  $('#btnLogin').on('click', function(e){
    e.preventDefault();
    layer.confirm('是否确认删除', { icon: 3, title: '提示' }, function (index) {
      //do something
      // console.log("OK")
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });
  })
})

function getUserInfo(){
  $.ajax({
    method: "GET",
    url:'/my/userinfo',
  
    success:function(res){
      if(res.status !== 0){
        return layui.layer.msg(res.message)
      }
      renderavatar(res.data)
    },
    // complete:function(res){
    //   console.log(res)
    //   if (res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！'){
    //     localStorage.removeItem('token')
    //     location.href = './login.html'
    //   }
    // }

  })
}


function renderavatar(user){
  const name = user.nickname || user.username;
  $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
  if (user.user_pic!==null){
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  }else{
    const firstname = user.username
    const upperName = firstname[0].toUpperCase()
    $('.text-avatar').html(upperName).show()
    $('.layui-nav-img').hide()
  }
}