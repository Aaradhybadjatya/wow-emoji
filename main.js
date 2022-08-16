prediction1="";
prediction2="";

Webcam.set({
    width:300,
    height:300,
    imamge_format:'png',
    png_quality:100
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="img1" src="'+data_uri+'">';

});

}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8bNNd7Rfk/model.json',modelLoaded);
function modelLoaded()
{
console.log("model is loaded");

}

function speak()
{
var synth=window.speechSynthesis;
speak_data_1="The first prediction is "+prediction1;
speak_data_2="The second prediction is "+prediction2;
var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterThis);

}

function check()
{
img=document.getElementById("img1");
classifier.classify(img,gotResult);

}

function gotResult(error,results)
{
if(error)
{
    console.error(error);
}

else
{
console.log(results);
document.getElementById("result_emotion_name").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").innerHTML=results[1].label;
prediction1=results[0].label;
prediction2=results[1].label;
speak();
if(results[0].label=="Happy")
{
document.getElementById("result_emoji").innerHTML="&#128522;";

}

if(results[0].label=="Sad")
{
document.getElementById("result_emoji").innerHTML="&#128532;";

}


if(results[0].label=="Angry")
{
document.getElementById("result_emoji").innerHTML="&#128545;";

}


if(results[1].label=="Happy")
{
document.getElementById("result_emoji2").innerHTML="&#128522;";

}

if(results[1].label=="Sad")
{
document.getElementById("result_emoji2").innerHTML="&#128532;";

}


if(results[1].label=="Angry")
{
document.getElementById("result_emoji2").innerHTML="&#128545;";

}



}

}
