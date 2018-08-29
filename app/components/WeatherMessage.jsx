var React = require('react');

var WeatherMessage = React.createClass({
  render: function () {
    return (
      <h4 className="text-center">It is {this.props.temp} in {this.props.location}</h4>
    );
  }
});

module.exports = WeatherMessage;
