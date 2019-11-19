import React from 'react';
import Grid from '@material-ui/core/Grid';
import TweetCard from './widgets/tweetCard';
import TextField from '@material-ui/core/TextField';

export default class Dashboard extends React.Component{

    constructor(){
        super();
        this.state = {
            titleText: "Hello World!",
            tweets: []
        }
        this.fetchTweets.bind(this)
        this.handleSearchChange.bind(this)
        this.fetchTweets("Apple")
        this.startTime = new Date()
        this.endTime = this.startTime

        this.fetchTimeout = null;
    }

    fetchTweets(keyword){
        var url = 'http://localhost:7071/api/tweets/' + keyword;
        console.log("url: " + url)
        fetch(url, {
            method:'GET'
        })
            .then(response => response.json())
            .then(data => this.parseTweets(data));
    }

    parseTweets(data){
        var tempTweets = data.statuses;
        if(tempTweets == null || tempTweets == undefined){
            return
        }
        var tweets = [];
        for(var i = 0; i < tempTweets.length; i++){
            var text = tempTweets[i].text
            var date = tempTweets[i].created_at
            var userName = tempTweets[i].user.name

            tweets.push({
                name: userName,
                date: date,
                text: text
            })
        }

        this.setState({tweets: tweets})
        console.log("old tweets: " + this.state.tweets)
        console.log("new tweets: " + this.tweets)
        
    }
    
    handleSearchChange = (input) => {
      var value = input.target.value

    //   this.endTime = new Date();
    //   var timeDiff = this.endTime - this.startTime;
    //   this.startTime = this.endTime;
        if(value !== ""){
            // this.fetchTweets(value)
            clearTimeout(this.fetchTimeout)
            this.fetchTimeout = setTimeout(this.fetchTweets(value), 1000);
            // this.fetchTweets(value);
        }
    }

    renderTweetCards() {
        return this.state.tweets.map(value =>{
            return(
                <Grid container item md={12} key={value.name + Math.random()}>
                    <TweetCard tweet={value}/>
                </Grid>
            )
        })
    }

    render(){
        return(
        <div>
            <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            className="textField"
            margin="normal"
            variant="outlined"
            onChange={this.handleSearchChange}
            />
            <Grid container spacing={1}>
                {this.renderTweetCards()}
            </Grid>
        </div>
        );
    }
}