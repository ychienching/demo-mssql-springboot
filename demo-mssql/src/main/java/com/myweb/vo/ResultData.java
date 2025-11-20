package com.myweb.vo;

import java.io.Serializable;
import java.util.List;

public class ResultData<T> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5846746506914485820L;

	private String result;

	private List<T> sqlData = null;

	public ResultData() {
		result = "no process";
	}

	public ResultData(String result) {
		this.result = result;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public List<T> getSqlData() {
		return sqlData;
	}

	public void setSqlData(List<T> sqlData) {
		this.sqlData = sqlData;
	}

}
