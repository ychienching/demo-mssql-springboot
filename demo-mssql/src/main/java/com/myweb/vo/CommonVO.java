package com.myweb.vo;

import java.io.Serializable;
import java.util.List;

import com.myweb.model.MyTestModel;

public class CommonVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5846746506914485820L;

	private String name;

	private String username;

	private String password;

	private List<MyTestModel> MyTestModelList = null;

	private List sqlData = null;

	public CommonVO() {

	}

	public CommonVO(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public List<MyTestModel> getMyTestModelList() {
		return MyTestModelList;
	}

	public void setMyTestModelList(List<MyTestModel> myTestModelList) {
		MyTestModelList = myTestModelList;
	}

	public List getSqlData() {
		return sqlData;
	}

	public void setSqlData(List sqlData) {
		this.sqlData = sqlData;
	}

}
