$(function(){
  

  initArtical()

  function initArtical(){
    $.ajax({
      url: '/my/article/cates',
      method:'GET',
      success:function(res){
        // console.log(res);
        const strHtml = template("artCateList",res)
        $('tbody').html(strHtml)
      }

    })
  }
  let htmlIndex = null

  $('#add_cate').on('click',function(e){
    htmlIndex = layui.layer.open({
      type:1,
      area: ['500px', '300px'],
      title: '添加文章分类',
      content: $("#btnAddcate").html()
    }); 
  })
  $('body').on('submit','#addForm',function(e){
    e.preventDefault()
    $.ajax({ 
      url: '/my/article/addcates',
      method: 'POST',
      data:$(this).serialize(),
      success: function(res){
        // console.log(res)
        if(res.status!==0){
          return layui.layer.msg(res.message)
        }
        initArtical()
        layui.layer.msg(res.message)
        layui.layer.close(htmlIndex)
      }
    })
  })
  let indexEdit = null
  // 编辑类别
  $('tbody').on('click','#dialog-edit',function(e){
    indexEdit = layui.layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '修改文章分类',
      content: $("#btnEditcate").html()
    }); 
    var id = $(this).attr('data-id')
    $.ajax({
      method: 'get',
      url: '/my/article/cates/'+id,
      success: function(data){
        // console.log(data)
        if(data.status!==0){
          return layui.layer.msg(data.message)
        }
        layui.form.val('editForm', data.data)
      }
    })
  })
  $('body').on('submit','#editForm',function(e){
    console.log('OKOKOK')
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/article/updatecate',
      data:$(this).serialize(),
      success: function(data){
        console.log(data)
        if(data.status!==0){
          
          return layui.layer.msg(data.message)
        }
        layui.layer.msg(data.message)
        layer.close(indexEdit)
        initArtical()
      }
    })
  })
  $('tbody').on('click','.btnDeleteCate',function(){
    let id = $(this).attr('data-id')
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        url:'/my/article/deletecate/'+id,
        method:'GET', 
        success: function(res){
          if(res.status !== 0){
            return layui.layer.msg(res.message)
          }
          initArtical()
          layer.close(index);
          layui.layer.msg(res.message)

        }
      })
      
    });
  })

})