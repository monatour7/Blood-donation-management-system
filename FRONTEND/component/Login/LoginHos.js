import Link from 'next/link';
import Nav from '../Home/Nav';
import classes from './Login.module.css'
import React, { Fragment, useRef, useState } from 'react'


export const LoginHos = (props) => {
    const Passowrd = useRef();
    const Identifier=useRef();

    const LoginHandler = async () => {
        event.preventDefault()
    
    const DonorLog = {
        identifier: Identifier.current.value,
        password : Passowrd.current.value,
    }
    props.onAddDonorLog(DonorLog);
         
}




    return (
        <Fragment>
            <div className={classes.main}>
                <div className={classes.overlay}>
                        <div className={classes.content}>
            <Nav/>

                            <section className={classes.auth}>
                                <h1>{'تسجيل الدخول '}</h1>
                                <form onSubmit={LoginHandler}>
                                    <div className={classes.control}>
                                        <label htmlFor="Identifier">البريد الالكتروني</label>
                                        <input type='text' id='identifier' required ref={Identifier}  />
                                    </div>

                                    <div className={classes.control}>
                                        <label htmlFor='Passowrd'>كلمة السر</label>
                                        <input
                                            type='password' 
                                            id='password'
                                            required  
                                            ref={Passowrd}
                                        />
                                    </div>
                                    
                                    <div className={classes.actions}>
                                    {(
                                           <button onClick={LoginHandler}>تسجيل الدخول</button>
                                    )}
                                        <button
                                            type='button'
                                            className={classes.toggle}
                                            
                                        >
                                            <Link href={'/Regester/RegesterAsHos'}>
                                            {'انشاء حساب'}
                                            
                                            </Link>
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
                <div className={classes.footer}>
    <li>للتواصل مع الدعم : </li>
    <li>mohammed.natour7@gmail.com</li>
  </div>
        </Fragment>
    );
    
    };