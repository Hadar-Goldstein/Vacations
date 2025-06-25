import Swal from 'sweetalert2';

class Confirm {
    public confirmModal(message: string, title: string = 'Are you sure?'): Promise<boolean> {
        return Swal.fire({
            title,
            text: message,
            scrollbarPadding: true,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'scaled-alert no-animation',
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-confirm-button',
                cancelButton: 'my-cancel-button',
                icon: 'my-icon'
            },
            showClass: {
                popup: ''
            },
            hideClass: {
                popup: ''
            }
        }).then(result => result.isConfirmed);
    }
}

export const confirm = new Confirm();
