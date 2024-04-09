const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//points
const A = { x: 200, y: 50 };
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

	const I = getIntersection(A, B, C, D);
	drawDot(I, "I");

	t += 0.005;
	requestAnimationFrame(animate);
}

function getIntersection (A, B, C, D){
/**
 * formula for getting the intersection
 * Ix = Ax + t(Bx - Ax) = Cx + u(Dx - Cx) formula for geting x coordinate of intersection I
 * Iy = Ay + t(By - Ay) = Cy + u(Dy - Cy) formula for geting y coordinate of intersection I
 * 
 * simplification
 * Ix = Ax - Cx + (Bx - Ax)t = (Dx - Cx)u
 * Iy = Ay - Cy + (By - Ay)t = (Dy - Cy)u
 * 
 * get the value of t
 * top = (Dx - Cx)(Ay - Cy)-(Dy-Cy)(Ax-Cx)
 * bottom = (Dy-Cy)(Bx-Ax)-(Dx-Cx)(By-Ay)
 * t =  top / bottom

 */

	const top = (D.x - C.x)*(A.y - C.y) - (D.y - C.y)*(A.x - C.x);
	const bottom = (D.y - C.y)*(B.x - A.x) - (D.x - C.x)*(B.y - A.y);
	const t = top / bottom;

	// returning the point of intersection
	return {
		x: lerp(A.x, B.x, t),
		y: lerp(A.y, B.y, t)
	}

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
