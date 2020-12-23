import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { createSearch, fetchAllSearches } from '../redux/actions/searchesActionCreators';

import NotificationAlert from 'react-notification-alert';
import SearchesCollection from '../components/searchescollection.component';
import createPages from '../createPage';
import { fetchAllPlaces } from '../redux/actions/placesActionCreators';

const SearchPage = ({ loading, places, searches, dispatchFetchAllPlacesAction, dispatchFetchAllSearchesAction, dispatchCreateSearchAction }) => {
    const [selectedIdPlace, setSelectedIdPlace] = useState('');
    const [selectedNamePlace, setSelectedNamePlace] = useState('');
    const [error, setError] = useState({ selectedIdPlace: false, selectedNamePlace: false });
    const currentPage = useSelector(state => state.searches.currentPage);
    const totalPages = useSelector(state => state.searches.totalPages);
    const notifyEl = useRef(null);
    const perPage = 10;
    const pages = []

    useEffect(() => {
        dispatchFetchAllPlacesAction();
    }, [dispatchFetchAllPlacesAction]);

    useEffect(() => {
        dispatchFetchAllSearchesAction({ page: String(currentPage), per_page: String(perPage) });
    }, [dispatchFetchAllSearchesAction, currentPage]);

    createPages(pages, totalPages, currentPage);

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

    const handleOnSubmit = event => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();

        if (selectedIdPlace.length < 1 || (error.selectedIdPlace || error.selectedNamePlace)) {
            notify('danger', `Error please select a City`);
            return false;
        }

        const search = { search: { city_name: selectedNamePlace, place_id: selectedIdPlace } };
        dispatchCreateSearchAction(search, currentPage, perPage,
            () => {
                notify('success', `Search Created Successfully!`);
                // console.log('Search Created Successfully!');
            },
            (message) => {
                notify('danger', `Error ${message}`);
                // console.log(`Error: ${message}`);
            });
    }

    const setValues = (place_id_selected, city_name_selected) => {
        setSelectedIdPlace(place_id_selected);
        setSelectedNamePlace(city_name_selected);
    }

    const isFormInvalid = () => (!selectedIdPlace || !selectedNamePlace);

    const updateErrorFlags = () => {
        const errObj = { selectedIdPlace: false, selectedNamePlace: false };
        if (!selectedIdPlace.trim()) errObj.selectedIdPlace = true;
        if (!selectedNamePlace.trim()) errObj.selectedNamePlace = true;
        setError(errObj);
    }

    return (

        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4"></CardTitle>
                                <Row>
                                    <Col md={7}>
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <NotificationAlert ref={notifyEl} />
                                        {/* This is the select for md and lg */}
                                        <Input type="select" name="select" className="d-none d-md-block"
                                            style={window.innerWidth <= 400 ? { marginLeft: 0, WebkitAppearance: "none" } : { marginLeft: 15, WebkitAppearance: "none" }}
                                            onChange={e => setValues(e.currentTarget.value, e.currentTarget[e.currentTarget.selectedIndex].text)}>
                                            <option>Pick the City</option>
                                            {(typeof (places.data) != "undefined" && places.data.length > 0)
                                                ?
                                                places.data.map(item => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))
                                                :
                                                null
                                            }
                                        </Input>
                                        {/* This is the select for lower than md */}
                                        <Input type="select" name="select" className="d-md-none"
                                            style={window.innerWidth <= 400 ? { marginLeft: 0, WebkitAppearance: "none" } : { marginLeft: 0, WebkitAppearance: "none" }}
                                            onChange={e => setValues(e.currentTarget.value, e.currentTarget[e.currentTarget.selectedIndex].text)}>
                                            <option>Pick the City</option>
                                            {(typeof (places) != "undefined" && places.length > 0)
                                                ?
                                                places.map(item => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))
                                                :
                                                null
                                            }
                                        </Input>
                                    </Col>
                                    <Col md={1} sm={12}>
                                        <br className="d-md-none" />
                                        <Button className="btn-round" style={{ margin: 0 }} onClick={handleOnSubmit} color="primary" title="Search"><i className="nc-icon nc-zoom-split"></i></Button>
                                    </Col>
                                </Row>
                            </CardHeader>

                            <CardBody>
                                {
                                    (typeof (searches.searches) !== "undefined" && searches.searches.length > 0)
                                        ?
                                        <SearchesCollection searches={searches.searches} />
                                        :
                                        <Row className="text-center">
                                            <Col md={12}>
                                                <blockquote>
                                                    <div className="blockquote blockquote-primary">
                                                        <h1>
                                                            <b>
                                                                <label htmlFor="">
                                                                    <i className="nc-icon nc-zoom-split"></i>
                                                                </label>
                                                            </b>
                                                        </h1>
                                                        <h1 className="text-center d-none d-md-block text-warning">You don't have any searches</h1>
                                                        <h4 className="text-center d-md-none text-warning">You don't have any searches</h4>
                                                        {/* <Input type="select" name="select" id="withoutSearchInput"
                                                            style={window.innerWidth <= 400 ? { marginLeft: 0, WebkitAppearance: "none" } : { marginLeft: 15, WebkitAppearance: "none" }}
                                                            onChange={e => setValues(e.currentTarget.value, e.currentTarget[e.currentTarget.selectedIndex].text)}>
                                                            <option>Pick the City</option>
                                                            {(typeof (places.data) != "undefined" && places.data.length > 0)
                                                                ?
                                                                places.data.map(item => (
                                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                                ))
                                                                :
                                                                null
                                                            }
                                                        </Input>
                                                        <Button onClick={addFirtSearch}></Button> */}
                                                    </div>
                                                </blockquote>
                                            </Col>
                                        </Row>
                                }
                                <br />
                                {
                                    (typeof (searches.searches) !== "undefined" && typeof (searches.searches.length > 0))
                                        ?
                                        <div className="pages">
                                            {
                                                pages.length > 1
                                                    ?
                                                    <Pagination className="float-right" aria-label="Page navigation example">
                                                        <PaginationItem disabled={currentPage === 1 ? true : false}>
                                                            <PaginationLink onClick={() => dispatchFetchAllSearchesAction({ page: String(1), per_page: String(perPage) })}>First</PaginationLink>
                                                        </PaginationItem>
                                                        {

                                                            pages.map((page, index) => (
                                                                <PaginationItem key={index} active={currentPage === page ? true : false}>
                                                                    <PaginationLink disabled={currentPage === page ? true : false} onClick={() => dispatchFetchAllSearchesAction({ page: String(page), per_page: String(perPage) })}>{page}</PaginationLink>
                                                                </PaginationItem>
                                                            ))
                                                        }
                                                        <PaginationItem disabled={currentPage === totalPages ? true : false}>
                                                            <PaginationLink onClick={() => dispatchFetchAllSearchesAction({ page: String(totalPages), per_page: String(perPage) })}>Last</PaginationLink>
                                                        </PaginationItem>
                                                    </Pagination>
                                                    :
                                                    null

                                            }
                                        </div>
                                        :
                                        null
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    loading: state.loading,
    places: state.places,
    searches: state.searches
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllPlacesAction: () => dispatch(fetchAllPlaces()),
    dispatchFetchAllSearchesAction: (page, per_page) => dispatch(fetchAllSearches(page, per_page)),
    dispatchCreateSearchAction: (search, page, per_page, onSuccess, onError) =>
        dispatch(createSearch(search, page, per_page, onSuccess, onError))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);