package com.myweb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ACCOUNT_USER")
public class AccountUser implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5846746506914485820L;

	@Id
	@Column(name = "id")

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	public AccountUser() {

	}

	public AccountUser(Long id, String username, String password) {
		this.id = id;
		this.username = username;
		this.password = password;
	}

	@Override
	public String toString() {
		return "AccountUser [id=" + id + ", username=" + username + ", password=" + password + "]";
	}

	public String toJSON() {
		return "{\"id\": \"" + id + "\", \"username\": \"" + username + "\", \"password\": \"" + password
				+ "\", \"CITY\": \"" + username + "\"}";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
