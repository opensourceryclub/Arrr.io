import { connect, play } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { setHUDHidden } from './hud';
import { setButtonsHidden } from './buttons';
import { setStoreHidden } from './store';
import { setLeaderboardHidden } from './leaderboard';
import { downloadAssets } from './assets';
import { initState } from './state';

// I'm using a tiny subset of Bootstrap here for convenience - there's some wasted CSS,
// but not much. In general, you should be careful using Bootstrap because it makes it
// easy to unnecessarily bloat your site.
import './css/bootstrap-reboot.css';
import './css/main.css';
import './css/hud.css';
import './css/store.css';
import './css/navigation.css';
import './css/leaderboard.css';
import './css/play-menu.css';
import './css/disconnect-modal.css';

const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const usernameInput = document.getElementById('username-input');

Promise.all([
  connect(onGameOver),
  downloadAssets(),
]).then(() => {
  playMenu.classList.remove('hidden');
  usernameInput.focus();
  playButton.onclick = () => {
    // Play!
    play(usernameInput.value);
    playMenu.classList.add('hidden');
    initState();
    startCapturingInput();
    startRendering();
    // setHUDHidden(false);
    // setLeaderboardHidden(false);
    setButtonsHidden(false);
  };
}).catch(console.error);

function onGameOver() {
  stopCapturingInput();
  stopRendering();
  playMenu.classList.remove('hidden');
  setHUDHidden(true);
  setLeaderboardHidden(true);
  setButtonsHidden(true);
  // setStoreHidden(true);
}
