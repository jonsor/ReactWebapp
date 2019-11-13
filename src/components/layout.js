import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';

export class Layout extends React.Component{

    constructor(){
        super();
        this.state ={
            open: true
        }
    }

    handleClose(){

    }

    render(){
        return(
        <div>
            <Drawer
                containerStyle={{height: 'calc(100% - 64px)', top: 64}}
                docked={true}
                width={200}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})
                }
                >
                <AppBar title="AppBar" />
                <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
                <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
            </Drawer>

            <main style={{background:"#ff0000"}}>
                <p style = {{height:"100%"}}>"MAIN PAGE"</p>
            </main>
        </div>
        
        );
    }
}