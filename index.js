const audioContext = new AudioContext();

const startLoop = (audioBuffer, pan = 0, rate = 1) => {
  // setup source
  const srcNode = audioContext.createBufferSource();
  srcNode.buffer = audioBuffer;
  srcNode.loop = true;
  srcNode.loopStart = 4;
  srcNode.loopEnd = 6.5;
  srcNode.playbackRate.value = rate;

  // setup panning
  const panNode = audioContext.createStereoPanner(pan);
  panNode.pan.value = pan;

  // setup audio routing
  srcNode.connect(panNode);
  panNode.connect(audioContext.destination);
  srcNode.start();
};

const loadSample = async () => {
  const file = await fetch('./assets/influenceofcorporationsinpoliticalprocess.mp3');
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  startLoop(audioBuffer, -1);
  startLoop(audioBuffer, 1, 1.002);
};

loadSample();
