import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link , useParams } from "react-router-dom";


function ProfileTeacher(){

  const {id}=useParams();
  const [teacher, setTeacher] = useState([]);
  const [courses, setCourses] = useState("");

    const fetchData = async () => {
    try {
     const response = await axios.get(`http://127.0.0.1:8000/api/teacher/showid/${id}`);
     const teacherData = response.data.data;
      setTeacher(teacherData);
     if (teacherData.courses && teacherData.courses.length > 0) {
        const courseName = teacherData.courses.join(" ");
        setCourses(courseName);
      }
        }
        catch(error){
            console.error('Error fetching teachers:', error);
            // You may also want to update the state to reflect the error
        };
};
 useEffect(() => {
    fetchData();
  }, []);
    
    return(
      <>
        <div class="wrapper">
        <div class="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Profile</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item active">User Profile</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section class="content ">
                <div class="container-fluid">

                    <div class="card card-primary card-outline ">
                        <div class="card-body box-profile">
                            <div class="text-center">
                                <img class="profile-user-img img-fluid img-circle"
                                    src={`${process.env.PUBLIC_URL}/img/user4-128x128.jpg`} alt="User profile picture"/>
                            </div>

                            <h3 class="profile-username text-center">{teacher.name_en}</h3>

                            <p class="text-muted text-center">teacher</p>

                            <ul class="list-group list-group-unbordered mb-3">
                                <li class="list-group-item">
                                    <b>Address</b> <Link class="float-right">{teacher.address_en}</Link>
                                </li>
                                <li class="list-group-item">
                                    <b>Mobile</b> <Link class="float-right">{teacher.mobile}</Link>
                                </li>
                                <li class="list-group-item">
                                    <b>Courses</b>                               
                                      <Link class="float-right"> 
                                      {courses}                                     
                                    </Link>
                                  
                                </li>
                            </ul>

                            <Link to="/" class="btn btn-primary btn-block"><b>Home</b></Link>
                        </div>

                    </div>
                </div>

            </section>
            </div>
            </div>
      </>


    )
  }
  
export default ProfileTeacher;