
function sumar(a,b){
    return a+b;
}
function restar(a,b){
    return a-b;
}
function multiplicar(a,b){
    return a*b
}
function dividir(a,b){
    return a/b
}

//console.log(dividir(2,3))
//console.log(valor2)

const suma = (a,b) =>{
    return a+b
}
console.log(suma(2,3))

const axios = require('axios')

async function consumirDatos(){
    const datos = await axios('https://radioondapopular.com/wp-json/wp/v2/posts?categories=38')    
    //console.log(datos.data[2].title.rendered)
    datos.data.map(noticia=>{
        console.log(noticia.title.rendered)
    })
   
}

consumirDatos()