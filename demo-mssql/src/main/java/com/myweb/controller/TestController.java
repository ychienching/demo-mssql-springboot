package com.myweb.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.myweb.model.MyTestModel;
import com.myweb.service.CstWipService;
import com.myweb.vo.CommonVO;
import com.myweb.vo.ReqData;
import com.myweb.vo.ResultData;

import tool.ToolUtility;

@Controller
@RequestMapping("/test")
public class TestController {

	@Autowired
	CstWipService cstWipService;

	@ModelAttribute("initData")
	public ReqData checkUAC() {
		System.out.println("testController check UAC");
		// TODO UAC
		ReqData initPojo = new ReqData();
		// if fail can set fail page
		initPojo.setPage("index");// 可調整為要使用的html
		return initPojo;
	}

	@PostMapping(path = "/MultiValueMap")
	@ResponseBody
	public ResultData MultiValueMap(@RequestBody MultiValueMap map) throws Exception {
		ResultData result = new ResultData();
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();

			ToolUtility.printReqData(1, className, methodName, "");
			System.out.println("data: " + map);
			System.out.println("data: " + map.toString());

			ToolUtility.printReqData(0, className, methodName, "");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	@PostMapping(path = "/initOrder")
	@ResponseBody
	// ajax http://localhost:8086/test-system/test/initOrder
	public CommonVO initOrder(@RequestBody CommonVO vo) {

		List<MyTestModel> myTestModelList = new ArrayList<MyTestModel>();
		List sqlData = null;
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();

			ToolUtility.printReqData(1, className, methodName, "");
			System.out.println("+++ " + vo.toString());

			vo.setMyTestModelList(cstWipService.getWip());
			// vo.setSqlData(cstWipService.getLotStartBatchRule(vo)); //可用

			ToolUtility.printReqData(0, className, methodName, "");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return vo;
	}

	@PostMapping(path = "/initSampling")
	@ResponseBody
	// ajax http://localhost:8086/test-system/test/initOrder
	public CommonVO initSampling(@RequestBody CommonVO vo) {

		List<MyTestModel> myTestModelList = new ArrayList<MyTestModel>();
		List sqlData = null;
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();

			ToolUtility.printReqData(1, className, methodName, "");
			System.out.println("param: " + vo.toString());

			cstWipService.getModelAbbrOption(vo);
//			vo.setAbbrList(cstWipService.getModelAbbrOption(vo));
//			vo.setSlotNum(sqlData);
//			vo.setPepList(sqlData);

			ToolUtility.printReqData(0, className, methodName, "");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return vo;
	}

	@GetMapping("/index2")
	// location.href = 'http://localhost:8086/test-system/test/index2'
	public String helloIndex2() {
		System.out.println("++index2");
		return "index2";
	}

	@GetMapping("/go/order")
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

	@GetMapping("/go/test")
	// location.href = 'http://localhost:8086/test-system/test/go/order?lastName=...'
	public String goTest(@ModelAttribute("initData") ReqData initPojo,
			@RequestParam(value = "lastName", defaultValue = "defaultTest") String lastName) {
		System.out.println("method:orderFormTest");
		System.out.println("param > lastName: " + lastName);
		System.out.println("go to 'orderForm.html'");
		// cstWipService.getWipByLastName("3TestLastName");
		return "test";
	}

	@GetMapping("/go/sampling")
	// location.href =
	// 'http://localhost:8086/test-system/test/go/sampling?lastName=...'
	public String samplingTest(@RequestParam(value = "lastName", defaultValue = "defaultTest") String lastName) {
		System.out.println("/go/sampling lastName: " + lastName);
		// cstWipService.getWipByLastName("3TestLastName");
		return "sampling";
	}

	@GetMapping(path = { "/error" })
	// location.href = 'http://localhost:8086/test-system/test/t'
	public String test() {
		try {
			System.out.println("+++++ Error 404 +++++");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "display Error 404";
	}

	@PostMapping(path = "/query")
	@ResponseBody
	// ajax http://localhost:8086/test-system/test/query
	public List query1(@ModelAttribute("initData") ReqData initPojo, @RequestBody CommonVO vo) {

		List<MyTestModel> myTestModelList = new ArrayList<MyTestModel>();

		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();

			ToolUtility.printReqData(1, className, methodName, "");

			// 方法1 getData By LastName --可用
//			myTestModelList = cstWipService.getWipByLastName(lastName);
//			System.out.println("myTestModelList size: " + myTestModelList.size());
//			for (int i = 0; i < myTestModelList.size(); i++) {
//				System.out.println(myTestModelList.get(i).toString());
//			}

			// 方法2 get All Data --可用
			// use from extends JpaRepository method
			myTestModelList = cstWipService.getWip();

			System.out.println("+++initPojo: " + initPojo.toString());
			System.out.println("+++js post data vo: " + vo.toString());

			// 方法3 sql --可用
//			resultData = cstWipService.getLotStartBatchRule(vo);

			ToolUtility.printReqData(0, className, methodName, "");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// return myTestModelList.get(0).toJSON();
		return myTestModelList;
	}

	@PostMapping(path = "/query2")
	@ResponseBody
	public List<MyTestModel> query2(@ModelAttribute("initData") ReqData initPojo, @RequestBody CommonVO vo) {
		System.out.println("/query2 >> page: " + initPojo.toString());
		List<MyTestModel> myTestModelList = new ArrayList<MyTestModel>();
		System.out.println(vo.toString());
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();

			ToolUtility.printReqData(1, className, methodName, "");

			// 方法1
			myTestModelList = cstWipService.getWipByLastName(vo.getName());
			System.out.println("myTestModelList size: " + myTestModelList.size());
			for (int i = 0; i < myTestModelList.size(); i++) {
				System.out.println(myTestModelList.get(i).toString());
			}

			ToolUtility.printReqData(0, className, methodName, "");

		} catch (Exception e) {
			e.printStackTrace();
		}
		return myTestModelList;
	}

	@PostMapping(path = "/save", params = { "event=SAVE_MY_TEST" })
	@ResponseBody
	// http://localhost:8086/test-system/test/save
	public String test2(@RequestParam(value = "event", defaultValue = "World") String event) throws Exception {

		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();

			ToolUtility.printReqData(1, className, methodName, "");
			System.out.println("event: " + event);

			if ("SAVE_MY_TEST".equals(event))
				// throw new Exception("test Message");

				cstWipService.saveWip(makeFakeData());

			ToolUtility.printReqData(0, className, methodName, "");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "save Page";
	}

	@PostMapping(path = "/delete")
	@ResponseBody
	// http://localhost:8086/test-system/test/detele
	public String test3() {
		try {
			String className = new Object() {
			}.getClass().getName();
			String methodName = new Object() {
			}.getClass().getEnclosingMethod().getName();

			ToolUtility.printReqData(1, className, methodName, "");
			MyTestModel myTestModel = new MyTestModel();
			myTestModel.setId(10L);
			cstWipService.deleteWip(myTestModel);
			ToolUtility.printReqData(0, className, methodName, "");
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "delete Page";
	}

	private List<MyTestModel> makeFakeData() {
		// fake data
		List<MyTestModel> myTestModelList = new ArrayList<MyTestModel>();
		for (int i = 5; i <= 8; i++) {// insert
			MyTestModel myTestModel = new MyTestModel();
			myTestModel.setAddress(i + "TestAddress");
			myTestModel.setCity(i + "TestCity");
			myTestModel.setName(i + "TestName");
			myTestModelList.add(myTestModel);
		}

		MyTestModel myTestModel = new MyTestModel();
		myTestModel.setId(17L);// update
		myTestModel.setAddress("+TestLastName");
		myTestModel.setCity("+TestCity");
		myTestModel.setName("+TestName");
		myTestModelList.add(myTestModel);

		return myTestModelList;
	}

	private MyTestModel makeOneFakeData() {
		// fake data
		MyTestModel myTestModel = new MyTestModel();
		myTestModel.setId(17L);
		myTestModel.setAddress("+TestLastName");
		myTestModel.setCity("+TestCity");
		myTestModel.setName("+TestName");

		return myTestModel;
	}

}
