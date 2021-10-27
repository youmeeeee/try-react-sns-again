import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Menu, Input, Row, Col } from 'antd'

const AppLayout = ({children}) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>SNS</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>Profile</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }}/>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>Sign up</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6} >
                    Left
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/youmekko" target="_blank" rel="noreferrer noopener">Youmekko</a>
                </Col>
            </Row>
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default AppLayout
