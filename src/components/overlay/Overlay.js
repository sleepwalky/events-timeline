import React from 'react';
import { Component } from 'react';
import ModalPopup from 'reactjs-popup';
import { connect } from 'react-redux';
import store from '../../store/store';
import { showOverlay } from '../../actions/overlayActions';
import './overlay.css';

//store.dispatch({ type: 'SHOW_OVERLAY', class:'error', title:'Hello', content:'This is a content', open: true});

class Overlay extends Component {
  closeOverlay = function () {
    let data = {
      type: '',
      class: '',
      title: '',
      content: '',
      open: false,
    };
    store.dispatch(showOverlay(data));
  };

  render() {
    let classes = `${this.props.class} modal-header`;
    const contentStyle = {
      maxWidth: '300px', width: '90%'
    };
    return (
      <ModalPopup
        open={this.props.open}
        onClose={this.closeOverlay}
        closeOnEscape={true}
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

export default connect(mapStateToProps)(Overlay);
