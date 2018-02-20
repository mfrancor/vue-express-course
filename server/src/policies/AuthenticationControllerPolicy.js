const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const {error} = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Email inválido.'
          })
          break
        case 'password':
          res.status(400).send({
            error: `A senha deve às seguintes regras:
            <br>
            1. Deve possuir somente letras, maiúscula e minúsculas, e números
            <br>
            2. Deve possuir de 8 a 32 caracteres`
          })
          break
        default:
          res.status(400).send({
            error: 'Informação de registro inválida.'
          })
          break
      }
    } else {
      next()
    }
  }
}
