import React from "react";
import { Form, Text, TextArea, Select } from "react-form";
import { store } from "../../../reducers/combinereducers.js";
import Button from "../../button/Button";
import { TweenMax, Power4 } from "gsap";
import "./style.css";
import fetch from "node-fetch";
import * as animate from "./animations";

class MailForm extends React.Component {
  constructor(props) {
    super(props);
    this.Focus = this.Focus.bind(this);
    this.Blur = this.Blur.bind(this);
    this.SubmitToAPI = this.SubmitToAPI.bind(this);
    this.ShowError = this.ShowError.bind(this);
    this.state = {
      subject: "",
      message: "",
      email: ""
    };
  }

  Focus(underbarClass, textColor, underbar, formApi, name) {
    name === "email" && formApi.setValue("Email", "");

    TweenMax.to(textColor, 0.45, {
      color: "#FFF",
      ease: Power4.easeOut
    });
    TweenMax.to(underbar, 0.45, {
      backgroundColor: "#2d509b",
      ease: Power4.easeOut
    });
    TweenMax.to(underbarClass, 0.45, {
      scaleX: 1,
      ease: Power4.easeOut
    });
  }

  Blur(underbarClass, textColor, underbar) {
    TweenMax.to(underbarClass, 0.2, { scaleX: 0 });
    TweenMax.to(textColor, 0.2, { color: "#889ed8" });
  }

  ShowError(message, subject, email) {
    (email === "" || email === undefined) && animate.animation("ErrorMail");
    (subject === "" || subject === undefined) &&
      animate.animation("ErrorSubject");
    (message === "" || message === undefined) &&
      animate.animation("ErrorMessage");
  }

  SubmitToAPI(formApi) {
    let SubjectFormInput = formApi.getFormState().values.Subject;
    let MessageFormInput = formApi.getFormState().values.Message;
    let EmailFormInput = formApi.getFormState().values.Email;
    let emailValid = formApi.getFormState().values.Email;
    let errorMailMsg;
    formApi.getFormState().values.Email;


    store.getState().LANG.Flag === "EN"
      ? (errorMailMsg = "Invalid mail adress !")
      : (errorMailMsg = "Adresse e-mail invalide !");

    emailValid !== undefined &&
      (emailValid = emailValid.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));

    emailValid ? null : animate.animation("ErrorMail");
    formApi.setValue("Email", errorMailMsg);

    MessageFormInput !== undefined &&
    SubjectFormInput !== undefined &&
    EmailFormInput !== undefined &&
    emailValid
      ? this.callApi(formApi)
      : this.ShowError(MessageFormInput, SubjectFormInput, EmailFormInput);
  }

  //Async call to backend

  callApi = async formApi => {
    animate.animation("SendPanel");
    const response = await fetch("https://api-creative-nebula.herokuapp.com/api/contact", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      method: "POST",
      body: JSON.stringify({
        email: formApi.getFormState().values.Email,
        message: formApi.getFormState().values.Message,
        subject: formApi.getFormState().values.Subject
      }),
    });
    const body = await response.json();
    body.validate === "true" && animate.animation("SuccessPanel");
    body.validate === "false" && animate.animation("ErrorPanel");
  };


  shouldComponentUpdate(prevProps)
  {
    return this.props != prevProps ? true : false
  }

  render() {

    const statusOptions = [
      {
        label: 'Design job',
        value: 'Design job',
      },
      {
        label: 'Development job',
        value: 'Development job',
      },
      {
        label: "I come in peace",
        value: 'I come in peace',
      },
    ]

    return (
      <React.Fragment>
        <Form>
          {formApi => (
            <form id="formMailWrapper" method="POST">
              <Text
                name="email"
                autoComplete="email"
                onFocus={() =>
                  this.Focus(
                    ".underbar_email",
                    ".input--email--mailer",
                    ".underbar_email_before",
                    formApi,
                    "email"
                  )
                }
                onBlur={() =>
                  this.Blur(".underbar_email", ".input--email--mailer")
                }
                spellCheck="false"
                className="input--email--mailer"
                field="Email"
                placeholder={store.getState().LANG.JsonLang.MailerPanel.email}
              />
              <div className="underbar_email_before" />
              <div className="underbar_email" />
              <Select field="Subject" options={statusOptions} onFocus={() =>
                  this.Focus(
                    ".underbar_name",
                    ".input--mailer",
                    ".underbar_name_before",
                    formApi
                  )
                } 
                onBlur={() => this.Blur(".underbar_name", ".input--mailer")}
                name="subject"
                placeholder={store.getState().LANG.JsonLang.MailerPanel.subject}
                className="input--mailer"
                />
              <div className="underbar_name_before" />
              <div className="underbar_name" />
              <TextArea
                htmlFor="message"
                onFocus={() =>
                  this.Focus(
                    ".underbar_message",
                    ".input--field--mailer",
                    ".underbar_message_before",
                    formApi
                  )
                }
                name="message"
                onBlur={() =>
                  this.Blur(".underbar_message", ".input--field--mailer")
                }
                spellCheck="false"
                maxLength="500"
                className="input--field--mailer"
                field="Message"
                placeholder={store.getState().LANG.JsonLang.MailerPanel.message}
              />
              <div className="underbar_message_before" />
              <div className="underbar_message" />
              <div className="btnMailerWrapper">
                <Button
                  ClickEvent={() => this.SubmitToAPI(formApi)}
                  ID="btnMailerSubmit"
                >
                  {store.getState().LANG.JsonLang.MailerPanel.submit}
                </Button>
              </div>
            </form>
          )}
        </Form>
        <div className="LoaderMail" />
      </React.Fragment>
    );
  }
}

export default MailForm;
