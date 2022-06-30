import React from 'react'
// Local imports
import firebase from '../firebase'

function Checkbox ({ id }) {
  const archiveTask = () => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .update({ archived: true })
  }
  return (
    <div
      className='checkbox-holder'
      data-testid='checkbox-action'
      onClick={() => archiveTask()}
    >
      <span className='checkbox' />
    </div>
  )
}

export default Checkbox
