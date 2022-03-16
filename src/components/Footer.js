import React from "react";
import { Container } from 'react-bootstrap';

export default class Footer extends React.Component {

    render() {
        return (
            <div className="footer">
                <footer className="bg-light p-2" 
                    style={{ 
                        position: "fixed", 
                        bottom: "0", 
                        fontSize: ".8rem",
                        textTransform: "uppercase",
                        width: "100%", 
                        zIndex: "1100" 
                    }}>
                    <Container className="text-center">
                        <div>
                            <p className="m-0">Software by <a href="http://gnanagurutech.com">Gnanaguru Technologies</a></p>
                        </div>
                    </Container>
                </footer>
            </div>
        );
    }
}