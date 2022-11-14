const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
// const createPost = async () => {
//   const response = await fetch('/api/users/createPost', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (response.ok) {
//     document.location.replace('/createPost');
//   } else {
//     alert(response.statusText);
//   }
// };

  document.querySelector('#logout').addEventListener('click', logout);
  // document.querySelector('#create-post').addEventListener('click', createPost);
  