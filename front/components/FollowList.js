import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Card, List, Button } from 'antd'
import { StopOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user'

const FollowList = ({ header, data }) => {
  const listStyle = useMemo(() => ({ marginBottom: 20 }), [])
  const gridtStyle = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), [])
  const divStyle = useMemo(() => ({ textAlign: 'center', margin: '10px 0' }), [])
  const listItemStyle = useMemo(() => ({ marginTop: 20 }), [])
  const dispatch = useDispatch()

  const onClickUnfollow = (id) => () => {
    if (header === 'followings') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      })
    } else {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      })
    }
  }

  return (
    <List
      style={listStyle}
      grid={gridtStyle}
      size="samll"
      header={<div>{header}</div>}
      loadMore={(
        <div style={divStyle}>
          <Button>More</Button>
        </div>
      )}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={listItemStyle}>
          <Card actions={[<StopOutlined key="stop" onClick={onClickUnfollow(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  )
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default FollowList
