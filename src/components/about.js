import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class About extends React.Component {

  constructor(props){
    super(props)
  }

    render(){
        return (
          <Card className="medium_card">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                About
              </Typography>
              <Typography className="pos" color="textSecondary">
                Stuff about us
              </Typography>
              <Typography variant="body2" component="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
              <img src="https://www.consolebit.com/static/images/about-hm-img.png" alt="About Image"></img>
            </CardContent>
          </Card>
        );
    }
}