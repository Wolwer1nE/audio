import Meyda from 'meyda'
document.addEventListener("DOMContentLoaded", ()=>{
    const start = document.getElementById("start");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const audio = document.getElementById("audio");

    canvas.width = rect.width;
    canvas.height = rect.height;
    start.onclick = ()=>{
       const file =  document.getElementById("file-input").files[0];
       if (file === null)
       {
           return ;
       }
       audio.src = URL.createObjectURL(file);
       const audioContext = new AudioContext();
       const source = audioContext.createMediaElementSource(audio);
       source.connect(audioContext.destination);
       const analyzer = Meyda.createMeydaAnalyzer({
            "audioContext": audioContext,
            "source": source,
            "bufferSize": 512,
            "featureExtractors": ["energy"],
            "callback": features => {
               draw(context, features);
            }
        });
       analyzer.start();
       audio.play();
    }

})


function draw(context, features)
{   context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(320, 240, features.energy*5, 0, 2*Math.PI);
    context.fillStyle = "#ff0084";
    context.fill();
    context.closePath();
}