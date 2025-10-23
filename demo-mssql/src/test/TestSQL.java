package test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class TestSQL {
	public static void main(String[] args) {
//		String url = "jdbc:sqlserver://127.0.0.1:1433;databaseName=MyAppDB;encrypt=true;trustServerCertificate=true";
		String url = "jdbc:sqlserver://127.0.0.1:1433;encrypt=true;trustServerCertificate=true";
		String user = "sa";
		String pass = "123456";

		try (Connection conn = DriverManager.getConnection(url, user, pass)) {
			System.out.println("✅ 連線成功！");

			// 測試查詢
			try (Statement stmt = conn.createStatement();
					ResultSet rs = stmt.executeQuery("SELECT @@VERSION AS version")) {
				if (rs.next()) {
					System.out.println("Spring Test SQL Server 版本: " + rs.getString("version"));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}