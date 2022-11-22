

function listenForClicks(){
  document.addEventListener("click", (e) => {

    function run() {

      let name =  document.getElementById("name").value
      let loading = document.getElementById("loading").value
      let script
      const simpleScript =`
      var tab = []
      
      setInterval(()=>{
                var _docs = document.querySelectorAll(".${name}")
                for(i = 0; i < _docs.length; i++) tab.push(_docs[i].innerText)
                tab = [...new Set(tab)]
                console.log(tab)
                },200)
      `
      const loadingScript = `
      var b = document.querySelector(".${loading}")
      setInterval(() => {
                var button = document.querySelector(".${loading}");
                if (button) button.click();
              }, 1000);
      `
       if(loading.length != 0 && name.length == 0){
        script = `
        ${loadingScript}
        console.log(" ")
        `
      }else if (loading.length != 0 && name.length != 0){
        script = `
        ${simpleScript}
        ${loadingScript}
        console.log(tab)
        `
      }else{
        script = `
        ${simpleScript}
        console.log(tab)
        console.log("script simple")
        `
      }
      
      browser.tabs.executeScript({code:`${script},{file: "../../../../index.js"}`})
      
    }

    if (e.target.classList.contains("button_submit")){
      browser.tabs.query({active: true, currentWindow: true})
      .then(run)
    }
    })

}

browser.tabs.executeScript({file: "../../../../index.js"})
.then(listenForClicks)