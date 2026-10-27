const formatDuration = (sec: number): string => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  return `${minutes} min. ${seconds} sec.`;
};

export default formatDuration;
