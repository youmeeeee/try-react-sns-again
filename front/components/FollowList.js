import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Card, List, Button } from 'antd'
import { StopOutlined } from '@ant-design/icons'

const FollowList = ({ header, data }) => {
    const listStyle = useMemo(() => ({marginBottom: 20}), [])
    const gridtStyle = useMemo(() => ({gutter: 4, xs: 2, md: 3}), [])
    const divStyle = useMemo(() => ({textAlign: 'center', margin: '10px 0'}), [])
    const listItemStyle = useMemo(() => ({marginTop: 20}), [])

    return (
        <List
            style={listStyle}
            grid={gridtStyle}
            size="samll"
            header={<div>{header}</div>}
            loadMore={
                <div style={divStyle}>
                    <Button>More</Button>
                </div>
            }
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={listItemStyle}>
                    <Card actions={[<StopOutlined key="stop" />]}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    )
}

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
}

export default FollowList
