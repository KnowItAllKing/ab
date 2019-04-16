const login = form => {
  const { username, password } = form;
  if(!password.value.length) return alert('You must enter a password.');
  if(!username.value.length) return alert('You must enter a username.');
  return $.post('http://localhost:5000/auth/login', {
    info: JSON.stringify({ 
      username: username.value,
      password: password.value
    })
  });
}