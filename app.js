const entrada = document.querySelector('.InputElement');
const botonEncriptar = document.querySelector("#EncriptarBtn");
const botondesencriptar = document.querySelector("#desencriptarBtn");
const outputContainer = document.getElementById('outputContainer');

const PalabrasClave = {
    
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
};
const warning = (warningMessage) =>{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${warningMessage}`,
      });
}

const procesarEntrada = (texto)=>{
  
    

    if(String(texto)== ''){

        warning('Por favor ingrese su mensaje, por que esta vacio!');
        return true;
    }
    
    else if(String(texto).match(/[A-Z]|[áéíóúüñÁÉÍÓÚÜÑ]/g)){
      
        warning('No se permiten mayusculas ni acentos')
        return true;
    } 

    

}


const encriptarMensaje = (mensaje) =>{

    if(procesarEntrada(mensaje)){
        return false;
    }else{

        let palabraEncriptada = '';
        
        [...mensaje].forEach((o)=> {
            PalabrasClave.hasOwnProperty(o) ? palabraEncriptada+=PalabrasClave[o] : palabraEncriptada += o; 
        })
    
        outputContainer.innerHTML = palabraEncriptada;
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
}



}

botonEncriptar.addEventListener('click', ()=>{
     encriptarMensaje(entrada.value); 
});
botondesencriptar.addEventListener('click',()=>{
     desencriptarTexto(entrada.value); 
});

