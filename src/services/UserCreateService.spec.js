const UserCreateService = require("./UserCreateService")
it("user should be create",async () => {
    const user = {
        name: "user Teste",
        email:"user@teste.com",
        password:"123456"
    }
    const userCreateService = new UserCreateService()
    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty("id")
})