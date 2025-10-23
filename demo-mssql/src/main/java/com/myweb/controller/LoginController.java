package com.myweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.myweb.model.AccountUser;
import com.myweb.model.Pojo;
import com.myweb.model.ResultData;
import com.myweb.service.UserService;

@Controller
//@RequestMapping("/*") 可設定路徑
public class LoginController {

	@Autowired
	private UserService userService;

	// ModelAttribute使用物件
	@ModelAttribute("initSetting")
	public Pojo checkUAC() {
		System.out.println("LoginController check UAC");// test
		// TODO UAC
		Pojo initPojo = new Pojo();
		initPojo.setPage("login");// 可調整為要使用的html
		// sys_setting
		return initPojo;
	}

	@GetMapping("/*") // 呼應3種url
	// http://localhost:8081/demo-sqlserver/
	// http://localhost:8081/demo-sqlserver/*
	// http://localhost:8081/demo-sqlserver/*/ 有相對路徑問題，html之link href會吃不到
	// http://localhost:8081/demo-sqlserver/*/css/main.css (error)
	public String otherLogin(@ModelAttribute("initSetting") Pojo pojo) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();
		StringBuilder sb = new StringBuilder();
		sb.append("Go through > ");
		sb.append(className);
		sb.append(" > ");
		sb.append(methodName);
		sb.append(" > ");
		sb.append(pojo.toString());
		String info = sb.toString();
		System.out.println(info);

		String goPage = pojo.getPage();

		if (ObjectUtils.isEmpty(goPage)) {
			String defaultPage = "login";
			goPage = defaultPage;
			System.out.println("use defaultPage: " + defaultPage);
		}
		System.out.println("final goPage: " + goPage);

		// if hasn't permission can change page string for Error page

		return goPage;
	}

	@PostMapping(path = "/login")
	@ResponseBody
	// http://localhost:8081/demo-sqlserver/login
	public ResultData login(@RequestBody AccountUser accountUser) throws Exception {

		ResultData result = new ResultData();
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();

			// AccountUser accountUser = new AccountUser();
			System.out.println("Go through > " + className + " > " + methodName + " Start---");
			System.out.println(accountUser.toString());
			System.out.println(accountUser.getUsername() + " Login.");
			userService.checkAccount(accountUser, result);

			System.out.println("Go through > " + className + " > " + methodName + " End---");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	@PostMapping(path = "/signUp")
	@ResponseBody
	// http://localhost:8081/demo-sqlserver/signUp
	public ResultData signUp(@RequestBody AccountUser accountUser) throws Exception {

		ResultData result = new ResultData();
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();

			// AccountUser accountUser = new AccountUser();
			System.out.println("Go through > " + className + " > " + methodName + " Start---");
			System.out.println(accountUser.toString());
			System.out.println(accountUser.getUsername());
			userService.signUpAccount(accountUser, result);

			System.out.println("Go through > " + className + " > " + methodName + " End---");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	@GetMapping("/index") // 呼應3種url
	// http://localhost:8081/demo-sqlserver/index
	public String goIndex(@ModelAttribute("initSetting") Pojo pojo) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();
		StringBuilder sb = new StringBuilder();
		sb.append("Go through > ");
		sb.append(className);
		sb.append(" > ");
		sb.append(methodName);
		sb.append(" > ");
		sb.append(pojo.toString());
		String info = sb.toString();
		System.out.println(info);

		String goPage = "index";

		// if hasn't permission can change page string for Error page

		return goPage;
	}

}