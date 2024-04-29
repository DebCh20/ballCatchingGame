const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let xFloor = 0;
    let yBall = 6;
    let xBall = 6;

    let worker = new Worker('worker.js');

    worker.onmessage = function(event) {
      // Received result from the worker
      xBall = event.data.xBall;
      yBall = event.data.yBall;
      // Redraw canvas
      drawCanvas();
    };

    function drawCanvas() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log('yball',yBall)
      // Draw the circle
      ctx.beginPath();
      ctx.arc(xBall, yBall, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.stroke();
      
      // Draw the floor
      ctx.fillRect(xFloor, 145, 20, 5);
      
    }

    document.addEventListener("keydown", function(event) {
      if (event.keyCode === 39 && xFloor<=280) {
        xFloor += 10; // Move right
        drawCanvas();
      }
      if (event.keyCode === 37 && xFloor>=0) {
        xFloor -= 10; // Move left
        drawCanvas();
      }
    });

    // Start the animation loop
    function startAnimation() {
      setInterval(() => {
        worker.postMessage({ xBall: xBall, yBall: yBall });
      }, 50);
    }

    startAnimation();