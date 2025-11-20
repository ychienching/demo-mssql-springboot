package com.myweb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ACCOUNT_PASSWORD")
public class AccountPassword implements Serializable {

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

	@Column(name = "password")
	private String password;

	public AccountPassword() {

	}

	public AccountPassword(Long id, String account, String password) {
		this.id = id;
		this.account = account;
		this.password = password;
	}

	@Override
	public String toString() {
		return "AccountUser [id=" + id + ", account=" + account + ", password=" + password + "]";
	}

	public String toJSON() {
		return "{\"id\": \"" + id + "\", " + "\"account\": \"" + account + "\", " + "\"password\": \""
				+ password + "\"}";
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
