fetch('http://localhost:3001/api/booths/map-data')
  .then(res => {
    console.log('Status:', res.status);
    return res.text();
  })
  .then(text => console.log('Body:', text))
  .catch(err => console.error('Fetch error:', err));
