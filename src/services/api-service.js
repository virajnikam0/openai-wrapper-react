import {
	openAIConfig,
	ERROR_DATA_NOT_FOUND,
} from "./../utils/app-constants";
import {  OpenAI } from "openai";
// import {  OpenAIApi, Configuration } from "openai";

// v4
const openai = new OpenAI({
	apiKey: process.env.REACT_APP_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

// v3
// const openai = new OpenAIApi(
//     new Configuration(openAIConfig));

export const getSearchOutput = async (searchInput) => {
    const resultModel = {
        isResultOk: false,
        resultText: "",
    }

    try {
			// gpt - v4 call
			const result = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `${searchInput.moduleName} for ${searchInput.featureName} and use following search description: '${searchInput.searchText}'`,
                },
            ],
        });
        // gpt - v3 call
       /*  const result = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `${searchInput.moduleName} for ${searchInput.featureName} and use following search description: '${searchInput.searchText}'`,
                max_tokens: 1000,
            }); */

			resultModel.isResultOk = true;
			resultModel.resultText = result.data.choices[0].text;
		} catch (e) {
        resultModel.isResultOk = false;
        resultModel.resultText = `${ERROR_DATA_NOT_FOUND}: ${e}`;
    }
    return resultModel;
} 