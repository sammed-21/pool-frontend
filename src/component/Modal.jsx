import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
import useSelectToken from "../hooks/useSelectTokenModal";


const Modal  = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
      bg-black/30
      z-50
      fixed inset-0"
        >
          <Dialog.Content
            className="
        fixed
        drop-shadow-md
        border 
        border-neutral-700
        top-[50%]
        left-[50%]
        max-h-full
        h-full
        md:h-auto
        md:max-h-[85vh]
        w-full
        md:w-[90vw]
        md:max-w-[450px]
        translate-x-[-50%]
        translate-y-[-50%]
        rounded-2xl
        bg-[#131313]
       py-[25px]
        focus:outline-none
        "
          >
            <Dialog.Title
              className="
          text-xl
          px-[20px]
          text-start
          font-bold
          text-white
          mb-4"
            >
              {title}
            </Dialog.Title>
            <Dialog.Description
              className="
            mb-5
            text-sm
            leading-normal
            text-center"
            >
              {description}
            </Dialog.Description>
            <div>{children}</div>
            <Dialog.Close onClick={useSelectToken.onClose} asChild>
              <button
                className="
              text-neutral-400
              hover:text-white
              top-[10px]
              absolute
              right-[10px]
              inline-flex
              h-[25px]
              w-[25px]
              appearance-none
              items-center
              rounded-full
              focus:outline-none
              "
              >
                <IoMdClose />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;