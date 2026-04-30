const manifest = require('../package.json');

const viewIds = new Map();
const duplicateViewIds = [];

for (const [containerId, views] of Object.entries(manifest.contributes.views)) {
  for (const view of views) {
    const previousContainer = viewIds.get(view.id);

    if (previousContainer) {
      duplicateViewIds.push(`${view.id}: ${previousContainer}, ${containerId}`);
      continue;
    }

    viewIds.set(view.id, containerId);
  }
}

if (duplicateViewIds.length > 0) {
  console.error('Duplicate view ids are not allowed across containers:');
  for (const duplicateViewId of duplicateViewIds) {
    console.error(`- ${duplicateViewId}`);
  }
  process.exit(1);
}

console.log('Package manifest is valid.');
