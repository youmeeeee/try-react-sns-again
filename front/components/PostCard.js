import React, { useState, useCallback } from 'react'
import { Card, Popover, Button, Avatar, List, Comment } from 'antd'
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import PostImages from './PostImages'
import CommentForm from './CommentForm'
import PostCardContent from './PostCardContent'
import FollowButton from './FollowButton'
import { UNLIKE_POST_REQUEST, LIKE_POST_REQUEST, REMOVE_POST_REQUEST } from '../reducers/post'

const PostCard = ({ post }) => {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const { removePostLoading } = useSelector((state) => state.post)
  const id = me?.id // optional chainning === (me && me.id)
  const liked = post.Likers.find((v) => v.id === id)

  const [commentFormOpened, setCommentFormOpened] = useState(false)

  const onLike = useCallback(
    () => {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      })
    },
    [],
  )
  const onUnlike = useCallback(
    () => {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      })
    },
    [],
  )
  const onToggleComment = useCallback(
    () => {
      setCommentFormOpened((prev) => !prev)
    },
    [],
  )
  const onRemovePost = useCallback(
    () => {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: post.id,
      })
    },
    [],
  )

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" onClick={onUnlike} key="heartTwoTone" />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {
                  id && post.User.id === id ? (
                    <>
                      <Button>Edit</Button>
                      <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>Delete</Button>
                    </>
                  ) : <Button>Report</Button>
                }
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        {/* <Image /> */}
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0].toUpperCase()}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
        {/* <Buttons></Buttons> */}
      </Card>
      {
        commentFormOpened && (
          <div>
            <CommentForm post={post} />
            <List
              header={`${post.Comments.length} comments`}
              itemLayout="horizontal"
              dataSource={post.Comments}
              renderItem={(item) => (
                <li>
                  <Comment
                    author={item.User.nickname}
                    avatar={<Avatar>{item.User.nickname[0].toUpperCase()}</Avatar>}
                    content={item.content}
                  />
                </li>
              )}
            />
          </div>
        )
      }
      {/* <Comments /> */}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}

export default PostCard
