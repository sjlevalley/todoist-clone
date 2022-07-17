import React from 'react'
// Local imports
import CustomizedSnackbars from './Notification'
import Sidebar from './Sidebar'
import Tasks from '../Tasks'

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
