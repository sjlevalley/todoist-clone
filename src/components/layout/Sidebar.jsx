import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
// Local imports
import AddProject from '../AddProject'
import { getProjectsAction } from '../../redux/projectsSlice/projectsActions'
import { getTasksAction } from '../../redux/tasksSlice/tasksActions'
import { Projects } from '../Projects'
import { projectActions } from '../../redux/projectsSlice/projectsSlice'
// Mui imports
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar
} from 'react-icons/fa'

const StyledAddProject = styled.div`
  margin: 10px 0 0 15px;
  transition: transform 0.1s;
  :hover {
    transform: scale(1.02);
  }
  :active {
    transform: scale(0.98);
  }
`
const StyledBox = styled(Box)`
  display: flex !important;
  margin: 0 0 20px 15px !important;
`
const StyledProgress = styled(CircularProgress)`
  color: #ca2100 !important;
`

function Sidebar () {
  const dispatch = useDispatch()
  const project = useSelector(state => state.projects.project)
  const projectsLoading = useSelector(state => state.projects.loading)
  const projectDialogOpen = useSelector(
    state => state.projects.projectDialogOpen
  )
  const [active, setActive] = useState(project)
  const [showProjects, setShowProjects] = useState(true)

  const { setProject } = projectActions

  useEffect(() => {
    dispatch(getProjectsAction())
  }, [])

  useEffect(() => {
    setActive(project)
  }, [project])

  const handleAction = value => {
    dispatch(setProject(value))
    dispatch(getTasksAction(value))
  }

  return (
    <div className='sidebar' data-testid='sidebar'>
      <ul className='sidebar__generic'>
        <li
          data-testid='inbox'
          className={active === 'INBOX' ? 'active' : undefined}
        >
          <div
            data-testid='inbox-action'
            aria-label='Show inbox tasks'
            tabIndex={0}
            role='button'
            onClick={() => handleAction('INBOX')}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAction('INBOX')
              }
            }}
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li
          data-testid='today'
          className={active === 'TODAY' ? 'active' : undefined}
        >
          <div
            data-testid='today-action'
            aria-label="Show today's tasks"
            tabIndex={0}
            role='button'
            onClick={() => {
              handleAction('TODAY')
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAction('TODAY')
              }
            }}
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          data-testid='next_7'
          className={active === 'NEXT_7' ? 'active' : undefined}
        >
          <div
            data-testid='next_7-action'
            aria-label='Show tasks for the next 7 days'
            tabIndex={0}
            role='button'
            onClick={() => {
              handleAction('NEXT_7')
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAction('NEXT_7')
              }
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
      </ul>
      <div
        className='sidebar__middle'
        aria-label='Show/hide projects'
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={e => {
          if (e.key === 'Enter') setShowProjects(!showProjects)
        }}
        role='button'
        tabIndex={0}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? 'hidden-projects' : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>
      {projectsLoading && !projectDialogOpen ? (
        <StyledBox>
          <StyledProgress size={25} />
        </StyledBox>
      ) : (
        <ul className='sidebar__projects'>
          {showProjects && <Projects active={active} setActive={setActive} />}
        </ul>
      )}
      <StyledAddProject>{showProjects && <AddProject />}</StyledAddProject>
    </div>
  )
}

export default Sidebar
