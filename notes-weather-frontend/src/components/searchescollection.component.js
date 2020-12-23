import React, {useState} from 'react';
import { connect, useSelector } from 'react-redux';

import { Table } from "reactstrap";
import { deleteSearchById } from '../redux/actions/searchesActionCreators';
import { toast } from 'react-toastify';

const SearchesCollection = ({ searches, dispatchDeleteAction }) => {

    const [selectedSearch, setSelectedSearch] = useState('');

    const currentPage = useSelector(state => state.searches.currentPage);
    const perPage = 10;

    const showConfirmationModal = (event, searchId) => {
        event.preventDefault();
        setSelectedSearch(searchId);
        window.$('#confirmationModal').modal('show');
    };
    
    const handleOnDelete = () => {
        dispatchDeleteAction(selectedSearch, currentPage, perPage, () => {
            window.$('#confirmationModal').modal('hide');
            toast.success('Search deleted Successfully!');
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
                        <th style={{ textAlign: "center" }} scope="col">City</th>
                        <th style={{ textAlign: "center" }} scope="col">Temp</th>
                        <th style={{ textAlign: "center" }} scope="col">Feels Like</th>
                        <th style={{ textAlign: "center" }} scope="col">Min Temp</th>
                        <th style={{ textAlign: "center" }} scope="col">Max Temp</th>
                        <th style={{ textAlign: "center" }} scope="col">Humidity</th>
                        <th style={{ textAlign: "center" }} scope="col">Wind Speed</th>
                        <th style={{ textAlign: "center" }} scope="col">Description</th>
                        <th style={{ textAlign: "center" }} scope="col">Date</th>
                        <th scope="col" style={{textAlign: "center"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(typeof (searches) != "undefined" && searches.length > 0)
                        ?
                        searches.map(item => (

                            <tr key={item.id}>
                                <td style={{ textAlign: "center" }}>{(item.place_name != null) ? `${item.place_name}` : '-'}</td>
                                <td style={{ textAlign: "center" }}>{(item.temp != null) ? `${item.temp}` : '-'}</td>
                                <td style={{ textAlign: "center" }}>{(item.feels_like != null) ? item.feels_like : '-'}</td>
                                <td style={{ textAlign: "center" }}>{(item.temp_min != null) ? item.temp_min : '-'}</td>
                                <td style={{ textAlign: "center" }}>{(item.temp_max != null) ? item.temp_max : '-'}</td>
                                <td style={{ textAlign: "center" }}>{(item.humidity != null) ? `${item.humidity} %` : '-'} %</td>
                                <td style={{ textAlign: "center" }}>{(item.wind_speed != null) ? item.wind_speed : '-'}</td>
                                <td style={{ textAlign: "center" }}>{(item.description != null) ? item.description : '-'}</td>
                                <td style={{ textAlign: "center" }}>{(item.search_created_at != null) ? item.search_created_at : '-'}</td>
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
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchDeleteAction: (searchId, currentPage, perPage, onSuccess, onError) =>
        dispatch(deleteSearchById(searchId, currentPage, perPage, onSuccess, onError))
});

export default connect(null, mapDispatchToProps)(SearchesCollection);

const Modal = ({ handleOnDelete }) => (
    <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this search ?</p>
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