import React from 'react'
import { Formik, Form, Field, ErrorMessage, useField } from 'formik'
import * as Yup from 'yup'

import './featureForm.scss'

const TextInput = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label htmlFor={props.name}>
                <div className='cart__purchase_form-name'>{label}</div>
                <input className='cart__purchase_form-input'  {...props} {...field}/>
            </label>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}

const FeatureForm = ({cart}) => {
    return (
        <Formik
        initialValues = {{
            name: '',
            number: '',
            email: '',
            address: '',
            terms: false
        }}
        validationSchema={Yup.object({
            name: Yup.string()
                    .min(2, 'Минимум 2 символа!')
                    .required('Обязательное поле!'),
            number: Yup.string()
                    .min(12, 'Номер должен начинаться с +7')
                    .required('Обязательное поле!'),
            email: Yup.string()
                    .email('Неправильный email адрес')
                    .required('Обязательное поле!'),
            address: Yup.string()
                    .required('Обязательное поле!'),
            terms: Yup.boolean()
                    .required('Необходимо согласие!')
                    .oneOf([true], 'Необходимо согласие!')
        })}
        onSubmit={values => {
            const order = {
                orderId: 1,
                buyerData: values,
                orderData: cart
            }
            console.log(JSON.stringify(order, null, 2))
            // console.log(JSON.stringify(cart, null, 2))
        }}
        >
            <Form className='cart__purchase_form'>
                <TextInput
                    label="Имя:"
                    id="name" 
                    type="text" 
                    name="name" 
                />
                <TextInput
                    label="Телефон:"
                    id="number" 
                    type="text" 
                    name="number" 
                />
                <TextInput
                    label="E-mail:"
                    id="email" 
                    type="email" 
                    name="email" 
                />
                <TextInput
                    label="Адрес доставки:"
                    id="address" 
                    type="text" 
                    name="address" 
                />
                <label>
                    <div className='cart__purchase_form-checkname'>Даю согласие на обработку персональных данных и соглашаюсь с условиями политики</div>
                    <Field 
                        className='cart__purchase_form-check' 
                        type="checkbox"
                        name="terms"
                        />
                </label>
                <ErrorMessage className="error" name="terms" component="div"/>
                <button type="submit" className='cart__purchase_form-button'>Оплатить</button>
            </Form>
        </Formik>
    )
}

export default FeatureForm