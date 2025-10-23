package com.myweb.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myweb.dao.AccountUserDao;
import com.myweb.model.AccountUser;
import com.myweb.model.ResultData;
import com.myweb.repository.TestSqlRepository;

@Service
public class UserService {

	@Autowired
	private AccountUserDao accountUserDao;

	@Autowired
	private TestSqlRepository testSqlRepository;

	@Autowired
	DataSource dataSource;

	public ResultData signUpAccount(AccountUser accountUser, ResultData result) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		List<AccountUser> accountUserList = accountUserDao.findByUsername(accountUser.getUsername());
		System.out.println("accountUserList size: " + accountUserList.size());
		if (accountUserList.size() > 0) {
			result.setResult("Username already exists");
		} else {
			accountUserDao.save(accountUser);
			result.setResult("Success");
			result.setSqlData(accountUserList);
		}
		System.out.println("Go through > " + className + " > " + methodName + " End:");
		return result;
	}

	public ResultData checkAccount(AccountUser accountUser, ResultData result) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		List<AccountUser> accountUserList = accountUserDao.findByUsername(accountUser.getUsername());
		System.out.println("accountUserList size: " + accountUserList.size());
		if (accountUserList.size() > 0) {
			if (accountUserList.get(0).getPassword().equals(accountUser.getPassword())) {
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

	public ResultData checkPermissions(AccountUser accountUser, ResultData result) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		List<AccountUser> accountUserList = accountUserDao.findByUsername(accountUser.getUsername());
		System.out.println("accountUserList size: " + accountUserList.size());
		if (accountUserList.size() > 0) {
			if (accountUserList.get(0).getPassword().equals(accountUser.getPassword())) {
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
