package com.myweb.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myweb.model.AccountPermissions;

//Long：這是實體類別主鍵的類型。這裡表示 AccountPermissions 類的 @Id 欄位是 Long 類型
@Repository
public interface AccountPermissionsDao extends JpaRepository<AccountPermissions, Long> {

	// [method name] auto mapping table column, can no write implements
	List<AccountPermissions> findByAccount(String account);

//	void customSql(MyTestModel myTestModel);

//	void saveBySql(MyTestModel myTestModel);

//	@Query("SELECT * FROM MY_TEST e WHERE e.id = :id")
//	List<MyTestModel> findBySearchId(@Param("id")long id);
}
