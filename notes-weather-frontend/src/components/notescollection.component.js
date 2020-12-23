import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { Table } from "reactstrap";
import { deleteNoteById } from '../redux/actions/notesActionCreators';
import { toast } from 'react-toastify';

const NotesCollection = ({ notes, dispatchDeleteAction }) => {
    const [selectedNote, setSelectedNote] = useState('');

    const currentPage = useSelector(state => state.notes.currentPage);
    const perPage = 10;
    

    const showConfirmationModal = (event, noteId) => {
        event.preventDefault();
        setSelectedNote(noteId);
        window.$('#confirmationModal').modal('show');
    };
    
    const handleOnDelete = () => {
        dispatchDeleteAction(selectedNote, currentPage, perPage, () => {
            window.$('#confirmationModal').modal('hide');
            toast.success('Note deleted Successfully!');
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            toast.error(`Error: ${message}`);
        });
    };


    return (
        <React.Fragment>
            <Table responsive>
                <thead className="text-primary">
                    <tr>
                        <th scope="col" style={{textAlign: "center"}}>Title</th>
                        <th scope="col" style={{textAlign: "center"}}>Description</th>
                        <th scope="col" style={{textAlign: "center"}}>Date</th>
                        <th scope="col" style={{textAlign: "center"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(typeof (notes) != "undefined" && notes.length > 0)
                        ?
                        notes.map(item => (
                            <tr key={item.id}>
                                <td style={{textAlign: "center"}}><Link to={`/admin/edit-note/${item.id}`}>{item.title}</Link></td>
                                <td style={{textAlign: "center"}}>{item.note_description}</td>
                                <td style={{textAlign: "center"}}>{item.updated_at.split('T')[0]} {item.updated_at.split('T')[1].split('.')[0]}</td>
                                <td style={{textAlign: "center"}}>
                                    <a title={`Delete Note ${item.title}`} style={{backgroundColor: '#dc3545'}} href="/" onClick={(e) => showConfirmationModal(e, item.id)} className="btn btn-danger btn-sm">
                                        <i className="nc-icon nc-simple-delete"></i>
                                    </a>
                                </td>
                            </tr>
                        ))
                        :
                        null
                    }
                </tbody>
            </Table>
        <Modal handleOnDelete={handleOnDelete} />
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchDeleteAction: (noteId, currentPage, perPage, onSuccess, onError) =>
        dispatch(deleteNoteById(noteId, currentPage, perPage, onSuccess, onError))
});

export default connect(null, mapDispatchToProps)(NotesCollection);

const Modal = ({ handleOnDelete }) => (
    <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this note ?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" className="btn btn-secondary btn-round">
                        No
                    </button>
                    <button type="button" data-dismiss="modal" onClick={handleOnDelete} className="btn btn-primary btn-round">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </div>
);