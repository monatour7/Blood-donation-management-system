import Link from 'next/link';
import React, { Fragment, useRef, useState } from 'react'
import Nav from '../Home/Nav';
import classes from './Regester.module.css'
import axios from 'axios';
export const RegesterDonor = (props) => {

    const Username = useRef();
    const Email = useRef();
    const National_id = useRef();
    const Password = useRef();
    const First_name = useRef();
    const Mobile_number = useRef();
    const Last_name = useRef();
    
    const gender =useRef();
    const is_smoker =useRef();
    const birthdate = useRef();
    const weight = useRef();
    const last_donation_months = useRef();
    const first_donation_months = useRef();
    const city = useRef();
    const blood_group = useRef();
    const no_donations = useRef();
    const total_volume_donated=useRef();
  


    let url;

    // Send the POST request using fetch 'https://dfdd-45-147-66-149.ngrok.io/add/'

    const SignupDonor =(event) => {
        event.preventDefault()
        const Donor = {
         username : Username.current.value,
         email : Email.current.value,
         national_id : National_id.current.value,
         password : Password.current.value,
         first_name : First_name.current.value,
         mobile_number : Mobile_number.current.value,
         last_name : Last_name.current.value,
         has_full_access : false,

         birthdate:birthdate.current.value,
         weight:weight.current.value,
         last_donation_months:last_donation_months.current.value,
         first_donation_months:first_donation_months.current.value,
         city:city.current.value,
         blood_group:blood_group.current.value,
         no_donations:no_donations.current.value,
         total_volume_donated:total_volume_donated.current.value,
         gender:gender.current.value,
         is_smoker:is_smoker.current.value
        //const age = Weight.current.value;
        //const weight = Age.current.value;

        }
        console.log(Donor);
         
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
                                    <label htmlFor='password'>كلمة السر</label>
                                    <input
                                        type='password'
                                        id='password'
                                        required
                                        ref={Password}
                                    />
                                <div className={classes.control}>
                                    <label htmlFor='number'>رقم الهوية</label>
                                    <input type='number' id='number' required ref={National_id} />
                                </div>

                                <div className={classes.control}>
                                    <label htmlFor='number'>رقم الهاتف</label>
                                    <input type='number' id='number' required ref={Mobile_number} />
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='number'>تاريخ الميلاد</label>
                                    <input type='date' id='number' required ref={birthdate} />
                                </div>
                                
                                <div className={classes.control}>
                                    <label htmlFor='number'>الوزن</label>
                                    <input type='number' id='number' required ref={weight} />
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='number'>كم شهر مضى على اخر تبرع </label>
                                    <input type='number' id='number' required ref={last_donation_months} />
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='number'>كم شهر مضى على اول تبرع </label>
                                    <input type='number' id='number' required ref={first_donation_months} />
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='number'>عدد المرات التي تبرعت فيها في حياتك</label>
                                    <input type='number' id='number' required ref={no_donations} />
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='number'>كم عدد الوحدات التي تبرعت بها في حياتك </label>
                                    <input type='number' id='number' required ref={total_volume_donated} />
                                </div>
                               
                                <div className={classes.control}>
                                    <label htmlFor='number'>المدينة</label>
                                    <select name="Blood_group" id="blood_group" ref={city}>
                                        <option value="Nablus" >Nablus</option>
                                        <option value="Tulkarm" >Tulkarm</option>
                                        <option value="Qalqilya" >Qalqilya</option>
                                        <option value="Jenin" >Jenin</option>
                                        <option value="Jericho" >Jericho</option>
                                        <option value="Ramallah" >Ramallah</option>
                                        <option value="Bethlehem" >Bethlehem</option>
                                        <option value="Hebron" >Hebron</option>
                                        <option value="Jerusalem" >Jerusalem</option>
                                    </select>

                                </div>
                                <label htmlFor='number'>هل انت مدخن؟</label>
                                    <select name="blood_group" id="blood_group" ref={is_smoker}>
                                        <option value="True" >نعم</option>
                                        <option value="False" >لا</option>
                
                                    </select>
                                    <label htmlFor='number'>الجنس ؟</label>
                                    <select name="blood_group" id="blood_group" ref={gender}>
                                        <option value="M" >ذكر </option>
                                        <option value="F" >انثى</option>
                
                                    </select>
                                <div className={classes.control}>
                                    <label htmlFor='number'>زمرة الدم</label>
                                    <select name="Blood_group" id="blood_group" ref={blood_group}>
                                        <option value="A+" >A+</option>
                                        <option value="A-" >A-</option>
                                        <option value="B+" >B+</option>
                                        <option value="B-" >B-</option>
                                        <option value="O+" >O+</option>
                                        <option value="O-" >O-</option>
                                        <option value="AB+" >AB+</option>
                                        <option value="AB-" >AB-</option>
                                    </select>

                                </div>
                                {/* <div className={classes.control}>
                                    <label htmlFor='number'>الوزن</label>
                                    <input type='number' id='number' required ref={Weight} />
                                </div>

                                <div className={classes.control}>
                                    <label htmlFor='number'>العمر</label>
                                    <input type='number' id='number' required ref={Age} />
                                </div> */}

                                
                                      {/* <div className={classes.control}>
                                    <label htmlFor='number'>زمرة الدم</label>
                                    <select name="blood_group" id="blood_group" ref={blood_group}>
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
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                <label className={classes.label1} for="vehicle1"> اوافق على<Link href={'/'}> الشروط </Link>  </label><br />
                                <div className={classes.actions}>
                                    {(
                                        <button onClick={SignupDonor}> {'انشاء حساب'}</button>
                                    )}
                                    <button
                                        type='button'
                                        className={classes.toggle}
                                    >
                                        <Link href={'/login/LogInAsDoner'}>
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
