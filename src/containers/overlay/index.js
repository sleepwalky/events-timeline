import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalPopup from 'reactjs-popup';
import { connect } from 'react-redux';
import { hideOverlay } from '../../actions/overlayActions';
import './overlay.css';

/* store.dispatch({
 type: 'SHOW_OVERLAY',
 class:'error',
 title:'Hello',
 content:'This is a content',
 open: true}); */

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.closeOverlay = this.closeOverlay.bind(this);
  }

  closeOverlay() {
    this.props.onHideOverlay();
  }

  render() {
    const classes = `${this.props.extraClass} modal-header`;
    const contentStyle = {
      maxWidth: this.props.extraClass !== 'filter' ? '300px' : '800px',
      width: '100%',
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

Overlay.propTypes = {
  onHideOverlay: PropTypes.func.isRequired,
  extraClass: PropTypes.string,
  open: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    title: state.overlay.title,
    content: state.overlay.content,
    open: state.overlay.open,
    extraClass: state.overlay.extraClass,
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
