import fs from 'node:fs';
import pkg from './package.json' with { type: 'json' };

delete pkg.scripts['setup'];
delete pkg.scripts['setup-install'];
delete pkg.scripts['setup-workflows'];
delete pkg.scripts['setup-cleanup'];

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2))
fs.deleteFileSync('cleanup-scripts-script.js')
