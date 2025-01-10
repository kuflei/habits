import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={onClose}>
                <DialogContent>
                        {children}
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
export default Modal;

