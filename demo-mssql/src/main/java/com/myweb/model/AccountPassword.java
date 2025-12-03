package com.myweb.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ACCOUNT_PASSWORD")
public class AccountPassword implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5846746506914485820L;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@MapsId // 表示共用主鍵
	@JoinColumn(name = "account", referencedColumnName = "account")
	private AccountPermissions permissions;

	@Id
	@Column(name = "account")
	private String account;

	@Column(name = "password")
	private String password;

	public AccountPassword() {

	}

	public AccountPassword(String account, String password) {
		this.account = account;
		this.password = password;
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

	public AccountPermissions getPermissions() {
		return permissions;
	}

	public void setPermissions(AccountPermissions permissions) {
		this.permissions = permissions;
	}

}
