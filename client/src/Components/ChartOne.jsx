import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 650;
const height = 500;
const margin = {
  top: 20, right: 5, bottom: 20, left: 35,
};

class ChartOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [],
    };
    this.xAxis = d3.axisBottom();
    this.yAxis = d3.axisLeft();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { games } = nextProps;
    if (!games) return {};
    // array of objects. games.games
    const maxScore = d3.max(games.games, gam => gam.hTeam.score);
    const minScore = d3.min(games.games, gam => gam.hTeam.score);
    const yScale = d3.scaleLinear()
      .domain([0, maxScore])
      .range([height - margin.top, margin.bottom]);

    const xScale = d3.scaleBand()
      .domain(games.games.map(gam => gam.hTeam.triCode))
      .range([margin.left, width - margin.right]);

    const bars = games.games.map((gam, key) => ({
      x: xScale(gam.hTeam.triCode),
      y: yScale(gam.hTeam.score),
      height: yScale(0) - yScale(gam.hTeam.score),
      fill: 'green',
      // fill: isColored ? colorScale(d.avg) : "#ccc"
    }));
    return { bars, yScale, xScale };
  }

  componentDidMount() {
    const { games } = this.props;
    this.setState({
      bars: games.games,
      // }, () => {
      //   const stack = d3.stack()
      //     .keys(Object.keys(this.state.bars[0]));
      //   const series = stack(this.state.bars);
    });
  }

  componentDidUpdate() {
    this.xAxis.scale(this.state.xScale);
    d3.select(this.refs.xAxis).call(this.xAxis);
    this.yAxis.scale(this.state.yScale);
    debugger;
    d3.select(this.refs.yAxis).call(this.yAxis);
  }

  render() {
    // console.log(bars, 'crip');

    return (
      <div>
        <svg width={width} height={height}>
          {this.state.bars
            .map((bar) => {
              const placeHolder = '';
              return (
                <rect
                  x={bar.x}
                  y={bar.y}
                  width={30}
                  height={bar.height}
                  fill={bar.fill}
                />
              );
            })}
          ;
          <g ref="xAxis" transform={`translate(0, ${height - margin.bottom})`} />
          <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
        </svg>
      </div>
    );
  }
}

export default ChartOne;
