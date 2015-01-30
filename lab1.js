// Michael Zbytniewski
var gl;
var points;
var whichshape = 0;
var vertices;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
	vertices = [
        vec2( -1, -1 ),
        vec2(  -1, 0 ),
        vec2(  0, 1 ),
        vec2( 1, 0),
		vec2( 1, -1 )
		];
	//
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	// Event Listener
	document.addEventListener("mousedown",function () {
		whichshape = whichshape + 1;
		whichshape = whichshape % 3;
		checkShape();
		render();
    });
    
    // Load the data into the GPU
	
	var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    render();
};

function checkShape(){
    if (whichshape == 0){
		vertices[0] = vec2( -1, -1);
		vertices[1] = vec2( 0, 1);
		vertices[2] = vec2( 1, -1);
	}
	else if (whichshape == 1){
		vertices[0] = vec2( -1, -1);
		vertices[1] = vec2( -1, 1);
		vertices[2] = vec2( 1, 1);
		vertices[3] = vec2( 1, -1);
	}
	else {
		vertices[0] = vec2( -1, -1);
		vertices[1] = vec2( -1, 0);
		vertices[2] = vec2( 0, 1);
		vertices[3] = vec2( 1, 0);
	}
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	if (whichshape == 0) {
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );
	}
	else if (whichshape == 1) {
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	}
    else {
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 5 );
	}
}
