import { Card, CardBody, Col, Container, Row } from "reactstrap";

import LoginForm from '../components/login.component';
import React from 'react';
import RegisterForm from '../components/register.component';

const AuthPage = () => (
    <Container>
        <Row className="row justify-content-between" style={{ marginTop: 15 }}>
            <Col md={5}>
                <Card className="card-stats">
                    <CardBody>
                        <LoginForm />
                    </CardBody>
                </Card>
            </Col>
            <Row style={{ border: '1px solid #ababab', marginBottom: 20, marginTop: 15 }} />
            <Col md={6}>
                <Card className="card-stats">
                    <CardBody>
                        <RegisterForm />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>

);

export default AuthPage;