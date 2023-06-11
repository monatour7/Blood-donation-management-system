import React, { Fragment, useState,useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css'
import classes from '../Profile/Cart.module.css';
import Nav from '../Home/Nav';
import { useEffect } from "react";

function WaitingRoom(props) {
  const [search, setSearch] = useState('');
  const [Show, setShow] = useState(false);
  const [data, setData] = useState([]);
    useEffect(() => {
      fetchData();
    }, []);
  
    const[Close,useClose]=useState(true)
    const[Temp,useTemp]=useState('')
    const MyID = typeof localStorage !== 'undefined' ? localStorage.getItem('Idd') : null;
    const Donation_date = useRef(null);
    var myData1;
    if (typeof window !== "undefined") {
      myData1 = window.localStorage.getItem('myData1')
    }
  


    const submitHandler =async (event) => {
        event.preventDefault();
        const donation_date =(Donation_date.current.value);
        Update(donation_date);
    }

    const Update = async(donation_date) => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/donations/174/patch/`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              }, 
              body: JSON.stringify({donation_date}),
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
        
        const Cloose = () => {
          setShow(false);
        };
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/donations/'); // استبدال الرابط برابط API الخاص بك
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        alert('حدث خطأ في جلب البيانات:', error);
      }
    };

    const deleteData = async (id) => {
      

      ////////////////////////////////
      try {
        const response = await fetch(`http://127.0.0.1:8000/donations/${id}/delete/`, {
          method: 'DELETE',
        });
        if (response.ok) {
          const responseData = await response.json();
          alert('Deleted successfully:', responseData);
        } else {
          throw new Error('Failed to delete donor');
        }
      } catch (error) {
        alert('Error deleting data:', error.message);
      }
      fetchData();
    };
    const updata=(id)=>{
      localStorage.setItem('Idd',id)
      setShow(true);
    }
    
  // const sortName = () => {
  //   setContacts(
  //     data.sort((a, b) => {
  //       return a.first_name.toLowerCase() < a.first_name.toLowerCase()
  //         ? -1
  //         : a.first_name.toLowerCase() > a.first_name.toLowerCase()
  //         ? 1
  //         : 0;
  //     })
  //   );
  // };

  return (
    <div className={classes.all}>
      <Nav />

      <Container>

        <h1 className='text-center mt-4'>المتبرعين المتاحين </h1>

      

        <Table striped bordered hover>
          <thead>
            <tr>
            <th>رقم اللتبرع</th>
              <th>رقم المستشفى</th>
              <th>تاريخ الموعد</th>
              <th>هل سوف يتبرع </th>
            </tr>
          </thead>
          <tbody>
            {data.filter((item) => {
console.log(myData1);
              return  item.hospital__id == myData1&&item.will_donate==null;
            }).map((item, index) => (
              <tr key={index}>
                <td>
                  {item.donor__id}
                </td>
                <td>

                  {item.hospital__id}
                </td>
                <td>

                  {item.donation_date}
                </td>
                <td>

                  <div>قيد المراجعة</div>
                </td>
    
                <td>

                  <button onClick={()=>{deleteData(item.id)}}>حذف</button>
                </td>
                <td>

                  <button onClick={()=>{updata(item.id)}}>تعديل</button>
                </td>

              </tr>
            ))}
            {Show&&<Fragment>
              <div className={classes.main}>
                <div className={classes.overlay}>
                        <div className={classes.content}>

                            <section className={classes.auth}>
                                <h1>{'تعديل  '}</h1>
                                <form>
                                  
                                    <div className={classes.control}>
                                        <label htmlFor='date'>التاريخ</label>
                                        <input type='date' id='date' required  ref={Donation_date}/>
                                    </div>
                              
                                    <div className={classes.actions}>
                                    <button className={classes.button} onClick={submitHandler}>Done</button>
                                    <button className={classes.button} onClick={Cloose}>Close</button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div> 
                </div>
              </Fragment>}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default WaitingRoom;