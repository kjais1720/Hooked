import { createPortal } from "react-dom";
import { closeModal } from "slices/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
export function Modal({ children, childName }) {
  const { isModalOpen, modalName } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(()=>()=>{ // in case user navigates to another page without closing the modal (like clicking on user link to go to user profile)
    dispatch(closeModal())
  },[dispatch])
  const modal = (
    <div
      onClick={() => dispatch(closeModal())}
      className="fixed inset-0 z-10 flex items-center 
                justify-center overflow-auto
                bg-black/50 
                "
                style={{backdropFilter:"blur(2px)"}}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
  return (
    isModalOpen &&
    modalName === childName &&
    createPortal(modal, document.getElementById("modal-root"))
  );
}