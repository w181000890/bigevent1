$(function () {
  $('#link-reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link-login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  //从layui获取form对象

  const form = layui.form
  const layer = layui.layer
  form.verify({
       pwd: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
      ],
    repawd:function(value){
      const pwd = $('.reg-box [name="password"]').val()
      if(pwd!==value){
        return '密码输入不一致'
      }
      }
    })
    //注册表单
  $('#form_reg').on('submit',function(event){
    event.preventDefault()
    $.ajax({
      type: 'POST',
      url:'/api/reguser',
      data:{
        username: $('.reg-box [name="username"]' ).val(),
        password: $('.reg-box [name="password"]').val()
      },
      success: function(data){
        if (data.status !==0){
          return layer.msg(data.message)
        }
        layer.msg(data.message)
        $('#link-login').click()
      }
    })
  })
  // 登录表单

  $('#form-login').submit(function(e){
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url:'/api/login',
      data:$(this).serialize(),
      success: function(res){
          if(res.status!==0){
            return layer.msg(res.message)
          }
          layer.msg(res.message)
          localStorage.setItem('token',res.token)
          location.href='/index.html'
      }
    })
  })
  
})