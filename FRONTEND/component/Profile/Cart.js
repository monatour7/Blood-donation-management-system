import { Fragment, useState, useRef } from 'react';
import classes from './Cart.module.css';
import Link from 'next/link';

const Cart = (props) => {
    const [Close, useClose] = useState(true);
    const Weight = useRef();
    const Gender = useRef();
    const Is_Smoker = useRef();
    const Last_Donation_Months = useRef();
    const First_Donation_Months = useRef();
    const No_Donation = useRef();
    const Address = useRef();
    const myData = localStorage.getItem('myData');
    const First_name = useRef();
    const Last_name = useRef();
    const Temp = useRef({});

    const submitHandler = (event) => {
        event.preventDefault();

        Temp.current = {
            first_name: First_name.current.value,
            last_name: Last_name.current.value,
            weight: Weight.current.value,
            gender: Gender.current.value,
            is_smoker: Is_Smoker.current.value,
            last_donation_months: Last_Donation_Months.current.value,
            first_donation_months: First_Donation_Months.current.value,
            no_donations: No_Donation.current.value,
            address: Address.current.value,
        };

    };

    const Cloose = () => {
        useClose(false);
    };

    const Update = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/donor/${myData}/patch/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Temp.current),
            });

            if (response.ok) {
                alert('تم تحديث البيانات بنجاح!');
            } else {
                alert('فشل في تحديث البيانات.');
            }
        } catch (error) {
            alert('حدث خطأ في إرسال البيانات:', error);
        }
    };

    return (
        <Fragment>
            {Close && (
                <div className={classes.main}>
                    <div className={classes.overlay}>
                        <div className={classes.content}>
                            <section className={classes.auth}>
                                <h1>{'تعديل  '}</h1>
                                <form onSubmit={submitHandler}>
                                    <div className={classes.control}>
                                        <label htmlFor='text'>الاسم الاول</label>
                                        <input type='text' id='text' required ref={First_name} />
                                    </div>

                                    <div className={classes.control}>
                                        <label htmlFor='text'>الاسم الاخر</label>
                                        <input type='text' id='text' required ref={Last_name} />
                                    </div>

                                    <div className={classes.control}>
                                        <label htmlFor='number'>الوزن</label>
                                        <input type='number' id='number' required ref={Weight} />
                                    </div>

                                    <div className={classes.control}>
                                        <label htmlFor='number'>اخر شهر تم التبرع فيه</label>
                                        <input
                                            type='number'
                                            id='number'
                                            required
                                            ref={Last_Donation_Months}
                                        />
                                    </div>

                                    <div className={classes.control}>
                                        <label htmlFor='number'>اول شهر تم التبرع فيه</label>
                                        <input
                                            type='number'
                                            id='number'
                                            required
                                            ref={First_Donation_Months}
                                        />
                                    </div>

                                    <div className={classes.control}>
                                        <label htmlFor='number'>
                                            الكميه التي تم التبرع فيها في حياته
                                        </label>
                                        <input type='number' id='number' required ref={No_Donation} />
                                    </div>

                                    <div className={classes.control}>
                                        <label htmlFor='text'>العنوان</label>
                                        <input type='text' id='text' required ref={Address} />
                                    </div>

                                    <div className={classes.control}>
                                        <label htmlFor='number'>الجنس ؟</label>
                                        <select name='gender' id='gender' ref={Gender}>
                                            <option value='M'>ذكر</option>
                                            <option value='F'>أنثى</option>
                                        </select>
                                    </div>

                                    <div className={classes.control}>
                                        <label htmlFor='number'>هل أنت مدخن؟</label>
                                        <select name='is_smoker' id='is_smoker' ref={Is_Smoker}>
                                            <option value='True'>نعم</option>
                                            <option value='False'>لا</option>
                                        </select>
                                    </div>

                                    <div className={classes.actions}>
                                        <button className={classes.button} onClick={Update}>
                                            Done
                                        </button>
                                        <button className={classes.button} onClick={Cloose}>
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Cart;
