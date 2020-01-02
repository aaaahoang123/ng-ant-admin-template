const fs = require('fs');

fs.readFile('../new-admin-server/public/ttv-admin/index.html', function (err, buff) {
  if (err) {
    console.log(`Can not read index: ${err.message}`);
  }
  const content = buff.toString();

  fs.writeFile('../new-admin-server/resources/views/admin.blade.php', content, function (e) {
    if (err) {
      console.log(`Can not write admin.blade.php: ${e.message}`);
    }
    console.log('Generate admin.blade.php success');
  })
});
