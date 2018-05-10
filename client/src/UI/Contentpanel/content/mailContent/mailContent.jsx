import React from "react";
import {connect} from 'react-redux';
import {store} from '../../../../reducers/combinereducers.js';
import IcoContainer from "../../../IconWrapper/index";
import './mailContent.css';
import MailForm from '../../../Form/mail/';
import * as animate from '../../../Form/mail/animations';

const mapStateToProps = state => {
  return {MailStatus: state.MailStatus}
}

class MailContent extends React.Component {

  componentDidMount()
  {
    animate.animation('OpenMailPanel');
  }

  render()
  {
    let Title;
    let Subtitle;
    const MailStatus = store.getState().MailStatus.Status;
    const data = store.getState().LANG.JsonLang.MailerPanel;

    MailStatus === "notsend" && (Title=data.title) && (Subtitle=data.subtitle)
    MailStatus === "sending" && (Title=data.sending) && (Subtitle=data.sendingsubtitle);
    MailStatus === "sent" && (Title=data.sent) && (Subtitle=data.sentsubtitle);
    MailStatus === "errorsend" && (Title=data.errorsent) && (Subtitle=data.errorsentsubtitle);

  return(
  <React.Fragment>
  <IcoContainer ID="Mailer" type="mailIcon" />
  <div className="Panel_mail_loading"></div>
  <div className="helperTable">
    <div className="helpertableInner">
      <div className="HelperTitleWrapper">
     <li className="HelperTitle">{Title}</li>
    <li className="HelperSubtitle">{Subtitle}</li>
      </div>
  <MailForm />
</div>
</div>
</React.Fragment>
)
}
}

export default connect(mapStateToProps)(MailContent)
