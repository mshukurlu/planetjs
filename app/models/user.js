const connection = require("../../database/database")

class User{
    static async getAll()
    {
        const [rows,fields] = await connection.query('Select * from users');

        return rows;
    }

    static async getById(id){
        const [rows, fields] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { firstName,lastName, email,password } = data;
        const [result, fields] = await connection.query('INSERT INTO users (firstName,lastName, email,password) VALUES (?, ?, ?, ?)', [firstName,lastName,email,password]);
        return result.insertId;
      }
    
      static async update(id, data) {
        const { firstName, lastName,password } = data;
        const [result, fields] = await connection.query('UPDATE users SET firstName = ?, email = ?, lastName = ?, password=? WHERE id = ?', [firstName, email,lastName,password, id]);
        return result.affectedRows === 1;
      }
    
      static async delete(id) {
        const [result, fields] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows === 1;
      }

      static async getByEmail(email){
        const [result,fields] = await connection.query('SELECT * FROM users where email = ? limit 1',[email]);

        return result[0];
      }

      static async checkEmailAndIdForUpdateValidation(id,email){
        const [result, fields] = await connection.query('SELECT 1 FROM users where email = ? and id = ?',[email,id])
      }
}

module.exports = User;