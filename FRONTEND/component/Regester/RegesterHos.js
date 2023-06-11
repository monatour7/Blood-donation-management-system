import Link from 'next/link';
import React, { Fragment, useRef, useState } from 'react'
import Nav from '../Home/Nav';
import classes from './Regester.module.css'
import axios from 'axios';
export const RegesterHos = (props) => {

    const Username = useRef();
    const Email = useRef();
    const Password = useRef();
    const First_name = useRef();
    const Mobile_number = useRef();
    const Last_name = useRef();
    const Address = useRef();

 //   const Has_full_access = useRef();
 //   const Age = useRef();
 //   const Weight = useRef();
 //   const Blood_grupe = useRef();



    let url;

    // Send the POST request using fetch 'https://dfdd-45-147-66-149.ngrok.io/add/'

    const SignupHos =(event) => {
        event.preventDefault()
         const Donor = {
         username : Username.current.value,
         email : Email.current.value,
         password : Password.current.value,
         first_name : First_name.current.value,
         phone_number : Mobile_number.current.value,
         address : Address.current.value,
         last_name : Last_name.current.value,
         has_full_access : false,
        //const age = Weight.current.value;
        //const weight = Age.current.value;
        //const blood_grupe = Blood_grupe.current.value;
        }
         
         props.onAdd(Donor);
        
    }



    return (
        <Fragment>
            <div className={classes.main}>
                <div className={classes.overlay}>
                    <div className={classes.content}>
                        <Nav />
                        <section className={classes.auth}>
                            <h1>{'انشاء حساب '}</h1>
                            <form>
                                <div className={classes.control}>
                                    <label htmlFor='username'>اسم الحساب </label>
                                    <input type='text' id='username' required ref={Username} />
                                </div>

                                <div className={classes.control}>
                                    <label htmlFor='First_name'>اسم الاول </label>
                                    <input type='text' id='First_name' required ref={First_name} />
                                </div>

                                <div className={classes.control}>
                                    <label htmlFor='Last_name'>اسم الاخير </label>
                                    <input type='text' id='Last_name' required ref={Last_name} />
                                </div>

                                <div className={classes.control}>
                                    <label htmlFor='email'>البريد الالكتروني</label>
                                    <input type='email' id='email' required ref={Email} />
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='Address'> العنوان </label>
                                    <input type='text' id='Address' required ref={Address} />
                                </div>

                                <div className={classes.control}>
                                    <label htmlFor='number'>رقم الهاتف</label>
                                    <input type='number' id='number' required ref={Mobile_number} />
                                </div>

                                {/* <div className={classes.control}>
                                    <label htmlFor='number'>الوزن</label>
                                    <input type='number' id='number' required ref={Weight} />
                                </div>

                                <div className={classes.control}>
                                    <label htmlFor='number'>العمر</label>
                                    <input type='number' id='number' required ref={Age} />
                                </div> */}

                                <div className={classes.control}>
                                    <label htmlFor='password'>كلمة السر</label>
                                    <input
                                        type='password'
                                        id='password'
                                        required
                                        ref={Password}
                                    />
                                      {/* <div className={classes.control}>
                                    <label htmlFor='number'>زمرة الدم</label>
                                    <select name="Blood_grupe" id="Blood_grupe" ref={Blood_grupe}>
                                        <option value="A+" >A+</option>
                                        <option value="A-" >A-</option>
                                        <option value="B+" >B+</option>
                                        <option value="B-" >B-</option>
                                        <option value="O+" >O+</option>
                                        <option value="O-" >O-</option>
                                        <option value="AB+" >AB+</option>
                                        <option value="AB-" >AB-</option>
                                    </select>

                                </div> */}
                                </div>
                                <input type="checkbox" id="" name="" value="" />
                                <label className={classes.label1} for=""> اوافق على<Link href={'/'}> الشروط </Link>  </label><br />
                                <div className={classes.actions}>
                                    {(
                                        <button onClick={SignupHos}> 
                                        {'انشاء حساب  '}</button>
                                    )}
                                    <button
                                        type='button'
                                        className={classes.toggle}
                                    >
                                        <Link href={'/login/LogInAsHos'}>
                                            {'املك حساب بالفعل'}</Link>
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </Fragment>

    );
}                                  