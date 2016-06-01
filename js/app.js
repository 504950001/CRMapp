/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
var serviceIP = "http://192.168.191.4:8080";

function postData(url, data, callback) {
	mui.ajax(url, {
		data,
		async: false,
		dataType: 'json',
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success: callback,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("XMLHttpRequest:" + XMLHttpRequest + ",textStatus:" + textStatus + ",errorThrown:" + errorThrown);
			}
	});
}
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 2) {
			return callback('账号最短为 2 个字符');
		}
		if (loginInfo.password.length < 3) {
			return callback('密码最短为 3 个字符');
		}
		console.log("start login function");
		var data = {
			"name": loginInfo.account,
			"password": loginInfo.password
		};
		//postData函数，与服务器交互验证登录192.168.23.5
		postData(serviceIP + "/CRMsystem/employee/loginCheck",
			data,
			function(data) {
				console.log(".....URL连接服务器成功，获得服务器返回值data.....");
				console.log(JSON.stringify(data));
				//localStorage.removeItem("employee");
				if (data != null)
					localStorage.setItem("employee", JSON.stringify(data));
				var employee = JSON.parse(localStorage.getItem('employee') || '[]');
				var authed = false;
				if (loginInfo.account == employee.name && loginInfo.password == employee.password) {
					console.log(employee.name + "," + employee.password);
					authed = true;
				}
				if (authed) {
					return owner.createState(loginInfo.account, callback);
				} else {
					return callback('用户名或密码错误');
				}
			});
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
}(mui, window.app = {}));