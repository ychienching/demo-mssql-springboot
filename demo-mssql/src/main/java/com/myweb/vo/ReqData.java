package com.myweb.vo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.myweb.model.MyTestModel;

public class ReqData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5846746506914485820L;

	private String page;
	private List<MyTestModel> myTestModelList = new ArrayList<MyTestModel>();

	public ReqData() {

	}

	public ReqData(String page) {
		this.page = page;
	}

	public ReqData(List<MyTestModel> myTestModelList) {
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
