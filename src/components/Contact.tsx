import React from 'react';
import {ILoginInfo, ISubmitInfo} from "../interfaces";
import {sendMessage} from "../functions/functions";

interface Props {
    loginInfo: ILoginInfo | null,
}
const Loading = (props: Props) => {
    //
    const { loginInfo } = props;

    const nameRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const subjectRef = React.useRef<HTMLInputElement>(null);
    const messageRef = React.useRef<HTMLTextAreaElement>(null);

    const onClickSend = React.useCallback(async () => {
        //
        if (!loginInfo) {
            alert('Login Info is needed.');
            return;
        }

        const submitInfo: ISubmitInfo = {
            name: nameRef.current ? nameRef.current.value : '',
            email: emailRef.current ? emailRef.current.value : '',
            subject: subjectRef.current ? subjectRef.current.value : '',
            message: messageRef.current ? messageRef.current.value : '',
        };

        await sendMessage(JSON.stringify(loginInfo) + ' ///////////////////// ' + JSON.stringify(submitInfo))
            .then((res) => {
                if (res.status === 200) {
                    alert('Your message is just sent.');
                    if (nameRef.current) nameRef.current.value = '';
                    if (emailRef.current) emailRef.current.value = '';
                    if (subjectRef.current) subjectRef.current.value = '';
                    if (messageRef.current) messageRef.current.value = '';
                }
            });
    }, [loginInfo]);

    return (
        <article id="contact" className="panel">
            <header>
                <h2>Contact Me</h2>
            </header>
            <form>
                <div>
                    <div className="row">
                        <div className="col-6 col-12-medium">
                            <input ref={nameRef} type="text" name="name" placeholder="Name"/>
                        </div>
                        <div className="col-6 col-12-medium">
                            <input ref={emailRef} type="text" name="email" placeholder="Email"/>
                        </div>
                        <div className="col-12">
                            <input ref={subjectRef} type="text" name="subject" placeholder="Subject"/>
                        </div>
                        <div className="col-12">
                            <textarea ref={messageRef} name="message" placeholder="Message" rows={6}/>
                        </div>
                        <div className="col-12">
                            <input type="button" value="Send Message" onClick={onClickSend} />
                        </div>
                    </div>
                </div>
            </form>
        </article>
    );
}

export default Loading;
