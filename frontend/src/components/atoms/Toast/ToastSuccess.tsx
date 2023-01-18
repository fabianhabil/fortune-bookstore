import { toast } from 'react-toastify';

const ToastSuccess = (content: string | undefined | null) => {
    const message: string | undefined | null =
        content === undefined || content === null ? '' : content;
    if (message !== '') {
        setTimeout(() => {
            toast.success(message, {
                position: 'top-right',
                autoClose: 1500,
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

export default ToastSuccess;
