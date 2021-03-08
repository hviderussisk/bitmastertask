import { Formik, Form, FormikValues, useField } from 'formik'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { ViewProps } from '../../interfacies/interface'
import { postOrder, setError } from '../../store/main-reducer'
import { valodateMessage } from '../../assets/variables'

function validateAdress(value: string) {
    let error
    if(!value) error = valodateMessage
    return error
  }

const MyTextField = ({ label, noAdress, ...props }: any) => {
    const [ field, meta ] = useField(props),
            dispatch = useDispatch()
    dispatch(setError(meta.error))
    return  <div className='textinput'>
                <label>{label}</label>
                <input {...field} {...props} />
                { meta.touched && meta.error ? ( <div className="error">{meta.error}</div> ) : null }
                { noAdress && field.value ? ( <div className="error">{noAdress}</div> ) : null }
            </div>
}

export let FormTaxi = (props: ViewProps) => {
    const { search, setSearch, submit, noAdress } = props,
            dispatch = useDispatch(),
            handlerChange = ( e: React.ChangeEvent<any> ) => setSearch(e.currentTarget.value) && dispatch({ type: 'GEO_CODE' })
   
    const   postSubmit = (values: any) => dispatch(postOrder(values))

return  <Formik initialValues={{ startPath: search }} enableReinitialize={true} onSubmit={postSubmit}> 
        {(props) => (
            <Form onLoad={submit(props.submitForm)}>
                <div className='rowInput'> 
                    <MyTextField noAdress={noAdress} name="startPath" type="text" label="Откуда" validate={validateAdress} value={search} onChange={handlerChange} />
                </div>
            </Form>)}
        </Formik>      
}


