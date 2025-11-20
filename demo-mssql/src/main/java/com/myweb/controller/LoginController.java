package com.myweb.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.myweb.model.AccountPassword;
import com.myweb.service.AccountService;
import com.myweb.vo.ReqData;
import com.myweb.vo.ResultData;

import tool.ToolUtility;

@Controller
//@RequestMapping("/*") 可設定路徑
public class LoginController {

	@Autowired
	private AccountService userService;

	// ModelAttribute使用物件
	@ModelAttribute("initSetting")
	public void checkUAC(Model model) {
		System.out.println("LoginController check UAC");// test
		// TODO UAC
		// sys_setting
		model.addAttribute("path", "test-system");
		model.addAttribute("test", "just123");
		model.addAttribute("defaultGoPage", "login");
		return;
	}

	@GetMapping("/*") // 呼應3種url
	// http://localhost:8081/demo-sqlserver/
	// http://localhost:8081/demo-sqlserver/*
	// http://localhost:8081/demo-sqlserver/*/ 有相對路徑問題，html之link href會吃不到
	// http://localhost:8081/demo-sqlserver/*/css/main.css (error)
	public String otherUrl(ReqData data, Model model) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();
		ToolUtility.printReqData(1, className, methodName, data.getPage());

		String goPage = data.getPage();

		if (!StringUtils.hasLength(goPage)) {
			goPage = (String) model.getAttribute("defaultGoPage");
		}
		System.out.println("model: " + model.toString());
		System.out.println("final goPage: " + goPage);

		// if hasn't permission can change page string for Error page

		return goPage;
	}

	@PostMapping(path = "/login")
	@ResponseBody
	// http://localhost:8081/demo-sqlserver/login
	public ResultData login(@RequestBody AccountPassword accountPassword) throws Exception {

		ResultData result = new ResultData();
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();
			String reqData = accountPassword.getAccount() + " Login.";
			ToolUtility.printReqData(1, className, methodName, reqData);
			userService.checkAccount(accountPassword, result);

			ToolUtility.printReqData(0, className, methodName, "");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	@PostMapping(path = "/signUp")
	@ResponseBody
	// http://localhost:8081/demo-sqlserver/signUp
	public ResultData signUp(@RequestBody AccountPassword accountUser) throws Exception {

		ResultData result = new ResultData();
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();
			ToolUtility.printReqData(1, className, methodName, accountUser.getAccount());
			userService.signUpAccount(accountUser, result);

			ToolUtility.printReqData(0, className, methodName, "");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	@GetMapping("/index")
	// http://localhost:8081/demo-sqlserver/index
	public String goIndex(@ModelAttribute("initSetting") ReqData reqData) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();
		ToolUtility.printReqData(1, className, methodName, reqData.toString());

		String goPage = "index";
		System.out.println("goPage: " + goPage);
		ToolUtility.printReqData(0, className, methodName, "");

		// if hasn't permission can change page string for Error page

		return goPage;
	}

	@GetMapping("/setAccountCookie")
	private void setAccountCookie(HttpServletRequest request, HttpServletResponse response) {
		Cookie cookie = new Cookie("account", request.getParameter("account"));
		// 2. 設置 Cookie 屬性 (可選)
		cookie.setMaxAge(3600); // 過期時間(秒)
		cookie.setSecure(true); // 只通過 HTTPS 傳輸
		cookie.setHttpOnly(true); // 防止 JavaScript 訪問
		// cookie.setPath("/");
		// cookie.setDomain(".example.com");
		System.out.println("request account: " + request.getParameter("account"));
		// 3. 添加到回應中
		response.addCookie(cookie);

		return;
	}

	// 寫@ResponseBody即可在前端ajax接收資料
	@GetMapping("/getAccountCookie")
	@ResponseBody
	public String getAccountCookie(@CookieValue(value = "account") String account) {
		return account;
	}

	@GetMapping(value = "/deleteAccountCookie")
	public void deleteAccountCookie(HttpServletResponse response) {

		// 將Cookie 值設置為null
		Cookie cookie = new Cookie("account", null);

		// 設置過期時間為0
		cookie.setMaxAge(0);

		// 將Cookie 物件加入Response 中
		response.addCookie(cookie);

		return;
	}

}