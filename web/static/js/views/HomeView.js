import React                  from 'react';
import { connect }            from 'react-redux';
import Chart                  from 'projects/chart';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  routerState : state.router
});

export class HomeView extends React.Component {
  static propTypes = {
  }

  render () {
    return (
      <div>
        <div className='text-center'>
          <h5>Let's build things</h5>
          <Chart />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeView);
