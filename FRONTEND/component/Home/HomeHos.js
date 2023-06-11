import React, { Fragment, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.css'
import Nav from '../Home/Nav';
import CartDonation from './CartDonation'
import { useEffect } from 'react';
import { useRef } from 'react';
import classes from '../Profile/Cart.module.css';

function WaitingRoom(props){
    const [search, setSearch] = useState('');
    const [Date, setDate] = useState('');

    const [data, setData] = useState([]);
    const [Show, setShow] = useState(false);
    const [Close, setClose] = useState(true);
    const Donation_date = useRef(null);
    const Donation_date2 = useRef(null);
    const Blood_group = useRef();
    const num = useRef();
    const City = useRef();
    const [data2, setData2] = useState([]);
    const [Temp, setTemp] = useState('');
    const myData1 = typeof localStorage !== 'undefined' ? localStorage.getItem('myData1') : null;
    const Data = typeof localStorage !== 'undefined' ? localStorage.getItem('Data') : null;
    console.log(myData1, Data,"hisham");
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
      }, []);

    const Cloose = () => {
        setClose(false);
        setShow(false);     
    };

    const handleDelete=()=>{
        setShowForm(false)
    }
    const handleDelete1=()=>{
        setShowForm(true)
    }

    const fetchData = async () => {         
      try {
        const response = await fetch('http://127.0.0.1:8000/donor/'); // استبدال الرابط برابط API الخاص بك
        const jsonData = await response.json();
        setData(jsonData);

      } catch (error) {
        alert('حدث خطأ في جلب البيانات:', error);
      }
    };

    const fatchdata2=async()=>{
        try {
            setDate(Donation_date2.current.value)
            const response = await fetch("http://127.0.0.1:8000/donors/find/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(
                {
                   no_donors:parseInt(num.current.value),
                   blood_type:Blood_group.current.value,
                   city: City.current.value,
            
                }
                
              ),
      
            });

            if (response.status === 200) {
                console.log('cos');

              const data = await response.json();
              console.log(data.donors); 
              setData2(data.donors);
            }
            
            else {
              alert("فشل الدخول الرجاء التحقق من البيانات ");
            }
          } catch (error) {
            console.error(error);
          }
          handleDelete();
    }
    const fatch=()=>{
        data2.map((item) => {
            const response=fetch("http://127.0.0.1:8000/donations/create/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            
            body: JSON.stringify(
              {
                donation_date : Date,
                hospital_id: myData1,
                  donor_id: item.id,
                  will_donate: null,
              }
            ),
    
          });})
          handleDelete1()
          alert("تم الاستدعاء بنجاح");
        }
      
    const PostData=()=>{
        setShow(true)
    }



    const Passowrd = useRef();
    const Identifier = useRef();



    const DonerLogin = (event) => {
        event.preventDefault()

        const DonorLog = {
            identifier: Identifier.current.value,
            password: Passowrd.current.value,
        }
        props.onAddDonorLog(DonorLog);
    }
 

    return (
        <div className={classes.all}>
            <Nav />

            <Container>
            {showForm ? (
                <div>
                <br />
                <div className={classes.main}>
                <div className={classes.overlay}>
                    <div className={classes.content}>
                        <Nav />
                        <section className={classes.auth}>
                            <h1>{' فلتره المتبرعين '}</h1>
                            < >
                                <div className={classes.control}>
                                    <label htmlFor="Identifier">عدد الوحدات المطلوبه </label>
                                    <input type='number' id='identifier' required ref={num} />
                                </div>

                                <div className={classes.control}>
                                    <label htmlFor='number'>زمرة الدم</label>
                                    <select name="Blood_group" id="blood_group" ref={Blood_group} >
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

                                    <div className={classes.control}>
                                    <label htmlFor='number'>اخر موعد للتبرع</label>
                                    <input type='date' id='number' required ref={Donation_date2}  />
                                </div>


                                <div className={classes.control}>
                                    <label htmlFor='number'>المدينة</label>
                                    <select name="Blood_group" id="blood_group" ref={City} >
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


                                <div className={classes.actions}>
                                    {(
                                        <button onClick={fatchdata2}>فلترة</button>
                                    )}
                                </div>
                            </>
                        </section>
                    </div>
                </div>
            </div>
            </div>
            )
            :(
                <div className={classes.form}>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>الاسم الاول</th>
                            <th>الاسم الاخر</th>
                            <th>البريد الالكتروني</th>
                            <th>رقم الهاتف</th>
                            <th>العنوان</th>
                            <th>زمره الدم</th>
                            <th>احتمالية التبرع </th>
                            <th>مدخن  </th>
                            <th>الوزن </th>
                            <th>الجنس </th>
                            <th>التقيم</th>
                            <th>العمر </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        data2.map((item, index) => (
                            <tr key={index}>
                                
                                <td>
                                    {item.user__first_name}
                                </td>
                                <td>

                                    {item.user__last_name}
                                </td>
                                <td>

                                    {item.user__email}
                                </td>
                                <td>

                                    {item.mobile_number}
                                </td>
                                <td>

                                    {item.city}
                                </td>
                                <td>

                                    {item.blood_group}
                                </td>
                                <td>

                                    {item.prediction}
                                </td>
                                 <td>

                                    {item.is_smoker}
                                </td>
                                 <td>

                                    {item.weight}
                                </td>
                                 <td>
                                    {item.gender}
                                </td>
                                 <td>

                                    {item.rating}
                                </td>
                                 <td>

                                    {item.age}
                                </td>
                            </tr>
                        ))}
            {Show && <Fragment>
                <div className={classes.main}>
                    <div className={classes.overlay}>
                        <div className={classes.content}>
                            <section className={classes.auth}>
                                <form >
                                    <div className={classes.control}>
                                        <label htmlFor='date'>موعد التبرع </label>
                                        <input type='date' id='date' required ref={Donation_date} />
                                    </div>

                                    <div className={classes.actions}>
                                        <button type='submit' className={classes.button} onClick={submitHandler}>
                                            Done
                                        </button>
                                        <button type='button' className={classes.button} onClick={Cloose}>
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
                </Fragment>}
                <button type='submit' className={classes.button} onClick={fatch}>
                                            استدعاء الكل
                </button>
                </tbody>
                    
                </Table>
                </div>
                 )}
            </Container>
        </div>
    );
}

export default WaitingRoom;     
