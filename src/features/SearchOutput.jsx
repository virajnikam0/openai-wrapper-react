import React from 'react'

const SearchOutput = (props) => {
  return (
      <div className="row">
        <div className="col-md-2"></div>
        <div className="mb-3 col-md-8">
          <div className="mb-3">
          <label for="outputSearch" className="form-label fw-bold">Output</label><br />
          <textarea className="form-control" id="outputSearchText" readonly
            name="outputSearchText" rows="6" wrap="hard" maxlength="100">{ props.resultText }</textarea>
        </div>
      </div>
    </div>
  )
}

export default SearchOutput