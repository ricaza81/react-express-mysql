import React, {Fragment, useState, useEffect} from 'react';
import Modal from 'react-modal';

function App() {

  const [file, setFile] = useState(null)
  const [imageList, setImageList] = useState([])
  const [listUpdate, setListUpdate] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {

   Modal.setAppElement('body')

   fetch('http://localhost:5000/images/get')
    .then(res => res.json())
    .then(res => setImageList(res))
    .catch(err => {
      console.error(err)
    })
    setListUpdate(false)
  }, [listUpdate])

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
    .then(res => {
      console.log(res)
      setListUpdate(true)
    })
    .catch(err => {
      console.error(err)
    })

    document.getElementById('fileinput').value = null

    setFile(null)
  }

  const modalHandler=(isOpen, image) => {
    setModalIsOpen(isOpen)
    setCurrentImage(image)
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

      <div className="container mt-2" style={{display:"flex",flexWrap:"wrap"}}>
        {imageList.map(image => (
        <div key={image} className="card m-2" style={{height:"auto",width:"350px"}}>       
           <img className="card-img-top" style={{margin:"auto",padding:"10px"}} src={'http://localhost:5000/' + image } />
           <button className="btn-primary" onClick={() => modalHandler(true, image)}>Ampliar</button>
         </div>
        ))      
        }       
      </div>
      
      <Modal isOpen={modalIsOpen} onRequestClose={()=>modalHandler(false)}>
        <div className="card">
          <img className="card-img-top" src={'http://localhost:5000/' + currentImage} alt='...' />
          <div className="card-name">
            <button className="btn btn-danger">Borrar</button>
          </div>
        </div>
      </Modal>


    </Fragment>
  );
}

export default App;
