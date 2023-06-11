import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';
import classes from './Nav.module.css'
import { useSelector } from 'react-redux';

const Nav = (props) => {
  const [LoginDonor, setLoginDonor] = useState(false);
  const [LoginHos, setLoginHos] = useState(false);
  const [Nothing, setNothing] = useState(false);
  const [DonorData, setDonordata] = useState('');


  const isAuth = useSelector(state => state.auth.isAuthenticated);

  var myDataa;
  if (typeof window !== "undefined") {
    myDataa = window.localStorage.getItem('myDataa')
  }

  var myData11;
  if (typeof window !== "undefined") {
    myData11 = window.localStorage.getItem('myData11')
  }

  var NoData;
  if (typeof window !== "undefined") {
    NoData = window.localStorage.getItem('NoData')
  }

  console.log(myData11);
  const logout = () => {
    window.localStorage.setItem('myDataa', '')
    window.localStorage.setItem('myData11', '')
    window.localStorage.setItem('NoData', '')
  }

  useEffect(() => {

    if (myData11 === "Hos") {
      setLoginHos(true)
    }

    else if (myDataa === "Donor") {
      setLoginDonor(true)
    }
  }, []);

  return (
    <Fragment>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          <li className={classes.li}><a href="/"></a></li>
          {!LoginDonor && !LoginHos && <li className={classes.li}><Link href="/login/LogInAsDoner">تسجيل الدخول </Link></li>}
          {(LoginDonor || LoginHos) && <li className={classes.li}><Link href="/login/LogInAsDoner" onClick={logout} >تسجيل الخروج </Link></li>}
          {(LoginDonor) && !LoginHos && <li className={classes.li} ><Link href="/profile">الملف الشخصي</Link></li>}
          {(LoginDonor || LoginHos) && !LoginDonor && <li className={classes.li} ><Link href="/CanseleDonors">رفض طلبات التبرع </Link></li>}
          {(LoginDonor || LoginHos) && !LoginDonor && <li className={classes.li} ><Link href="/ActiveDonors">قيد التبرع</Link></li>}
          {(LoginDonor || LoginHos) && !LoginDonor && <li className={classes.li} ><Link href="/WaitinRoom">قائمة الانظار</Link></li>}
          {(LoginDonor || LoginHos) && !LoginDonor && <li className={classes.li} ><Link href="/HomeHos">طلب متبرعين</Link></li>}
          {(LoginDonor || LoginHos) && !LoginDonor && <li className={classes.li} ><Link href="/AllDonor">المتبرعين المعتمدين</Link></li>}

                    {(LoginDonor || LoginHos) && !LoginDonor && <li className={classes.li} ><Link href="/Painding">المتبرعين الجدد</Link></li>}

          <li className={classes.li}><Link href="/">الصفحة الرئيسية</Link></li>


          {/* {(LoginDonor||!LoginHos)&&!LoginDonor && <li className={classes.li}><Link href="/">صفحة رئيسية</Link></li>}
              {(LoginDonor||!LoginHos)&&  <li className={classes.li}><Link href="/HomeHos">صفحة رئيسية</Link></li>} */}

        </ul>
      </nav>
    </Fragment>
  )
}

export default Nav
