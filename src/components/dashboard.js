import React from 'react';
import Grid from '@material-ui/core/Grid';
import TweetCard from './widgets/tweetCard';
import TextField from '@material-ui/core/TextField';
import SuggestedCompanyCard from './widgets/suggestedCompanyCard'
import './dashboard.css'
import Card from '@material-ui/core/Card'
import ChartCard from './widgets/chartCard'

export default class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            tweets: [],
            topCompanies: [],
            companyStockData: [],
            range: { low: 0, high: 0 }
        }
        this.handleSearchChange.bind(this)

        this.fetchTweets.bind(this)
        this.fetchTimeout = null;

        this.fetchCompanies.bind(this)

        this.fetchCompanyData.bind(this);
        this.fetchCompanyData("google")

        this.fetchCompanyStockHistory.bind(this)
        this.parseCompanyStockHistory.bind(this)

        this.fetchCompanyStockHistory("GOOG")

    }

    fetchCompanyStockHistory = (symbol) => {
        this.fetchCompanyStock(symbol)
    }

    fetchCompanyStock(symbol) {
        var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + symbol + '&apikey=NMJ4EQ7YJJ272PQU';
        console.log("url: " + url)
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => this.parseCompanyStockHistory(data));
    }

    parseCompanyStockHistory(data) {
        var tempData = data["Monthly Time Series"]
        var parsedData = []
        var high = -100000000
        var low = 100000000
        for (var value in tempData) {
            if (tempData.hasOwnProperty(value)) {
                var close = tempData[value]['4. close']
                if (close > high) {
                    high = close
                }
                if (close < low) {
                    low = close
                }
                parsedData.push({
                    close: parseFloat(tempData[value]['4. close']),
                    high: parseFloat(tempData[value]['2. high']),
                    low: parseFloat(tempData[value]['3. low']),
                    date: value
                })
            }
        }
        this.setState({
            companyStockData: parsedData.reverse(),
            range: {
                high: high,
                low: low
            }
        })
    }

    fetchCompanies(keyword) {
        var url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keyword + '&apikey=NMJ4EQ7YJJ272PQU';
        console.log("url: " + url)
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => this.parseCompanies(data));
    }

    parseCompanies(data) {
        console.log(data)
        this.setState({
            topCompanies: (data !== null) ? data.bestMatches : []
        });
    }

    fetchTweets(keyword) {
        var url = 'https://company-search.azurewebsites.net/api/tweets/' + keyword;
        console.log("url: " + url)
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => this.parseTweets(data));
    }

    parseTweets(data) {
        var tempTweets = data.statuses;
        if (tempTweets == null || tempTweets == undefined) {
            return
        }
        var tweets = [];
        for (var i = 0; i < tempTweets.length; i++) {
            var text = tempTweets[i].text
            var date = tempTweets[i].created_at
            var userName = tempTweets[i].user.name
            var urls = tempTweets[i].entities.urls
            var url = (urls.length > 0) ? urls[0].url : ""
            var profileImageUrl = tempTweets[i].user.profile_image_url

            tweets.push({
                name: userName,
                date: date,
                text: text,
                url: url,
                profileImageUrl: profileImageUrl
            })
        }

        this.setState({ tweets: tweets })
        console.log("old tweets: " + this.state.tweets)
        console.log("new tweets: " + this.tweets)

    }

    fetchCompanyData(value) {
        this.fetchCompanies(value)
        this.fetchTweets(value)
    }

    handleSearchChange = (input) => {
        var value = input.target.value
        if (value !== "") {
            clearTimeout(this.fetchTimeout)
            this.fetchTimeout = setTimeout(() => this.fetchCompanyData(value), 1000);
        }
    }

    renderTweetCards() {
        return this.state.tweets.map(value => {
            return (
                <Grid container item xs={12} key={value.name + Math.random()}>
                    <TweetCard tweet={value} />
                </Grid>
            )
        })
    }

    render() {
        return (
            <div>
                <h1> Company Search </h1>
                <Card id="topCard">
                    <TextField
                        id="outlined-search"
                        label="Search company"
                        type="search"
                        className="textField"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleSearchChange}
                    />
                </Card>
                <div className="container">
                    <div className="item2">
                        <Grid container item xs={12} spacing={1} key="sugGrid">
                            <Grid container item xs={12} key="sugGridCont">
                                <SuggestedCompanyCard topCompanies={this.state.topCompanies} companySelected={this.fetchCompanyStockHistory} />
                            </Grid>
                            <Grid container item xs={12} key="sugGridCont">
                                <ChartCard companyData={this.state.companyStockData} range={this.state.range} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="item">
                        <Grid container item xs={12} spacing={1} key="tweetCont">
                            <Grid container item xs={12}>
                                <h1>Tweets</h1>
                            </Grid>
                            {this.renderTweetCards()}
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}