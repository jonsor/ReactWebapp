import React from 'react';
import ReactDOM from 'react-dom';

export class Dashboard extends React.Component{

    constructor(){
        super();
        this.state = {
            titleText: "Hello World!"
        }
    }

    render(){
        return(
        <div>
            <p>{this.state.titleText}</p>
        </div>
        );
    }
}