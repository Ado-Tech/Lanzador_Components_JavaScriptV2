const SUCCESS_MSJ="SUCCESS";var config,stylesLivenessLoaded=null,clientLivenessLoaded=null,CASE_ID=null,NEW_UID_DEVICE=null;const VERSION_COMPONENT=1,SUCCESS=1,ERROR_LIVENESS=2,ERROR_CARD_CAPTURE=3,ERROR_TOKEN=4;async function Start(e,t,a,n,o,r,s,i,l,c){try{(function(e,t,a,n,o,r){CASE_ID="xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,a="x"==e?t:3&t|8;return a.toString(16)}),NEW_UID_DEVICE="xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,a="x"==e?t:3&t|8;return a.toString(16)});var i="",l=!0;r&&0!==r.length||(s=NEW_UID_DEVICE);e&&0!==e.length||(i=`${i} The param urlBase is required`);t&&0!==t.length||(i=`${i} The param projectName is required`);a&&0!==a.length||(i=`${i} The param apiKey is required`);n&&0!==n.length||(i=`${i} The param productId is required`);(!o||0==o||o>2)&&(i=`${i} The param functionCapture is empty or not valid`);""!=i&&(l=!1,u(ERROR_TOKEN,null,i));return l})(e,t,a,n,o,s)&&null!=(config=await async function(){try{const o=await fetch(`${e}/api/${t}/GetConfig?Message=none`,{method:"POST",headers:{apiKey:a,productId:n},redirect:"follow"});return o.ok?await o.json():(u(ERROR_TOKEN,null,"invalidCredentials"),null)}catch(e){"Failed to fetch"===e.message?u(ERROR_TOKEN,null,"connectionError",!1):u(ERROR_TOKEN,null,"invalidParameters",!1)}}())&&(1==o?function(){let n={url:config.UrlNewServiceLiveness,extraData:{caseId:CASE_ID,clientTranslationFileName:config.ConfigFileLiveness,flowConfigName:config.ConfigGeneralFileLiveness,libraryName:"LIVENESS"}},o=`${config.UrlNewServiceLiveness}/demo?is_iframe=true&params=`+encodeURIComponent(JSON.stringify(n)),r=document.createElement("iframe");r.setAttribute("id","liveness-iframe"),r.setAttribute("allow","camera *;microphone *"),r.setAttribute("style","width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 2;"),r.setAttribute("src",o),document.body.appendChild(r);const s=window.addEventListener?"addEventListener":"attachEvent";(0,window[s])("attachEvent"===s?"onmessage":"message",async function n(o){const s=JSON.parse(o.data);switch(s.status){case"success":var i=s.stages.filter(e=>"passive"==e.stage.type),l=i[0].payload.score,c=parseFloat(String(config.LivenessThreshold).replace(",","."));if(l>c){let n=await async function(n){var o=new Headers;o.append("apiKey",a),o.append("Content-Type","application/json");var r=JSON.stringify({Image:n,GetFeatures:!0,GetTemplate:!1}),s={method:"POST",headers:o,body:r,redirect:"follow"};let i=await fetch(`${e}/api/GetFacialFeatures?projectName=${t}`,s);return i.ok?await i.json():(console.log(i.statusText),null)}(s.stages[0].payload.images.face_image);!function(e){return!(e.Response.lstResults[0].Blink||e.Response.lstResults[0].MouthOpen||e.Response.lstResults[0].Glasses||e.Response.lstResults[0].DarkGlasses)}(n)?u(ERROR_LIVENESS,null,"livenessFailed"):u(SUCCESS,s.stages[0].payload.images.face_image,SUCCESS_MSJ)}else u(ERROR_LIVENESS,null,"livenessFailed");break;case"failure":default:console.log("Liveness Fail"),u(ERROR_LIVENESS,null,"livenessFailed")}console.log("iframe element removed"),document.body.removeChild(r),window.removeEventListener("onmessage",n,!1),window.removeEventListener("message",n,!1)},!1)}():2==o&&function(){const e={SHOW_RESULTS:!1,NUMBER_OF_IMAGES:1,POPUP_TEXT:"Capturar Cara posterior",POSITION_INSTRUCTION_FRONT_SIDE:r?config.ConfigurationUI.CardCaptureUI.CaptureFrontInstructionsText:config.ConfigurationUI.CardCaptureUI.CaptureBackInstructionsText,POSITION_INSTRUCTION_BACK_SIDE:config.ConfigurationUI.CardCaptureUI.CaptureBackInstructionsText,SIDE_A:"Side A",SIDE_B:"Side B",RESULTS_PAGE_TITLE:"Confirmar Foto",RESULTS_CONDITIONS_TITLE:"Make Sure:",CONDITIONS:[{CONDITION:"Se escaneó toda la identificación"},{CONDITION:"Sin deslumbramiento en la identificación"},{CONDITION:"El texto es legible."}],CONFIRM_BUTTON:"OK",TRY_AGAIN_BUTTON:"Inténtalo de nuevo",COLORS:{positionInstructionTextBackground:config.ConfigurationUI.CardCaptureUI.InstructionsBackgroundColor,instructionsTextColor:config.ConfigurationUI.CardCaptureUI.InstructionsColor,instructionsColor:config.ConfigurationUI.CardCaptureUI.InstructionsColor,loaderColor:config.ConfigurationUI.CardCaptureUI.BackArrowColor,popupBackgroundColor:"white",popupTextColor:"red",primaryColor:config.ConfigurationUI.CardCaptureUI.MainColor,backArrow:config.ConfigurationUI.CardCaptureUI.BackArrowColor},FONT:"'Roboto', sans-serif"};let t;try{e.NUMBER_OF_IMAGES=1,(t=scanovate_card_capture()).destroyFirstPage(e.KILL_STREAM_AFTER_USAGE),t.destroySecondPage(),t.init(e),document.getElementById("back-button").addEventListener("click",function(){u(ERROR_CARD_CAPTURE,null,"userCanceled")}),t.on("error",a=>{console.log(`Error name: ${a&&a.name}, message: ${a&&a.message}`),t.destroyFirstPage(e.KILL_STREAM_AFTER_USAGE),t.destroySecondPage(),"ScanovateCameraError"==a.name?u(ERROR_CARD_CAPTURE,null,"canNotOpenCamera"):u(ERROR_CARD_CAPTURE,null,"exception")}),t.on("success",a=>{t.destroyFirstPage(e.KILL_STREAM_AFTER_USAGE),t.destroySecondPage();var n=a.firstCapture;n=n.replace("data:image/jpeg;base64,",""),u(SUCCESS,n,SUCCESS_MSJ)})}catch(e){u(ERROR_CARD_CAPTURE,null,"exception")}}())}catch(e){u(ERROR_TOKEN,null,e.message)}function u(n,r,u,d=!0){var C={};C.StatusCode=n,C.Image=r,C.UIdDevice=s,C.keyProcessLiveness=CASE_ID,C.Message=u,d?async function(n,r,u){try{var d={};d.StatusCode=n,d.Image=null,d.UIdDevice=s,d.keyProcessLiveness=CASE_ID,d.SourceDevice=4,d.BrowserVersion=navigator.appVersion,d.OS=null,d.Message="Could not send record";var C=new Headers;C.append("apiKey",a),C.append("Authorization",i),C.append("Content-Type","application/json");var E=JSON.stringify({Service:o,SourceDevice:"4",Status:n==ERROR_LIVENESS||n==ERROR_CARD_CAPTURE||n==ERROR_TOKEN?2:1,SdkVersion:VERSION_COMPONENT,BrowserVersion:navigator.appVersion,UIdDevice:s,Message:r}),S={method:"POST",headers:C,body:E,redirect:"follow"};const R=await fetch(e+"/api/"+t+"/RegisterLogComponents",S);R.ok?u.StatusCode==SUCCESS?l(u):c(u):(401==R.status&&(d.Message="invalidCredentials",u.Message="invalidCredentials",u.StatusCode=ERROR_TOKEN),401==R.status&&(d.Message="tokenError",u.Message="tokenError",u.StatusCode=ERROR_TOKEN),c(u))}catch(e){"Failed to fetch"===e.message&&(d.message="connectionError"),d.message=e.message,c(d)}}(n,u,C):c(C)}}
