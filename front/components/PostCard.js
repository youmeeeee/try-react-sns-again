import React, { useState, useCallback } from 'react'
import { Card, Popover, Button, Avatar, List, Comment } from 'antd'
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import PostImages from './PostImages'
import CommentForm from './CommentForm'
import PostCardContent from './PostCardContent'


const PostCard = ({ post }) => {
    const { me } = useSelector(state => state.user)
    const id = me?.id //optional chainning === (me && me.id)

    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(
        () => {
            setLiked((prev) => !prev)
        },
        [],
    )
    const onToggleComment = useCallback(
        () => {
            setCommentFormOpened((prev) => !prev)
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
                        ? <HeartTwoTone twoToneColor="#eb2f96" onClick={onToggleLike} key="heartTwoTone" /> 
                        : <HeartOutlined key="heart" onClick={onToggleLike} /> 
                    ,
                    <MessageOutlined key="comment" onClick={onToggleComment} />, 
                    <Popover key="more" content={(
                        <Button.Group>
                            { 
                                id && post.User.id === id ? (
                                    <>
                                        <Button>Edit</Button>
                                        <Button type="danger">Delete</Button>
                                    </>
                                ) : <Button>Report</Button>
                            }
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
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
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object)
    }).isRequired
}

export default PostCard
