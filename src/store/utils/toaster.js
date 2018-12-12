import Swal from 'sweetalert2'

const toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
})

const error = msg => {
	if (msg.message) {
		msg = msg.message
	}
	toast({ type: 'error', title: msg })
}

const success = msg => {
	if (msg.message) {
		msg = msg.message
	}
	toast({ type: 'success', title: msg })
}

export default {
	error,
	success,
}
