(function(){

  function add_OtherStyleScheet(){
    let style = document.createElement("style");
    style.id = "Android_Install_style";
    style.media = "screen";
    style.innerHTML = `
      #Android_Install_PopUp {
        position: absolute;
        height: 20%;
        width: 90%;
        background: ghostwhite;
        z-index: 10;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        left: 5%;
        filter: drop-shadow(2px 2px 6px black);
        top: 5%;
        animation: Android_SlidIn 2s;
      }

      #Android_Install_PopUp > .Install_PopUp_button {
        font-size: 6vw;
        height: fit-content;
        width: 90%;
        background: #4c7fdb;
        color: white;
        border: 0.2vw #4c7fdb solid;
        filter: drop-shadow(2px 2px 2px gray);
        border-radius: 2vw;
        margin: auto;
      }

      #Android_Install_PopUp > .Install_PopUp_button[name="cancel"] {
        grid-column: 1;
        grid-row: 2;
      }

      #Android_Install_PopUp > .Install_PopUp_button[name="install"] {
        grid-column: 2;
        grid-row: 2;
      }

      #Android_Install_PopUp > p {
        font-size: 5vw;
        grid-column: 1/3;
        grid-row: 1;
        max-width: 90%;
        margin: auto;
        text-align: center;
      }

      @keyframes Android_SlidIn {
        from {
          top : -30%;
        }

        to {
          top : 5%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function add_IosStyleScheet(){
    let style = document.createElement("style");
    style.id = "Ios_Install_style";
    style.media = "screen";
    style.innerHTML = `
      #Ios_Install_PopUp {
        position: absolute;
        height: 20%;
        width: 90%;
        background: ghostwhite;
        z-index: 10;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        left: 5%;
        top: 75%;
        animation: Ios_SlidIn 4s;
        filter: drop-shadow(2px 2px 6px black);
      }

      #Ios_Install_PopUp > .Install_PopUp_button {
        font-size: 6vw;
        height: fit-content;
        width: 90%;
        background: #4c7fdb;
        color: white;
        border: 0.2vw #4c7fdb solid;
        filter: drop-shadow(2px 2px 2px gray);
        border-radius: 2vw;
        margin: auto;
      }

      #Ios_Install_PopUp > .Install_PopUp_button[name="cancel"] {
        grid-column: 2;
        grid-row: 2;
      }

      #Ios_Install_PopUp > p {
        font-size: 5vw;
        grid-column: 1/4;
        grid-row: 1;
        max-width: 90%;
        margin: auto;
        text-align: left;
        display: grid;
      }

      #Ios_Install_PopUp > p > span {
        display: flex;
      }

      #Ios_Install_PopUp > p > span[name="iosShare"]::after {
        content: " ";
          background-image: url("https://th.bing.com/th/id/R.60b614f7d53e886bbaacce564c12ec50?rik=oAv1HPSqAJu6nA&pid=ImgRaw&r=0");
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          height: 6vw;
          width: 6vw;
          margin: auto auto auto 2vw;
          padding: 0;
      }

      #Ios_Install_PopUp > p > span[name="iosAddToHome"]::after {
        content: " ";
        background-image: url("https://icons-for-free.com/iconfiles/png/512/add+box+24px-131985189484366930.png");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        height: 5vw;
        width: 5vw;
        margin: auto auto auto 2vw;
        padding: 0;
      }

      @keyframes Ios_SlidIn {
        from {
          top : -30%;
        }
        to {
          top : 75%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function Other(){
    console.log("oco");
    window.addEventListener('beforeinstallprompt', (e) => {

      add_OtherStyleScheet();
      let popUp = document.createElement("div");
      popUp.id = "Android_Install_PopUp";
      popUp.innerHTML = `
        <p>Would you install the app on your mobile ?</p>
        <button class="Install_PopUp_button" name="cancel" onclick="this.parentNode.remove()">Cancel</button>
        <button class="Install_PopUp_button" name="install">Install</button>
      `;
      document.body.appendChild(popUp);

      let deferredPrompt;
      const addBtn = document.querySelectorAll('.Install_PopUp_button[name="install"]')[0];

      e.preventDefault();
      deferredPrompt = e;
      addBtn.style.display = 'block';

      addBtn.addEventListener('click', (e) => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
          });
      });
    });

  }

  function isIos(){
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

  function Ios(){
    add_IosStyleScheet();
    let popUp = document.createElement("div");
    popUp.id = "Ios_Install_PopUp";
    popUp.innerHTML = `
      <p>For install on Apple<span name="iosShare">First "Share"</span><span name="iosAddToHome">Then "Add To Home Screen"</span></p>
      <button class="Install_PopUp_button" name="cancel" onclick="this.parentNode.remove()">Cancel</button>
    `;
    document.body.appendChild(popUp);
  }

  if(isIos())Ios()
  else Other();

})()
