const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angle = 0

//points
const A = { x: 200, y: 150 };
const B = { x: 150, y: 250 };
const C = { x: 50, y: 100 };
const D = { x: 250, y: 200 };

let points = [A, B, C, D];

const mouse = {
	x: 0,
	y: 0,
};

document.onmousemove = (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
}

animate();

function animate() {
	const radius = 50

	A.x = mouse.x + Math.cos(angle) * radius
	A.y = mouse.y- Math.sin(angle) * radius
	B.x = mouse.x - Math.cos(angle) * radius
	B.y = mouse.y+ Math.sin(angle) * radius
	angle += 0.01

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

	const I = getIntersection(A, B, C, D);

	if(I){
		drawDot(I, "I");
	}

	requestAnimationFrame(animate);
}

function getIntersection(A, B, C, D) {
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

	const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
	const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
	const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

	if(bottom !== 0){
		const t = tTop / bottom;
		const u = uTop / bottom;
		if(t>=0 && t <=1 && u >=0 && u <= 1){
			// returning the point of intersection
			return {
				x: lerp(A.x, B.x, t),
				y: lerp(A.y, B.y, t),
				offset: t
			};

		}
	}

	return null


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
