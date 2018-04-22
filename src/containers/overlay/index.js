import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalPopup from 'reactjs-popup';
import { connect } from 'react-redux';
import { hideOverlay } from '../../actions/overlayActions';
import './overlay.css';

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
      maxWidth: this.props.extraClass === 'spinner' ? '300px' : '800px',
      width: '100%',
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
              {this.props.title}
            </div>
            <div className="modal-content">
              {this.props.content}
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
