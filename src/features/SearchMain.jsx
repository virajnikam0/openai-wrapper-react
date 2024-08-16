import React, { useState } from 'react'; 
import SearchInput from './SearchInput';
import SearchOutput from './SearchOutput';
import undraw_tree_swing_re_pqee from './../assets/undraw_tree_swing_re_pqee.svg';

const SearchMain = () => {
    const [resultText, setResultText] = useState("");
    const bridgeOutputHandler = (data) => {
        setResultText(data);
    }

  return (
      <div className="container">
          {/* header */}
          <div className="row">
              <div className="col-md-12 d-flex flex-row align-items-center justify-content-center">
                  <img style={{width: '250px'}} src={undraw_tree_swing_re_pqee} />
                  <h5 className="mb-4 mt-4 fw-bold">ChatGPT Search Wrapper</h5>
              </div>
              <div className="col-md-12 d-flex flex-row align-items-center justify-content-center">
                  <p className="mb-4 text-sm">Absolutely free 😇 | For optimal results 🚀</p>
              </div>
          </div>
          {/* input*/}
          <div className="row m-3">
              <div className="col-md-12">
                  <SearchInput bridgeOutputHandler={bridgeOutputHandler}/>
              </div>
          </div>
          {/* output */}
          <div className="row m-3">
              <div className="col-md-12">
                  {
                    resultText !== "" ? <SearchOutput resultText={resultText}/>: null
                  }
              </div>
          </div>
          {/* footer */}
          <footer className="footer">
              <div className="row">
                  <div className="col-md-12 text-center">
                      <h6>Made In India with ❤️</h6>
                  </div>
              </div>
          </footer>
      </div>
  )
}

export default SearchMain;