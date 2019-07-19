import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import { countNotesForFolder } from '../notes-helpers'

export default class Folder extends React.Component {
    static contextType = ApiContext;

    handleClickDelete = e => {
        e.preventDefault()
        const folderId = this.props.id
    
        fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
          .then(res => {
            
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.text()
          })
          .then(() => {
            this.context.deleteFolder(folderId)
            // allow parent to perform extra behaviour
            // this.props.onDeleteNote(folderId)
          })
          .catch(error => {
            console.error({ error })
          })
      }

    render() {
        const {id, notes, name} = this.props
        return (
            <li key={id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, id)}
                </span>
                {name}
              </NavLink>
              <button
                className='Note__delete'
                type='button'
                onClick={this.handleClickDelete}
              >
                <FontAwesomeIcon icon='trash-alt' />
                {' '}
              </button>
            </li>
        )
    }
}
