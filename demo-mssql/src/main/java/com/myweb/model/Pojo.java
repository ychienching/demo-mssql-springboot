package com.myweb.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Pojo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5846746506914485820L;

	private String page;
	private List<MyTestModel> myTestModelList = new ArrayList<MyTestModel>();

	public Pojo() {

	}

	public Pojo(String page) {
		this.page = page;
	}

	public Pojo(List<MyTestModel> myTestModelList) {
		this.myTestModelList = myTestModelList;
	}

	@Override
	public String toString() {
		for (MyTestModel myTestModel : myTestModelList) {
			System.out.println(myTestModel.toString());
		}
		return "Pojo [page=" + page + ", myTestModelList=" + myTestModelList.toString() + "]";
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public List<MyTestModel> getMyTestModelList() {
		return myTestModelList;
	}

	public void setMyTestModelList(List<MyTestModel> myTestModelList) {
		this.myTestModelList = myTestModelList;
	}

}
