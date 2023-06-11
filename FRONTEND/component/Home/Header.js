import { Fragment, useEffect,useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import classes from './Header.module.css'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AiFillBell } from 'react-icons/ai';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

const Header = () => {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const[LoginDonor,setLoginDonor]=useState(false);
    const[LoginHos,setLoginHos]=useState(false);
    const[Disply,setDispaly]=useState(false);
    const [data2, setData2] = useState([]);
    
    var myDataa ;
    if (typeof window !== "undefined") {
      myDataa = window.localStorage.getItem('myDataa')
   }

   var myData;
   if (typeof window !== "undefined") {
     myData= window.localStorage.getItem('myData')
  }
 
   var myData11;
   if (typeof window !== "undefined") {
     myData11 = window.localStorage.getItem('myData11')
   }


    const DispalyDonor=()=>{

    }

    console.log(myDataa,myData,myData11);

    const fetchData2 = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/donations/`); // استبدال الرابط برابط API الخاص بك
        const jsonData = await response.json();
        setData2(jsonData);
  
  
      } catch (error) {
        alert('حدث خطأ في جلب البيانات:', error);
      }
    };

    useEffect(() => {
        AOS.init();
        AOS.refresh();
        fetchData2();

        if(myDataa==="Donor"){
            setLoginDonor(true)
          }
          if(myData11==="Hos"){
            setLoginHos(true)
          }
      }, []);


      
  const acc=async(id) =>{
    const url = `http://127.0.0.1:8000/donations/${id}/patch/`;
    const data = {will_donate : true }; // تعديل البيانات التي ترغب في تحديثها

    try {
      const response = await axios.patch(url, data);
      console.log('Updated successfully');
      // تنفيذ الإجراءات الإضافية بعد التحديث بنجاح
    } catch (error) {
      console.error('Error updating data:', error);
      // تنفيذ الإجراءات الإضافية في حالة حدوث خطأ أثناء التحديث
    }
    fetchData2();

  }
  const dee=async(id) =>{
    const url = `http://127.0.0.1:8000/donations/${id}/patch/`;
    const data = {will_donate : false }; // تعديل البيانات التي ترغب في تحديثها

    try {
      const response = await axios.patch(url, data);
      console.log('Updated successfully');
      // تنفيذ الإجراءات الإضافية بعد التحديث بنجاح
    } catch (error) {
      console.error('Error updating data:', error);
      // تنفيذ الإجراءات الإضافية في حالة حدوث خطأ أثناء التحديث
    }
    fetchData2();

  }
      
    return (
        <Fragment>
          {LoginDonor &&
  <h1 className={classes.head}>طلبات التبرع</h1>

}
{LoginDonor &&
  <Table striped bordered hover>
          <thead>
            <tr>
            <th>رقم اللتبرع</th>
              <th>رقم المستشفى</th>
              <th>تاريخ الموعد</th>
            </tr>
          </thead>
          <tbody>

            {data2.map((item, index) => {
            {console.log(item.donor__id,myData)}
            if(item.donor__id==myData){
            return( 
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
          
          {item.will_donate==null&&
                <td>
                  <button onClick={() => acc(item.id)} >قبول</button>
                </td>
          }
          {item.will_donate==true&&
           <td>
           <div>تم القبول</div>
         </td>
          }
          {item.will_donate==false&&
           <td>
           <div>تم رفض الدعوة</div>
         </td>
          }
          
          {item.will_donate==null&&

                <td>
                  <button onClick={() => dee(item.id)} >رفض</button>
                </td>
          }            
              </tr>)
            }
            })}
          </tbody>

        </Table>
}
            <div className={classes.all}>
            <div  className={classes.bg_image} data-aos={"fade-left"} >         
            <h1 className={classes.header} ><b>".تبرعك بالدم يمكن أن يكون شريان الحياة لشخص محتاج. كن بطلاً وامنح الحياة"</b></h1>

            </div>
    
            {!LoginDonor && !LoginHos &&

            <h2>مرحبا بكم في موقع التبرع بالدم الالكتروني</h2>
} 
            {!LoginDonor && !LoginHos  &&

            <div className={classes.flexContainer}>

                <div data-aos={"fade-right"} className={classes.card}>
               <div className={classes.container}>
                        <h4><b> انشاء حساب </b></h4>
                        <p className={classes.p}>  <Link href='/Regester/RegesterAsDoner'>اذا كنت لا تملك حساب اضغط هنا لانشاء حساب جديد</Link></p>
                        </div>
                </div>
    
                <div data-aos={"fade-left"} className={classes.card}>
                    <div className={classes.container}>
                        <h4><b>تسجيل دخول</b></h4>
                        <p className={classes.p}><Link href='/login/LogInAsDoner'>اذا كنت تملك حساب اضغط هنا لتسجيل الدخول</Link></p>
                    </div>
                </div>
                </div>
}

{ (!LoginDonor || !LoginHos) &&

<div className={classes.donation_terms}>
  <h2>شروط التبرع</h2>
  <p className={classes.center}>الرجاء قراة البنود والشروط التي تتطلب التبرع </p>
  <ul className={classes.right}>
    <li>الشرط الاول : ان يكون المتبرع بحالة صحيه جيدة وان لا يعاني من اي امراض مزمنه</li>
    <li>الشرط الثاني : ان يكون عمر المتبرع من 18-65 سنة</li>
    <li>الشرط الثالث : ان ا يقل وزن المتبرع عن 50 كجم</li>
    <li>الشرط الرابع : ان يتراوح ضغط الدم من 50/100 الى 90/180</li>
    <li>الشرط الخامس : ان لا تزيد درجة حرارة عن 37.5 م</li>
  </ul>
</div>}

            </div>
  <div className={classes.footer}>
    <li>للتواصل مع الدعم : </li>
    <li>mohammed.natour7@gmail.com</li>
  </div>

        </Fragment>
    )
}
export default Header;






