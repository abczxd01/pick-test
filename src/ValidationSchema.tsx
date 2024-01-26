import * as Yup from 'yup';

const phoneRegExp =
  /^(\+7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm;
const mailRegExp = /^[\S-\.]+@([\S-]+\.)+[\S-]{2,4}$/;

const ValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .required('Заполните поле')
    .matches(phoneRegExp, 'Неверный формат'),
  firstName: Yup.string().required('Заполните поле'),
  lastName: Yup.string().required('Заполните поле'),
  mail: Yup.string()
    .required('Заполните поле')
    .matches(mailRegExp, 'Некорректный mail'),
  flatsCount: Yup.number()
    .typeError('Введите число')
    .min(1, 'Введете число больше 0')
    .required('Заполните поле'),
});

export default ValidationSchema;
