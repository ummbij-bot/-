// Web Worker for Background Step Simulation
// This runs independently of the main UI thread

self.onmessage = (e) => {
  if (e.data === 'start') {
    console.log('👷 Step Worker Started');
    
    // Simulate steps every 3 seconds
    setInterval(() => {
      // Logic: Random steps between 5 to 15
      const stepsToAdd = Math.floor(Math.random() * 10) + 5;
      
      // Send back to main thread
      self.postMessage({ type: 'STEP_UPDATE', steps: stepsToAdd });
    }, 3000);
  }
};
