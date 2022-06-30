import React from 'react'
// Local imports
import Sidebar from './Sidebar'
import Tasks from '../Tasks'
import CustomizedSnackbars from './Notification'

function Content () {
  return (
    <section className='content'>
      <CustomizedSnackbars />
      <Sidebar />
      <Tasks />
    </section>
  )
}

export default Content
