package com.myweb.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.myweb.vo.CommonVO;
import com.myweb.vo.ResultData;

@Repository
public class TestSqlRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List lotStartBatchRule(ResultData vo) {
		List resultData = null;
		try {
			StringBuffer sql = new StringBuffer();

			sql.append(" SELECT bth.sbatch_id, ");
			sql.append("        bth.judge_result, ");
			sql.append("        bth.eqp_id, ");
			sql.append("        bth.sbatch_lock as is_lock, ");
			sql.append("        bth.curr_count, ");
			sql.append("        bth.rule_sn, ");
			sql.append("        bth.rule_ver, ");
			sql.append("        bth.rule_note, ");
			sql.append("        bth.moniter_op_list, ");
			sql.append("        ruru.interval_count, ");
			sql.append("        t.min_batch_time, ");
			sql.append("        TO_CHAR(t.min_batch_time, 'YYYY-MM-DD HH24:MI:SS') batch_time, ");
			sql.append("        ruru.model_no_list, ");
			sql.append("        ruru.abbr_no ");
			sql.append("   FROM t1l10ppt.r_bth_sbatch bth ");
			sql.append("   LEFT JOIN t1l10ppt.R_SMP_RULE ruru ");
			sql.append("     ON bth.rule_sn = ruru.rule_sn ");
			sql.append("    AND bth.eqp_id = ruru.eqp_id ");
			sql.append("   LEFT JOIN (SELECT min(form_sbatch_time) min_batch_time, sbatch_id ");
			sql.append("                FROM t1l10ppt.r_bth_sheet bsh ");
			sql.append("               GROUP BY sbatch_id) t ");
			sql.append("     ON bth.sbatch_id = t.sbatch_id ");
			sql.append(" WHERE 1 = 1 ");

			System.out.println("Sql use: " + sql.toString());
			resultData = jdbcTemplate.queryForList(sql.toString());
			System.out.println("lotStartBatchSql rows : " + resultData.toString());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return resultData;
	}

	public List modelAbbrOption(CommonVO vo) {
		List resultData = null;
		try {
			StringBuffer sql = new StringBuffer();
			// String parea = "ARRAY";

			sql.append("SELECT m.panel_size, b.model_no, b.abbr_no, b.description ");
			sql.append("  FROM c_rou_mdlabbr b, c_rou_mdl m ");
			sql.append(" WHERE b.model_no = m.model_no ");
			sql.append("   AND m.parea = ? ");
			sql.append("   AND m.model_cat in ('PROD', 'ENG') ");
			sql.append(" ORDER BY model_cat DESC, model_no, abbr_no ");

			System.out.println("modelAbbrOption sql= " + sql.toString());
			System.out.println("modelAbbrOption param: 1.parea= " + vo.getParea());
			resultData = jdbcTemplate.queryForList(sql.toString(), vo.getParea());

			// resultData = jdbcTemplate.queryForList(sql.toString());
			System.out.println("modelAbbrOption rows : " + resultData.toString());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return resultData;
	}

	public List checkPassword(String username) {
		List resultData = null;
		try {
			StringBuffer sql = new StringBuffer();
			String parea = "ARRAY";

			sql.append("SELECT m.panel_size, b.model_no, b.abbr_no, b.description ");
			sql.append("  FROM ACCOUNT_USER au ");
			sql.append(" WHERE au.username = ? ");

			System.out.println("checkPassword sql= " + sql.toString());
			System.out.println("checkPassword param: 1.username= " + username);
			resultData = jdbcTemplate.queryForList(sql.toString(), username);

			resultData = jdbcTemplate.queryForList(sql.toString());
			System.out.println("modelAbbrOption rows : " + resultData.toString());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return resultData;
	}

}
