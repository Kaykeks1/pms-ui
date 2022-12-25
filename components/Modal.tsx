import { forwardRef, useImperativeHandle, ReactNode, useEffect } from 'react';

type Props = {
    children?: ReactNode
    title?: string
  }
  

const Modal = forwardRef(({ children, title }: Props, ref) => {

    useImperativeHandle(ref, () => ({
        open() {
            let modal = document.getElementById("myModal")
            modal.style.display = "block";
        },
        close() {
            triggerClose()
        }
    }));
    const triggerClose = () => {
        let modal = document.getElementById("myModal")
        modal.style.display = "none";
    }

    useEffect(() => {
        // Client-side-only code
        window.onclick = function(event) {
            let modal = document.getElementById("myModal");
            if (event.target == modal) {
              modal.style.display = "none";
            }
        }
    })


    return (
        <div id="myModal" className="modal hidden fixed z-1 pt-24 top-0 left-0 w-full h-full overflow-auto" style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
        
            <div className="modal-content bg-white m-auto p-5 border-1 border-black w-4/5">
                <div className="flex w-full">
                    <p>{title}</p>
                    <span className="close" onClick={triggerClose}>&times;</span>
                </div>
                {children}
            </div>
        
        </div>
    )
})

export default Modal
