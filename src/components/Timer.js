import React from "react";
import Moment from 'react-moment';

export default class Timer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    componentDidMount(){
        this.timerID = setInterval( () => this.tick(), 1000 );
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    
    tick() {
        this.setState({ date: new Date() });  
    }

    render() {
        return (
            <div className="timer">
                <h6 className="text-right">
                {/* { this.state.date.toLocaleString() } */}
                <Moment date={ this.state.date } format="DD/MM/YYYY HH:mm:ss"></Moment>
                </h6>
            </div>
        );
    }
}
