var crypto = require('crypto'),
	  user = require('../models/user.js'), //用户
	  deptAdd = require('../models/department/deptAdd.js'),//部门管理添加
	  Post = require('../models/post.js'),
	  Student = require('../models/student.js'),
	  site = require('../config/site.js'),
	  dbHelper = require('../models/dbHelper.js');
module.exports = function(app) {
	app.get('/',function (req,res,next) {
		 res.redirect('/login');
	});
	app.get('/register',checkNotLogin);
	app.get('/register',function (req,res) {
		res.render('register', { 
	      user: req.session.user,
	      success: req.flash('success').toString(),
	      error: req.flash('error').toString()
	    });
	});
	app.post('/register',checkNotLogin);
	app.post('/register',function (req,res) {
		var User = user.getModel();
		var uname = req.body.uname,
			email = req.body.email;
		var md5 = crypto.createHash('md5'),
			upwd = md5.update(req.body.upwd).digest('hex');
		User.findOne({name:uname},function (err,doc) {
			if (err) {
				req.flash('error','网络异常错误！');
				return res.redirect('/register');
				console.log(err);
			}else if(doc) {
				req.flash('error', '用户名已存在！');
				return res.redirect('/register');//返回注册页
			}else {
				User.create({
					name: uname,
					password: upwd,
					email: email
				},function (err,doc) {
					if (err) {
						res.send(500);
						console.log(err);
					}else{
						req.flash('success', '用户名创建成功！');
						res.redirect('/index');//注册成功后返回主页
					}
				});
			}
		});
	});
	app.get('/login',checkNotLogin);
	app.get('/login',function (req,res) {
		res.render('login', { 
	      user: req.session.user,
	      success: req.flash('success').toString(),
	      error: req.flash('error').toString()
	    });
	});
	app.post('/login',checkNotLogin);
	app.post('/login',function (req,res) {
		var User = user.getModel();
		var uname = req.body.uname; 
		var md5 = crypto.createHash('md5'),
			upwd = md5.update(req.body.upwd).digest('hex');
		User.findOne({name:uname},function(err,doc){   //通过此model以用户名的条件 查询数据库中的匹配信息
        if(err){                                         //错误就返回给原post处（login.html) 状态码为500的错误
            res.send(500);
            console.log(err);
        }else if(!doc){                                 //查询不到用户名匹配信息，则用户名不存在
            req.flash('error','用户名不存在');
            res.send(404);                            //    状态码返回404
        //    res.redirect("/login");
        }else{ 
            if(upwd != doc.password){     //查询到匹配用户名的信息，但相应的password属性不匹配
                req.flash('error',' "密码错误"');
                //res.send(404);
            	res.redirect("/login");
            }else{                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                req.session.user = doc;
                //res.send(200);
            	res.redirect("/index");
            }
        }
    });
	});
	//退出系统
	app.get('/logout',function (req,res) {
		req.session.user = null;
		req.flash('success','退出成功！');
		res.redirect('/');
	});
	//首页页面
	app.get('/index',checkLogin);
	app.get('/index',function(req,res) {
		var data = {
		    list : [
		    	{
				    "name": "首页",
				    "level":1,
				    "url":"/home"
			    },
			    {
			    	"name":"基础信息管理",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name": "园区概况",
				    		"url":""	
			    		},
			    		{
			    			"name": "政策法规",
				    		"url":""	
			    		},
			    		{
			    			"name": "园区风采",
				    		"url":""	
			    		},
			    		{
			    			"name": "分园风采",
				    		"url":""	
			    		},
			    		{
			    			"name": "市政配套",
				    		"url":""	
			    		},
			    		{
			    			"name": "办事大厅",
				    		"url":""	
			    		},
			    		{
			    			"name": "办事指南",
				    		"url":""	
			    		},
			    		{
			    			"name": "关于我们",
				    		"url":""	
			    		},
			    		{
			    			"name": "楼宇管理",
				    		"url":""	
			    		},{
			    			"name": "卡片管理",
				    		"url":""	
			    		},
			    		{
			    			"name": "车位管理",
				    		"url":""	
			    		},
			    		{
			    			"name": "其他人员管理",
			    			"level": 3,
				    		"submenu":[
				    			{
				    				"name": "111",
				    				"url":""
				    			}
				    		]	
			    		},
			    	]
			    },
			    {
			    	"name":"系统管理",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name":"部门管理",
			    			"url":"/dept"
			    		},
			    		{
			    			"name":"用户管理",
			    			"url":"/sysuser"
			    		},
			    		{
			    			"name":"角色管理",
			    			"url":"/sysrole"
			    		},
			    		{
			    			"name":"权限管理",
			    			"url":"/sysright"
			    		},
			    		{
			    			"name":"日志管理",
			    			"url":""
			    		},
			    		{
			    			"name":"审批流程管理",
			    			"url":""
			    		}
			    	]
			    },
			    {
			    	"name":"招商管理",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name":"招商概况",
			    			"url":""
			    		},
			    		{
			    			"name":"客户管理",
			    			"url":"/qzkh"
			    		},
			    		{
			    			"name":"信息管理",
			    			"url":""
			    		},
			    		{
			    			"name":"网上招商",
			    			"url":""
			    		}
			    	]
			    },
			    {
			    	"name":"资产定位管理",
			    	"level":2,
			    	"submenu": [
			    		{
			    			"name":"资产申购",
			    			"url":""
			    		},
			    		{
			    			"name":"领用调拨",
			    			"url":""
			    		},
			    		{
			    			"name":"运营维护",
			    			"url":""
			    		},
			    		{
			    			"name":"资产价值管理",
			    			"url":""
			    		},
			    		{
			    			"name":"统计分析",
			    			"url":""
			    		},
			    		{
			    			"name":"资产定位",
			    			"url":""
			    		},
			    		{
			    			"name":"人员定位",
			    			"url":""
			    		},
			    	]
			    },
			    {
			    	"name":"智慧办公平台",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name":"园区新闻",
			    			"url":""
			    		},
			    		{
			    			"name":"园区公告",
			    			"url":""
			    		},
			    		{
			    			"name":"园区活动",
			    			"url":""
			    		},
			    		{
			    			"name":"个人中心",
			    			"url":""
			    		},
			    		{
			    			"name":"行政办公",
			    			"url":""
			    		},
			    		{
			    			"name":"档案管理",
			    			"url":""
			    		},
			    	]
			    },
			    {
			    	"name":"服务中心",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name":"服务概况",
			    			"url":""
			    		},
			    		{
			    			"name":"园区服务",
			    			"url":""
			    		},
			    		{
			    			"name":"政府服务",
			    			"url":""
			    		},
			    		{
			    			"name":"企业服务",
			    			"url":""
			    		},
			    		{
			    			"name":"第三方服务",
			    			"url":""
			    		},
			    		{
			    			"name":"信用评定",
			    			"url":""
			    		},
			    		{
			    			"name":"服务机构管理",
			    			"url":""
			    		}
			    	]
			    },
			    {
			    	"name":"一卡通管理",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name":"充值管理",
			    			"url":""
			    		}
			    	]
			    }
		],
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	};
		res.render('index',data);
	});
	//home
	app.get('/home',function(req,res) {
		res.render('home');
	});
	app.get('/table',function(req,res) {
		//res.render('table');
		Mainpulation.select('students', {"userName": "888"}, function(result) {
		    console.log("select查询结果");
		    console.log(result);
		    res.send(result);
		})
	});
	app.get('/submit',function(req,res) {
		Post.get(null,function (err,posts) {
			if (err) {
				posts = [];
			}
			res.render('investment/submit.html',{
				posts: posts
			});
		});

	});
	//基本情况表
	app.get('/jbqkb',checkLogin);
	app.get('/jbqkb',function(req,res) {
		res.render('investment/qzqkhxq.html',site.setting(req,'/investment'));
	});

	app.post('/jbqkb',function(req,res) {
		var post = new Post(req.body.entName,req.body.fund,req.body.money,req.body.code,req.body.entTime,req.body.gardenTime);
		post.save(function (err) {
			if (err) {
				req.flash('error',err);
				return res.redirect('/');
			}
			req.flash('success', '发布成功!');
    		res.redirect('/submit');//发表成功跳转到主页
		});
	});

	//潜在期客户基础情况表
	app.get('/jcxx',function(req,res) {
		res.render('investment/jbqkb.html',site.setting(req,'/investment'));
	});
	
	//潜在期客户
	app.get('/qzkh',function(req,res) {
		res.render('investment/qzqkh.html',site.setting(req,'/investment'));
	});
	////潜在期客户基础情况表编辑
	app.get('/khqzbj',function(req,res) {
		res.render('investment/khqzbj.html',site.setting(req,'/investment'));
	});
	//目标期客户
	app.get('/mbqkh',function(req,res) {
		res.render('investment/mbqkh.html',site.setting(req,'/investment'));
	});
	//系统管理管理
	app.get('/dept',checkLogin);
	app.get('/dept', function (req,res) {
		res.render('system/department.html',site.setting(req,'/system'));
	});
	//部门管理添加
	app.get('/deptAdd',checkLogin);
	app.get('/deptAdd', function (req,res) {
		res.render('system/deptAdd.html',site.setting(req,'/system'));
	});
	app.post('/deptAdd',checkLogin);
	app.post('/deptAdd', function (req,res) {
		var dAdd = deptAdd.getModel();
		var name = req.body.name,
			room = req.body.room,
			num = req.body.num,
			manager = req.body.manager,
			tel = req.body.tel,
			duty = req.body.duty;
		var data = {name:name,room:room,num:num,manager:manager,tel:tel,duty:duty};
		dbHelper.addData(dAdd,data,function(result) {
	        callback(result);
	    });
	});
	app.get('/deptAdata',checkLogin);
	app.get('/deptAdata',function(req,res) {
		var dAdd = deptAdd.getModel();
		var conditions ={};
		var fields   = {};
    	var options  = {};
		/*dbHelper.findData(dAdd,conditions,fields,options,function(result) {
		    console.log("select查询结果");
		    console.log(result);
		    res.send(result);
		})*/

		dbHelper.pageQuery(1,10, dAdd, '', {}, {},function(error,result){
			console.log("select查询结果");
		    console.log(result);
		    res.send(result);
		});
	});
	//app.get('/deptEdit',checkLogin);
	app.get('/deptEdit',function(req,res) {
		/*Mainpulation.select('departments',{"name":},function (result) {
			 res.send(result);
		});*/
		/*res.render('system/deptEdit.html',site.setting(req,'/system'));*/
	});
	app.get('/sysuser', function (req,res) {
		res.render('system/sysuser.html',site.setting(req,'/system'));
	});
	app.get('/sysrole', function (req,res) {
		res.render('system/sysrole.html',site.setting(req,'/system'));
	});
	app.get('/sysright', function (req,res) {
		res.render('system/sysright.html',site.setting(req,'/system'));
	});
	app.get('/student', function (req,res) {
		res.render('student');
	});
	app.get('/data', function (req,res) {
		Student.get(null,function (err,students) {
			if (err) {
				students = [];
			}
			res.send(students);
		});
	});
	function checkLogin(req, res, next) {
	    if (!req.session.user) {
	      req.flash('error', '未登录!'); 
	      return res.redirect('/login');
	    }
	    next();
	  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录!'); 
      return res.redirect('back');//返回之前的页面
    }
    next();
  }
}
