import React from "react";
import PropTypes from "prop-types";

import styles from "./Modal.module.css";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isContentLoaded: false
    };

    this.handleContentLoading = this.handleContentLoading.bind(this);
    this.handleModalClosing = this.handleModalClosing.bind(this);
  }

  handleContentLoading() {
    this.setState((state) => ({ isContentLoaded: !state.isContentLoaded }));
  }

  handleModalClosing() {
    const { onClose } = this.props;

    this.setState((state) => ({ isContentLoaded: !state.isContentLoaded }));
    onClose();
  }

  render() {
    const { handleModalClosing, handleContentLoading } = this;
    const { contentBackgroundImageUrl, children } = this.props;
    const { isContentLoaded } = this.state;

    return (
      <ModalWrapper className={styles.wrapper}>
        <ModalClosingBackground
          className={styles.background}
          onClick={handleModalClosing}
        />
        <ModalInner className={styles.inner}>
          <ModalCloseButton
            className={styles.close}
            onClick={handleModalClosing}
          />
          <ModalContent
            className={styles.content}
            onLoad={handleContentLoading}
            backgroundImage={contentBackgroundImageUrl}
          >
            {children}
            {!isContentLoaded && "Loading content..."}
          </ModalContent>
        </ModalInner>
      </ModalWrapper>
    );
  }
}

Modal.propTypes = {
  contentBackgroundImageUrl: PropTypes.string,
  onClose: PropTypes.func
};

function ModalWrapper({ className, children }) {
  return <div className={className}>{children}</div>;
}

ModalWrapper.propTypes = {
  className: PropTypes.string
};

function ModalClosingBackground({ className, onClick }) {
  return <div className={className} onClick={onClick}></div>;
}

ModalClosingBackground.propTypes = {
  className: PropTypes.string
};

function ModalInner({ className, children }) {
  return <div className={className}>{children}</div>;
}

ModalInner.propTypes = {
  className: PropTypes.string
};

function ModalCloseButton({ className, onClick }) {
  return (
    <button className={className} onClick={onClick} type="button">
      &times;
    </button>
  );
}

Modal.ModalCloseButton = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

function ModalContent({ className, backgroundImage, children, onLoad }) {
  return (
    <div
      className={className}
      onLoad={onLoad}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
}

ModalContent.propTypes = {
  className: PropTypes.string,
  backgroundImage: PropTypes.string,
  onLoad: PropTypes.func
};
