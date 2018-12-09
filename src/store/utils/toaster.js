import Swal from 'sweetalert2'

const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

const error = (msg) => {
    toast({type:'error', title:msg})
}

const success = (msg) => {
    toast({type:'success', title:msg})
}
  
export default {
    error,
    success
}