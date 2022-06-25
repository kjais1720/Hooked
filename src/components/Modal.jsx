import { createPortal } from "react-dom";
import { closeModal } from "slices/modalSlice";
import { useSelector, useDispatch } from "react-redux";
export function Modal({ children, childName }) {
  const { isModalOpen, modalName } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const modal = (
    <div
      onClick={() => dispatch(closeModal())}
      className="fixed inset-0 flex items-center 
                justify-center overflow-auto
                bg-gray-800/50
                "
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
