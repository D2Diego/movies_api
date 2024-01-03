const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const bcrypt = require('bcrypt');
const { hash, compare } = require("bcrypt")


class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const existingUser = await knex('users').where('email', email).first();

        if (existingUser) {
            throw new AppError("Este e-mail já está em uso.");
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        await knex('users').insert({
            name,
            email,
            password: hashedPassword,
        });

        return response.status(201).json();
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id

        const user = await knex('users').where('id', user_id).first();

        if (!user) {
            throw new AppError("Usuário não cadastrado");
        }

        const emailUpdatedExisting = await knex('users').where('email', email);

        if (emailUpdatedExisting.length > 0) {
            throw new AppError('Este e-mail já está em uso')
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;


        if (password) {
            if (!old_password) {
                throw new AppError("É necessário informar a senha antiga");
            } else {
                const checkPassword = await compare(old_password, user.password);

                if (!checkPassword) {
                    throw new AppError("A senha antiga não confere, capitão");
                }

                user.password = await hash(password, 8);
            }
        }


        await knex('users').where('id', user_id)
            .update({
                name: user.name,
                email: user.email,
                password: user.password,
                updated_at: knex.fn.now()
            })

        return response.status(200).json();
    }
}

module.exports = UsersController;
