window.onload = function(){

    mybutton = document.createElement('button');
    mybutton.setAttribute('class', 'button');
    mybutton.innerText = "Schimbă paleta de culori a site-ului";
    document.getElementsByClassName('footer')[0].appendChild(mybutton);

    let ok = 0;
    
    ok = JSON.parse(localStorage.getItem('okk'));
    
    if(ok === 1) {
      let N = localStorage.getItem('N');
      if(N){
      let x = this.document.getElementsByClassName('topnav')[0];
      x.style.backgroundColor = N; 
    
      let y = this.document.getElementsByClassName('dropdown-content')[0];
      y.style.backgroundColor = N; 
    }

    let M = this.localStorage.getItem('M');
    if(M){
      let z = this.document.getElementsByClassName('card')[0];
      z.style.backgroundColor = M;
      let t = this.document.getElementsByClassName('footer')[0];
      t.style.backgroundColor = M;
    }

  }
   
    mybutton.addEventListener ('click', () => {
                                                if( ok === 0){
                                                    ok = 1;
                                                    localStorage.setItem('okk', ok);
                                                    let newColor = 'rgb(' + 128 + ',' + 40 + ','+ 136 + ',' + 0.801 + ')';
                                                    let x = this.document.getElementsByClassName('topnav')[0];
                                                    x.style.backgroundColor = newColor; 
                                                    localStorage.setItem('N', newColor);

                                                    let y = this.document.getElementsByClassName('dropdown-content')[0];
                                                    y.style.backgroundColor = newColor; 
                                                    
                                                    newColor = 'rgb(' + 231 + ',' + 218 + ','+ 240 + ',' + 0.7 + ')';
                                                    let z = this.document.getElementsByClassName('card')[0];
                                                    z.style.backgroundColor = newColor;

                                                    let t = this.document.getElementsByClassName('footer')[0];
                                                    t.style.backgroundColor = newColor;

                                                    localStorage.setItem('M', newColor);
                                                    
                                                }
                                                else{
                                                    ok = 0;
                                                    localStorage.setItem('okk', ok);
                                                    let firstColor = 'rgb(' + 24 + ',' + 15 + ','+ 105 + ',' + 0.801 + ')';
                                                    this.document.getElementsByClassName('topnav')[0].style.backgroundColor = firstColor;
                                                    this.document.getElementsByClassName('dropdown-content')[0].style.backgroundColor = firstColor;
                                                    
                                                    firstColor = 'rgb(' + 231 + ',' + 247 + ','+ 253 + ',' + 0.76 + ')';
                                                    this.document.getElementsByClassName('card')[0].style.backgroundColor = firstColor;
                                                    this.document.getElementsByClassName('footer')[0].style.backgroundColor = firstColor;
                                                  }

                                             });

                                                   
     let a = "img1.jpg";      
     localStorage.setItem('CurrentPhoto', a);                                  
     let imag = document.getElementsByClassName("img")[0];
     if(imag)
      imag.addEventListener("mouseover", changePhoto);

     getinfo();
     myFunction();

     let afisare = JSON.parse(localStorage.getItem('afisare'));
     if(afisare == 1)
        document.getElementById('responseArea').innerText='Rezervarea a fost făcută. Vă așteptăm!';
        else
        if(afisare == 2)
           document.getElementById('responseArea').innerText='Nu s-a putut efectua rezervarea. Încercați din nou';  

      this.localStorage.setItem('afisare', 0);                                 
                                    
 
    }  

    
    function changePhoto (){
      
      let myimage =  document.getElementsByClassName("img")[0];
      myimage.style.opacity = 0;
      var t = setTimeout(change, 1000);
    
    }

    function change (){
      let arr = [ "parlament.jpg", "podul-libertatii.jpg" , "piata-eroilor.jpg", "bast.jpg", "img1.jpg"];
      let x =  Math.floor(Math.random()*4);
      let CurrentPhoto =  localStorage.getItem('CurrentPhoto');
      let myimage =  document.getElementsByClassName("img")[0];

      while(CurrentPhoto === arr[x]){
        x =  Math.floor(Math.random()*4);
      }
      
      localStorage.setItem('CurrentPhoto', arr[x]);

      myimage.src = arr[x];
      myimage.style.opacity = 100;
    }
   

    function getinfo(){
      fetch("http://localhost:3000/info")
      .then((data) => { return data.json(); })
      //.then((json) => displayinfo(json));
  }

  function displayinfo(data){
      let responseArea = document.getElementById('responseArea');
      for (let i = 0; i<data.length; i++){
          let Nume = document.createElement('P');
          Nume.innerText = data[i]["nume"];
          let Prenume = document.createElement('P');
          Prenume.innerText = data[i]["prenume"];
          let someResponse = document.createElement('DIV');
          someResponse.appendChild(Nume);
          someResponse.appendChild(document.createElement('BR'));
          someResponse.appendChild(Prenume);
          someResponse.style.border = "1px solid black";
          if(responseArea)
            responseArea.appendChild(someResponse);
      }
      
  }

  function sendInformation(){
      let fname = document.getElementById('fname').value;
      let lname = document.getElementById('lname').value;
      let email = document.getElementById('email').value;
      let country = document.getElementById('country').value;

      fetch("http://localhost:3000", {
          method: 'POST',
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify({Nume: fname, Prenume: lname, Email: email, Tara: country}) 
      }).then((data) => {
          return data.json()
      }).then((json)=>{
          if(json.Status === 'OK'){
              document.getElementById('responseArea').innerText='Rezervarea a fost făcută. Vă așteptăm!';
              localStorage.setItem('afisare', 1);
              
          } else {
              document.getElementById('responseArea').innerText='Nu s-a putut efectua rezervarea. Încercați din nou';
              localStorage.setItem('afisare',2);
          }
        
          document.location.reload(true);
      })
  }

var  apasat = 0;

function harta(){
 
if(apasat === 0){
  myiframe = document.createElement('iframe');
  myiframe.setAttribute('class', 'iframe');
  myiframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d398363.21272528387!2d19.02667102123219!3d47.53404483768552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741c334d1d4cfc9%3A0x400c4290c1e1160!2sBudapesta%2C%20Ungaria!5e0!3m2!1sro!2sro!4v1578487315662!5m2!1sro!2sro";
  myiframe.width = "100%";
  myiframe.height = "450";
  myiframe.frameborder = "0";
  myiframe.style.border = "0";
  myiframe.allowfullscreen = "";
  document.getElementsByClassName('card')[0].appendChild(myiframe); 
  apasat = 1;
 
  }
  
}


function myFunction() {
  setInterval(function(){ alert("Nu uita să îți faci rezervare"); }, 50000);
}

  