const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//points
const A = { x: 200, y: 150 };
const B = { x: 150, y: 250 };
const C = { x: 50, y: 100 };
const D = { x: 250, y: 200 };

let points = [A, B, C, D];

let t = -0.1;
animate();

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.moveTo(A.x, A.y);
	ctx.lineTo(B.x, B.y);

	ctx.moveTo(C.x, C.y);
	ctx.lineTo(D.x, D.y);
	ctx.stroke();

	// visualize the popints and lines
	drawDot(A, "A");
	drawDot(B, "B");
	drawDot(C, "C");
	drawDot(D, "D");

	//calculating the midpoint using linear interpolation
	const M = {
		x: lerp(A.x, B.x, t),
		y: lerp(A.y, B.y, t),
	};

	const N = {
		x: lerp(C.x, D.x, t),
		y: lerp(C.y, D.y, t)
	}

	drawDot(M, "M", t<0 || t>1);
	drawDot(N, "N", t<0 || t>1);
	t += 0.005;
	requestAnimationFrame(animate);
}

function drawDot(point, label, isRed) {
	ctx.beginPath();
	ctx.fillStyle = isRed ? "red" : "blue";
	ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "bold 14px Arial";
	ctx.fillText(label, point.x, point.y);
}

function lerp(start, end, t) {
	return start + (end - start) * t;
}
