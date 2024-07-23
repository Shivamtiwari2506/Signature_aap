const colorPicker = document.getElementById('colorPicker');
const canvasColor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const undoButton = document.getElementById('undoButton');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const fontPicker = document.getElementById('fontPicker');
const textInput = document.getElementById('textInput');
const retrieve  = document.getElementById('retrieveButton');

const fontSizePicker = document.getElementById('fontSizePicker'); 

const ctx = canvas.getContext('2d');

colorPicker.addEventListener('change',(event)=>{
         ctx.fillStyle = event.target.value;
         ctx.strokeStyle = event.target.value;
});
//filling the choosen color in the canvas
canvasColor.addEventListener('change', (event) => {
   ctx.fillStyle = event.target.value;
   ctx.fillRect(0, 0, 800, 500);
});

canvas.addEventListener("mousedown",(event)=>{
   isDrawing = true;
   lastX = event.offsetX;
   lastY = event.offsetY;
});


canvas.addEventListener("mousemove",(event)=>{
  if(isDrawing){
   ctx.beginPath();
   ctx.moveTo(lastX, lastY);
   ctx.lineTo(event.offsetX, event.offsetY);
   ctx.stroke();

   lastX = event.offsetX;
   lastY = event.offsetY;
  }
});

canvas.addEventListener('mouseup', () => {
   isDrawing = false;
});
//set the font size value and set it to the canvas linewidth
fontSizePicker.addEventListener("change",(event)=>{
   ctx.lineWidth = event.target.value;
});

//set the clear button function
clearButton.addEventListener('click',()=>{
   ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click',()=>{
   localStorage.setItem('canvasContents',canvas.toDataURL());
  //create a new <a> tag
   let link = document.createElement('a');
   //set the value download and href attribut for the created <a> tag
   link.download= 'my-canvas.png';

   // Dispatch a click event on the <a> element
   link.href = canvas.toDataURL();

   link.click();
});

//setting the retrieve button
retrieve.addEventListener('click',()=>{
   //retrieve the saved 
   let savedCanvas = localStorage.getItem('canvasContents');

            if (savedCanvas) {
                let img = new Image();
                img.src = savedCanvas;
                ctx.drawImage(img, 0, 0);
            }
});

