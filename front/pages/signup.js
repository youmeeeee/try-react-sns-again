import React, { useState, useCallback, useMemo, useEffect } from 'react'
import Head from 'next/head'
import { Form, Input, Checkbox, Button } from 'antd'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
import axios from 'axios'
import { END } from 'redux-saga'
import { SIGNUP_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user'
import AppLayout from '../components/AppLayout'
import useInput from '../hooks/useInput'
import wrapper from '../store/configureStore'

const ErrorMessage = styled.div`
  color: red;   
`

const Signup = () => {
  const dispatch = useDispatch()
  const { me, signupLoading, signupDone, signupError } = useSelector((state) => state.user)

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/')
    }
  }, [me && me.id])

  useEffect(() => {
    if (signupDone) {
      Router.replace('/')
    }
  }, [signupDone])

  useEffect(() => {
    if (signupError) {
      alert(signupError)
    }
  }, [signupError])

  const buttonStyle = useMemo(() => ({ marginTop: 10 }), [])

  const [email, onChangeEmail] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [password, onChangePassword] = useInput('')

  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value)
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

  // antd의 Form의 경우 e.preventDefault()를 따로 call할 필요는 없다.
  const onSubmit = useCallback(
    () => {
      if (password !== passwordCheck) {
        return setPasswordError(true)
      }
      if (!terms) {
        return setTermsError(true)
      }
      console.log(email, nickname, password, passwordCheck)
      return dispatch({
        type: SIGNUP_REQUEST,
        data: { email, password, nickname },
      })
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
          <label htmlFor="user-email">Email</label>
          <br />
          <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
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
          <Button type="primary" htmlType="submit" loading={signupLoading}>Signup</Button>
        </div>
      </Form>
    </AppLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : ''
  axios.defaults.headers.Cookie = ''
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  store.dispatch(END)
  await store.sagaTask.toPromise()
})

export default Signup
