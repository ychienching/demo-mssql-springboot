package com.myweb.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myweb.dao.AccountPasswordDao;
import com.myweb.dao.AccountPermissionsDao;
import com.myweb.model.AccountPassword;
import com.myweb.model.AccountPermissions;
import com.myweb.repository.TestSqlRepository;
import com.myweb.vo.ResultData;

@Service
public class AccountService {

	@Autowired
	private AccountPasswordDao accountPasswordDao;

	@Autowired
	private AccountPermissionsDao accountPermissionsDao;

	@Autowired
	private TestSqlRepository testSqlRepository;

	@Autowired
	DataSource dataSource;

	public ResultData signUpAccount(AccountPassword accountPassword, ResultData result) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		String account = accountPassword.getAccount();
		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		List<AccountPassword> accountPasswordList = accountPasswordDao.findByAccount(account);
		System.out.println("accountPasswordList size: " + accountPasswordList.size());
		if (accountPasswordList.size() > 0) {
			result.setResult("Username already exists");
		} else {
			AccountPermissions accountPermissions = new AccountPermissions();
			accountPermissions.setAccount(account);
			accountPermissionsDao.save(accountPermissions);
			accountPasswordDao.save(accountPassword);
			result.setResult("Success");
			result.setSqlData(accountPasswordList);
		}
		System.out.println("Go through > " + className + " > " + methodName + " End:");
		return result;
	}

	public ResultData checkAccount(AccountPassword accountPassword, ResultData result) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		List<AccountPassword> accountPasswordList = accountPasswordDao
				.findByAccount(accountPassword.getAccount());
		System.out.println("accountPasswordList size: " + accountPasswordList.size());
		if (accountPasswordList.size() > 0) {
			if (accountPasswordList.get(0).getPassword().equals(accountPassword.getPassword())) {
				result.setResult("Success");
			} else {
				result.setResult("Passowrd  failed");
			}
		} else {
			result.setResult("Username doesn't exist");
		}
		System.out.println("Go through > " + className + " > " + methodName + " End:");
		return result;
	}

	public ResultData checkPermissions(AccountPassword accountPassword, ResultData result) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		List<AccountPassword> accountPasswordList = accountPasswordDao
				.findByAccount(accountPassword.getAccount());
		System.out.println("accountPasswordList size: " + accountPasswordList.size());
		if (accountPasswordList.size() > 0) {
			if (accountPasswordList.get(0).getPassword().equals(accountPassword.getPassword())) {
				result.setResult("Success");
			} else {
				result.setResult("Passowrd  failed");
			}
		} else {
			result.setResult("Username doesn't exist");
		}
		System.out.println("Go through > " + className + " > " + methodName + " End:");
		return result;
	}

}
