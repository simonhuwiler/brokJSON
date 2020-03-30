import React from "react"
import { Link } from "gatsby"

import './styles.scss';

import Meta from '../meta';

export default ({ children }) => (
  <div className="App">
    <Meta />
    <header>
      <h1>BrokJSON</h1>
      <h2>The space saving GeoJSON alternative</h2>
    </header>
    <nav>
      <Link activeClassName='active' to="/">Introduction</Link>&nbsp;|&nbsp;
      <Link activeClassName='active' to='/installation'>Installation & Usage</Link>&nbsp;|&nbsp;
      <Link activeClassName='active' to="/converter">Converter</Link>&nbsp;|&nbsp;
      <Link activeClassName='active' to='/specification'>Specification</Link>
    </nav>

    {children}
    {/* <Switch>
      <Route path='/' exact={true}><Home /></Route>
      <Route path='/installation' exact={true}><Installation /></Route>
      <Route path='/converter' exact={true}><Converter /></Route>
      <Route path='/specification' exact={true}><Specification /></Route>
    </Switch> */}

    <footer>
      &copy; 2020 brokjson.dev<br />
      Ideas to bring BrokJSON forward? Contact us! <a href='mailto:hello@brokjson.dev' target='_blank' rel="noopener noreferrer">hello@brokjson.dev</a>
    </footer>
  </div>
)