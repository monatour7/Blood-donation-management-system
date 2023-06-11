import React, { Fragment, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.css'
import Nav from '../Home/Nav';  
import { useEffect } from 'react';
import { useRef } from 'react';
import classes from '../Profile/Cart.module.css';
import axios from 'axios';

function PaindingRoom(props){
    const [data, setData] = useState([]);
    const [Show, setShow] = useState(false);


    let response;


    useEffect(() => {
    setShow(false)
      fetchData();
    },[]);
    
    const deleteacc = async (id) => {
        const url = `http://127.0.0.1:8000/donor/${id}/delete/`;
        console.log(id);
        try {
          const response = await axios.delete(url);
          console.log('Deleted successfully');
        } catch (error) {
          console.error('Error deleting data:', error);
        }
        fetchData();
      }
      const paacc = async (id) => {
        const url = `http://127.0.0.1:8000/donor/${id}/patch/`;
        const data = {is_pending : false }; // تعديل البيانات التي ترغب في تحديثها

        try {
          const response = await axios.patch(url, data);
          console.log('Updated successfully');
          // تنفيذ الإجراءات الإضافية بعد التحديث بنجاح
        } catch (error) {
          console.error('Error updating data:', error);
          // تنفيذ الإجراءات الإضافية في حالة حدوث خطأ أثناء التحديث
        }
        fetchData();
      }
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/donor/'); // استبدال الرابط برابط API الخاص بك
        const jsonData = await response.json();
        setData(jsonData);
        console.log(data);
      } catch (error) {
        alert('حدث خطأ في جلب البيانات:', error);
      }
    };




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

                <h1 className='text-center mt-4'>المتبرعين الجدد </h1>
               

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>الاسم الاول</th>
                            <th>الاسم الاخر</th>
                            <th>البريد الالكتروني</th>
                            <th>رقم الهاتف</th>
                            <th>العنوان</th>
                            <th>زمره الدم</th>
                            <th>احتمالية التبرع </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                        
                        data.filter((item) => {
                            return item.is_pending === true;
                             
                          }).map((item, index) => (
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
                                    <button onClick={() => paacc(item.id)}>تاكيد</button>
                                </td>
                                <td>
                                    <button onClick={() =>deleteacc(item.id)}>حذف</button>
                                </td>
                            </tr>
                        ))}
        

                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default PaindingRoom;     
