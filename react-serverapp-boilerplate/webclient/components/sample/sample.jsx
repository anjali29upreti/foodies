import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react';
import { Button, Card, Image } from 'semantic-ui-react'



export default class Sample extends React.Component {
	constructor () {
		super();
		this.state = {
			city_name:'',
			city_id:"",
			city_id_arr:[],
			cityId:"",
			cuisineOnId:"",
			cuisineArr:[],
			cityId:"",
			getResturantId:"",
			cardListItems:""
		}
	}

	handleNameState (event) {
		this.setState({ city_name: event.target.value });
	}

	getCityId(e){
		const cname= this.state.city_name;
		console.log("cname = " + cname);
		$.ajax ({
			url: "https://developers.zomato.com/api/v2.1/cities?q="+ cname,
			type : "GET",
			datatype: "json",
			headers : {"Accept": "application/json", "user-key": "2d5a977b388788f4463ba19c4586878c"},
			success: function(data){
				this.setState({city_id:data.location_suggestions});
				var cityArr=[];

				for(let i=0;i<this.state.city_id.length;i++)
				{
					cityArr.push({ key: this.state.city_id[i].id, value:  this.state.city_id[i].id, text: this.state.city_id[i].name })
				}
				console.log(this.state.city_id);
				this.setState({city_id_arr:cityArr});
					
			}.bind(this)

		})
	}


	selectedCityCuisine(e,data){
		this.state.cityId = data.value;
		console.log('cityId =' + this.state.cityId);

		$.ajax({

			url: "https://developers.zomato.com/api/v2.1/cuisines?city_id="+ this.state.cityId,
			type : "GET",
			datatype: "json",
			headers : {"Accept": "application/json", "user-key": "2d5a977b388788f4463ba19c4586878c"},
			success: function(data){
				this.setState({cuisineOnId:data.cuisines});
				var tempCuisineArr=[];
				console.log("cuisine length = " +this.state.cuisineOnId.length);
				for(let i=0;i<this.state.cuisineOnId.length;i++)
				{	
					console.log(this.state.cuisineOnId[i].cuisine.cuisine_id);
					tempCuisineArr.push({key: this.state.cuisineOnId[i].cuisine.cuisine_id, value:this.state.cuisineOnId[i].cuisine.cuisine_id, text: this.state.cuisineOnId[i].cuisine.cuisine_name})
				}
				console.log(this.state.cuisine_id);
				this.setState({cuisineArr:tempCuisineArr});
			}.bind(this)
		})

	}

	addingData(e,data){
			console.log(data);
	}


	searchResturant(e,data){

		$.ajax({
			url : "https://developers.zomato.com/api/v2.1/search?entity_id="+this.state.cityId+"&entity_type=city&cuisines="+data.value,
			type : "GET",
			datatype: "json",
			headers : {"Accept": "application/json", "user-key": "2d5a977b388788f4463ba19c4586878c"},
			success: function(data){
					this.setState({getResturantId:data.restaurants});
					console.log("resturant length = " +this.state.getResturantId.length);

					var item = this.state.getResturantId.map((object,index) =>
				<Card key={index}>
		      <Card.Content>


		      	
		      		<Image floated='right' height = "200px" width ="300px" src={object.restaurant.featured_image}/>
		      	
		        
		        <Card.Header>
		          {object.restaurant.name}
		        </Card.Header>
		        <Card.Meta>
		          {object.restaurant.location.address}
		        </Card.Meta>
		        <Card.Description>
		          {object.restaurant.cuisines}
		        </Card.Description>
		      </Card.Content>
		      <Card.Content extra>
		        <div className='ui two buttons'>
		          <a href = {object.restaurant.menu_url}><Button basic color='green'>Order Now </Button></a>
		          <Button basic color='red' onClick = {this.addingData.bind(this)}>Add to DB</Button>
		        </div>
		      </Card.Content>
		    </Card>
					);

					this.setState({cardListItems:item})

				
				
				
			}.bind(this)
		})

	}

	

	render () {
		return (
			<div>
				<h1>Hello {this.props.message}</h1>
				<TextField floatingLabelText="Name" onChange={this.handleNameState.bind(this)} value={this.state.city_name}/>
				<br/>
				<Dropdown placeholder='City' search selection options={this.state.city_id_arr} onChange = {this.selectedCityCuisine.bind(this)} />
				<br/>
				<br/>
				<br/>
				<Dropdown placeholder='Cuisines' search selection options={this.state.cuisineArr} onChange ={this.searchResturant.bind(this)}/>
				<RaisedButton label="Primary" primary={true} onClick={this.getCityId.bind(this)} />

				<Card.Group>
					{this.state.cardListItems}
				</Card.Group>
			</div>
		);
	}
}//end of class
