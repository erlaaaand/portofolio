const fs = require('fs');
const path = require('path');

const dirs = [
  'src/backend/core/exceptions',
  'src/backend/core/filters',
  'src/backend/module/database/config',
  'src/backend/module/database/entities',
  'src/backend/module/auth/domains/entities',
  'src/backend/module/auth/applications/use-cases',
  'src/backend/module/storage/domains/entities',
  'src/backend/module/storage/applications/use-cases',
  'src/backend/module/storage/infrastructures/providers',
  'src/backend/module/storage/infrastructures/adapters',
  'src/backend/module/portfolio/applications/dto',
  'src/backend/module/portfolio/applications/use-cases',
  'src/backend/module/portfolio/domains/entities',
  'src/backend/module/portfolio/domains/mappers',
  'src/backend/module/portfolio/infrastructures/repositories'
];

for (const d of dirs) {
  const fullPath = path.join(process.cwd(), d);
  if (fs.existsSync(fullPath)) {
    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.ts') && f !== 'index.ts');
    let content = '';
    for (const f of files) {
      const name = f.replace('.ts', '');
      content += `export * from './${name}';\n`;
    }
    if (content) {
      fs.writeFileSync(path.join(fullPath, 'index.ts'), content);
      console.log('Created index.ts in ' + d);
    }
  }
}
