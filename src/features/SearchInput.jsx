import React, { useState, useEffect } from 'react';
import { getAllModules } from "./../services/firebase-service";
import { getSearchOutput } from "./../services/api-service";
import { SEARCH_PLACEHOLDER_DESC } from "./../utils/app-constants";

const SearchInput = (props) => {

  const [moduleConfigs, setModuleConfigs] = useState([]);
  const [filteredFeatureByModule, setFilteredFeatureByModule] = useState([]);
  const [moduleValue, setModuleValue] = useState("");
  const [moduleText, setModuleText] = useState("");
  const [featureText, setFeatureText] = useState("");
  const [searchText, setSearchText] = useState("");


  // fetch firebase config - for first time load
  useEffect(() => {
    async function fetchData() {
      setModuleConfigs(await getAllModules());
      // console.log(moduleConfigs + "    " + "this is module config");
    } 
    fetchData();
  }, []);

  const onChangeModuleSelectHandler = (e) => {
    // filter out selected module feature
    const moduleId = e.target.value;
    let shouldBreak = false;
    moduleConfigs.forEach((item) => {
      if (item.id === +moduleId && !shouldBreak) {
        setFilteredFeatureByModule(item.features);
        setModuleValue(moduleId);
        setModuleText(`${item.title} - ${item.subtitle}`);
        shouldBreak = true;
      }
    });
  }
  const onChangeFeatureSelectHandler = (e) => {
    setFeatureText(e.target.value);
  }
  const onChangeSearchTextHandler = (e) => {
    setSearchText(e.target.value);
  }

  const submitSearchQueryFormHandler = async (e) => {
    e.preventDefault();
    const searchInput = {
      moduleName: moduleText,
      featureName: featureText,
      searchText: searchText,
    };
    console.log(searchInput);
    const result = await getSearchOutput(searchInput);
    if (result.isResultOk){
      props.bridgeOutputHandler(result.resultText);
    } else {
      props.bridgeOutputHandler(result.resultText);
    }    
  }

  const searchDescPlaceholderHandler = () => {  
      const random = Math.floor(
        Math.random() * SEARCH_PLACEHOLDER_DESC.length
      );
      return SEARCH_PLACEHOLDER_DESC.at(random) ?? 'Enter Search Description';
  }

  const shouldDisableSearchButtonHandler = () => {
    if (searchText && featureText && moduleText && moduleValue){
      return false;
    }
    return true;
  }

  return (
    <form onSubmit={submitSearchQueryFormHandler}>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="mb-3 col-md-4">
          <label htmlFor="moduleOptions" className="form-label fw-bold">
            Module<span className="text-danger"> *</span>
          </label>
          <select
            className="form-select"
            id="moduleOptions"
            name="moduleOptions"
            value={moduleValue}
            onChange={(e) => onChangeModuleSelectHandler(e)}
          >
            <option value="default">Select option</option>
            {
            moduleConfigs.map((item) => (
              <option key={item.id} 
                value={item.id} >
                {item.title} - {item.subtitle}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2 col-md-4">
          <label htmlFor="featureOptions" className="form-label fw-bold">
            Feature<span className="text-danger"> *</span>
          </label>
          <br />
          <select
            className="form-select"
            id="featureOptions"
            name="featureOptions"
            value={featureText}
            onChange={(e) => onChangeFeatureSelectHandler(e)}
          >
            <option value="default">Select option</option>
            {
              filteredFeatureByModule.map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
            ))}
          </select>
        </div>
        <div className="col-md-2"></div>
      </div>

      <div className="row">
        <div className="mb-3 col-md-2"></div>
        <div className="mb-3 col-md-8">
          <label htmlFor="inputSearchText" className="form-label fw-bold">
            Search Description<span className="text-danger"> *</span>
          </label>
          <br />
          <textarea
            className="form-control"
            id="inputSearchText"
            name="inputSearchText"
            placeholder={searchDescPlaceholderHandler()}
            onChange={(e) => onChangeSearchTextHandler(e)}
            rows="3"
            value={searchText}
          ></textarea>
        </div>
      </div>

      <div className="row">
        <div className="mb-1 mt-1 col-md-12 text-center">
          <button
            type="submit"
            className="btn btn-primary col-md-3 col-sm-3 fw-bold"
            disabled={shouldDisableSearchButtonHandler()}
          >
            Search ✨
          </button>
        </div>
      </div>
    </form>

  )
}

export default SearchInput;