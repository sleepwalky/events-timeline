import React, { Component } from 'react';
import ModalPopup from 'reactjs-popup';
import { connect } from 'react-redux';
import { hideOverlay } from '../../actions/overlayActions';
import './overlay.css';

// store.dispatch({ type: 'SHOW_OVERLAY', class:'error', title:'Hello', content:'This is a content', open: true});

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.closeOverlay = this.closeOverlay.bind(this);
  }

  closeOverlay() {
    this.props.onHideOverlay();
  }

  render() {
    const classes = `${this.props.class} modal-header`;
    const contentStyle = {
      maxWidth: '300px',
      width: '90%',
      borderRadius: '5px',
    };
    return (
      <ModalPopup
        open={this.props.open}
        onClose={this.closeOverlay}
        closeOnEscape
        contentStyle={contentStyle}
      >
        {close => (
          <div className="modal-div">
            <a className="modal-close" onClick={close}>
              &times;
            </a>
            <div className={classes}>
              <span>{this.props.title}</span>
            </div>
            <div className="modal-content">
              <span>{this.props.content}</span>
            </div>

          </div>
        )}
      </ModalPopup>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.overlay.title,
    content: state.overlay.content,
    open: state.overlay.open,
    class: state.overlay.class,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onHideOverlay: () => {
      dispatch(hideOverlay());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
