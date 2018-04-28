$(document).ready(function(){
    let startdate = $("#root > div > main > div > div.carouselContainer--a > div.carouselMask > div > div:nth-child(3) > a > div > div:nth-child(3) #starttime")[0];
    if(startdate){
    	startdate = startdate.textContent;
    	startdate = startdate.slice(0, 10) + " " + startdate.slice(11, 11+5);
    	$("#root > div > main > div > div.carouselContainer--a > div.carouselMask > div > div:nth-child(3) > a > div > div:nth-child(3) #starttime")[0].textContent = startdate;
    }

    let enddate = $("#root > div > main > div > div.carouselContainer--a > div.carouselMask > div > div:nth-child(3) > a > div > div:nth-child(3) #endtime")[0];
    if(enddate){
    	enddate = enddate.textContent;
    	enddate = enddate.slice(0, 10) + " " + enddate.slice(11, 11+5);
    	$("#root > div > main > div > div.carouselContainer--a > div.carouselMask > div > div:nth-child(3) > a > div > div:nth-child(3) #endtime")[0].textContent = enddate;
    }

});