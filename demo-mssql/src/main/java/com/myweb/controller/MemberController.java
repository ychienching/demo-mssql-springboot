package com.myweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.myweb.service.MemberService;
import com.myweb.vo.AccountVO;
import com.myweb.vo.ReqData;
import com.myweb.vo.ResultData;

import tool.ToolUtility;

@Controller
@RequestMapping("/member")
public class MemberController {

	@Autowired
	MemberService memberService;

	@ModelAttribute("initData")
	public ReqData checkUAC() {
		System.out.println("testController check UAC");
		// TODO UAC
		ReqData initPojo = new ReqData();
		// if fail can set fail page
		initPojo.setPage("index");// 可調整為要使用的html
		return initPojo;
	}

	@PostMapping(path = "/all")
	@ResponseBody
	// http://localhost:8086/test-system/member/maindata
	public ResultData maindata(@RequestBody ReqData data) throws Exception {

		ResultData result = new ResultData();
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();

			// AccountUser accountUser = new AccountUser();
			ToolUtility.printReqData(1, className, methodName, "");
			System.out.println("data: " + data.toString());
			result = memberService.getAllAccountPermissions();
			ToolUtility.printReqData(0, className, methodName, "");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	@PostMapping(path = "/getPermission")
	@ResponseBody
	public boolean getPermission(@RequestBody String account) throws Exception {
		boolean hasPermission = false;
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();

			// AccountUser accountUser = new AccountUser();
			ToolUtility.printReqData(1, className, methodName, "");
			System.out.println("data: " + account);
			hasPermission = memberService.getPermission(account);
			ToolUtility.printReqData(0, className, methodName, "");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return hasPermission;
	}

	@PostMapping(path = "/save")
	@ResponseBody
	public ResultData save(@RequestBody AccountVO accountVO) throws Exception {
		ResultData result = new ResultData();
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();
			ToolUtility.printReqData(1, className, methodName, accountVO.toString());

			result = memberService.saveMember(accountVO);

			ToolUtility.printReqData(0, className, methodName, "");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	@PostMapping(path = "/delete")
	@ResponseBody
	public ResultData delete(@RequestBody List<String> accountList) {
		ResultData result = new ResultData();
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();
			ToolUtility.printReqData(1, className, methodName, accountList.toString());

			result = memberService.deleteMember(accountList);
			ToolUtility.printReqData(0, className, methodName, result.getResult());
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	@PostMapping(path = "/deleteMember")
	@ResponseBody
	public ResultData deleteMember(@RequestBody List<Long> idList) {
		ResultData result = new ResultData();
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();
			ToolUtility.printReqData(1, className, methodName, idList.toString());

//			result = memberService.deleteMember(idList);
			ToolUtility.printReqData(0, className, methodName, result.getResult());
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	@GetMapping("/go/member")
	// location.href = 'http://localhost:8086/test-system/test/go/order?lastName=...'
	public String goOrderForm(@ModelAttribute("initData") ReqData initPojo,
			@RequestParam(value = "lastName", defaultValue = "defaultTest") String lastName) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();
		ToolUtility.printReqData(1, className, methodName, lastName);

		System.out.println("go to 'orderForm.html'");
		// cstWipService.getWipByLastName("3TestLastName");
		return "orderForm";
	}

}
