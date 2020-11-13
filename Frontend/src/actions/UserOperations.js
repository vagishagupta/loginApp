import axios from 'axios';
import SetAuthToken from './SetAuthToken';

export const getUser = () => fetch('http://localhost:5000/users',{
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem('jwtToken')}`
        }
    })
    .then(res => res.json())
    .catch(e => console.log(e))

export function createUser (firstName, lastName, email, password) {
    return axios.post('http://localhost:5000/users', {
    firstName,
    lastName,
    email,
    password
}).then(data => data)
.catch(e => {throw new Error})
}
export const loginUser = (email, password) =>  {
    return axios.post('http://localhost:5000/users/login', {
    email,
    password
}).then((data) => {
    const token = data.data.token;
    localStorage.setItem('jwtToken', token)
    SetAuthToken(token)
    return data.data
})
    .catch(e => {throw new Error})
}

export const getProfile = () => fetch('http://localhost:5000/users/me', {
    method: 'GET',
    headers: {
        'Authorization' : `Bearer ${localStorage.getItem('jwtToken')}`
    }
})
.then(res => res.json())
.catch(e => e)

export const logoutUser = () => fetch('http://localhost:5000/users/logoutAll' , {
    method: 'POST',
    headers: {
        'Authorization' : `Bearer ${localStorage.getItem('jwtToken')}`
    }
}).then(res=> res.json())
.catch(e => console.log(e))