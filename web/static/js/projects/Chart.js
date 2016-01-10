/*eslint-disable no-console*/ //eslint-disable-line
import socket from '../socket';
import Rx from 'rxjs';
import PieChart from './PieChart';
import { connect } from 'react-redux';
import { actions as chartActions } from 'actions/chartdata';

const mapStateToProps = (state) => {
  return {
    newData: state.chartdata.newdata
  };
};

class Chart extends React.Component {
  static propTypes = {
    newData: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentWillMount () {
    socket.connect();
    const socketChannel = socket.channel('tests:lobby', {});
    socketChannel.join();

    socketChannel.push('tick', {});

    const d3Data = Rx.Observable.fromEvent(socketChannel, 'data')
            .sample(Rx.Observable.interval(1000));

    d3Data.subscribe(
      val => {
        console.log(val.Description, val.Resources,
                    val.Seed, val.Nothing);
        const categories = Object.keys(val)
                .reduce((acc, curr) => {
                  const o = {};
                  o.label = curr;
                  o.value = val[curr];
                  acc.push(o);
                  return acc;
                }, []);
        this.props.newData({data: categories});
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }

  render () {
    return (
      <div>
        <PieChart />
      </div>
    );
  }
}

export default connect(mapStateToProps, chartActions)(Chart);
