const knex = require("../database/knex");

class UserRepository {
    async findByEmail(email) {
   

        const existingUser = await knex('users').where('email', email).first();
        
        return existingUser;
    }

    async create({ name, email, password }) {
       

        const userId = await knex('users').insert({
            name,
            email,
            password,
        });
        
        return { id: userId };
    }
}

module.exports = UserRepository;
