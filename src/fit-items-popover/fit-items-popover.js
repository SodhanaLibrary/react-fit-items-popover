import React from 'react'
import {OverlayTrigger, Popover} from 'react-bootstrap';
import classNames from 'classnames'
import './fit-items-popover.scss'

class FitItemsPopover  extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      secondLineItemIndex:-1
		}
    this.itemsRef = [];
    this.alignItems = this.alignItems.bind(this);
    this.checkRef = this.checkRef.bind(this);
  }

  alignItems() {
    const firstBottom = this.itemsRef[0].offsetTop + this.itemsRef[0].offsetHeight;
    for(let i = 1; i < this.itemsRef.length; i++) {
      if(this.itemsRef[i].offsetTop + this.itemsRef[i].offsetHeight > firstBottom) {
        this.setState({
          secondLineItemIndex:i
        })
        return;
      }
    }
    this.setState({
      secondLineItemIndex:this.itemsRef.length
    })
  }

  checkRef() {
    if(this.itemsRef.length === this.props.items.length) {
      this.alignItems();
    } else {
      setTimeout(this.alignItems,10);
    }
  }

  componentDidMount() {
    if(this.itemsRef.length === this.props.items.length && this.props.items.length > 0) {
      this.alignItems();
    } else if(this.props.items.length > 0) {
      this.checkRef();
    }
  }

  render() {
    const {maxWidth, className, popoverPlacement, popoverClassName, items, title} = this.props;
    if(items.length === 0) {
      return null;
    }
    const style = Object.assign({}, style, {maxWidth});
    const itemsStyle = {
      flex:this.state.secondLineItemIndex === -1 ? '0 0 100%' : '0 0 auto'
    };
    const val = items.map((item, i) => {
      if(this.state.secondLineItemIndex === -1 || this.state.secondLineItemIndex > i) {
        return this.state.secondLineItemIndex !== (i+1) ? <span ref={ref => this.itemsRef[i] = ref}>{item}, </span> : <span ref={ref => this.itemsRef[i] = ref}>{item}</span>;
      }
      return;
    })
    const popoverClick = <Popover title={title} className="fit-items-popover__main">
      <div className={classNames("fit-items-popover__content",popoverClassName)}>
        {items.map((item, i) => {
          if(this.state.secondLineItemIndex !== -1 && this.state.secondLineItemIndex <= i) {
            return <div>{item}</div>;
          }
          return;
        })}
      </div>
    </Popover>;
    return <div style={style} className={classNames("fit-items-popover", className)}>
              <div style={itemsStyle} className="fit-items-popover--items">{val}</div>
              {items.length - this.state.secondLineItemIndex !== 0 && <div className="fit-items-popover--btn">
              <OverlayTrigger rootClose trigger="click" placement={popoverPlacement} overlay={popoverClick}>
                <button className="btn btn-default">+{items.length - this.state.secondLineItemIndex}</button>
              </OverlayTrigger>
              </div>}
           </div>;
  }
}

FitItemsPopover.propTypes = {
  maxWidth:React.PropTypes.string,
  popoverPlacement:React.PropTypes.string,
  popoverClassName:React.PropTypes.string,
  title:React.PropTypes.string,
  items:React.PropTypes.array
}

FitItemsPopover.defaultProps = {
  items:[],
  popoverPlacement:'top',
  title:''
}

export default FitItemsPopover;
