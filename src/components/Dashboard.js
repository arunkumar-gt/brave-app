import React from "react";
import Timer from './Timer.js';
import { Container } from 'react-bootstrap';

export default class Dashboard extends React.Component {

    constructor(props){
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div className="dashboard">
                <Container>
                    <Timer />
                    <div className="text-center">
                        <h3>Welcome { this.props.userData.employeename }</h3>
                    </div>
                </Container>
            </div>
        );
    }
}