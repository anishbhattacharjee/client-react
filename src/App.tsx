import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';





// var bookComponent = () => {
//   <>
//   </>
// }
type BookProp = {
  title: string;
  author: string;
  publicationYear: string
};
type UserProp = {
  name: string;
  email: string;
  gender?: string;
  status?: string;
  imageurl?: string
};
function App() {




  const [books, setbooks] = useState<BookProp[]>([]);
  const [user, setUser] = useState<UserProp>({
    name: '',
    email: '',
    gender: '',
    status: '',
    imageurl: ''
  });
  const [loading, setLoading] = useState(false)
  // const inputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [isUser, setisUser] = useState(false);
  const [username, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [message, setMessage] = useState("");



  // let inputRef = useRef(null);

  const onFileInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };


  const handleUserFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('name', username);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('status', status);
    formData.append('image', selectedFile);

    async function adduser(){
      try {
        const res = await axios.post('http://localhost:3001/upload',
            formData,
          );
        if (res.status === 201) {
          setName("");
          setEmail("");
          setGender("");
          setImage("");
          setStatus("false");
          setisUser(true);
          setUser(res.data.user);
           
        }
        
        
      } catch (error) {
        
      }
    }
    adduser();

   


    // axios.post('http://localhost:3001/upload',
    //   formData,
    // ).then(res => {
    //   console.log(res.data);
    //   if (res.status === 201) {
    //     setName("");
    //     setEmail("");
    //     setGender("");
    //     setImage("");
    //     setStatus("false");
    //     setisUser(true);
        
    //     return res.json();
    //   }
    // }).catch(err => {
    //   console.log(err);
    // })
  };
  // const fileUpload = () => {
  //   console.log(inputRef.current);
  //   inputRef.current;
  // };



  let handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3001/book", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          author: author,
          publicationYear: publicationYear,
        }),
      });
      let resJson = await res.json();

      if (res.status === 201) {
        setTitle("");
        setAuthor("");
        setPublicationYear("");
        setMessage("User created successfully");
        setLoading(true)
        setbooks(resJson.books);
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const api = async () => {
      const data = await fetch("http://localhost:3001/books", {
        method: "GET"
      });
      const jsonData = await data.json();
      setLoading(true);
      setbooks(jsonData.books);


    };

    api();

  }, [])
  useEffect(() => {

    const getuser = async () => {
      const data = await fetch("http://localhost:3001/user", {
        method: "GET"
      });
      const jsonData = await data.json();
      setLoading(true);
      if (jsonData.user) {
        setisUser(true);
        setUser(jsonData.user);

      }



    };

    getuser();

  }, [])



  return (
    <div className="App">

      <div className="container">
        <div className="main">
          {
            loading &&
            (<ul className='books'>
              {books.map((book) => {
                return (
                  <li className="book">
                    <div><h3>{book.title}</h3></div>
                    <div><p><small>Author</small>: {book.author}</p></div>
                    <div><p><b><small>Pulication Year</small>: {book.publicationYear}</b></p></div>
                  </li>
                );
              })}

            </ul>)

          }


          <form onSubmit={handleSubmit} className='bookform'>
            <div >
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div >
              <input
                type="author"
                placeholder="Author"
                name="author"
                value={author}
                required
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div >
              <input
                placeholder="publicationYear"
                name="publicationYear"
                value={publicationYear}
                required
                onChange={(e) => setPublicationYear(e.target.value)}

              />
            </div>

            <div >
              <button
                type="submit"
              >
                Add Book
              </button>
            </div>

          </form>




        </div>
        <div className="profile-sec">
          <div>
            {

              isUser &&
              (
                <><ul>
                  <li className='userdetailslistitem'><b>Name</b>:  {user.name}</li>
                  <li className='userdetailslistitem'><b>Email</b>:  {user.email}</li>
                  <li className='userdetailslistitem'><b>Gender</b>: {user.gender}</li>
                  <li className='userdetailslistitem'><b>Status</b>: {user.status}</li>

                </ul><div >
                    <img className='userimage' src={`http://localhost:3001/${user.imageurl}`} alt="" />
                  </div></>
              )


            }
          </div>
          <form onSubmit={handleUserFormSubmit} className='userform' >
            <div >
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div >
              <input
                type="username"
                placeholder="User Name"
                name="username"
                value={username}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <div >
                <input type="radio" value="M" name="gender" onChange={(e) => setGender(e.target.value)} /> Male
                <input type="radio" value="F" name="gender" onChange={(e) => setGender(e.target.value)} /> Female
              </div>
              <input
                type="status"
                placeholder="Status"
                name="status"
                value={status}
                required
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <input type="file" onChange={handleFileInput} />


            <div >
              <button
                type="submit"
              >
                Submit
              </button>
            </div>

          </form>
        </div>

      </div>



    </div>
  );
}

export default React.memo(App);
