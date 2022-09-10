$(function(){

  
  const layer = layui.layer
  const form = layui.form

  initCateTable()
  // 初始化富文本编辑器
  initEditor()
  function initCateTable(){
    $.ajax({
      url: '/my/article/cates',
      method:'GET', 
      success: function(res){
        if(res.status!==0){
          return layer.msg(res.message);
        }
        const strHtml = template('tplCate',res)
        $('#tplSelect').html(strHtml)
        form.render()
      }
    })
  }

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)
  $('#btnchoose').on('click',function(){
    $('#btnFile').click()
  })
  $('#btnFile').on('change',function(e){
    var files = e.target.files
    if(files.length===0){
      return layer.msg('请选择图片')
    }
    var newImgURL = URL.createObjectURL(files[0])
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })
  let state = '已发布'
  $('#btnsubmit').on('click',function(){
    state = '草稿'
  })
  $('#form-porn').on('submit',function(e){
    let state = '已发布'

    e.preventDefault()
    let df = new FormData($(this)[0])
    // df.forEach(function(v,k){
    //   console.log(v,k )
    // })
    df.append('state',state)
    $image
      .cropper('getCroppedCanvas', {  // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        df.append('cover_img',blob)
        publshArticle(df)
      })
    
      
  })
  function publshArticle(fd) {
    $.ajax({
      url: '/my/article/add',
      method: 'post', data: fd,
      contentType: false,
      processData:false,
      success:function(res){
        console.log(res)
        if(res.status!==0){

          return layer.msg('发表文章失败')
        }
        layer.msg('文章发表成功')
        location.href = '/article/art_list.html'
      }
      
    })
  }
})