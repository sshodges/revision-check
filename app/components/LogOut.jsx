var React = require('react');

var LogOut = React.createClass({
  logOut: function (e) {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  },
  render: function () {
    return (
      <div>
        <button className="button danger" onClick={this.logOut}>Log Out</button>
      </div>
    );
  }
});

module.exports = LogOut;
