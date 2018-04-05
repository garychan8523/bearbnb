import React, { Component } from "react";

class calendarDisplay extends Component {
	constructor(props){
		super(props);
		this.state = {
			checkIn: 0,
			checkOut: 0,
			checkInOrOut: true,
			currentMonth: new Date().getMonth(),
			currentYear: new Date().getFullYear(),
			checkClass: 'unchecked',
			checkInDate: 'Check In',
			checkOutDate: 'Check Out',
			toggleCounter: false,
			toggleClass: 'toggleFalse',
		};
	}

	toggleCount(){
		if(this.state.toggleCounter){
			this.setState({toggleCounter:false, toggleClass:'toggleFalse',});
		}else{
			this.setState({toggleCounter:true, toggleClass:'toggleTrueFlex',});
		}
	}

	toggleMonth(rightOrLeft) {//This switches the months-years when the left-right buttons are pressed.
		const stateMonth = this.state.currentMonth;
		const stateYear = this.state.currentYear;
		if(rightOrLeft&&(stateMonth+1) !== 12){
			this.setState({currentMonth: stateMonth + 1});
		}
		else if((stateMonth+1) === 12 && rightOrLeft === true){
			this.setState({currentYear: stateYear + 1, currentMonth: 0});
		}
		else if((stateMonth-1) === -1 && rightOrLeft === false){
			this.setState({currentYear: stateYear - 1, currentMonth: 11});
		}
		else if((stateMonth - 1) !== -1) {
			this.setState({currentMonth: stateMonth - 1});
		}   
	}

	checkDay(dayNumber){
		const bool = this.state.checkInOrOut;
		const element = document.getElementById(dayNumber.toString());
		if(bool){
			this.setState({checkIn: dayNumber, checkOut: 0, checkOutDate: 'Check Out', checkInOrOut: false, checkClass: 'checked'});
			element.style.backgroundColor = "#008489";
			element.style.color = "#FFFFFF";
			for(let x = dayNumber - 1;x >= 0;--x){
				let lesserTable = document.getElementById(x.toString());
				if(lesserTable !== null){
					lesserTable.style.color = "lightgrey";
					lesserTable.style.textDecoration = "line-through";
					lesserTable.style.backgroundColor = "#FFFFFF";
				}
			}
			this.handleCalendar(this.state.currentYear, this.state.currentMonth, element.innerHTML, true);
		}
		else{
			if(this.state.checkIn < dayNumber){
				var dayArray = [];
				for(let x = this.state.checkIn + 1;x < dayNumber;x++){
					this.setState({checkOut: dayNumber, checkInOrOut: true,});
					var idElement = document.getElementById(x.toString());
					var checkOutDay = document.getElementById(dayNumber.toString());
					dayArray.push(x);
					if(idElement !== null){
					idElement.style.backgroundColor = "#66e2da";
					idElement.style.color = "#008489";
					}
					checkOutDay.style.backgroundColor = "#008489";
					checkOutDay.style.color = "#FFFFFF";
				}
				dayArray.unshift(this.state.checkIn);
				this.handleCalendar(this.state.currentYear, this.state.currentMonth, element.innerHTML, false);
				this.props.gatherInfo(dayArray, this.state.currentYear);
			}
		}
	}

	hoverDay(dayNumber, enterOrLeave){
		if(this.state.checkIn < dayNumber && this.state.checkInOrOut === false && enterOrLeave === true){
			for(let x = this.state.checkIn + 1;x < dayNumber;x++){
				let idElement = document.getElementById(x.toString());
				let checkOutDay = document.getElementById(dayNumber.toString());

				if(idElement !== null){
					idElement.style.backgroundColor = "#66e2da";
					idElement.style.color = "#008489";
				}

				if(checkOutDay !== null){
				checkOutDay.style.backgroundColor = "#008489";
				checkOutDay.style.color = "#FFFFFF";
				}
			}
		}else if(this.state.checkInOrOut === false && enterOrLeave === false){
			for(let x = this.state.checkIn + 1;x < dayNumber;x++){
				let idElement = document.getElementById(x.toString());
				let checkOutDay = document.getElementById(dayNumber.toString());

				if(idElement !== null){
				idElement.style.backgroundColor = "white";
				idElement.style.color = "#414141";
				}

				if (checkOutDay !== null){
				checkOutDay.style.backgroundColor = "white";
				checkOutDay.style.color = "#414141";
				}
			}
		}
	}

