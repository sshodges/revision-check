var React = require('react');
var openWeatherMap = require('openWeatherMap');


var PostDocuments = React.createClass({
  postDocuments: function (e) {
    e.preventDefault();

    var parcel = {}
    parcel.name = this.refs.name.value;

    openWeatherMap.postDocuments(parcel);
    window.location.reload();



  },
  render: function () {
    return (
      <div>
        <h3>Post Document</h3>
        <form onSubmit={this.postDocuments}>
          <input type="text" ref="name" placeholder="Document Name"/>
          <button className="button danger">Add</button>
        </form>

      </div>
    );
  }
});

module.exports = PostDocuments;
