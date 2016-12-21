$('.ifm-navbar li').click(function () {
    $(this).addClass('current').siblings().removeClass('current');
});
//表格
//$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
var mydata = [
    {name:"张三",dept:"市场部门",job:"市场人员",duty:"调研、竞标、写标书",tel:"021-1368345678",moblie:"12345678911",email:"5462@qq.com"} ,
    {name:"张三",dept:"市场部门",job:"市场人员",duty:"调研、竞标、写标书",tel:"021-1357345678",moblie:"12345678911",email:"5462@qq.com"} ,
    {name:"张三",dept:"市场部门",job:"市场人员",duty:"调研、竞标、写标书",tel:"021-3234545678",moblie:"12345678911",email:"5462@qq.com"} ,
    {name:"张三",dept:"市场部门",job:"市场人员",duty:"调研、竞标、写标书",tel:"021-3567345678",moblie:"12345678911",email:"5462@qq.com"} ,
    {name:"张三",dept:"市场部门",job:"市场人员",duty:"调研、竞标、写标书",tel:"021-7865345678",moblie:"12345678911",email:"5462@qq.com"} ,
    {name:"张三",dept:"市场部门",job:"市场人员",duty:"调研、竞标、写标书",tel:"021-5667345678",moblie:"12345678911",email:"5462@qq.com"} ,
    {name:"张三",dept:"市场部门",job:"市场人员",duty:"调研、竞标、写标书",tel:"021-3124456789",moblie:"12345678911",email:"5462@qq.com"} ,
    {name:"张三",dept:"市场部门",job:"市场人员",duty:"调研、竞标、写标书",tel:"021-9999345678",moblie:"12345678911",email:"5462@qq.com"} ,
    {name:"张三",dept:"市场部门",job:"市场人员",duty:"调研、竞标、写标书",tel:"021-7788345678",moblie:"12345678911",email:"5462@qq.com"} ,
    {name:"张三",dept:"市场部门",job:"市场人员",duty:"调研、竞标、写标书",tel:"021-4555634567",moblie:"12345678911",email:"5462@qq.com"} ,
    {name:"张三",dept:"市场部门",job:"市场人员",duty:"调研、竞标、写标书",tel:"021-2234345678",moblie:"12345678911",email:"5462@qq.com"} 
];
$(window).bind('resize', function () {  
    $("#jqGrid").setGridWidth($(window).width()*0.99); 
    $("#jqGrid").setGridHeight($(window).height() - 240); 
}); 
var tHeight = $(window).height() -240;
$("#jqGrid").jqGrid({ 
    data: mydata, 
    datatype: "local", 
    height: tHeight, 
    rowjob: 10, 
    rowList: [10,20,30], 
    colNames:['姓名','所属部门','工作岗位','工作职务','办公电话','移动电话','电子邮箱'],
    colModel:[ 
    {name:'name',index:'name',width:'10%'}, 
    {name:'dept',index:'dept',width:'10%'}, 
    {name:'job',index:'job',align:"center",width:'10%'}, 
    {name:'duty',index:'duty',align:"left",width:'30%'}, 
    {name:'tel',index:'tel',align:"center",width:'10%'}, 
    {name:'moblie',index:'moblie',align:'center',width:'10%'},
    {name:'email',index:'email',align:'center',width:'10%'} 
    ], 
    pager: "#jqGridPager", 
    viewrecords: true,
    multiselect: true,
    altRows: true,
    autowidth: true ,
    loadComplete : function() {
        $("#jqGrid").setGridWidth($(window).width()*0.99);
    }

});