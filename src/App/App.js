import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import HandleError from '../HandleError/HandleError';

import './App.css';

class App extends Component {


    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                        // render={()=> <HandleError><NoteListMain/></HandleError>}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                {/* <Route path ="/add-folder" render={() => <HandleError><AddFolder/></HandleError>}/> */}
                <Route path ="/add-folder" component={AddFolder}/>
                <Route path="/add-note" component={NotePageNav} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
            </>
        );
    }

    render() {

        return (
            <HandleError>
                {/* <ApiContext.Provider value={value}> */}
                    <div className="App">
                        {/* <HandleError> */}
                            <nav className="App__nav">{this.renderNavRoutes()}</nav>
                        {/* </HandleError> */}
                            <header className="App__header">
                                <h1>
                                    <Link to="/">Noteful</Link>{' '}
                                    <FontAwesomeIcon icon="check-double" />
                                </h1>
                            </header>
                            {/* <HandleError> */}
                            <main className="App__main">{this.renderMainRoutes()}</main>
                            {/* </HandleError> */}
                        </div>
                {/* </ApiContext.Provider> */}
             </HandleError>
        );
    }
}

export default App;