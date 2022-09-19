const PAISO=document.getElementById('origen');
const PAISD=document.getElementById('destino');
const TEXTOD=document.getElementById('textoD');
const TRADUCIR=document.getElementById('traducir');
let CODEO='es';
let CODED='en';

const GET_URL='https://text-translator2.p.rapidapi.com/getLanguages';
//peticiones GET
const OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '908554dd35msh2142f7176c985cfp18cdb0jsn459655d0459a',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};

fetch(GET_URL,OPTIONS)
.then(res=>res.json())
.then(res=>{
    let len=res.data.languages;
    len.forEach(element => {
        PAISO.innerHTML+=`<option value=${element.code}>${element.name}</option>`;
        PAISD.innerHTML+=`<option value=${element.code}>${element.name}</option>`;
    });

})
.catch(err=>console.error(err));

PAISO.addEventListener('click',()=>{
    CODEO=PAISO.value;
    
});
PAISD.addEventListener('click',()=>{
    CODED=PAISD.value;
    
});

//fin peticiones GET

//peticiones POST

TRADUCIR.addEventListener("click",(e)=>{


let texto=document.getElementById('textoO').value;
const encodedParams = new URLSearchParams();

encodedParams.append("source_language", CODEO);
encodedParams.append("target_language", CODED);
encodedParams.append("text", texto);

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '908554dd35msh2142f7176c985cfp18cdb0jsn459655d0459a',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://text-translator2.p.rapidapi.com/translate', options)
	.then(response => response.json())
	.then(response =>{ //console.log(response)
            TEXTOD.innerText=response.data.translatedText;

    })
	.catch(err => console.error(err));
});