import React from "react";
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
    const {handleModalClosing, handleContentLoading} = this;
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

function ModalWrapper({ className, children }) {
  return <div className={className}>{children}</div>;
}

function ModalClosingBackground({ className, onClick }) {
  return <div className={className} onClick={onClick}></div>;
}

function ModalInner({ className, children }) {
  return <div className={className}>{children}</div>;
}

function ModalCloseButton({ className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      &times;
    </button>
  );
}

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
