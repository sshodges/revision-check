var React = require('react');
var openWeatherMap = require('openWeatherMap');


var Login = React.createClass({
  login: function (e) {
    e.preventDefault();

    var parcel = {}
    parcel.email = this.refs.email.value;
    parcel.password = this.refs.password.value;

    openWeatherMap.login(parcel);
    window.location.reload();



  },
  render: function () {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.login}>
          <input type="email" ref="email" defaultValue="fred@fred.com"/>
          <input type="text" ref="password" defaultValue="Flintstone12"/>
          <button className="button danger">Login</button>
        </form>

      </div>
    );
  }
});

module.exports = Login;
