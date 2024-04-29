function longLoop(xBall, yBall) {
  if (yBall > 270)
    xBall = Math.floor(Math.random() * 280);
  yBall <= 280 ? yBall += 5 : yBall = 6;
  return { xBall: xBall, yBall: yBall };
}

// Listen for messages from the main thread
onmessage = function(event) {
  let xBall=event.data.xBall;
  let yBall=event.data.yBall;
  // Execute the heavy calculation
  const result = longLoop(xBall, yBall);
  // Send the result back to the main thread
  postMessage(result);
};
