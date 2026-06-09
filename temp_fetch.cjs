const https = require('https');
https.get('https://system-operacyjny-2-0-zdrowie-it-621427905508.europe-west2.run.app/assets/index-CVkDQyYy.js', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const strMatch = data.match(/\[([^\]]+)\]/g);
    if(strMatch) {
       strMatch.forEach(m => {
          if (m.includes('ryby') || (/Jaja|Jajka|Kurcz|Mięs/).test(m)) {
              if(!m.includes('svg')) {
                  console.log(m);
              }
          }
       });
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
