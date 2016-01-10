import { Link } from 'react-router';

import './Navbar.scss';

export default class Navbar extends React.Component {
  render () {
    return (
      <div className='navigation-items'>
        <div className='left-items'>
          <Link className='links' to='/'>Home</Link>
          <a className='links' href='//www.terakilobyte.com'>Blog</a>
          <a className='links' href='//www.twitter.com/terakilobyte'>Twitter</a>
          <a className='links' href='//www.github.com/terakilobyte'>Github</a>
        </div>
        <div className='right-items'>
          <a className='links' href='#'>Sign In</a>
        </div>
      </div>
    );
  }
}
