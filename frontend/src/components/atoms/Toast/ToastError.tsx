import { toast } from 'react-toastify';

const ToastError = (content: string) => {
    const message: string =
        content === undefined || content === null ? '' : content;
    if (message !== '') {
        setTimeout(() => {
            toast.error(message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastBody'
            });
        }, 20);
    }
};

export default ToastError;
