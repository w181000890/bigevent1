
//账号  mm1
//密码    111111
$.ajaxPrefilter(function(options){
  options.url = 'http://www.liulongbin.top:3007'+options.url
})