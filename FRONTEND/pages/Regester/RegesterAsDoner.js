import { Fragment } from 'react'
import { RegesterDonor } from '../../component/Regester/RegesterDonor'
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RegesterAsDoner() {
  const history = useRouter();

  async function handleSignup(Donor) {
    console.log(Donor);

    try {
        const response = await fetch("http://127.0.0.1:8000/donor/signup/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Donor),
        });
     
        if (response.status === 200) {
          // إعادة تهيئة حالة الرسالة بعد التخزين
          history.replace('/login/LogInAsDoner');
          alert("تم انشاء حساب بنجاح")
        }
        else {
          alert("تم فشل التسجيل الرجاء ادخال اسم جديد")
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
       console.error(error);
    }
};
    return (
      <Fragment>
        <RegesterDonor onAdd={handleSignup}/>
      </Fragment>
    )
};
