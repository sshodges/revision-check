var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Documents = require('Documents');
var Archive = require('Archive');
var MyAccount = require('MyAccount');

require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="about" component={Archive}/>
      <Route path="example" component={MyAccount}/>
      <IndexRoute component={Documents}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
