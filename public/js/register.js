const register = form => {
    const { username, password, confirm, email, name } = form;
    if(!username.value.length || !/^\w+$/.test(username.value)) return alert(`Usernames must consist of 3-15 alphanumeric characters`);
    if(password.value.length < 7|| !/^\w+$/.test(username.value)) return alert(`Passwords must be at least 6 alphanumeric characters`);
    if(confirm.value !== password.value) return alert(`The entered passwords must match.`);
    if(!name.value.length || !email.value.length) return alert(`Make sure to fill in all fields.`);
    return $.post('http://localhost:5000/auth/register', {
        info: JSON.stringify({
            username: username.value,
            password: password.value,
            email: email.value,
            name: name.value
        })
    });
}