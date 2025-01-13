/*TODO: remove modal*/
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    /*TODO: import from React*/
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
    if (!props.isOpen) return null;

    return (
            <Dialog
                open={props.isOpen}
                onClose={props.onClose}>
                <DialogContent>
                        {props.children}
                </DialogContent>
            </Dialog>
    );
}
export default Modal;

