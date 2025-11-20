package com.myweb.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.myweb.dao.AccountPasswordDao;
import com.myweb.dao.AccountPermissionsDao;
import com.myweb.model.AccountPassword;
import com.myweb.model.AccountPermissions;
import com.myweb.repository.TestSqlRepository;
import com.myweb.vo.ResultData;

import tool.ToolUtility;

@Service
public class MemberService {

	@Autowired
	private AccountPasswordDao accountUserDao;

	@Autowired
	private AccountPermissionsDao accountPermissionsDao;

	@Autowired
	private TestSqlRepository testSqlRepository;

	@Autowired
	DataSource dataSource;

	public ResultData getAllAccountPassword() {
		ResultData result = new ResultData();
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		ToolUtility.printReqData(1, className, methodName, "");
		List<AccountPassword> accountPasswordList = accountUserDao.findAll(Sort.by(Sort.Direction.ASC, "id"));
		System.out.println("accountUserList size: " + accountPasswordList.size());
		if (accountPasswordList.size() == 0) {
			result.setResult("No Data");
		} else {
			result.setResult("Success");
			result.setSqlData(accountPasswordList);
		}
		ToolUtility.printReqData(0, className, methodName, "");
		return result;
	}

	public ResultData getAllAccountPermissions() {
		ResultData result = new ResultData();
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		ToolUtility.printReqData(1, className, methodName, "");
		List<AccountPermissions> accountPermissionsList = accountPermissionsDao
				.findAll(Sort.by(Sort.Direction.ASC, "id"));
		System.out.println("accountUserList size: " + accountPermissionsList.size());
		if (accountPermissionsList.size() == 0) {
			result.setResult("No Data");
		} else {
			result.setResult("Success");
			result.setSqlData(accountPermissionsList);
		}
		ToolUtility.printReqData(0, className, methodName, "");
		return result;
	}

	public boolean getPermission(String account) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		boolean hasPermission = false;
		ToolUtility.printReqData(1, className, methodName, "");
		List<AccountPermissions> accountPermissionsList = accountPermissionsDao.findByAccount(account);
		System.out.println("accountPermissionsList size: " + accountPermissionsList.size());
		if (1 == accountPermissionsList.get(0).getMember()) {
			hasPermission = true;
		}
		ToolUtility.printReqData(0, className, methodName, "");
		return hasPermission;
	}

	public ResultData saveMember(AccountPermissions ap) {
		ResultData result = new ResultData();
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		ToolUtility.printReqData(1, className, methodName, "");
		accountPermissionsDao.save(ap);
		result.setResult("Success");

		ToolUtility.printReqData(0, className, methodName, "");
		return result;
	}

//	public ResultData deleteMember(Iterable<? extends Long> idList) {
	public ResultData deleteMember(List<Long> idList) {
		ResultData result = new ResultData();
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		ToolUtility.printReqData(1, className, methodName, "");
		accountPermissionsDao.deleteAllById(idList);
		result.setResult("Success");
		ToolUtility.printReqData(0, className, methodName, "");
		return result;
	}

}
