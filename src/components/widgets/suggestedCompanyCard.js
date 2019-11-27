import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './suggestedCompanyCard.css';
import Grid from '@material-ui/core/Grid';


export default class SuggestedCompanyCard extends React.Component {

    constructor(props) {
        super(props)
    }

    renderCompanies() {
        if(this.props.topCompanies == null || this.props.topCompanies == undefined){
            return;
        }
        return this.props.topCompanies.map(value => {
            return (
                <Grid container item xs={12} spacing={1} key={value["1. symbol"] + Math.random()}>
                    <Grid container item xs={4} key={value["1. symbol"]}>
                    <p>  {value["1. symbol"]} </p>
                    </Grid>
                    <Grid container item xs={4} key={value["2. name"]}  >
                    <p>  {value["2. name"]} </p>
                    </Grid>
                    <Grid container item xs={4} key={1}>
                    <Button variant="contained" size="small" onClick={() => this.props.companySelected(value["1. symbol"])}>Get</Button>
                    </Grid>
                </Grid>
            )
        })
    }

    render() {
        return (
            <Card className="medium_card">
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Suggested Companies
              </Typography>
                    {this.renderCompanies()}
                </CardContent>
            </Card>
        );
    }
}