import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';

const devDeps = [
  'typescript',
  'typedoc',
  'vitest',
  'prettier',
  'prettier-plugin-organize-imports',
  'husky',
  'lint-staged'
]

try {
  console.log('Starting template setup...');

  /** setup GitHub workflows */
  console.log('Setting up GitHub workflows...');
  try {
    if (!fs.existsSync('.github')) {
      fs.mkdirSync('.github');
    }
  } catch (e) {
    console.error('Error creating .github directory:', e);
  }

  try {
    if (!fs.existsSync('.github/workflows')) {
      fs.cpSync('workflows', '.github/workflows', { recursive: true });
      console.log('Workflows copied to .github directory');
    }
  } catch (e) {
    console.error('Error copying workflows to .github/workflows:', e);
  }

  /** install devDependencies */
  console.log('Installing development dependencies...');
  execSync('pnpm install -D ' + devDeps.join(' '), { 
    stdio: 'inherit' 
  });
  console.log('Development dependencies installed successfully');

  /** remove setup script from package.json */
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  delete pkg.scripts.setup
  const tempFile = `.package-${randomUUID()}.json.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(pkg, null, 2) + '\n');
  fs.renameSync(tempFile, 'package.json');
  
  /** remove setup.js */
  console.log('Deleting setup script...');
  fs.unlinkSync('setup.js');
  console.log('Setup script deleted successfully');
  
  console.log('Template setup completed successfully!');
} catch (e) {
  console.error('Error during template setup:', e);
  process.exit(1);
}
