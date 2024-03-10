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
        data:CSVArrays}, isCleanUp?:boolean) => void;
	isLoading: boolean;
	message: string;
	setMessage: (message: string) => void;
	setColor: (color: string) => void;
	color: string;
	setIsLoading: (isLoading: boolean) => void;
	handleSaveData: () => Promise<void>;
};

export const useCsvStore = create<CsvStore>((set, get) => ({
	parsedCsv: {
		duplicatedColumns: [],
		nonDuplicatedColumns: [],
		invalidValues: [],
	},
	message: "",
	setMessage: (message) => set({ message }),
	color: 'blue',
	setColor: (color) => set({ color }),
	handleCsvDataChange: (value, isCleanUp) =>
		{
			set(isCleanUp ? {
				parsedCsv:getObjectsFromArray(value.data),
				message:'',
				color: 'blue'
			} : {
				parsedCsv: getObjectsFromArray(value.data),
				message: value.data.length === 0 ? "No se ha seleccionado ningún archivo" : "Datos importados con éxito",
				color: value.data.length === 0 ? "red" : "blue",
			})},
	isLoading: false,
	setIsLoading: (isLoading) => set({ isLoading }),
	handleSaveData: async () => {
		const { parsedCsv, setIsLoading, setColor,setMessage,handleCsvDataChange } = get();
		setIsLoading(true);
		const http = new Http();

		try {
			await http.post(
				"/api/import-csv",
				isArrayOfResourceAccommodation,
				parsedCsv.nonDuplicatedColumns
			);
			handleCsvDataChange({data:[]},true);
			setColor("blue");
			setMessage("Datos importados con éxito");

		} catch (error) {
			console.log(error);
			setColor("red");
			setMessage("Error al importar los datos");
		} finally {
			setIsLoading(false);
		}
	},
}));
