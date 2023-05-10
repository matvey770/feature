import './adminEntry.scss'

import config from '../../../../config.json'

import {React} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const AdminEntry = ({entry, setEntry}) => {

    const admin = config.ADMIN_NAME
    const password = config.ADMIN_PASS
    return (
        <div className='admin'>
            <Formik
                initialValues={{
                    name: '',
                    password: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, 'Минимум 2 символа!')
                        .required('Обязательное поле!'),
                    password: Yup.string()
                        .min(2, 'Минимум 2 символа!')
                        .required('Обязательное поле!')
                })}
                onSubmit={values => {
                    if (values.name === admin && values.password === password) {
                        setEntry(true)
                        console.log(entry)
                    } else {
                        console.log('Не')
                    }
                }}
                >
                    <Form className='admin_form'>
                        <div>Логин:</div>
                        <Field
                            id="name"
                            type="text"
                            name="name"
                        />
                        <ErrorMessage className="error" name="name" component="div"/>
                        <div>Пароль:</div>
                        <Field
                            id="password"
                            type="text"
                            name="password"
                        />
                        <ErrorMessage className="error" name="password" component="div"/>
                        <button type="submit">Войти</button>
                    </Form>
            </Formik>
        </div>
    )

}

export default AdminEntry