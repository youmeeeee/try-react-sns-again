import React, { useCallback, useRef, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import useInput from '../hooks/useInput'
import { ADD_POST_REQUEST } from '../reducers/post'

const PostForm = () => {
  const [text, onChangeText, setText] = useInput('')
  const imageInput = useRef()

  const { imagesPaths, addPostLoading, addPostDone } = useSelector((state) => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    if (addPostDone) {
      setText(' ')
    }
  }, [addPostDone])

  const onSubmit = useCallback(
    () => {
      dispatch({
        type: ADD_POST_REQUEST,
        data: text,
      })
    },
    [text],
  )
  const onClickImageUpload = useCallback(
    () => {
      imageInput.current.click()
    },
    [imageInput.current],
  )
  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="What's happening?!"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>Image Upload</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>Twit</Button>
      </div>
      <div>
        {imagesPaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  )
}

export default PostForm
