document.addEventListener('DOMContentLoaded', () => {
  const feedbackSection = document.getElementById('feedback-section');
  const captureBtn = document.getElementById('capture-btn');
  const uploadInput = document.getElementById('upload-image'); // Asegúrate de que este ID esté en tu HTML
   const profilePic = document.getElementById('profile-pic');
  const stars = document.querySelectorAll('.star');

  //capturar foto 
  captureBtn.addEventListener('click', () => {
     console.log(feedbackSection);
     domtoimage.toPng(feedbackSection)
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'feedback.png'; // Nombre del archivo
      link.click(); // Dispara el evento para descargar
    })
    .catch((error) => {
      console.error('Error al capturar la imagen:', error);
    });
});


  // Función para gestionar las estrellas
  if (stars.length > 0) {
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        stars.forEach(s => s.classList.remove('selected'));
        for (let i = 0; i <= index; i++) {
          stars[i].classList.add('selected');
        }
      });
    });
  } else {
    console.error('No se encontraron estrellas.');
  }

  // Función para subir imágenes
  reader.onload = () => {
  profilePic.src = reader.result;  // Cambia la fuente de la imagen existente
};
//funcion de subir imagenes 2
  if (uploadInput) {
    uploadInput.addEventListener('change', (event) => {
      const file = event.target.files[0]; // Obtiene el primer archivo
      const reader = new FileReader();

      // Asegúrate de que haya un archivo seleccionado
      if (file) {
        reader.readAsDataURL(file); // Lee el archivo como URL de datos
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result; // Asigna la URL de datos como fuente
          img.alt = 'Imagen subida';
          img.style.maxWidth = '100%'; // Ajusta el tamaño según sea necesario
          feedbackSection.appendChild(img); // Agrega la imagen al feedback section
        };
      } else {
        console.error('No se seleccionó ningún archivo.');
      }
    });
  } else {
    console.error('Elemento de subida de imágenes no encontrado.');
  }
});
