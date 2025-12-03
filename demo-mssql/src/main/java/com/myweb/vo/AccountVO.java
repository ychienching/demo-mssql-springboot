package com.myweb.vo;

public class AccountVO {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5846746506914485820L;

	private String account;

	private String password;

	private int member;

	private int report;

	private int test;

	public AccountVO() {
	}

	public AccountVO(String account, String password, int member, int report, int test) {
		this.account = account;
		this.password = password;
		this.member = member;
		this.report = report;
		this.test = test;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getMember() {
		return member;
	}

	public void setMember(int member) {
		this.member = member;
	}

	public int getReport() {
		return report;
	}

	public void setReport(int report) {
		this.report = report;
	}

	public int getTest() {
		return test;
	}

	public void setTest(int test) {
		this.test = test;
	}

}
