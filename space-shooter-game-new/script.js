window.addEventListener('DOMContentLoaded', () => {
  let gameOver = false;
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight - 33,
  };

  const player = {
    x: mouse.x - 16,
    y: mouse.y - 16,
    width: 32,
    height: 32,
  };
  const playerImage = new Image();
  playerImage.src = './heroShip.png';

  playerImage.onload = () => { // Wait for the player's image to load
    const bullets = [];
    const enemies = [];
    const healthKits = [];

    let score = 0;
    let health = 100;

    function spawnEnemies() {
      for (let i = 0; i < 4; i++) {
        const x = Math.random() * (canvas.width - 32);
        const y = -32;
        const speed = Math.random() * 2;
        const enemy = {
          x: x,
          y: y,
          width: 32,
          height: 32,
          speed: speed,
          image: new Image(),
        };
        enemy.image.src = './enemy-fotor.png';
        enemies.push(enemy);
      }
    }
    setInterval(spawnEnemies, 1234);

    function spawnHealthKits() {
      for (let i = 0; i < 1; i++) {
        const x = Math.random() * (canvas.width - 32);
        const y = -32;
        const speed = Math.random() * 2.6;
        const healthKit = {
          x: x,
          y: y,
          width: 32,
          height: 32,
          speed: speed,
          image: new Image(),
        };
        healthKit.image.src = './first-aid-kit.png';
        healthKits.push(healthKit);
      }
    }
    setInterval(spawnHealthKits, 10000);
    setInterval(fire, 250);

    function fire() {
      const bullet = {
        x: player.x + player.width / 2 + 13,
        y: player.y - 5,
        width: 6,
        height: 8,
        speed: 10,
      };
      bullets.push(bullet);
    }
    canvas.addEventListener('click', fire);

    canvas.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      player.x = mouse.x - player.width / 2;
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      mouse.x = e.touches[0].clientX;
      player.x = mouse.x - player.width / 2;
    });

    canvas.addEventListener('touchstart', fire, { passive: true });

    function collision(a, b) {
      return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
      );
    }

    function updateGame() {
      if (!gameOver) {
        requestAnimationFrame(updateGame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '1em Arial';
        ctx.fillText('Health: ' + health, 5, 20);
        ctx.fillText('Score: ' + score, canvas.width - 100, 20);

        ctx.drawImage(playerImage, player.x, player.y);

        for (let i = bullets.length - 1; i >= 0; i--) {
          bullets[i].y -= bullets[i].speed;
          ctx.fillStyle = 'white';
          ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
          if (bullets[i].y < 0) {
            bullets.splice(i, 1);
          }
        }

        for (let i = enemies.length - 1; i >= 0; i--) {
          enemies[i].y += enemies[i].speed;
          ctx.drawImage(enemies[i].image, enemies[i].x, enemies[i].y);

          if (collision(enemies[i], player)) {
            enemies.splice(i, 1);
            health -= 10;
            if (health <= 0) {
              console.log(health);
              ctx.fillText('Health: 0', 5, 20);
              gameOver = true;
              alert('You LOST!\nYour score was ' + score);
              location.reload();
            }
          }
        }


        const enemyCopy = [...enemies];
        const bulletCopy = [...bullets];

        for (let i = enemyCopy.length - 1; i >= 0; i--) {
          for (let j = bulletCopy.length - 1; j >= 0; j--) {
            if (collision(enemyCopy[i], bulletCopy[j])) {
              enemies.splice(i, 1);
              bullets.splice(j, 1);
              score++;
            }
          }
        }

        for (let i = healthKits.length - 1; i >= 0; i--) {
          healthKits[i].y += healthKits[i].speed;
          ctx.drawImage(healthKits[i].image, healthKits[i].x, healthKits[i].y);
          if (collision(healthKits[i], player)) {
            healthKits.splice(i, 1);
            health += 10;
          }
        }

        for (let i = healthKits.length - 1; i >= 0; i--) {
          for (let j = bullets.length - 1; j >= 0; j--) {
            if (collision(healthKits[i], bullets[j])) {
              healthKits.splice(i, 1);
              bullets.splice(j, 1);
              health += 10;
            }
          }
        }
      }
    }

    updateGame();
  };
});