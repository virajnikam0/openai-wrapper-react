import './App.css';
import SearchMain from "./features/SearchMain";
import { openAIConfig, ERROR_DATA_NOT_FOUND } from "./utils/app-constants";

const App = () => {
  console.log(openAIConfig);
  console.log(ERROR_DATA_NOT_FOUND);
  return (
		<>
			<SearchMain />
		</>
	);
}

export default App;
