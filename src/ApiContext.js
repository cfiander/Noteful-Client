import React, { Component } from 'react'
import config from './config';

const ApiContext = React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export default ApiContext;


export class ApiProvider extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    handleAddFolder = folder => {
        // throw new Error('Error');
        this.setState({
            folders: [...this.state.folders, folder],
        })
    }

    handleAddNote = note => {
        this.setState({
            notes: [...this.state.notes, note],
        })
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote
        };
        return (
                <ApiContext.Provider value={value}>
                    {this.props.children}
                </ApiContext.Provider>
                )
        }
      }