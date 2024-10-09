import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import styles from './LoginPage.module.scss';
import s from '../../pages/MainPage/MainPage.module.scss';

import banana from "../../pages/MainPage/images/banana.png";
import strawberry from "../../pages/MainPage/images/strawberry.png";
import leaves from "../../pages/MainPage/images/leaves-new.png";
import leavesTable from "../../pages/MainPage/images/leaves-table-new.png";
import mainVector from "../../pages/MainPage/images/main-vector.svg";


import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
 
const schema = yup.object().shape({
  email: yup.string().min(7,'Пошта має бути не менше 3 символів').max(254,'Пошта має бути не більше 254 символів').required("Обов'язкове поле").email('Електронна адреса має бути дійсною'),
  password: yup.string().min(8,'Пароль має бути не менше 8 символів').required("Обов'язкове поле").max(55,'Пароль має бути не більше 55 символів'),
});

const initialValues = {
  email: '',
  password: '',  
}

export default function LoginView() {
  const dispatch = useDispatch();
  const [, setEmail] = useState('');
  const [, setPassword] = useState('');



  const handleSubmit = ({email,password}, {resetForm}) => {     

     setEmail(email);
     setPassword(password);  
     dispatch(authOperations.logIn({ email, password }));
   
    resetForm({email:"",password:""});
  };

  return (
    <div className={styles.box}>
      <div className={styles.container}>
      <div className={styles.title__container}>
        <h1 className={styles.title}>Вхід</h1>
      </div>    

      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
        <Form  className={styles.form} autoComplete="off">
        <label className={styles.label}>
          Пошта*
          <Field className={styles.input}
            type="email"
            name="email"
            autoComplete="off"
            required
            />
            <ErrorMessage name="email" component="div" className={styles.error} />
        </label>

        <label className={styles.label}>
          Пароль*
          <Field className={styles.input}
            type="password"
            name="password"       
            autoComplete="off"
            required
            />
            <ErrorMessage name="password" component="div" className={styles.error} />
        </label>
        <ul className={styles.list}>
            <li className={styles.item}>
              <button type="submit" className={styles.btn}>Вхід</button>            
            </li>
            <li className={styles.item}>
              <a href='./register'>
                <button type="button" className={styles.btn__second}>Реєстрація</button>           
              </a>
            </li>           
        </ul>        
      </Form>
      </Formik>
      
    </div>
          <div className={s['main__img--wrapper']}>
        <div className={s['leaf-first']}></div>
        <div className={s['leaf-second']}></div>
        <div className={s['leaf-third']}></div>
        <div className={s['leaf-fourth']}></div>

        <img src={leavesTable} className={s['leavesTable']} alt="leaves" />
        <img src={leaves} className={s['leaves']} alt="leaves" />
        <div id={s['banana']}>
          <img src={banana} className={s['banana']} alt="banana" />
        </div>
        <img
          src={strawberry}
          className={s['strawberry']}
          alt="strawberry"
        />
        <img
          src={mainVector}
          className={s['mainVector']}
          alt="backround-vector"
        />
      </div>
    </div>    
  );
}