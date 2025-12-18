import React from 'react'
import logoReflect from '../assets/images/new_nanthus_kitchen_logo.png'

const ContactPage = () => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#001e36', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: '#cfeeff', padding: '2rem' }}>
        <img src={logoReflect} alt="logo" style={{ height: 64, marginBottom: 12 }} />
        <p style={{ margin: 0, color: '#9fbfe6' }}>Get in touch — info@example.com</p>
        <p style={{ marginTop: 12 }}><a href="/" style={{ color: '#dbeeff', textDecoration: 'none' }}>Back to home</a></p>
      </div>
    </div>
  )
}

export default ContactPage
