$('.ifm-navbar li').click(function () {
    $(this).addClass('current').siblings().removeClass('current');
});
//表格
//$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
$(window).bind('resize', function () {  
    $("#jqGrid").setGridWidth($(window).width()*0.99); 
    $("#jqGrid").setGridHeight($(window).height() - 240); 
});  
var tHeight = $(window).height() - 240;
$("#jqGrid").jqGrid({ 
    url: '/deptAdata',//从服务器拿来的数据  
    datatype: "json",//显示数据的方式，因为通过ajax拿到数据了，所以是本地的  
    jsonReader: {//描述json 数据格式的数组 
        root : "datas", 
        repeatitems: false// 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素（即可以json中元素可以不按顺序）；而所使用的name是来自于colModel中的name设定。  
    },  
    height: tHeight, 
    rowNum: 11, 
    rowList: [10,20,30], 
    colNames:['部门id','部门名称', '部门房间', '部门人数','部门经理','部门电话','部门职责'], 
    colModel:[
    {name : '_id',index : '_id',width : '8%',align : 'center', sortable : false,hidden : true}, 
    {name:'name',index:'name',width:'8%'}, 
    {name:'room',index:'room',width:'8%'}, 
    {name:'num',index:'num',align:"center",width:'8%'}, 
    {name:'manager',index:'manager',align:"center",width:'10%'}, 
    {name:'tel',index:'tel',align:"center",width:'18%'}, 
    {name:'duty',index:'duty', sortable:false,width:'30%',align:'left'} 
    ], 
    pager: "#jqGridPager", 
    viewrecords: true,
    multiselect: true,
    altRows: true,
    autowidth: true ,
    loadComplete: function(){
        //如果数据不存在，提示信息 
        var re_records = $("#jqGrid").getGridParam('records');
        if(re_records == 0 || re_records == null) {
            if($(".norecords").html() == null) {
                $("#jqGrid").parent().append("<div class=\"norecords\">没有符合数据</div>");
            }
            $(".norecords").show();
        }else{//如果存在记录，则隐藏提示信息。
            $(".norecords").hide();
        }
        $("#jqGrid").setGridWidth($(window).width()*0.99);
    }
}).navGrid("#jqGridPager",{edit:false,add:false,del:false,search:false});

/* 加载 */
function reloadGrid() {
    $("#jqGrid").jqGrid('setGridParam', {
        page : 1,
        postData : {
            name : $('#name').val(),
            room : $('#room').val(),
        }
    }).trigger("reloadGrid");
}

//添加按钮 $(window.parent.document)
$('.add').on('click', function(){
  openWin('/deptAdd','部门管理添加','50%','40%');
});

//编辑
$('.edit').on('click', function() {
    //返回当前grid中复选框所选中的数据id
    var ids = $('#jqGrid').jqGrid('getGridParam', 'selarrrow');
    if (ids.length != 1) {
        // 弹出提示信息
        toast("请选择一条数据进行编辑！");
        return;
    }
    // 返回指定id行的数据
    var rowdatas = $("#grid-table").jqGrid('getRowData', ids[0]);
    var deptName = rowdatas.deptId;
    openWin('/deptEdit' + deptName , '编辑');
})