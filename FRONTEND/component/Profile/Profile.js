import React, { useState, useEffect, useContext, Fragment } from 'react';
import classes from './Profile.module.css';
import Nav from '../Home/Nav';
import Cart from './Cart';
import 'bootstrap/dist/css/bootstrap.css'
import { AuthContext } from '../../pages/login/LogInAsDoner';

const Profile = () => {
  const [Show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const[Temp,useTemp]=useState()
  const[Temp1,useTemp1]=useState()
  const [data2, setData2] = useState([]);
  const { donorId } = useContext(AuthContext);
  // const myData1=localStorage.getItem('myData1')
  // const Data = localStorage.getItem('Data');
  var myData ;
  if (typeof window !== "undefined") {
     myData = window.localStorage.getItem('myData')
  }

  const fetchData2 = async () => {
    const Templat = {
      will_donate: true,
  };
  const Templat1 = {
    will_donate: false,
  };

    useTemp(Templat);
    useTemp1(Templat1); 
    try {
      const response = await fetch(`http://127.0.0.1:8000/donations/`); // استبدال الرابط برابط API الخاص بك
      const jsonData = await response.json();
      setData2(jsonData);


    } catch (error) {
      alert('حدث خطأ في جلب البيانات:', error);
    }
  };

  const Done =async()=>{
    try {
      const response = await fetch(`http://127.0.0.1:8000/donations/21/patch/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Temp),
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

  const Reg=async()=>{
    try {
      const response = await fetch(`http://127.0.0.1:8000/donations/21/patch/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Temp1),
      });
  console.log("Temp",Temp1);

      if (response.ok) {
        alert('تم تحديث البيانات بنجاح!');
    } else {

      alert('فشل في تحديث البيانات.');
    }
  } catch (error) {
    alert('حدث خطأ في إرسال البيانات:', error);
  }
};
  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/donor/${myData}/`);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        throw new Error('Failed to fetch donor data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const showCart = () => {
    setShow(true);
  }


  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/donor/${myData}/delete/`, {
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
  };
  return (
    <Fragment>
      <div>
        <Nav />
        <div className={classes.card}>
          {data && (
            <>
              <p className={classes.title}>الإسم الأول : {data[0].user__first_name}</p>
              <p className={classes.title}> إسم العائلة : {data[0].user__last_name}</p>
              <p className={classes.title}>الوزن : {data[0].weight}</p>
              <p className={classes.title}>مدخن ام لا : {data[0].is_smoker ? 'نعم' : 'لا'}</p>
              <p className={classes.title}>كم شهر مر على اخر عملية تبرع بالدم: {data[0].last_donation_months}</p>
              <p className={classes.title}>كم شهر مرة على أول عملية تبرع بالدم: {data[0].first_donation_months}</p>
              <p className={classes.title}>الجنس : {data[0].gender}</p>
              <p className={classes.title}>الكميه التي تم التبرع فيها في حياته : {data[0].total_volume_donated}</p>
              <p className={classes.title}>عدد المرات التي قمت بالتبرع فيها : {data[0].no_donations}</p>
              <p className={classes.title}>العنوان : {data[0].city}</p>
            </>
          )}
          <button className={classes.button} onClick={showCart}>تعديل</button>
          <button className={classes.button} onClick={() => handleDelete(myData)}>حذف</button>
          {Show && <Cart />}
        </div>

      </div>
    </Fragment>
  );
};
  
export default Profile;
