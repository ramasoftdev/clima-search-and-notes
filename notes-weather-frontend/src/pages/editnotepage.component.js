import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, FormText, Input, Row } from "reactstrap";
import React, { useEffect, useRef, useState } from 'react';
import { createNote, getNoteById, updateNoteById } from '../redux/actions/notesActionCreators';

import NotificationAlert from 'react-notification-alert';
import { connect } from 'react-redux';

const EditNotePage = ({ match, history, dispatchCreateNoteAction, dispatchGetNoteByIdAction,
    dispatchUpdateNoteAction }) => {

    const [title, setTitle] = useState('');
    const [noteDescription, setnoteDescription] = useState('');
    const [error, setError] = useState({ title: false, noteDescription: false });

    const notifyEl = useRef(null);
    
    const notify = (type, msg) => {
        let options = {
            place: 'tr',
            message: (
                <div>
                    <div>
                        <b>{msg}</b>
                    </div>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7
        }
        notifyEl.current.notificationAlert(options);
    }
    
    useEffect(() => {
        const { noteId } = match.params;
        if (noteId) {
            dispatchGetNoteByIdAction(noteId, (data) => {
                setTitle(data.data.note.title);
                setnoteDescription(data.data.note.note_description);
            });
        }
    }, [dispatchGetNoteByIdAction, match.params])

    const handleOnSubmit = event => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();
        const { noteId } = match.params;
        const note_description = noteDescription;
        const note = { title, note_description };
        if (noteId) {
            dispatchUpdateNoteAction(noteId, "1", "10", note,
                async () => {
                    notify('success', `Note Updated Successfully!`);
                    await new Promise(resolve => setTimeout(resolve, 7000));
                    history.replace("/admin/notes");
                    // console.log('Note Updated Successfully!');
                },
                (message) => {
                    notify('danger', `Error ${message}`);
                    // console.log(`Error: ${message}`);
                });
        } else {
            dispatchCreateNoteAction(note, "1", "10",
                async () => {
                    notify('success', `Note Created Successfully!`);
                    await new Promise(resolve => setTimeout(resolve, 7000));
                    history.replace("/admin/notes");
                    // console.log('Note Created Successfully!');
                },
                (message) => {
                    notify('danger', `Error ${message}`);
                    // console.log(`Error: ${message}`);
                });
        }
    }

    const isFormInvalid = () => (!title || !noteDescription);

    const updateErrorFlags = () => {
        const errObj = { title: false, noteDescription: false };
        if (!title.trim()) errObj.title = true;
        if (!noteDescription.trim()) errObj.noteDescription = true;
        setError(errObj);
    }

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">{(title.length > 0 || noteDescription.length > 0) ? 'Edit Note' : 'New Note'}</CardTitle>
                                <Row>
                                    <Col md={7}>
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <NotificationAlert ref={notifyEl} />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form noValidate onSubmit={handleOnSubmit}>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label htmlFor="title">Title</label>
                                                <Input
                                                    className={`form-control ${error.title ? 'is-invalid' : ''}`}
                                                    id="title"
                                                    type="text"
                                                    value={title}
                                                    placeholder="Title"
                                                    onChange={(e) => setTitle(e.target.value)} />
                                                <FormText className="invalid-feedback">Required</FormText>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label htmlFor="noteDescription">Description</label>
                                                <Input noValidate
                                                    className={`form-control ${error.noteDescription ? 'is-invalid' : ''}`}
                                                    id="noteDescription"
                                                    type="textarea"
                                                    rows={5}
                                                    value={noteDescription}
                                                    placeholder="Description"
                                                    onChange={(e) => setnoteDescription(e.target.value)} />
                                                <FormText className="invalid-feedback">Required</FormText>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                className="btn-round mr-2"
                                                color="primary"
                                                type="submit">
                                                Save
                                            </Button>
                                            <Button
                                                className="btn-round"
                                                type="button"
                                                color="secondary"
                                                onClick={() => history.replace("/admin/notes")}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchCreateNoteAction: (note, currentPage, perPage, onSuccess, onError) =>
        dispatch(createNote(note, currentPage, perPage, onSuccess, onError)),
    dispatchUpdateNoteAction: (noteId, currentPage, perPage, note, onSuccess, onError) =>
        dispatch(updateNoteById(noteId, currentPage, perPage, { note }, onSuccess, onError)),
    dispatchGetNoteByIdAction: (noteId, onSuccess) =>
        dispatch(getNoteById(noteId, onSuccess))
});


export default connect(null, mapDispatchToProps)(EditNotePage);