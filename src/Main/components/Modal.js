import React, { useEffect } from "react";
import '../css/Modal.css';

function Modal(props){

    // 스크롤 막기
    function disableScroll() {
        document.body.style.overflow = 'hidden';
        document.querySelector('html').scrollTop = window.scrollY;
    }

    function enableScroll() {
        document.body.style.overflow = null;
        }

    useEffect(() => {
        disableScroll();
        return () => enableScroll();
    }, []);

    function closeModal() {
        props.closeModal();
    }

    return(
        <div className="Modal" onClick={closeModal}>
            <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                <button id="modal-close-btn" onClick={closeModal}>
                    ✖
                </button>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;