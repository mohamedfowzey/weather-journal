/* Global Variables */
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const generate = document.querySelector('#generate');
const apiKey = 'a0dc0b1ae9026d17535390446aa8eeea';

generate.addEventListener('click',()=>{
    const zipCode = document.querySelector('#zip').value;
    String().trim(zipCode);
    const content = document.getElementById('feelings').value;
    getdata (`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&APPID=${apiKey}&units=metric`)
    .then((data)=>{
        if(data.cod != 404 & data.cod != 400){
            let newData = {date:newDate,content:content,temp:data.main.temp};
            // postData(newData);
            updateUI(newData);
        }
        else{
            document.getElementById('temp').innerHTML = `temperature:`;
            setTimeout(()=>{document.getElementById('temp').innerHTML = `temperature: ${data.message}`;},50);
        }
    });}
);


// Dcleration of the used functions
const getdata = async (url)=>{
    const res = await fetch(url);
    try{const result = await res.json();
        console.log(result);
        return result;
    }
    catch(error){console.log('error');}
    }

    


//=======================================================================================================================

const updateUI = (a)=>{
    // const data = await getdata("/fakeapi")
    // console.log(data);
    document.getElementById('date').innerHTML = `date:`;
    document.getElementById('temp').innerHTML = `tempretureDegree:`;
    document.getElementById('content').innerHTML = `content:`;
    setTimeout(()=>{
    document.getElementById('date').innerHTML = `date: ${newDate}`;
    document.getElementById('temp').innerHTML = `tempretureDegree: ${a.temp} C<sup>o</sup>`;
    document.getElementById('content').innerHTML = `content: ${a.content}`;
    },50);}

//========================================================================================================================
const postData = async (data)=>{
    
    const res = await fetch('/all',{
        method:'POST',
        credentials:'same-origin',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    })
    try{console.log(res.json());return res.json()}
    catch(error){console.log('error'+error)}
}
