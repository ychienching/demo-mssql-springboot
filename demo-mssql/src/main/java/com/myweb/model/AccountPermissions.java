package com.myweb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ACCOUNT_PERMISSIONS")
public class AccountPermissions implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5846746506914485820L;

	@Id
	@Column(name = "id")

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "account")
	private String account;

	@Column(name = "member")
	private int member;

	@Column(name = "report")
	private int report;

	@Column(name = "test")
	private int test;

	public AccountPermissions() {

	}

	public AccountPermissions(Long id, String account, String password) {
		this.id = id;
		this.account = account;
		this.member = member;
		this.report = report;
		this.test = test;
	}

	@Override
	public String toString() {
		return "AccountPermissions [id=" + id + ", account=" + account + ", member=" + member + ", test=" + test
				+ ", report=" + report + "]";
	}

	public String toJSON() {
		return "{\"id\": \"" + id + "\", " + "\"account\": \"" + account + "\", " + "\"member\": \"" + member
				+ "\"}";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
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
