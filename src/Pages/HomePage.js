import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import selectors from "../redux/selectors";

export default function HomePage() {
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);
  const userName = useSelector(selectors.getUserName);
  const navigate = useNavigate();

  useEffect(() => {
    const bodyEl = document.body;
    bodyEl.style.backgroundColor = "#000";
    if (document.getElementById("c")) {
      let intervalID,
        timeoutID = null;
      window.requestAnimFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (a) {
            timeoutID = window.setTimeout(a, 1e3 / 60);
          }
        );
      })();

      document.onselectstart = function () {
        return false;
      };

      var c = document.getElementById("c");
      var ctx = c.getContext("2d");
      var dpr = window.devicePixelRatio;
      var cw = window.innerWidth;
      var ch = window.innerHeight;
      c.width = cw * dpr;
      c.height = ch * dpr;
      ctx.scale(dpr, dpr);
      var rand = function (rMi, rMa) {
        return ~~(Math.random() * (rMa - rMi + 1) + rMi);
      };
      ctx.lineCap = "round";
      var orbs = [];

      var trail = true;

      function createOrb(mx, my) {
        var dx = cw / 2 - mx;
        var dy = ch / 2 - my;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var angle = Math.atan2(dy, dx);
        orbs.push({
          x: mx,
          y: my,
          lastX: mx,
          lastY: my,
          hue: 0,
          colorAngle: 0,
          angle: angle + Math.PI / 2,
          size: rand(1, 3) / 2,
          centerX: cw / 2,
          centerY: ch / 2,
          radius: dist,
          speed: (rand(5, 10) / 1000) * (dist / 750) + 0.015,
          alpha: 1 - Math.abs(dist) / cw,
          draw: function () {
            ctx.strokeStyle = "hsla(" + this.colorAngle + ",100%,50%,1)";
            ctx.lineWidth = this.size;
            ctx.beginPath();
            ctx.moveTo(this.lastX, this.lastY);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
          },
          update: function () {
            var mx = this.x;
            var my = this.y;
            this.lastX = this.x;
            this.lastY = this.y;
            var x1 = cw / 2;
            var y1 = ch / 2;
            var x2 = mx;
            var y2 = my;
            var rise = y1 - y2;
            var run = x1 - x2;
            var slope = -(rise / run);
            var radian = Math.atan(slope);
            var angleH = Math.floor(radian * (180 / Math.PI));
            if (x2 < x1 && y2 < y1) {
              angleH += 180;
            }
            if (x2 < x1 && y2 > y1) {
              angleH += 180;
            }
            if (x2 > x1 && y2 > y1) {
              angleH += 360;
            }
            if (y2 < y1 && slope === "-Infinity") {
              angleH = 90;
            }
            if (y2 > y1 && slope === "Infinity") {
              angleH = 270;
            }
            if (x2 < x1 && slope === "0") {
              angleH = 180;
            }
            if (isNaN(angleH)) {
              angleH = 0;
            }

            this.colorAngle = angleH;
            this.x = this.centerX + Math.sin(this.angle * -1) * this.radius;
            this.y = this.centerY + Math.cos(this.angle * -1) * this.radius;
            this.angle += this.speed;
          },
        });
      }

      function orbGo(e) {
        var mx = e.pageX - c.offsetLeft;
        var my = e.pageY - c.offsetTop;
        createOrb(mx, my);
      }

      function turnOnMove() {
        c.addEventListener("mousemove", orbGo, false);
      }

      function turnOffMove() {
        c.removeEventListener("mousemove", orbGo, false);
      }

      function clear() {
        orbs = [];
      }

      c.addEventListener("mousedown", orbGo, false);
      c.addEventListener("mousedown", turnOnMove, false);
      c.addEventListener("mouseup", turnOffMove, false);
      intervalID = setInterval(clear, 60000);

      var count = 100;
      while (count--) {
        createOrb(cw / 2, ch / 2 + count * 2);
      }

      var loop = function () {
        window.requestAnimFrame(loop);
        if (trail) {
          ctx.fillStyle = "rgba(0,0,0,.1)";
          ctx.fillRect(0, 0, cw, ch);
        } else {
          ctx.clearRect(0, 0, cw, ch);
        }
        var i = orbs.length;
        while (i--) {
          var orb = orbs[i];
          var updateCount = 3;
          while (updateCount--) {
            orb.update();
            orb.draw(ctx);
          }
        }
      };

      loop();

      return () => {
        clearInterval(intervalID);
        clearInterval(timeoutID);
        bodyEl.style.backgroundColor = "#fff";
        c.removeEventListener("mousedown", orbGo, false);
        c.removeEventListener("mousemove", orbGo, false);
        c.removeEventListener("mousedown", turnOnMove, false);
        c.removeEventListener("mouseup", turnOffMove, false);
      };
    }
  }, []);

  return (
    <div className="home-wrapper text-light p-4">
      <h1 className="home-header">Welcome to Contacts App!</h1>

      {isLoggedIn ? (
        <>
          <h2>We are glad to see you again {userName}!</h2>
          <p>
            Want to jump straight to{"  "}
            <button
              type="button"
              className="badge badge-primary"
              onClick={() => navigate("/contacts")}
            >
              Phonebook
            </button>
            ?
          </p>
        </>
      ) : (
        <ul className="home-list">
          <li>
            In order to use personal contacts app you need to{"  "}
            <button
              type="button"
              className="badge badge-primary"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </li>
          <li>
            Or if you are a newcomer please feel free to{"  "}
            <button
              type="button"
              className="badge badge-primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </li>
        </ul>
      )}
      <p className="home-text-background text-muted text-center">
        Or take some time to play with our magic background :)
      </p>
      <canvas id="c"></canvas>
    </div>
  );
}
