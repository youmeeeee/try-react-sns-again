import React, { useCallback } from 'react'
import useInput from '../hooks/useInput'
import { Form, Input, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonWrapper = styled.div`
    margin-top: 10px;
`

const FormWrapper = styled(Form)`
    padding: 10px;
`

const LoginForm = ({ setIsLoggedIn }) => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('')

    const onSubmitForm = useCallback(
        () => {
            console.log(id, password)
            setIsLoggedIn(true)
        },
        [id, password],
    )

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">ID</label>
                <br />
                <Input
                    name="user-id" 
                    value={id} 
                    onChange={onChangeId} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="user-password">PASSWORD</label>
                <br />
                <Input 
                    name="user-password" 
                    type="password" 
                    value={password} 
                    onChange={onChangePassword} 
                    required 
                />
            </div>
            <ButtonWrapper> 
                <Button type="primary" htmlType="submit" loading={false}>LOGIN</Button>
                <Link href="/signup"><a><Button>SIGNUP</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}

LoginForm.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired
}

export default LoginForm
