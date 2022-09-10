$(function(){
  const layer = layui.layer

  // 定义格式化时间过滤器
  let q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }

  template.defaults.imports.dataFormat = function(data){
    const dt = new Date(data);
    const y = dt.getFullYear()
    const m = padZero(dt.getMonth())
    const d = padZero(dt.getDate())

    const hh  = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())
    return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss

  }
  function padZero(data){
    return data>9?data:'0'+data
  }
  initTable()
  initCate()
  function initTable(){
    
    $.ajax({
      url:'/my/article/list',
      method:'GET',
      data:q,
      success:function(res){
        console.log(res)
        if(res.status!==0){
          return layer.msg(res.message)
        }
        const strhtml = template("tableList",res)
        console.log(res)
        $('tbody').html(strhtml)

      }
    })

  }


  function  initCate(){
    $.ajax({
      method: 'GET', url:'/my/article/cates',
      success:function(res){
        if(res.status!==0){
          return layer.msg(res.message)
        }
        const strhtml = template('tplcate',res)
        // console.log(strhtml)
        $('[name="cate_id" ]').html(strhtml)
        layui.form.render()
        renderPage(res.total)
      }
    })
  }
  $('#tableSearch').on('submit',function(e){
    e.preventDefault()
    const cate_id = $('[name=cate_id]').val()
    const state = $('[name=state]').val()
    q.cate_id = cate_id
    q.state =state
    initTable()
  })
  function renderPage(total){
    layui.laypage.render({
      elem: 'numberPage' //注意，这里的 test1 是 ID，不用加 # 号
      , count: total, //数据总数，从服务端得到
      limit:q.pagesize,
      cuur:q.pagenum,
      layout: ['count', 'limit','prev', 'page', 'next','skip'],
      limits:[2,3,5,10],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        console.log(obj.limit); //得到每页显示的条数
        q.pagesize = obj.limit
        q.pagenum = obj.curr

        //首次不执行
        if (!first) {
          //do something
          initTable()
        }
      }
    });
  }
  $('tbody').on('click','.btn-delete',function(){
    let len = $('.btn-delete').length
    var id = $(this).attr('data-id')
    console.log(id)
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      
      $.ajax({ 
        url:'/my/article/delete/'+id,
        method:'get',
        success: function (res){
          console.log(res)
          if(res.status!==0){
            return layui.layer.msg(res.message)
          }
          layer.msg("删除文章成功")
          if(len===1){
            q.pagenum = q.pagenum===1?1:q.pagenum-1
          }
          initTable()
        }
      })

      layer.close(index);
    })
  })
  
  

  // $('tbody').on('click', '.btn-delete', function () {
  //   // 获取删除按钮的个数
  //   var len = $('.btn-delete').length
  //   console.log(len)
  //   // 获取到文章的 id
  //   var id = $(this).attr('data-id')
  //   // 询问用户是否要删除数据
  //   layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
  //     $.ajax({
  //       method: 'GET',
  //       url: '/my/article/delete/' + id,
  //       success: function (res) {
  //         if (res.status !== 0) {
  //           return layer.msg('删除文章失败！')
  //         }
  //         layer.msg('删除文章成功！')
  //         // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
  //         // 如果没有剩余的数据了,则让页码值 -1 之后,
  //         // 再重新调用 initTable 方法
  //         // 4
  //         if (len === 1) {
  //           // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
  //           // 页码值最小必须是 1
  //           q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
  //         }
  //         initTable()
  //       }
  //     })

  //     layer.close(index)
  //   })




})