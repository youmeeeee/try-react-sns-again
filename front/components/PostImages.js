import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons'
import ImagesZoom from './imagesZoom'

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false)
  const onZoom = useCallback(
    () => {
      setShowImageZoom(true)
    },
    [],
  )
  const onClose = useCallback(
    () => {
      setShowImageZoom(false)
    },
    [],
  )
  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }
  if (images.length === 2) {
    return (
      <>
        <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={`http://localhost:3065/${images[1].src}`} alt={images[0].src} onClick={onZoom} />
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }
  return (
    <>
      <div>
        <img role="presentation" style={{ width: '50%' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1} more
        </div>
      </div>
      {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  )
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
}

export default PostImages
