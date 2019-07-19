import React from 'react'
import ValidationError from '../ValidationError'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types';
import './EditNote.css'

class EditNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          content: '',
          folder: '',
          formValid: false,
            validationMessages: {
                name: '',
                content: '',
                folder: ''
              }
        }

    }
   
    static defaultProps ={
        onAddNote: () => {},
      }
    updateName(name) {
        this.setState({name}, () => {this.validateName(name)});
      }
    updateContent(content) {
      this.setState({content}, () => {this.validateContent(content)});
    }
    updateFolder(folder) {
      this.setState({folder}, () => folder);
    }
    
    handleSubmit(event) {
        event.preventDefault();  
        const noteId = this.props.match.params.noteId
        console.log(noteId)
        const note = {
          name: this.state.name,
          content: this.state.content,
          modified: new Date(),
        }
        console.log(note)
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'PATCH',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            }    
        })
        .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.text()
          })
          .then(data => {
            this.context.updateNote(data)
            this.props.history.push('/')
          })
          .catch(error => {
            // getDerivedStateFromError({ error })
          })
    }
    
    validateName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.name = 'Name is required';
          hasError = true;
        } else {
          if (fieldValue.length < 3) {
            fieldErrors.name = 'Name must be at least 3 characters long';
            hasError = true;
          } else {
            fieldErrors.name = '';
            hasError = false;
          }
        }
    
        this.setState({
          validationMessages: fieldErrors,
          nameValid: !hasError
        }, this.formValid );
    
      }

      validateContent(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.name = 'Content is required';
          hasError = true;
        } else {
          if (fieldValue.length < 3) {
            fieldErrors.name = 'Content must be at least 3 characters long';
            hasError = true;
          } else {
            fieldErrors.name = '';
            hasError = false;
          }
        }
    
        this.setState({
          validationMessages: fieldErrors,
          nameValid: !hasError
        }, this.formValid );
    
      }

      handleClickCancel = () => {
        this.props.history.push('/')
      };

      static contextType = ApiContext;

    render() {
        const { error, title, url, description, rating } = this.state
        const {folders} = this.context
        return (
          <form className="Note" onSubmit={e => this.handleSubmit(e)}>
          <h2>Edit Note</h2> 
          <button type='button' onClick={this.handleClickCancel}>
              Cancel
          </button>
          <div className="name-group">
          <label htmlFor="name">Note Name</label>
              <input type="text" className="Note__name"
              name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
              <label htmlFor="content">Note Content</label>
              <textarea
              name="note-content" id="content" onChange={e => this.updateContent(e.target.value)}/>
              <button type="submit">Save Changes</button>
          </div>
          <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>  
          </form>
        )
    }
}

export default EditNote;