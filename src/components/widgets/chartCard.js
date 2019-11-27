import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Card from '@material-ui/core/Card'

export default class ChartCard extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: props.companyData
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.companyData !== this.props.companyData) {
            this.setState({ data: this.props.companyData });
        }
    }

    render() {
        return (
            <Card className="medium_card">
                <LineChart
                    width={800}
                    height={600}
                    data={this.state.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[this.props.range.low, this.props.range.high]}/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="close" stroke="#8884d8" />
                    <Line type="monotone" dataKey="high" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="low" stroke="#82ca9d" />
                </LineChart>
            </Card>
        );
    }
}
