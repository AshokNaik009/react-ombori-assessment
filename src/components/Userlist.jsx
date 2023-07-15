import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "./Spinner";
import "./Userlist.css";

function Userlist() {
  const [user, setUsers] = useState([]);
  const [totalUser, settotalUser] = useState(3);
  const [pageNum, setpageNum] = useState(0);
  const [listfin, setlistfin] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios(`https://reqres.in/api/users?page=${pageNum}`);
      console.log(res.data);
      settotalUser(res.data.total);
      setUsers(res.data.data);
    };
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    fetchUsers();
  }, []);

  const fetchData = () => {
    setpageNum(pageNum + 1);

    const fetchUsers = async () => {
      const res = await axios(`https://reqres.in/api/users?page=${pageNum}`);
      //console.log(res.data.data);
      if (res.data.data.length > 0) {
        settotalUser(res.data.total);
        setUsers(user.concat(res.data.data));
      } else {
        setlistfin(false);
      }
    };

    fetchUsers();
  };

  const renderUser = (
    <div>
      <div className="container">
      <div class="center">
            <h1>React Assessment</h1>
            <div class="our-team-text"> List Demo 3rd party Package used React Inifinte Scroll,Axios
            </div>
        </div>

        <div className="cards">

        <ol className="listst">
        {user.map((usr) => {
          return (
            <li className=""  key={usr.id}>
            

              <div className="card">
            <img
              src={usr.avatar}
              alt={usr.first_name}
            />
            <h3 className="card-name">{usr.first_name}  {usr.last_name}</h3>
            <p className="card-text">{usr.email}</p>
            <a href="#" class="btn">
              About
            </a>
          </div>


            </li>
          );
        })}
      </ol>


        
        </div>
      </div>

     

      <InfiniteScroll
        dataLength={user.length} //This is important field to render the next data
        next={fetchData}
        hasMore={listfin}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all 😄</b>
          </p>
        }
      >
        {/* {items} */}
      </InfiniteScroll>
    </div>
  );

  return <div>{isLoading ? <LoadingSpinner /> : renderUser}</div>;
}

export default Userlist;
