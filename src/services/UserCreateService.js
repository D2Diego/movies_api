const { hash } = require("bcrypt")
const AppError = require("../utils/AppError")
const bcrypt = require('bcrypt');

class UserCreateService {
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute({name, email, password}){
        

        const existingUser = await this.userRepository.findByEmail(email)

        if (existingUser) {
            throw new AppError("Este e-mail já está em uso.");
        }

        const hashedPassword = await bcrypt.hash(password, 8);

       
       const userCreated =  await this.userRepository.create({name, email, password: hashedPassword })

       return userCreated
    }
}

module.exports = UserCreateService