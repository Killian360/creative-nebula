import {TweenMax, Power1, Power4, Power2} from "gsap";
import {store} from '../../../reducers/combinereducers.js'

export const animation = (animName, ID) => {

  const PanelWrapper = document.getElementsByClassName('PanelWrapper MailPanel');
  const contentViewer = document.getElementById("contentViewer");
  const MailPanel = document.getElementById("MailPanel");
  const HighlightIco = document.getElementsByClassName('HighlightIco Mailer');
  const Panel_mail_loading = document.getElementsByClassName('Panel_mail_loading');
  const formMailWrapper = document.getElementById('formMailWrapper');
  const Ico_helper = document.getElementsByClassName('Ico_helper');
  const PanelID = document.getElementById(ID);


  switch (animName) {
    case 'SendPanel':
    {
      store.dispatch({type: 'sending'});
      TweenMax.to(formMailWrapper, 0.25, {opacity:0.5, height:20, pointerEvents:'none'});
      TweenMax.to(Panel_mail_loading, 0.45, {scaleX:1, ease:Power4.easeOut});
      break;
    }
    case 'SuccessPanel':
    {
      store.dispatch({type: 'sent'});
      TweenMax.to(Panel_mail_loading, 0.45, {backgroundImage: "linear-gradient(to right,rgba(255,255,255,1) 0%,rgba(76,207,27,1) 50%,rgba(255,255,255,1) 100%)", ease:Power4.easeOut});
      TweenMax.killTweensOf('.HighlightIco');
      TweenMax.to(contentViewer, 0.4, {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        delay: 1.45,
        ease: Power1.easeOut
      });
      TweenMax.to(MailPanel, 0.25, {
        scale: 1.25,
        delay: 1,
        ease: Power2.easeOut
      });
      TweenMax.to(MailPanel, 0.25, {
        scale: 0.75,
        delay: 1.25,
        opacity: 0,
        ease: Power1.easeIn
      });
      TweenMax.to(PanelWrapper, 0.25, {
        opacity: 0,
        delay: 1.7,
        display: 'none',
        ease: Power1.easeIn,
        onComplete:dispatchClose
      });
      break;
    }
    case 'ErrorPanel':
    {
      store.dispatch({type: 'errorsent'});
      TweenMax.to(Panel_mail_loading, 0.45, {backgroundImage: "linear-gradient(to right,rgba(255,255,255,1) 0%,rgba(235,24,44,1) 50%,rgba(255,255,255,1) 100%)", ease:Power4.easeOut});
      TweenMax.killTweensOf('.HighlightIco');
      TweenMax.to(contentViewer, 0.4, {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        delay: 1.45,
        ease: Power1.easeOut
      });
      TweenMax.to(MailPanel, 0.25, {
        scale: 1.25,
        delay: 1,
        ease: Power2.easeOut
      });
      TweenMax.to(MailPanel, 0.25, {
        transform: "translateY(-50%) scale(0.75)", 
        delay: 1.25,
        opacity: 0,
        ease: Power1.easeIn
      });
      TweenMax.to(PanelWrapper, 0.25, {
        opacity: 0,
        delay: 1.5,
        display: 'none',
        ease: Power1.easeIn,
        onComplete:dispatchClose
      });
      break;
    }
    case 'OpenMailPanel':
    TweenMax.set(MailPanel, {
      scale:1.5,
      y:"-50%",
    });
    TweenMax.fromTo(HighlightIco, 1.6, {
        scale: 2
      }, {
        scale: 2.4,
        yoyo: true,
        repeat: -1
      });
      TweenMax.to(PanelWrapper, 0.25, {
        opacity: 1,
        display: 'block',
        visibility: 'visible',
        scale: 1,
        ease: Power1.easeIn
      });
      TweenMax.to(contentViewer, 0.35, {
        opacity: 0.9,
        scale: 0.75,
        ease: Power1.easeOut
      });
      TweenMax.to(MailPanel, 0.65, {
        opacity: 1,
        scale:1,
        y:"-50%",
        delay: 0.15,
        ease: Power4.easeOut
      });
      TweenMax.to(Ico_helper, 0.35, {
        opacity: 1,
        scale:1,
        delay:0.55,
        ease: Power4.easeOut
      });
      break;
    case 'ErrorMail':
      TweenMax.to(".input--email--mailer", 0.2, {color: "#f00d58"});
      TweenMax.to(".underbar_email_before", 0.2, {backgroundColor: "#f00d58"});
      break;
    case 'ErrorSubject':
      TweenMax.to(".input--mailer", 0.2, {color: "#f00d58"});
      TweenMax.to(".underbar_name_before", 0.2, {backgroundColor: "#f00d58"});
      break;
    case 'ErrorMessage':
      TweenMax.to(".input--field--mailer", 0.2, {color: "#f00d58"});
      TweenMax.to(".underbar_message_before", 0.2, {backgroundColor: "#f00d58"});
      break;
    case 'ClosePanel':
    store.dispatch({type: 'SwitchOFF'});
      TweenMax.killTweensOf('.HighlightIco');
      TweenMax.to(contentViewer, 0.4, {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        delay: 0.45,
        ease: Power1.easeOut
      });
      TweenMax.to(PanelID, 0.25, {
        scale: 1.25,
        ease: Power2.easeOut
      });
      TweenMax.to(PanelID, 0.25, {
        scale: 0.75,
        delay: 0.25,
        opacity: 0,
        ease: Power1.easeIn
      });
      TweenMax.to(PanelWrapper, 0.25, {
        opacity: 0,
        delay: 0.25,
        display: 'none',
        ease: Power1.easeIn,
        onComplete:dispatchClose
      });
      TweenMax.to(formMailWrapper, 0.25, {opacity:1, pointerEvents:'auto'});
      TweenMax.to(Panel_mail_loading, 0.25, {scaleX:0, ease:Power4.easeOut});
      break;
    default:
  }
  function dispatchClose()
  {
    store.dispatch({type: 'notsend'});
    store.dispatch({type: 'MailerClose'});
  }
}
