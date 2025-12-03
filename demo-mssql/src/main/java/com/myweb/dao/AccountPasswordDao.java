package com.myweb.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.myweb.model.AccountPassword;
import com.myweb.vo.AccountVO;

@Repository
public interface AccountPasswordDao extends JpaRepository<AccountPassword, String> {

	// [method name] auto mapping table column, can no write implements
	List<AccountPassword> findByAccount(String account);

	@Modifying
	@Transactional
	@Query("delete from AccountPassword ap where ap.account in (?1)")
	void deleteBatch(List<String> accountList);

	@Modifying
	@Transactional
	@Query("delete from AccountPassword ap where ap.account in (?1)")
	void deleteAccountPasswordByAccountIn(List<String> accountList);

	@Query("SELECT new com.myweb.vo.AccountVO( " + "ap.account, " + "ap.password, " + "p.member, " + "p.report, "
			+ "p.test) " + "FROM AccountPassword ap " + "LEFT JOIN ap.permissions p")
	List<AccountVO> findAllAccount();

}
