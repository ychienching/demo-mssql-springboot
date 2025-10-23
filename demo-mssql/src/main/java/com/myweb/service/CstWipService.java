package com.myweb.service;

import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.myweb.dao.MyTestDao;
import com.myweb.model.MyTestModel;
import com.myweb.model.ResultData;
import com.myweb.repository.TestSqlRepository;
import com.myweb.vo.CommonVO;

@Service
public class CstWipService {

	@Autowired
	private MyTestDao myTestDao;

	@Autowired
	private TestSqlRepository testSqlRepository;

	@Autowired
	DataSource dataSource;

	public List<MyTestModel> getWip() {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		List<MyTestModel> myTestModelList = myTestDao.findAll(Sort.by(Sort.Direction.ASC, "id"));
		System.out.println("myTestModelList size: " + myTestModelList.size());
		for (MyTestModel myTestModel : myTestModelList) {
			System.out.println(myTestModel.toString());
		}
		System.out.println("Go through > " + className + " > " + methodName + " End:");

		return myTestModelList;
	}

	public List<MyTestModel> getWipByLastName(String name) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		System.out.println("param: " + name);
		List<MyTestModel> myTestModelList = myTestDao.findByName(name);
		System.out.println("Go through > " + className + " > " + methodName + " End:");

		return myTestModelList;
	}

	public void saveWip(List<MyTestModel> myTestModelList) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		myTestDao.saveAll(myTestModelList);
		// myTestRepository.save(myTestModel);
		System.out.println("Go through > " + className + " > " + methodName + " End:");
	}

	public void deleteWip(MyTestModel myTestModel) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		myTestDao.delete(myTestModel);
		System.out.println("Go through > " + className + " > " + methodName + " End:");
	}

	public List getLotStartBatchRule(ResultData vo) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		System.out.println("param: " + vo.toString());
		List lotStartBatchRule = testSqlRepository.lotStartBatchRule(vo);
		System.out.println("Go through > " + className + " > " + methodName + " End:");

		return lotStartBatchRule;
	}

	public List getModelAbbrOption(CommonVO vo) {
		String className = new Object() {
		}.getClass().getName();
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();

		System.out.println("Go through > " + className + " > " + methodName + " Start:");
		System.out.println("param: " + vo.toString());
		List modelAbbrOption = testSqlRepository.modelAbbrOption(vo);
		System.out.println("Go through > " + className + " > " + methodName + " End:");

		return modelAbbrOption;
	}

	// TODO
	public List<MyTestModel> findBySearchId(String lastName) {
		List<MyTestModel> myTestModelList = new ArrayList<MyTestModel>();
//		myTestModelList = myTestRepository.findBySearchId(1L);
		System.out.println("+++CstWipServiceImpl Start: findBySearchId+++");
		for (int i = 0; i < myTestModelList.size(); i++) {
			System.out.println(myTestModelList.get(i).toString());
		}
		return myTestModelList;
	}

}
