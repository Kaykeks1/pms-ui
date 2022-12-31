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
        <div id="myModal" className="hidden fixed z-1 py-24 top-0 left-0 w-full h-full overflow-auto" style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
        
            <div className="bg-white m-auto p-5 border-1 border-black w-2/5 max-h-full overflow-auto rounded-xl">
                {children}
            </div>
        
        </div>
    )
})

export default Modal
