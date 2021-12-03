import React, { useEffect, useCallback, useMemo } from 'react'
import { Form, Input } from 'antd'

import { useSelector, useDispatch } from 'react-redux'
import useInput from '../hooks/useInput'
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user'

const NicknameEditForm = () => {
  const { me, changeNicknameLoading, changeNicknameDone } = useSelector((state) => state.user)
  const [nickname, onChangeNickname, setNickname] = useInput(me?.nickname || '')
  const dispatch = useDispatch()

  useEffect(() => {
    if (changeNicknameDone) {
      setNickname('')
      alert('nickname changed!')
    }
  }, [changeNicknameDone])

  const onSubmit = useCallback(
    () => {
      dispatch({
        type: CHANGE_NICKNAME_REQUEST,
        data: nickname,
      })
    },
    [nickname],
  )

  const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }), [])
  return (
    <Form style={style}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="Nickname"
        enterButton="Edit"
        onSearch={onSubmit}
        loading={changeNicknameLoading}
      />
    </Form>
  )
}

export default NicknameEditForm
