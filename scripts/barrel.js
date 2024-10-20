const fs = require('fs');

const createBarrel = (directoryPath) => {
  const sourcesPath = `${process.cwd()}/${directoryPath}`;

  const sources = [];

  for (const filename of fs.readdirSync(sourcesPath)) {
    const stat = fs.statSync(`${sourcesPath}/${filename}`);

    if (stat.isFile() === false) {
      continue;
    }

    if (['index.ts'].includes(filename)) {
      continue;
    }

    sources.push(`export * from './${filename.replace('.ts', '')}';\n`);
  }

  const indexPath = `${sourcesPath}/index.ts`;

  fs.writeFileSync(indexPath, sources.join(''), 'utf-8');
};

createBarrel(process.argv[2]);
