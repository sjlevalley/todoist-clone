import React from 'react'
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar
} from 'react-icons/fa'

function Sidebar () {
  return (
    <div className='sidebar' data-testid='sidebar'>
      <ul className='sidebar__generic'>
        <li>
          <span>Inbox</span>
          <span>
            <FaInbox />
          </span>
        </li>
        <li>
          <span>Today</span>
          <span>
            <FaRegCalendar />
          </span>
        </li>
        <li>
          <span>Next 7 Days</span>
          <span>
            <FaRegCalendarAlt />
          </span>
        </li>
      </ul>
      <div className='sidebar__middle'>
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className='sidebar__projects'>Projects will be here!</ul>
      Add Project Component Here!
    </div>
  )
}

export default Sidebar