	handleCalendar(year, month, day, inOrOut){
		let date = (month + 1).toString() + '/' + day.toString() + '/' + year.toString();
		if(inOrOut){
			this.setState({
				checkInDate: date,
			});
		}
		else {
			this.setState({
				checkOutDate: date,
			});
		}
	}
	render(){
//CODE EXPLANATION:------------------------------------------------------------------------------
/*First, we grab a date and we create an entire year array. Within the year array, we add 12 different month arrays containing each day. As a result dayArr is
created. Secondly, renderDate can grab a specific month from dayArr and then it splits up the month into week arrays and then a 'remainder' array representing
the left over days in a month that do not make up a full week. Third, it grabs the week arrays and arranges the weeks into a viewable calendar table.
I know there is alot of room for refactoring, but at the current moment, this is the best that I could come up with.*/
//-----------------------------------------------------------------------------------------------
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	function createCalendar(thisYear, thisMonth, bookingArray){
		let dayArr = [];//This will contain the month arrays. 
		function daysInMonth(month, year){//This grabs a certain month within a year and returns the amount of days within that month.
			return new Date(year, month + 1, 0).getDate();
		}

		function parseDate(day, month, year){//This grabs a certain date and returns a string containing the name of the day.
			var argDate = new Date(year, month, day).toString();
			argDate = argDate.split(' ');
			return argDate[0];
		}

		var counterID = 0;//This counterID will give each day a unique ID
		for(let z = 0; z <= 11; z++){//z represents the amount of months. Since months are 0-based the limit is 11.
			dayArr.push([]);
			for(let x = 1;x <= daysInMonth(z, thisYear);x++){//x represents the amount of days in each month.
				counterID++;
				var dateObject = {
					dayNumber: x,//Number of days
					dayName: parseDate(x, z, thisYear),//The string name of each day.
					dayNameByNumber: new Date(thisYear, z, x).getDay(),//0-6 represents the numeral name of each day.
					className: 'unchecked',
					monthNumber:z,
					id: counterID,
					booked: false,
				};
				for(let x = 0;x < bookingArray.length;x++){
					if(bookingArray[x] && bookingArray[x].dateID === dateObject.id){
						dateObject.booked = true;
					}
				}
				dayArr[z].push(dateObject);
				//The reason I used an object is because the properties might be useful for later use in other features.
			}
		}
		
		for(let y = 0; y < dayArr.length;y++){//This adds 'fillers' to ensure that the days are correctly aligned on the calendar.
			var counter = dayArr[y][0].dayNameByNumber;
			for(let z = 0;z < counter;z++){
				dayArr[y].unshift(false);
			}
		}

		
		function renderDate(month){//To put it simply, renderDate splits up the month into multiple groups of 7 days and then takes care of the remainder of days.
			var compareArr = dayArr[month].slice(0);
			var sevenMax = [];
			var completeArr = [];
			for(let index = 0;index < dayArr[month].length;index++){
				if(sevenMax.length < 7){	
					sevenMax.push(dayArr[month][index]);
					compareArr.shift();
				}else{
					completeArr.push(sevenMax);
					sevenMax = [];
					sevenMax.push(dayArr[month][index]);
					compareArr.shift();
					if(compareArr.length < 7){
						compareArr.unshift(dayArr[month][index]);
						completeArr.push(compareArr);
						return completeArr;
					}
				}
			}
		}
		return renderDate(thisMonth);
	}
		return(
			<div className='bookingSection bookingCalendar'>
		  			<p className='guestDate inputTitle'>Date:</p>
		  			<p onClick={this.toggleCount.bind(this)} className='guestCheckIn inputSection'><span>{this.state.checkInDate}</span><i className="fas fa-long-arrow-alt-right"></i><span>{this.state.checkOutDate}</span></p>
				<div className={this.state.toggleClass + ' calendarContainer'} style={this.props.calendarStyling}>
					<div className='calendarHeader'>
						<p onClick={this.toggleMonth.bind(this, false)}><i className="fas fa-long-arrow-alt-left"></i></p>
						<h2>{monthNames[this.state.currentMonth]} {this.state.currentYear}</h2>
						<p onClick={this.toggleMonth.bind(this, true)}><i className="fas fa-long-arrow-alt-right"></i></p>
					</div>
					<table>
						<tbody>
						<tr>
							<th>Su</th>
							<th>Mo</th>
							<th>Tu</th>
							<th>We</th>
							<th>Th</th>
							<th>Fr</th>
							<th>Sa</th>
						</tr>
						{
						//There are two contained block scopes: createCalender() and then the .map block within createCalendar.
						//As stephan said, I have used arrow functions to eliminate the block scope so that the inner .map scope can access the state.
						createCalendar(this.state.currentYear, this.state.currentMonth, this.props.data.booking).map((dateValue) => {//This displays our 2D calendar array into an HTML table.
							return <tr key={Math.random().toString()}>{dateValue.map((dateDay) => {  

								for(let x = 0;x < this.props.data.booking.length;x++){
									if(this.props.data.booking[x] && this.props.data.booking[x].dateID < dateDay.id&&0 < this.state.checkIn&&this.state.checkIn < this.props.data.booking[x].dateID){
										return <td className='checkedRemoved noHover' key={(dateDay.id).toString()}>{dateDay.dayNumber}</td>;
									}
								}
								if(dateDay === false){
									return <td key={Math.random().toString()} className='calendarFiller'></td>;//This creates a calendar filler for each month of they year
								}
								else if(dateDay.booked === true){
									return <td className='checkedRemoved noHover' key={(dateDay.id).toString()} onMouseEnter={this.hoverDay.bind(this, dateDay.id, true)} onMouseLeave={this.hoverDay.bind(this, dateDay.id, false)} onClick={this.checkDay.bind(this, dateDay.id)}>{dateDay.dayNumber}</td>;
								}
								else if(dateDay.id === this.state.checkIn||dateDay.id === this.state.checkOut){
									if(0 < this.state.checkIn){
									return <td className='checked noHover' key={(dateDay.id).toString()} onMouseEnter={this.hoverDay.bind(this, dateDay.id, true)} onMouseLeave={this.hoverDay.bind(this, dateDay.id, false)} onClick={this.checkDay.bind(this, dateDay.id)} id={dateDay.id}>{dateDay.dayNumber}</td>;
									}
								}
								else if(dateDay.id < this.state.checkOut&&this.state.checkIn < dateDay.id){
									return <td className='checkedBetween noHover' key={(dateDay.id).toString()} onMouseEnter={this.hoverDay.bind(this, dateDay.id, true)} onMouseLeave={this.hoverDay.bind(this, dateDay.id, false)} onClick={this.checkDay.bind(this, dateDay.id)} id={dateDay.id}>{dateDay.dayNumber}</td>;
								}
								else if (dateDay.id < this.state.checkIn){
									return <td className='checkedRemoved noHover' key={(dateDay.id).toString()} onMouseEnter={this.hoverDay.bind(this, dateDay.id, true)} onMouseLeave={this.hoverDay.bind(this, dateDay.id, false)} onClick={this.checkDay.bind(this, dateDay.id)} id={dateDay.id}>{dateDay.dayNumber}</td>;
								}
								else{
									return <td key={(dateDay.id).toString()} onMouseEnter={this.hoverDay.bind(this, dateDay.id, true)} onMouseLeave={this.hoverDay.bind(this, dateDay.id, false)} onClick={this.checkDay.bind(this, dateDay.id)} id={dateDay.id}>{dateDay.dayNumber}</td>;
								}
								return <td key={(dateDay.id).toString()} className='calendarFiller'></td>;
							})}</tr>;
						})
						}
						</tbody>
					</table>
				</div>
			</div>
		);
	}	
}

export default calendarDisplay;