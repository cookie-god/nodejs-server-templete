const { pool } = require('../database.js');
const logger = require('../winston.js');

async function userIdCheck(id) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectIdQuery = `
                SELECT COUNT(*) as CNT 
                FROM User 
                WHERE userId = ?;
                  `;
    const selectIdParams = [id];
    const [idRows] = await connection.query(
      selectIdQuery,
      selectIdParams
    );
    connection.release();
    return idRows;
}

async function insertUserInfo(insertUserInfoParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertUserInfoQuery = `
          INSERT INTO User(userId, userPw, userName, age) 
          VALUES(?, ?, ?, ?);
      `;
    const insertUserInfoRow = await connection.query(
      insertUserInfoQuery,
      insertUserInfoParams
    );
    connection.release();
    return insertUserInfoRow;
}

async function selectUserInfo(id) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectUserInfoQuery = `
                  SELECT userId, userPw 
                  FROM User 
                  WHERE userId = ?;
                  `;
  
    let selectUserInfoParams = [id];
    const userInfoRows = await connection.query(
      selectUserInfoQuery,
      selectUserInfoParams
    );
    connection.release();
    return userInfoRows[0];
  }

module.exports = {
    userIdCheck,
    insertUserInfo,
    selectUserInfo
  };
  