import Swal from 'sweetalert2';

export function showSuccess(message) {
  Swal.fire({ icon: 'success', title: 'Success', text: message });
}

export function showError(message) {
  Swal.fire({ icon: 'error', title: 'Error', text: message });
}
