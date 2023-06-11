import { Fragment, useState } from 'react'
import { LoginHos } from '../../component/Login/LoginHos'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';

export default function LogInAsHos() {
  const history = useRouter();
  const dispatch = useDispatch();


  const handleLogin= async (DonorLog)=> {
        console.log(DonorLog);

    try {
        const response = await fetch("http://127.0.0.1:8000/hospital/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(DonorLog),
        });
        if (response.status === 200) {
          window.localStorage.setItem('myData11','Hos')
          // إعادة تهيئة حالة الرسالة بعد التخزين
          dispatch(authActions.loginAsHos());
          history.replace('/');
          alert("تم الدخول بنجاح")
        }
        else {
          alert(" فشل الدخول الرجاء التاكد من البيانات")
        }
        const data = await response.json();
        console.log(data.id);
        window.localStorage.setItem('myData1',data.id)
    

    } catch (error) {
        console.error(error);
    }
};
    return (
      <Fragment>
        <LoginHos onAddDonorLog={handleLogin}/>
      </Fragment>
    )
};
