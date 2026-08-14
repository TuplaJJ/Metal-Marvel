/* Loaded in <head> WITHOUT defer, so it runs before the body is parsed.
   .reveal elements are hidden via `.js .reveal`, which means that if scripting is
   unavailable or a later module throws, the page renders normally instead of
   staying at opacity: 0. Marking the class here rather than in a deferred module
   avoids a flash of visible content before the reveal styles apply. */
document.documentElement.classList.add('js');
