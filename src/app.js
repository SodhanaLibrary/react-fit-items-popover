import React from 'react';
import FitItemsPopover from './fit-items-popover/fit-items-popover';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{
        width:'500px',
        margin:'auto',
        paddingTop:'100px'
      }}>
      <h3>FitItemsPopover example with popover placement</h3>
      <hr/>
      <FitItemsPopover title="Countries" maxWidth="250px" items={['Iceland','India','Indonesia','Iran','Iraq','Ireland']}></FitItemsPopover>
      <br/>
      <FitItemsPopover title="Countries" maxWidth="100px" items={['Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy']}></FitItemsPopover>
      <hr/>
      <h3>FitItemsPopover example with popover placement</h3>
      <hr/>
      <FitItemsPopover title="Countries" popoverPlacement="right" maxWidth="200px" items={['Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy']}></FitItemsPopover>
      </div>
    )
  }
}
