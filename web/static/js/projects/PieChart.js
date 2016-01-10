import d3 from 'd3';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    data: state.chartdata.data
  };
};

class PieChart extends React.Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);
  }

  componentWillReceiveProps (props) {
    this.drawChart(props.data);
  }

  drawChart (categories) {
    const div = document.getElementById('piechart');
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    const w = 400;
    const h = 400;
    const r = h / 2;
    const color = d3.scale.category20c();
    const data = categories.filter(category => category.value !== 0);
    const vis = d3.select('#piechart').
            append('svg:svg').
            data([data]).
            attr('width', w).
            attr('height', h).
            append('svg:g').
            attr('transform', 'translate(' + r + ',' + r + ')');
    const pie = d3.layout.pie().value(d => d.value);

    // declare an arc generator function
    const arc = d3.svg.arc().outerRadius(r);

    // select paths, use arc generator to draw
    const arcs = vis.selectAll('g.slice')
            .data(pie)
            .enter()
            .append('svg:g')
            .attr('class', 'slice');
    arcs.append('svg:path')
      .attr('fill', (d, i) => color(i))
      .attr('d', function (d) {
        return arc(d);
      });

    // add the text
    arcs.append('svg:text').attr('transform', d => {
      d.innerRadius = 0;
      d.outerRadius = r;
      return 'translate(' + arc.centroid(d) + ')';
    })
      .attr('text-anchor', 'middle')
      .text((d, i) => data[i].label);
  }

  render () {
    return (
      <div id='piechart' />
    );
  }
}

export default connect(mapStateToProps)(PieChart);
