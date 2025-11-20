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

	private String parea;

	private List<MyTestModel> MyTestModelList = null;

	private List sqlData = null;

	private List abbrList = null;

	private List slotNum = null;

	private List pepList = null;

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

	public String getParea() {
		return parea;
	}

	public void setParea(String parea) {
		this.parea = parea;
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

	public List getAbbrList() {
		return abbrList;
	}

	public void setAbbrList(List abbrList) {
		this.abbrList = abbrList;
	}

	public List getSlotNum() {
		return slotNum;
	}

	public void setSlotNum(List slotNum) {
		this.slotNum = slotNum;
	}

	public List getPepList() {
		return pepList;
	}

	public void setPepList(List pepList) {
		this.pepList = pepList;
	}

}
