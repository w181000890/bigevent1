$(function () {
  const form = layui.form

  form.verify({
    nickname: function (value) {
      if (value.length < 1 || value.length > 6) {
        return "昵称长度为1-6个字符"
      }
    }
  })
  initUserInfo()
  function initUserInfo() {

    $.ajax({
      url: '/my/userinfo',
      method: 'GET',
      success: function (data) {
        if (data.status !== 0) {
          return layui.layer.msg("获取用户信息失败")
        }
        // console.log(data) 
        layui.form.val("formUserInfo", data.data)
      }
    })

  }
  $('#btnReset').on('click',function(e){
    e.preventDefault()
    getUserInfo()
  })
  $('.layui-form').submit(function(e){
    e.preventDefault()
    $.ajax({ url:"/my/userinfo",
    method:'POST',
    data:$(this).serialize(),
    success: function(res){
      if(res.status !== 0){
        return layui.layer.msg(res.message)
      }
      layui.layer.msg(res.message)
      // window.parent.renderavatar()
      window.parent.getUserInfo()
    }
  })
  })
})



