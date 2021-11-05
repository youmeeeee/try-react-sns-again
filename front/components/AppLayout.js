import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Menu, Input, Row, Col } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'
import { useSelector } from 'react-redux'

import LoginForm from './LoginForm'
import UserProfile from './UserProfile'

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`

const Global = createGlobalStyle`
    .ant-row {
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

    .ant-col:first-child {
        padding-left: 0 !important;
    }

    .ant-col:last-child {
        padding-right: 0 !important;
    }
`

const AppLayout = ({ children }) => {
  const me = useSelector((state) => state.user.me)

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/"><a>SNS</a></Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile"><a>Profile</a></Link>
        </Menu.Item>
        <Menu.Item key="searchInput">
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup"><a>Sign up</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          { me ? <UserProfile /> : <LoginForm />}
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
  children: PropTypes.node.isRequired,
}

export default AppLayout
