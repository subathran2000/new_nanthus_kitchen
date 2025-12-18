import React from 'react'
import ProductCards from '../components/ProductCards'

const FeaturesPage = () => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#001e36', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <ProductCards />
      </div>
    </div>
  )
}

export default FeaturesPage
