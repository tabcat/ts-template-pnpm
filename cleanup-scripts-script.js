import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import pkg from './package.json' with { type: 'json' };

try {
  // Modify package.json content
  delete pkg.scripts['setup'];
  delete pkg.scripts['setup-install'];
  delete pkg.scripts['setup-workflows'];
  delete pkg.scripts['setup-cleanup'];
  
  // Create temporary file with unique name
  const tempFile = `.package-${randomUUID()}.json.tmp`;
  
  // Write to temporary file first
  fs.writeFileSync(tempFile, JSON.stringify(pkg, null, 2));
  
  // Atomically replace the original file
  fs.renameSync(tempFile, 'package.json');
  
  // Only delete this script if the above operations succeeded
  fs.unlinkSync('cleanup-scripts-script.js');
  
  console.log('Cleanup operation completed successfully');
} catch (error) {
  console.error('Error during cleanup operation:', error);
  process.exit(1);
}
