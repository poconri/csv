import { Http } from "@/app/store/https";
import { CSVArrays } from "@/app/types/csv-columns";
import {
	isArrayOfResourceAccommodation,
} from "@/app/types/type-guards";
import {
	CsvResults,
	getObjectsFromArray,
} from "@/app/utils/get-objects-from-array";
import { create } from "zustand";

type CsvStore = {
	parsedCsv: CsvResults;
	handleCsvDataChange: (newValue: {
        data:CSVArrays}) => void;
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
	handleSaveData: () => Promise<void>;
};

export const useCsvStore = create<CsvStore>((set, get) => ({
	parsedCsv: {
		duplicatedColumns: [],
		nonDuplicatedColumns: [],
		invalidValues: [],
	},
	handleCsvDataChange: (value) =>
		set({
			parsedCsv: getObjectsFromArray(value.data),
		}),
	isLoading: false,
	setIsLoading: (isLoading) => set({ isLoading }),
	handleSaveData: async () => {
		const { parsedCsv, setIsLoading } = get();
		setIsLoading(true);
		const http = new Http();

		try {
			const response = await http.post(
				"/api/import-csv",
				isArrayOfResourceAccommodation,
				parsedCsv.nonDuplicatedColumns
			);

            console.log(response.data)
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	},
}));
