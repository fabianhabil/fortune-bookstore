import { toast } from 'react-toastify';

const ToastInfo = (content: string | undefined | null) => {
    const message: string | undefined | null =
        content === undefined || content === null ? '' : content;
    if (message !== '') {
        setTimeout(() => {
            toast(message, {
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

export default ToastInfo;
