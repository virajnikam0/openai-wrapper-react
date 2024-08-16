import {
	firebaseConfig,
	COLLECTION_NAME_MAIN,
	ERROR_DATA_NOT_FOUND,
} from "./../utils/app-constants";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
getAnalytics();
export const fireStoreDB = getFirestore(app);

export const getAllModules = async () => {  
	const moduleSnapshot = await getDocs(
		collection(fireStoreDB, COLLECTION_NAME_MAIN)
	);
	const result = moduleSnapshot.docs.map((doc) => doc.data());

	return result !== null && result !== undefined
		? result
		: new Error(ERROR_DATA_NOT_FOUND);
};
