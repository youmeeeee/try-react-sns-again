import React, { useCallback, useRef, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import useInput from '../hooks/useInput'
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE_REQUEST } from '../reducers/post'

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
      if (!text || !text.trim()) {
        alert('There is no text!')
        return
      }
      const formData = new FormData()
      imagesPaths.forEach((i) => {
        formData.append('image', i)
      })
      formData.append('content', text)
      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      })
    },
    [text, imagesPaths],
  )
  const onClickImageUpload = useCallback(
    () => {
      imageInput.current.click()
    },
    [imageInput.current],
  )
  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files)
    const imageFormData = new FormData()
    const test = []
    test.forEach.call(e.target.files, (f) => { // e.target.files는 유사배열
      imageFormData.append('image', f)
    })
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    })
  }, [])
  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE_REQUEST,
      data: index,
    })
  }, [])
  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="What's happening?!"
      />
      <div>
        <input type="file" name="_image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>Image Upload</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>Twit</Button>
      </div>
      <div>
        {imagesPaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  )
}

export default PostForm
