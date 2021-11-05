import React, { useMemo } from 'react'
import { Form, Input } from 'antd'

const NicknameEditForm = () => {
  const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }), [])
  return (
    <Form style={style}>
      <Input.Search addonBefore="Nickname" enterButton="Edit" />
    </Form>
  )
}

export default NicknameEditForm
