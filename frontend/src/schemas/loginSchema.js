import * as Yup from 'yup'
import i18next from 'i18next'

const loginSchema = Yup.lazy(() =>
  Yup.object({
    email: Yup.string().email().required().label(i18next.t('pages.login.fields.email')),
    password: Yup.string().min(8).required().label(i18next.t('pages.login.fields.password')),
  }),
)

export default loginSchema
