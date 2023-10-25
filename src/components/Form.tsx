import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WrongData } from "./WrongData";


export const Form = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const registeredUsers = [
    {
      login: 'testuser',
      password: 'testpassword123',
    },

    {
      login: '789',
      password: '000',
    }

  ];

  const handleValidate = (user: string, password: string) => {

    registeredUsers.forEach((el) => {
      if (user === '' || password === '') {
        setMessage('Enter your login and password.');
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
      } else if (
        el.login === user && el.password === password
      ) {
        navigate('/table');
      }
      else {
        setMessage(`Login doesn't match password.`);
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
      }
    })
  }

  return (
    <>
      <section className='form'>
        <div className='form__container'>
          <div className='form__top'>
            <h1 className='form__title'>Sigh in</h1>
            <button type='button' className='form__button'>Register</button>
          </div>
          <form action="#" method="get" className="form__inputs">
            <div className="input-container">
              <svg className='form__icon'
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101" id="user"
                fill='white'>
                <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path></svg>
              <input
                type="text" placeholder="Your login"
                className="form__input"
                value={user}
                onChange={event => setUser(event?.target.value)}
                required />
            </div>

            <div className="input-container">
              <svg className="form__icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M779.822 367.987h-10.317V272.55C770.365 116.93 657.733 0 508.99 0 362.828 0 251.056 116.93 251.056 272.55v95.437h-7.738c-78.24 0-141.004 66.203-141.004 143.583v367.987c0 80.82 63.624 143.583 141.004 143.583h536.504c78.24 0 141.004-66.203 141.004-143.583V511.57c-1.72-79.96-65.343-143.583-141.004-143.583zM294.905 270.83c0-134.126 90.277-228.702 214.086-228.702 126.388 0 216.665 97.156 216.665 228.702v95.436h-433.33v-95.436h2.58z m582.932 608.726c0 55.885-43.849 102.314-97.155 102.314H243.318c-53.306 0-97.155-46.429-97.155-102.314V511.57c0-55.886 43.849-102.314 97.155-102.314h537.364c53.306 0 97.155 46.428 97.155 102.314v367.987z" fill="white" stroke="white" />
                <path d="M507.271 567.456c-34.391 0-61.044 29.232-61.044 63.624 0 24.074 12.037 43.849 31.812 55.886v104.893c0 17.196 14.616 31.812 31.812 31.812s 31.811-14.616 31.811-31.812V686.966c19.775-12.037 31.812-31.812 31.812-55.886-6.018-33.532-32.671-63.624-66.203-63.624z" fill="white" stroke="white" />
              </svg>

              <input
                type="text" placeholder="Your password"
                className="form__input"
                value={password}
                onChange={event => setPassword(event?.target.value)}
                required
              />
            </div>

            <button type='submit'
              className='form__button
              form__button--submit'
              onClick={() => handleValidate(user, password)}>
              Sign in
            </button>
          </form>

          {errorMessage && <WrongData
            message={message}
          ></WrongData>}

        </div>

      </section>
    </>
  );
};

