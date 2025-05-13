//rafce structure command
import React, { useEffect, useState } from 'react'
import Card from './Card'

const Newsapp = () => {

    const API_KEY = "89bc76f7c8a14956aff1350b690bfbf9";


    const [search, setSearch] = useState("india")
    const [newsData, setNewsData] = useState(null)



    const [category, setCategory] = useState('general');




    const getdata = async () => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
        console.log(jsonData.articles);
        setNewsData(jsonData.articles);

    }
    useEffect(() => {
        getdata()
    }, [])




    useEffect(() => {
        if (search !== "india") {
            getdata();
        }
    }, [search]);



    const handleInput = (e) => {
        console.log(e.target.value);
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
