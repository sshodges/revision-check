var React = require('react');
var {Link} = require('react-router');

var MyAccount = React.createClass({
  render: function () {
    return (
      <div>
        <h1 className="text-center">MyAccount</h1>
        <p>Here are a few examples to try out:</p>
        <ol>
          <li>
            <Link to='/?location=sydney'>Sydney</Link>
          </li>
          <li>
            <Link to='/?location=cape%20town'>Cape Town</Link>
          </li>
        </ol>
      </div>
    );
  }
});

module.exports = MyAccount;
