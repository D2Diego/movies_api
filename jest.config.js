module.exports ={
  bail:true, //faz com que o primeiro erro para os testes
  covarageProvider:"v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ]
}