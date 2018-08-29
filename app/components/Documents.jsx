var React = require('react');
var ErrorModal = require('ErrorModal');
var openWeatherMap = require('openWeatherMap');
var DocumentLoader = require('DocumentLoader');
var LogOut = require('LogOut');
var Login = require('Login');
var PostDocuments = require('PostDocuments');


var Documents = React.createClass({

  getInitialState: function () {
    return {
      documents: []
    }
  },
  componentDidMount() {
    var that = this
    openWeatherMap.getDocuments(0).then(function(res){
      if (res.status === 200) {
        const documents = res.data;
        that.setState({documents});
      } else {
        const documents = [];
        console.log(errorMessage);
        that.setState({documents});
      }
    });
  },
  handleDocuments: function (){
    var that = this
    openWeatherMap.getDocuments(0).then(function(res){
      console.log(res + ' zzzzzzzzzzzz')
      if (res.status === 200) {
        const documents = res.data;
        that.setState({documents});
      } else {
        const documents = [];
        that.setState({documents});
      }
    }).catch(function (err){
      console.log(err + ' asdadad');
    });
  },
  render: function () {
    var {documents} = this.state;
    return (
      <div>
        <DocumentLoader documents={documents}/>
        <PostDocuments/>
        <Login/>
        <LogOut onDocuments={this.handleDocuments}/>
      </div>
    );
  }
});

module.exports = Documents;
