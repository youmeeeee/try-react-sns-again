import React, { useState, useCallback, useRef } from 'react'
import { Form, Input, Button } from 'antd'
import useInput from '../hooks/useInput'
import { useSelector, useDispatch } from 'react-redux'
import { addPost } from '../reducers/post'

const PostForm = () => {
    const [text, setText] = useState('')
    const imageInput = useRef();

    const { imagesPaths } = useSelector(state => state.post)
    const dispatch = useDispatch();
    
    const onChangeText = useCallback(
        (e) => {
            setText(e.target.value)
        }
    )
    const onSubmit = useCallback(
        () => {
            dispatch(addPost)
            setText('');
        },
        [],
    )
    const onClickImageUpload = useCallback(
        () => {
            imageInput.current.click()
        },
        [imageInput.current],
    )
    return (
       <Form style={{ margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
           <Input.TextArea 
                value={text} 
                onChange={onChangeText} 
                maxLength={140} 
                placeholder="What's happening?!" 
            />
            <div>
                <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>Image Upload</Button>
                <Button type="primary" style={{ float: 'right'}} htmlType="submit">Twit</Button>
            </div>
            <div>
                {imagesPaths.map((v) => {
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={v} style={{ width: '200px' }} alt={v} />
                        <div>
                            <Button>Delete</Button>
                        </div>
                    </div>
                })}
            </div>
       </Form>
    )
}

export default PostForm
