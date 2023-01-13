import { forwardRef, useImperativeHandle, ReactNode, useEffect } from 'react';

type Props = {
    children?: ReactNode
    name?: string
    onClose?: Function
  }
  

const Modal = forwardRef(({ children, name, onClose }: Props, ref) => {

    useImperativeHandle(ref, () => ({
        open() {
            let modal = document.getElementById(name)
            modal.style.display = "block";
        },
        close() {
            triggerClose()
        }
    }));
    const triggerClose = () => {
        let modal = document.getElementById(name)
        modal.style.display = "none";
    }

    useEffect(() => {
        // Client-side-only code
        window.onclick = function(event) {
            let allModals = Array.from(document.getElementsByClassName('my-modal') as HTMLCollectionOf<HTMLElement>)
            allModals.forEach(modal => {
                if (event.target == modal) {
                    modal.style.display = "none";
                    onClose()
                }
                
            })
        }
    })


    return (
        <div id={name} className="my-modal hidden fixed z-1 py-24 top-0 left-0 w-full h-full overflow-auto" style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
        
            <div className="bg-white m-auto p-5 border-1 border-black w-2/5 max-h-full overflow-auto rounded-xl">
                {children}
            </div>
        
        </div>
    )
})

export default Modal
