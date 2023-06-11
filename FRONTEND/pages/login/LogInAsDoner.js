import React, { Fragment, useState, useEffect, createContext } from 'react';
import { LoginDonor } from '../../component/Login/LoginDonor';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';

export const AuthContext = createContext({
  donorId: '',
  setDonorId: () => {}
});




export default function LogInAsDoner(props) {
  const [donorId, setDonorId] = useState();
  const history = useRouter();
  const dispatch = useDispatch();
  var response;
  const handleLogin = async (DonorLog) => {
    console.log(DonorLog);
    try {
      response = await fetch("http://127.0.0.1:8000/donor/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DonorLog),

      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data.donor_id);
        setDonorId(data.donor_id);
        window.localStorage.setItem('myData',data.donor_id)
        window.localStorage.setItem('myDataa','Donor')
      }
      console.log(donorId);

      if (response.status === 200) {
        dispatch(authActions.loginAsDonor());
        history.replace('/');
        alert("تم الدخول بنجاح");
      } else {
        alert("فشل الدخول الرجاء التحقق من البيانات ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <AuthContext.Provider value={{ setDonorId,donorId }}>
        <LoginDonor onAddDonorLog={handleLogin} />
      </AuthContext.Provider>
    </Fragment>
  )
}
