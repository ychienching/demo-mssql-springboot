package com.myweb.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myweb.model.AccountUser;

@Repository
public interface AccountUserDao extends JpaRepository<AccountUser, String> {

	// method name auto mapping table column, can no write implements
	List<AccountUser> findByUsername(String username);

//	void customSql(MyTestModel myTestModel);

//	void saveBySql(MyTestModel myTestModel);

//	@Query("SELECT * FROM MY_TEST e WHERE e.id = :id")
//	List<MyTestModel> findBySearchId(@Param("id")long id);
}
