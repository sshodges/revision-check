var React = require('react');
var {Link} = require('react-router');

var DocumentLoader = React.createClass({
  render: function () {

    var {documents} = this.props;
    return (

      <table>
        <tbody>
          <tr>
            <th style={{textAlign:'center'}}>Id</th>
            <th style={{textAlign:'center'}}>Document Name</th>
          </tr>
          {documents.map((item,i)=>
          <tr id={i} key={item.id}>
            <td style={{textAlign:'center'}}>{item.id}</td>
            <td style={{textAlign:'center'}}>{item.name}</td>
          </tr>
       )}
       </tbody>
     </table>
    );
  }
});

module.exports = DocumentLoader;
