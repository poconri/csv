import { CSVArrays } from "../types/csv-columns";
import { ResourceAccommodation } from "../types/csv-object";
import {
	getBoolean,
	getDateIsoString,
	getNumber,
	getString,
} from "../types/get-value";
import { isNumber, isString, isValidDate } from "../types/type-guards";

const MAPPED_PROPERTIES: Record<
	`${number}`,
	{
		key: keyof ResourceAccommodation;
		typeGuard: (value: string) => boolean;
		getValue: (value: string) => string | number | boolean;
	}
> = {
	"0": {
		key: "latitude",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"1": {
		key: "longitude",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"2": {
		key: "rowId",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"3": {
		key: "title",
		typeGuard: isString,
		getValue: getString,
	},
	"4": {
		key: "advertiser",
		typeGuard: isString,
		getValue: getString,
	},
	"5": {
		key: "description",
		typeGuard: isString,
		getValue: getString,
	},
	"6": {
		key: "isRenovated",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"7": {
		key: "phoneNumber",
		typeGuard: isString,
		getValue: getString,
	},
	"8": {
		key: "type",
		typeGuard: isString,
		getValue: getString,
	},
	"9": {
		key: "price",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"10": {
		key: "pricePerMeter",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"11": {
		key: "address",
		typeGuard: isString,
		getValue: getString,
	},
	"12": {
		key: "province",
		typeGuard: isString,
		getValue: getString,
	},
	"13": {
		key: "city",
		typeGuard: isString,
		getValue: getString,
	},
	"14": {
		key: "squareMeters",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"15": {
		key: "bedroomAmount",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"16": {
		key: "bathroomAmount",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"17": {
		key: "hasParking",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"18": {
		key: "isSecondHand",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"19": {
		key: "builtInWardrobes",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"20": {
		key: "builtYear",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"21": {
		key: "isFurnished",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"22": {
		key: "individualHeatingType",
		typeGuard: isString,
		getValue: getString,
	},
	"23": {
		key: "energyCertification",
		typeGuard: isString,
		getValue: getString,
	},
	"24": {
		key: "floor",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"25": {
		key: "hasExteriorView",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"26": {
		key: "hasInteriorView",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"27": {
		key: "hasElevator",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"28": {
		key: "date",
		typeGuard: isValidDate,
		getValue: getDateIsoString,
	},
	"29": {
		key: "street",
		typeGuard: isString,
		getValue: getString,
	},
	"30": {
		key: "neighborhood",
		typeGuard: isString,
		getValue: getString,
	},
	"31": {
		key: "district",
		typeGuard: isString,
		getValue: getString,
	},
	"32": {
		key: "hasTerrace",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"33": {
		key: "storageRoom",
		typeGuard: isString,
		getValue: getString,
	},
	"34": {
		key: "isKitchenEquipped",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"35": {
		key: "hasAirConditioning",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"36": {
		key: "hasPoolAccess",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"37": {
		key: "hasGarden",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"38": {
		key: "usefulSquareMeters",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"39": {
		key: "isAccessible",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"40": {
		key: "floors",
		typeGuard: isNumber,
		getValue: getNumber,
	},
	"41": {
		key: "isPetFriendly",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
	"42": {
		key: "hasBalcony",
		typeGuard: (_: unknown) => true,
		getValue: getBoolean,
	},
} as const;

export type CsvResults = {
	duplicatedColumns: Record<string, string>[];
	nonDuplicatedColumns: ResourceAccommodation[];
	invalidValues: Record<string, string>[];
};

export const getObjectsFromArray = (array: CSVArrays):CsvResults => {
	if(array.length === 0){
		return {
			duplicatedColumns: [],
			nonDuplicatedColumns: [],
			invalidValues: [],
		}
	}

	const keys = array[0];
	const rows = array.slice(1);

	const snakeCaseKeys = keys.map((key) =>
		key.toLowerCase().split(" ").join("_")
	);

	const isDuplicatedKey = snakeCaseKeys.map(
		(key, index) => snakeCaseKeys.indexOf(key) !== index
	);

	const resultWithDuplicates: Record<string, string>[] = [];
	const resultWithoutDuplicates: ResourceAccommodation[] = [];
	const invalidValues: Record<string, string>[] = [];

	rows.forEach((row, indexRow) => {
		const objectWithDuplicates = {};
		const objectWithoutDuplicates = {};
		let duplicatedColumnsAmount = 0;

		row.forEach((value, index) => {
			if (isDuplicatedKey[index]) {
				Object.assign(objectWithDuplicates, {
					[keys[index]]: value,
				});
				duplicatedColumnsAmount++;
			} else {
				const counter = index - duplicatedColumnsAmount;
				const properties = MAPPED_PROPERTIES[`${counter}`];

				Object.assign(objectWithoutDuplicates, {
					[properties.key]: properties.typeGuard(value)
						? properties.getValue(value)
						: null,
				});

				if (!properties.typeGuard(value)) {
					invalidValues.push({
						[`${keys[counter]}`]: `"${value}" no es un valor valido ${
							indexRow + 1
						}`,
					});
				}
			}
		});

		if (Object.keys(objectWithDuplicates).length > 0) {
			resultWithDuplicates.push(objectWithDuplicates);
		}
		if (Object.keys(objectWithoutDuplicates).length > 0) {
			resultWithoutDuplicates.push(
				objectWithoutDuplicates as ResourceAccommodation
			);
		}
	});

	return {
		duplicatedColumns: resultWithDuplicates,
		nonDuplicatedColumns: resultWithoutDuplicates,
		invalidValues: invalidValues,
	};
};
