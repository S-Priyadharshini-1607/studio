import { watch } from 'fs';
import { exec } from 'child_process';
import { resolve } from 'path';

// Debounce timer to prevent rapid consecutive deploys
let timeoutId = null;
const DEBOUNCE_DELAY_MS = 3000; // Wait 3 seconds after last change before triggering

// Track if a deployment is currently in progress
let isDeploying = false;

function triggerDeploy() {
  if (isDeploying) {
    console.log('Deploy already in progress. Skipping...');
    return;
  }

  isDeploying = true;
  console.log('\n--- File change detected. Starting auto-deploy ---');

  // Command to commit and push
  const command = 'git add . && git commit -m "Auto Update Github Project" && git push';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      // It's normal to get an error if there's nothing to commit
      if (stdout.includes('nothing to commit') || stderr.includes('nothing to commit')) {
        console.log('No changes to commit.');
      } else {
        console.error(`Deploy error:\n${error.message}`);
      }
    } else {
      console.log(`Deploy success:\n${stdout}`);
      console.log('Pushed to GitHub successfully. Netlify redeploy should trigger automatically.');
    }
    
    isDeploying = false;
    console.log('--- Auto-deploy finished. Watching for changes... ---\n');
  });
}

// Watch the src directory
const watchDir = resolve('./src');
console.log(`Watching for file changes in: ${watchDir}`);

watch(watchDir, { recursive: true }, (eventType, filename) => {
  // Ignore changes to node_modules or .git just in case
  if (filename && (filename.includes('node_modules') || filename.includes('.git'))) {
    return;
  }

  // Clear existing timeout if a new change happens within the delay window
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  // Set a new timeout
  timeoutId = setTimeout(() => {
    triggerDeploy();
  }, DEBOUNCE_DELAY_MS);
});
