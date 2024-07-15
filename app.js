const entrada = document.querySelector('.InputElement');
const botonEncriptar = document.querySelector("#EncriptarBtn");
const botondesencriptar = document.querySelector("#desencriptarBtn");
const outputContainer = document.getElementById('infoGraphicContainer__mensaje');
const botonCopiar = document.getElementById('infoGraphicContainer__boton');

const PalabrasClave = {
    
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
};

const warning = (warningMessage, icon='error', title='Oops...') =>{
    Swal.fire({
        icon: icon,
        title: title,
        text: `${warningMessage}`,
      });
};

const enableCopyButton = ()=>{
    const grafico = document.getElementById('infoGraphic');
    const subMensaje = document.getElementById('infoGraphicContainer__submensaje');
    const mensaje = document.getElementById('infoGraphicContainer__submensaje');
   
    mensaje.style.fontWeight = 'normal';
    grafico.style.display = "none";
    subMensaje.style.display = "none";
    botonCopiar.style.display = "block";
};

const copiarTexto = ()=>{
    let elemento = document.getElementById('infoGraphicContainer__mensaje');
    const texto = elemento.innerText || elemento.textContent;
    const range = document.createRange();
    range.selectNodeContents(elemento);
    const selection = window.getSelection();
    selection.removeAllRanges(); 
    selection.addRange(range); 
    navigator.clipboard.writeText(texto).then(() => {
        warning('Texto copiado al portapapeles', 'success', 'Genial!');
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
};


const procesarEntrada = (texto)=>{
    if(String(texto)== ''){

        warning('Por favor ingrese su mensaje, por que esta vacio!');
        return true;
    }
    else if(String(texto).match(/[A-Z]|[áéíóúüñÁÉÍÓÚÜÑ]/g)){
      
        warning('No se permiten mayusculas ni acentos');
        return true;
    } 
};
const encriptarMensaje = (mensaje) =>{
    if(procesarEntrada(mensaje)){
        return false;
    }else{
        let palabraEncriptada = '';
        [...mensaje].forEach((o)=> {
            PalabrasClave.hasOwnProperty(o) ? palabraEncriptada+=PalabrasClave[o] : palabraEncriptada += o; 
        })
        outputContainer.innerHTML = palabraEncriptada;
        enableCopyButton();
    }
}
const desencriptarTexto = (texto)=>{
    if(procesarEntrada(texto)){
        return false;
    }else{
        Object.entries(PalabrasClave).forEach(([clave, valor])=>{
            if(texto.match(valor)){
                let patronRegex = new RegExp(valor, 'gi')
                texto = texto.replace(patronRegex, clave);
            }
        
        })
        outputContainer.innerHTML =  texto;
        
        enableCopyButton();
        
    }
};

botonEncriptar.addEventListener('click', ()=>{
     encriptarMensaje(entrada.value); 
});
botondesencriptar.addEventListener('click',()=>{
     desencriptarTexto(entrada.value); 
});

botonCopiar.addEventListener('click', ()=>{
    copiarTexto();
});