import React from 'react';
const axios = require('axios');
import ChartOne from './ChartOne.jsx';

class AppStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: {},
      selected: '',
      jsonData: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/data')
      .then(res => new Promise((resolve, reject) => {
        resolve(res.data);
      }))
      .then((data) => {
        console.log(data);
        this.setState({
          links: data,
        });
      })
      .catch((err) => {
        reject(err);
      });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      selected: e.target.value
    })
    this.getJson(e.target.value);
  };

  getJson = (pathy) => {
    axios.get(`api/data/${pathy}`)
      .then((data) => {

        this.setState({
          jsonData: data.data
        })
      });
  }

  render() {
    let { links, jsonData } = this.state;
    let flag = !!jsonData.games
    const datas = Object.values(links).filter(link => (link.indexOf('json') > -1));
    const { selected } = this.state;

    return (
      <div>
        <select name='selected' onChange={this.handleChange}>
          {datas.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>
        {flag ? <ChartOne games={this.state.jsonData} /> : null}
      </div>
    );
  }
}

export default AppStart;
