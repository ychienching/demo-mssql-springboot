package com.myweb.service;

import java.util.ArrayList;
import java.util.Iterator;
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
import com.myweb.vo.AccountVO;
import com.myweb.vo.ResultData;

import tool.ToolUtility;

@Service
public class MemberService {

	@Autowired
	private AccountPasswordDao accountPasswordDao;

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
		List<AccountPassword> accountPasswordList = accountPasswordDao
				.findAll(Sort.by(Sort.Direction.ASC, "id"));
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

		List<AccountVO> accountList = accountPasswordDao.findAllAccount();
//		List<AccountPermissions> accountPermissionsList = accountPermissionsDao
//				.findAll(Sort.by(Sort.Direction.ASC, "id"));

		List<AccountVO> accountVOList = new ArrayList<AccountVO>();
		List<AccountPassword> accountPasswordList = accountPasswordDao.findAll();
		List<AccountPermissions> accountPermissionsList = accountPermissionsDao.findAll();

		for (Iterator iterator = accountPermissionsList.iterator(); iterator.hasNext();) {
			AccountPermissions accountPermissions = (AccountPermissions) iterator.next();
			AccountVO accountVO = new AccountVO();
			accountVO.setAccount(accountPermissions.getAccount());
			accountVO.setMember(accountPermissions.getMember());
			accountVO.setReport(accountPermissions.getReport());
			accountVO.setTest(accountPermissions.getTest());
			for (Iterator iterator2 = accountPasswordList.iterator(); iterator2.hasNext();) {
				AccountPassword accountPassword = (AccountPassword) iterator2.next();
				if (accountPassword.getAccount().equals(accountVO.getAccount())) {
					accountVO.setPassword(accountPassword.getPassword());
				}
			}
			accountVOList.add(accountVO);
		}

		if (accountPermissionsList.size() == 0) {
			result.setResult("No Data");
		} else {
			result.setResult("Success");
			result.setSqlData(accountList);
//			result.setSqlData(accountVOList);
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

	public ResultData saveMember(AccountVO accountVO) {
		ResultData result = new ResultData();
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		ToolUtility.printReqData(1, className, methodName, "");
//		AccountPermissions aPermissions = new AccountPermissions(accountVO.getAccount(), accountVO.getMember(),
//				accountVO.getReport(), accountVO.getTest());
//		accountPermissionsDao.save(aPermissions);
//		AccountPassword aPassword = new AccountPassword(accountVO.getAccount(), accountVO.getPassword());
//		accountPasswordDao.save(aPassword);
//		result.setResult("Success");

		AccountPermissions aPermissions = new AccountPermissions(accountVO.getAccount(), accountVO.getMember(),
				accountVO.getReport(), accountVO.getTest());
		AccountPassword aPassword = new AccountPassword(accountVO.getAccount(), accountVO.getPassword());
		aPassword.setPermissions(aPermissions);
		accountPasswordDao.save(aPassword);
		result.setResult("Success");

		ToolUtility.printReqData(0, className, methodName, "");
		return result;
	}

//	public ResultData deleteMember(Iterable<? extends Long> idList) {
	public ResultData deleteMember(List<String> accountList) {
		ResultData result = new ResultData();
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		ToolUtility.printReqData(1, className, methodName, "");

		List<AccountPassword> accountPasswordList = new ArrayList<AccountPassword>();
		List<AccountPermissions> accountPermissionsList = new ArrayList<AccountPermissions>();
		// test id delete
		for (String account : accountList) {
			AccountPassword aPassword = new AccountPassword();
			aPassword.setAccount(account);
//			aPassword.setId(8L);
			accountPasswordList.add(aPassword);
			AccountPermissions aPermissions = new AccountPermissions();
			aPermissions.setAccount(account);
//			aPermissions.setId(20L);
			accountPermissionsList.add(aPermissions);
		}
		accountPasswordDao.deleteAccountPasswordByAccountIn(accountList);
		accountPermissionsDao.deleteBatch(accountList);
//		accountPasswordDao.deleteByAccount(accountPasswordList);
//		accountPermissionsDao.deleteByAccount(accountPermissionsList);
		result.setResult("Success");
		ToolUtility.printReqData(0, className, methodName, "");
		return result;
	}

}
