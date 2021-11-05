import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/g)) {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Link href={`/hashtag/${v.slice(1)}`} key={i}>
            <a>{v}</a>
          </Link>
        )
      }
      return v
    })}
  </div>
)

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
}

export default PostCardContent
