import * as Yup from 'yup'
import i18next from 'i18next'

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const loginSchema = Yup.lazy(() =>
  Yup.object({
    email: Yup.string().email().required().label(i18next.t('pages.login.fields.email')),
    password: Yup.string()
      .min(8)
      .required()
      // .matches(passwordRules)
      .label(i18next.t('pages.login.fields.password')),
  }),
)

export default loginSchema
