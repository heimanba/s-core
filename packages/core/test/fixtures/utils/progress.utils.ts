// @ts-ignore
import ProgressBar from 'progress';

const bar = new ProgressBar('downloading [:bar] :percent :etas :current/:total', {
  complete: '*',
  total: 100,
});
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    console.log('\ncomplete\n');
    clearInterval(timer);
  }
}, 100);
