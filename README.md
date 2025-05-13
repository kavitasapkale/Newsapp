// NEWSAPP.JS
import React, { useEffect, useState } from 'react'
import Card from './Card'

const Newsapp = () => {

    const API_KEY = "89bc76f7c8a14956aff1350b690bfbf9"; //from news api site

    //by default set indian news when change a state it show indian news
    const [search, setSearch] = useState("india")
    const [newsData, setNewsData] = useState(null)


    // Store selected category (like sports, health, etc.)
    const [category, setCategory] = useState('general');




    const getdata = async () => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);//back tick In  q we are passing data assign api kay inthis variable API_KEY
        //this data is not json formate make this data in json formate
        //we have three condition of data first data get ,pending,or resolve
        //await is a wait untill data not converted into json
        const jsonData = await response.json();
        console.log(jsonData.articles);//articles is a aaray of news it takes from newsapi console
        setNewsData(jsonData.articles);

    }


    // it is used for show data on the site  when first time refresh site this fuction call then is not call and data show on the site
    //it is used cause when refresh site new are not dislay to show a news used useeffect fun
    useEffect(() => {
        getdata()
    }, [])




    // ✅ This useEffect runs whenever search value changes
    //this function used for button category when click fitness entertainment... show the result without search button use
    useEffect(() => {
        if (search !== "india") {
            getdata(); // fetch new data when category or search changes
        }
    }, [search]);



    const handleInput = (e) => {
        console.log(e.target.value);//the value of serch input display on console
        setSearch(e.target.value)
    }

    const userInput = (event) => {
        setSearch(event.target.value)
    }




    return (
        <div>
            <nav>
                <div>
                    <h1>Trendy news</h1>
                    <ul>
                        <a>All news</a>
                        <a>Treanding</a>

                        <div className='searchBar'>
                            <input type="text" placeholder='Search News' value={search} onChange={handleInput} />
                            <button onClick={getdata}>Search</button>


                        </div>



                    </ul>









                </div>
            </nav>
            <div>


                <p className='head'>Stay Update with Trending News

                </p>
            </div>


            <div className='categoryBtn'>
                <button onClick={userInput} value="politics">Politics</button>
                <button onClick={userInput} value="entertainments">Entertainments</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="fitness">Fitness</button>
                <button onClick={userInput} value="sport">Sport</button>



            </div>



            <div>


                {newsData ? <Card data={newsData} /> : null}
            </div>
        </div>
    )
}

export default Newsapp

**************************************************************************************************************************************************
CARD.JS

import React from 'react'
//for access news data on card used props and <Card data={newsData}/>from Newsapp.js takes data
/*const Card = (props) => {
     console.log(props.data);* this is first method to access data*/
const Card = ({ data }) => {
    console.log(data);


    const readmore = (url) => {
        window.open(url)// this function is made cause i want when click url of any news it open on new window

    }



    //map fun is iterate the data or make seperate like  0,1,2,3,4...

    //window.open(curItem.url)this is use for when click on url so it open only url specific it is not apply other eg. perticurly for url ,image  readmore button opne in new tab
    return (
        <div className='cardContainer' >
            {data.map((curItem, index) => {

                //if (!curItem.urlToImage){this is used for empty image news not disply
                if (!curItem.urlToImage) {

                    return null
                }
                else {



                    return (

                        < div className='card'>
                            <img onClick={() => window.open(curItem.url)} src={curItem.urlToImage} />
                            <div className='cardContent'>
                                <a className='tite' onClick={() => window.open(curItem.url)}>{curItem.title}</a>
                                <p>{curItem.description}</p>
                                <button onClick={() => window.open(curItem.url)}>Read More</button >
                            </div>
                        </div>
                    )

                }

            })}

        </div>
    )
}

export default Card

