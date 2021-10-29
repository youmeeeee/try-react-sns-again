import React, { useState, useCallback, useMemo } from 'react'
import useInput from '../hooks/useInput'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import { Form, Input, Checkbox, Button } from 'antd'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: red;   
`

const Signup = () => {
    const buttonStyle = useMemo(() => ({marginTop: 10}), [])   

    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    
    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value);
            setPasswordError(e.target.value !== password)
        },
        [password],
    )

    const [terms, setTerms] = useState(false)
    const [termsError, setTermsError] = useState(false)
    const onChangeTerms = useCallback(
        (e) => {
            setTerms(e.target.checked)
            setTermsError(false)
        },
        [],
    )

    //antd의 Form의 경우 e.preventDefault()를 따로 call할 필요는 없다.
    const onSubmit = useCallback(
        () => {
            if (password !== passwordCheck) {
                return setPasswordError(true)
            }
            if (!terms) {
                return setTermsError(true)
            }
            console.log(id, nickname, password, passwordCheck)
        },
        [password, passwordCheck, terms],
    )

    return (
        <AppLayout>
            <Head>
                <title>Signup | SNS</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-id">Id</label>
                    <br />
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nickname">Nickname</label>
                    <br />
                    <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">Password</label>
                    <br />
                    <Input name="user-password" type="password" value={[password]} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">Password Check</label>
                    <br />
                    <Input 
                        name="user-password-check" 
                        type="password" 
                        value={[passwordCheck]} 
                        required 
                        onChange={onChangePasswordCheck} 
                    />
                    {passwordError && <ErrorMessage>Password do not match!</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-terms" checked={terms} onChange={onChangeTerms}>
                        Agree to the terms and conditions.
                    </Checkbox>
                    {termsError && <ErrorMessage>You must agree to the terms and conditions.</ErrorMessage>}
                </div>
                <div style={buttonStyle}>
                    <Button type="primary" htmlType="submit">Signup</Button>
                </div>
            </Form>
        </AppLayout>
    )
}

export default Signup
