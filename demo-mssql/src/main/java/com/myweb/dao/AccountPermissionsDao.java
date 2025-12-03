package com.myweb.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.myweb.model.AccountPermissions;

//Long：這是實體類別主鍵的類型。這裡表示 AccountPermissions 類的 @Id 欄位是 Long 類型
@Repository
public interface AccountPermissionsDao extends JpaRepository<AccountPermissions, String> {

	// [method name] auto mapping table column, can no write implements
	List<AccountPermissions> findByAccount(String account);

	@Modifying
	@Transactional
	@Query("delete from AccountPermissions ap where ap.account in (?1)")
	void deleteBatch(List<String> accountList);

//	void deleteByAccount(List<AccountPermissions> accountPermissionsList);

}
