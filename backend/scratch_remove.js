import fs from 'fs';
import path from 'path';

const routesDir = path.join(process.cwd(), 'src', 'routes');
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
  const filePath = path.join(routesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // We want to replace:
  //   try {
  //     <statements>
  //   } catch (error) {
  //     res.status(500)...
  //   }
  // with:
  //     <statements>

  // A regex approach: match "  try {\n", then anything until "  } catch", then everything until "  }\n"
  const regex = /  try {\r?\n([\s\S]*?)  } catch.*\{\r?\n[\s\S]*?  }\r?\n/g;
  
  content = content.replace(regex, (match, statements) => {
    return statements;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Processed ${file}`);
});
