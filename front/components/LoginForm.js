import React, { useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import useInput from '../hooks/useInput'
import { loginRequestAction } from '../reducers/user'

const ButtonWrapper = styled.div` 
    margin-top: 10px;
`

const FormWrapper = styled(Form)`
    padding: 10px;
`

const LoginForm = () => {
  const dispatch = useDispatch()
  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')
  const { loginLoading } = useSelector((state) => state.user)

  const onSubmitForm = useCallback(
    () => {
      // console.log(email, password)
      dispatch(loginRequestAction({ email, password }))
    },
    [email, password],
  )

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">Email</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
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
        <Button type="primary" htmlType="submit" loading={loginLoading}>LOGIN</Button>
        <Link href="/signup"><a><Button>SIGNUP</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  )
}

export default LoginForm
