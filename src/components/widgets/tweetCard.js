import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './tweetCard.css';

export default class TweetCard extends React.Component {

  constructor(props){
    super(props)
  }

    render(){
        return (
          <Card className="medium_card">
            <CardContent>
            <img src={this.props.tweet.profileImageUrl} alt="Profile Image"></img>

              <Typography color="textSecondary" gutterBottom>
                {this.props.tweet.name}
              </Typography>
              <Typography className="pos" color="textSecondary">
                {this.props.tweet.date}
              </Typography>
              <Typography variant="body2" component="p">
                {this.props.tweet.text}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>window.location = this.props.tweet.url}>Read more</Button>
            </CardActions>
          </Card>
        );
    }
}