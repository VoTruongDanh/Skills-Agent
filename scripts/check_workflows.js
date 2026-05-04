const fs = require('fs');
const path = require('path');
const workflowDir = path.join(__dirname, '..', '.agent', 'workflows');
if (!fs.existsSync(workflowDir)) {
  console.error('Workflow dir missing');
  process.exit(2);
}
const files = fs.readdirSync(workflowDir).filter(f => f.endsWith('.md'));
let ok = true;
for (const f of files) {
  const p = path.join(workflowDir, f);
  const content = fs.readFileSync(p, 'utf8');
  const has = content.includes('Canonical source');
  console.log(f + ': ' + (has ? 'OK' : 'MISSING'));
  if (!has) ok = false;
}
process.exit(ok ? 0 : 1);
