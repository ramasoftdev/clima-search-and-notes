import React from 'react';
import { connect } from 'react-redux';

const Spinner = ({ isLoading }) => (
    <React.Fragment>
        {
            isLoading ?
                <div className="col-11 col-sm-4"
                    style={{
                        display: "inline-block",
                        margin: "0px auto",
                        position: "fixed",
                        transition: "all 0.5s ease-in-out 0s",
                        zIndex: 1031,
                        top: 20,
                        right: 20
                    }}>
                    <div className="alert-with-icon animated alert alert-info alert-dismissible fade show" role="alert">
                        <span data-notify="icon" style={{marginTop: -20}}><div className="spinner-grow text-light" role="status"></div></span>
                        <span data-notify="message">
                            <div>
                                <div><b>&nbsp;Loaging...&nbsp;</b></div>
                            </div>
                        </span>
                    </div>
                </div>
                :
                null
        }
    </React.Fragment>
);

const mapStateToProps = state => ({
    isLoading: state.loading
})

export default connect(mapStateToProps)(Spinner);