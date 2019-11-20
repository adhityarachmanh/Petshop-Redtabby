import Swal from "sweetalert2";
import firebase from "firebase";

export async function PIN_CONFIRMATION(DATA) {
  const { value: input } = await Swal.fire({
    title: "Masukkan Pin Anda",
    input: "password",
    html:
      "<p>Batas Kesalahan Adalah :" +
      parseInt(localStorage.getItem("kesalahan")) +
      "</p>" +
      "<p>Apabila Mencapai 0 Anda Akan Terlogout</p>",
    showCancelButton: true,
    inputValidator: value => {
      if (!value) {
        return "Input Your Admin Pin";
      }
    }
  });

  if (input) {
    if (parseInt(input) === parseInt(localStorage.getItem("pin"))) {
      localStorage.setItem("kesalahan", 3);
      DATA();
    } else {
      localStorage.setItem(
        "kesalahan",
        parseInt(localStorage.getItem("kesalahan")) - 1
      );
      if (parseInt(localStorage.getItem("kesalahan")) !== 0) {
        Swal.fire({
          title: "... Oops Pin Anda Salah",
          type: "error",
          showCancelButton: true,
          confirmButtonText: "Re Input Pin"
        }).then(res => {
          if (res.value) {
            PIN_CONFIRMATION(DATA);
          }
        });
      } else {
        let timerInterval;
        Swal.fire({
          title: "Good Bye !",
          html: "Anda Akan Logout Dalam Waktu <strong></strong> Detik.",
          timer: 5000,
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              Swal.getContent().querySelector(
                "strong"
              ).textContent = Math.round(Swal.getTimerLeft() / 1000);
            }, 100);
          },
          onClose: () => {
            firebase.auth().signOut();
            localStorage.removeItem("pin");
            clearInterval(timerInterval);
          }
        }).then(result => {
          if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.timer
          ) {
            firebase.auth().signOut();
            localStorage.removeItem("pin");
          }
        });
      }
    }
  }
}
