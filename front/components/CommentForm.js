import React, { useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'
import { useSelector } from 'react-redux'

const CommentForm = ({ post }) => {
    const id = useSelector(state => state.user.me?.id)
    const [commentText, onChangeCommentText] = useInput('')
    const onSubmiComment = useCallback(
        () => {
            console.log(post.id, commentText)
        },
        [commentText],
    )
    return (
        <Form onFinish={onSubmiComment}>
            <Form.Item style={{ position: 'relative', margin: 0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button 
                    style={{ position: 'absolute', right: 0, bottom: 0 }} 
                    type="primary" 
                    htmlType="submit"
                >
                    Comment
                </Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired
}

export default CommentForm
