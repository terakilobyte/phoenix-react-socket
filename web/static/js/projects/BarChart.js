import d3 from 'd3';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    data: state.chartdata.data
  };
};

class BarChart extends React.Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);
  }

  componentWillReceiveProps (props) {
    this.drawChart(props.data);
  }

  drawChart (dataset) {
    const div = document.getElementById('barchart');
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }

    const w = 400;
    const h = 175;

    var xScale = d3.scale.ordinal()
          .domain(d3.range(dataset.length))
          .rangeRoundBands([0, w], 0.05); 

    var yScale = d3.scale.linear()
          .domain([0, d3.max(dataset, function(d) {return d.value;})])
          .range([0, h]);

    var key = function(d) {
      return d.value;
    };

    //Create SVG element
    var svg = d3.select('#barchart')
          .append('svg')
          .attr('width', w)
          .attr('height', h);

    //Create bars
    svg.selectAll('rect')
      .data(dataset, key)
      .enter()
      .append('rect')
      .attr('x', function(d, i) {
        return xScale(i);
      })
      .attr('y', function(d) {
        return h - yScale(d.value);
      })
      .attr('width', xScale.rangeBand())
      .attr('height', function(d) {
        return yScale(d.value);
      })
      .attr('fill', function(d) {
        return 'rgb(0, 0, ' + (d.value * 10) + ')';
      })
    //Create labels
    svg.selectAll('text')
      .data(dataset, key)
      .enter()
      .append('text')
      .text(function(d) {
        return d.label;
      })
      .attr('text-anchor', 'middle')
      .attr('x', function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
      })
      .attr('y', function(d) {
        return h - yScale(d.value) + 14;
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'white');
  }

  render () {
    return (
      <div id='barchart' />
    );
  }
}

export default connect(mapStateToProps)(BarChart);
