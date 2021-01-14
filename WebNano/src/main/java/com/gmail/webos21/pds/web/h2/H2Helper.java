package com.gmail.webos21.pds.web.h2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class H2Helper {

	private static final String JDBC_DRIVER = "org.h2.Driver";

	private static final String TB_VERSION = "tb_h2_default_version";

	private static final String TB_VERSION_CREATE = /* Indent -------------------- */
			/* Indent */"CREATE TABLE IF NOT EXISTS " + TB_VERSION + " (" +
			/* Indent */"	version          INTEGER  PRIMARY KEY" +
			/* Indent */");";

	private static final String TB_VERSION_CHECK = /* Indent -------------------- */
			/* Indent */"SELECT version FROM " + TB_VERSION + ";";

	private static final String TB_VERSION_INIT = /* Indent -------------------- */
			/* Indent */"INSERT INTO " + TB_VERSION + " VALUES (0);";

	public static Connection getConnection(String jdbcUrl, String user, String pass) {
		Connection conn = null;

		try {
			// STEP 1: Register JDBC driver
			Class.forName(JDBC_DRIVER);

			// STEP 2: Open a connection
			conn = DriverManager.getConnection(jdbcUrl, user, pass);
		} catch (ClassNotFoundException e) {
			throw new IllegalArgumentException(e);
		} catch (SQLException e) {
			throw new IllegalArgumentException(e);
		}

		return conn;
	}

	public static boolean isReadOnly(Connection conn) {
		boolean readOnly = true;
		try {
			readOnly = conn.isReadOnly();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return readOnly;
	}

	public static boolean isValid(Connection conn) {
		boolean valid = true;
		try {
			valid = conn.isValid(3);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return valid;
	}

	public static int getVersion(Connection conn) {
		int dbVersion = -1;

		if (conn == null) {
			return dbVersion;
		}

		Statement stmt = null;
		ResultSet rs = null;

		try {
			stmt = conn.createStatement();
			stmt.executeUpdate(TB_VERSION_CREATE);

			rs = stmt.executeQuery(TB_VERSION_CHECK);
			while (rs.next()) {
				// Retrieve by column name
				dbVersion = rs.getInt("version");
			}
			if (dbVersion < 0) {
				stmt.executeUpdate(TB_VERSION_INIT);
				dbVersion = 0;
			}

			rs.close();
			rs = null;

			stmt.close();
			stmt = null;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
				rs = null;
			}
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
				stmt = null;
			}
		}

		return dbVersion;
	}

	public static void dbUpdateDone(Connection conn, int currentVersion) {
		if (conn == null) {
			return;
		}

		Statement stmt = null;

		try {
			stmt = conn.createStatement();
			stmt.executeUpdate("UPDATE " + TB_VERSION + " SET version = " + currentVersion + ";");

			stmt.close();
			stmt = null;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
				stmt = null;
			}
		}
	}

	public static void beginTransaction(Connection conn) {
		try {
			conn.setAutoCommit(false);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void endTransaction(Connection conn) {
		try {
			conn.setAutoCommit(true);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static boolean inTransaction(Connection conn) {
		try {
			return conn.getAutoCommit();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	public static void setTransactionSuccessful(Connection conn) {
		try {
			conn.commit();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void commit(Connection conn) {
		try {
			conn.commit();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void rollback(Connection conn) {
		try {
			conn.rollback();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static Statement openStatement(Connection conn) {
		Statement stmt = null;

		if (conn != null) {
			try {
				stmt = conn.createStatement();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return stmt;
	}

	public static PreparedStatement preparedStatement(Connection conn, String sql) {
		PreparedStatement pstmt = null;

		if (conn != null) {
			try {
				pstmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return pstmt;
	}

	public static ResultSet executeQuery(PreparedStatement pstmt) {
		ResultSet rset = null;

		if (pstmt != null) {
			try {
				rset = pstmt.executeQuery();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return rset;
	}

	public static int executeUpdate(PreparedStatement pstmt) {
		int rows = -1;

		if (pstmt != null) {
			try {
				rows = pstmt.executeUpdate();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return rows;
	}

	public static ResultSet executeQuery(Statement stmt, String sql) {
		ResultSet rset = null;

		if (stmt != null && sql != null) {
			try {
				rset = stmt.executeQuery(sql);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return rset;
	}

	public static void closeResultSet(ResultSet rset) {
		if (rset != null) {
			try {
				rset.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			rset = null;
		}
	}

	public static void closeStatement(Statement stmt) {
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			stmt = null;
		}
	}

	public static void releaseConnection(Connection conn) {
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			conn = null;
		}
	}
}
