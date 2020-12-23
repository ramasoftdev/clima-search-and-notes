import { Card, CardBody, CardHeader, CardTitle, Col, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import NotesCollection from '../components/notescollection.component';
import { connect } from 'react-redux';
import createPages from '../createPage';
import { fetchAllNotes } from '../redux/actions/notesActionCreators';
import { useSelector } from 'react-redux';

const NotePage = ({ loading, notes, dispatchFetchAllNotesAction }) => {

    const currentPage = useSelector(state => state.notes.currentPage);
    const totalPages = useSelector(state => state.notes.totalPages);
    const perPage = 10;

    useEffect(() => {
        dispatchFetchAllNotesAction({ page: String(currentPage), per_page: String(perPage) });
    }, [dispatchFetchAllNotesAction, currentPage]);

    const pages = []
    createPages(pages, totalPages, currentPage);

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4"></CardTitle>
                                <Row>
                                    <Col md={10}>
                                    </Col>
                                    <Col md={2} sm={12} xs={12}>
                                        <Link to="/admin/edit-note" className="btn btn-primary btn-round" title="Create Note"
                                            style={{ marginLeft: -10 }}>
                                            Create Note | <i className="nc-icon nc-simple-add" style={{ top: 3, fontSize: 15 }}></i>
                                        </Link>
                                    </Col>
                                </Row>
                            </CardHeader>

                            <CardBody>
                                {
                                    (typeof (notes.notes) !== "undefined" && notes.notes.length > 0)
                                        ?
                                        <NotesCollection notes={notes.notes} />
                                        :
                                        <Row className="text-center">
                                            <Col md={12}>
                                                <blockquote>
                                                    <div className="blockquote blockquote-primary">
                                                        <Link to="/admin/edit-note" title="Create Note">
                                                            <h1>
                                                                <b>
                                                                    <label htmlFor="">
                                                                        <i className="nc-icon nc-book-bookmark"></i>
                                                                    </label>
                                                                </b>
                                                            </h1>
                                                            <h1 className="text-center d-none d-md-block text-warning">You don't have any notes</h1>
                                                            <h4 className="text-center d-md-none text-warning">You don't have any notes</h4>
                                                        </Link>
                                                        <Link to="/admin/edit-note" className="btn btn-primary btn-round btn-lg" title="Create Note"
                                                            style={{ marginLeft: -10 }}>
                                                            New Note | <i className="nc-icon nc-simple-add" style={{ top: 3, fontSize: 15 }}></i>
                                                        </Link>
                                                    </div>
                                                </blockquote>
                                            </Col>
                                        </Row>
                                }
                                <br />
                                {
                                    (typeof (notes.notes) !== "undefined" && typeof (notes.notes.length > 0))
                                        ?
                                        <div className="pages">
                                            {
                                                pages.length > 1
                                                    ?
                                                    <Pagination className="float-right" aria-label="Page navigation example">
                                                        <PaginationItem disabled={currentPage === 1 ? true : false}>
                                                            <PaginationLink onClick={() => dispatchFetchAllNotesAction({ page: String(1), per_page: String(perPage) })}>First</PaginationLink>
                                                        </PaginationItem>
                                                        {

                                                            pages.map((page, index) => (
                                                                <PaginationItem key={index} active={currentPage === page ? true : false}>
                                                                    <PaginationLink disabled={currentPage === page ? true : false} onClick={() => dispatchFetchAllNotesAction({ page: String(page), per_page: String(perPage) })}>{page}</PaginationLink>
                                                                </PaginationItem>
                                                            ))
                                                        }
                                                        <PaginationItem disabled={currentPage === totalPages ? true : false}>
                                                            <PaginationLink onClick={() => dispatchFetchAllNotesAction({ page: String(totalPages), per_page: String(perPage) })}>Last</PaginationLink>
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
    );
}

const mapStateToProps = state => ({
    loading: state.loading,
    notes: state.notes
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllNotesAction: (page, per_page) => dispatch(fetchAllNotes(page, per_page))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);