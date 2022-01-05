import React, {Fragment, useState, useEffect} from 'react';

function App() {

  const [file, setFile] = useState(null)
  const [imageList, setimageList] = useState([])

  useEffect(() => {
   fetch('http://localhost:5000/images/get')
    .then(res => res.json())
    .then(res => setimageList(res))
    .catch(err => {
      console.error(err)
    })
  }, [])

  const selectedHandler = e => {
    setFile(e.target.files[0])
  }

  const sendHandler = () => {
    if(!file){
      alert('you must upload file')
      return
    }

    const formdata = new FormData()
    formdata.append('image', file)

    fetch('http://localhost:5000/images/post/', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => {
      console.error(err)
    })

    document.getElementById('fileinput').value = null

    setFile(null)
  }

  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a href="#!" className="navbar-brand">Image App</a>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-10">
              <input id="fileinput" onChange={selectedHandler} className="form-control" type="file"/>
            </div>
            <div className="col-2">
              <button onClick={sendHandler} type="button" className="btn btn-primary col-12">Upload</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-2">
        {imageList.map(image => (
        <div key={image} className="card" style={{height:"200px",width:"300px"}}>       
           <img className="card-img-top" src={'http://localhost:5000/' + image } />
         </div>
        ))      
        }
       
      </div>


    </Fragment>
  );
}

export default App;
