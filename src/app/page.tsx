"use client";
import { useCSVReader } from "react-papaparse";
import { useCsvStore } from "./store/useCsvStore";
import {
	Button,
	Center,
	Box,
	ChakraProvider,
	Spinner,
	ListItem,
	UnorderedList,
	Text,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function Home() {
	const { CSVReader } = useCSVReader();
  const removePropsRef = useRef();

	const {
		parsedCsv,
		color,
		message,
		isLoading,
		handleCsvDataChange,
		handleSaveData,
	} = useCsvStore(
		({
			parsedCsv,
			color,
			message,
			isLoading,
			handleCsvDataChange,
			handleSaveData,
		}) => ({
			isLoading,
			color,
			message,
			parsedCsv,
			handleCsvDataChange,
			handleSaveData,
		})
	);

	const isDisabled = parsedCsv.nonDuplicatedColumns.length === 0 || isLoading;

	const handleRemoveFile =
		(getRemoveProps: () => any) =>
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			const removeProps = getRemoveProps();
			if (removeProps && removeProps.onClick) {
				removeProps.onClick(event);
			}
			handleCsvDataChange({ data: [] }, true);
		};

	return (
		<ChakraProvider>
			<main>
				<Box
					display="flex"
					flexDirection="column"
					gap={30}
					marginTop={10}
					alignItems={"center"}
				>
					<h1>Importa tu archivo CSV</h1>
					<CSVReader
						onUploadAccepted={handleCsvDataChange}
						onRemoveFile={() => handleCsvDataChange({ data: [] }, true)}
						config={{
							encoding: "utf-8",
						}}
					>
						{({
							getRootProps,
							acceptedFile,
							ProgressBar,
							getRemoveFileProps,
						}: any) => {
              removePropsRef.current = getRemoveFileProps;
              return (
							<>
								<Box
									display="flex"
									gap={2}
									width="100%"
									justifyContent="center"
									alignItems="center"
									flexDirection={["column", "row"]}
								>
									<Button {...getRootProps()}>Buscar archivo</Button>
									<Center
										width={["80%", "auto"]}
										height={10}
										border="1px solid black"
										borderRadius={8}
                    
									>
										{acceptedFile && acceptedFile.name}
									</Center>
									{
										<Button
											cursor={isDisabled ? "not-allowed" : "pointer"}
											colorScheme={isDisabled ? "gray" : "red"}
											color={isDisabled ? "gray" : "white"}
											{...getRemoveFileProps()}
											onClick={handleRemoveFile(getRemoveFileProps)}
										>
											Borrar
										</Button>
									}
								</Box>
								<ProgressBar />
							</>
						)}}
					</CSVReader>
				</Box>
				<Center marginTop={4}>
					<Button
						cursor={isDisabled ? "not-allowed" : "pointer"}
						color={isDisabled ? "gray" : "black"}
						colorScheme={isDisabled ? "gray" : "whatsapp"}
						onClick={!isDisabled ? () => handleSaveData() : undefined}
					>
						{isLoading && (
							<Spinner
								thickness="4px"
								speed="0.65s"
								emptyColor="gray.200"
								color="blue.500"
								size="md"
								marginRight={2}
							/>
						)}
						{isLoading ? "Guardando..." : "Guardar"}
					</Button>
				</Center>
				<Center marginTop={4}>
					{message && <Text color={color}>{message}</Text>}
				</Center>
				<Center marginTop={4} padding={5}>
					{(parsedCsv.invalidValues.length > 0 ||
						parsedCsv.duplicatedColumns.length > 0) && (
						<UnorderedList>
							{parsedCsv.invalidValues.length > 0 && (
								<Text>Verifica los siguientes valores:</Text>
							)}
							{parsedCsv.invalidValues.map((value) => (
								<ListItem key={value.rowId}>
									{Object.entries(value).map(([key, value]) => (
										<Text color="red" key={key}>{`${key}: ${value}`}</Text>
									))}
								</ListItem>
							))}
							{parsedCsv.duplicatedColumns.length > 0 && (
								<Text>
									Verifica la siguiente columna puede que este duplicada
									duplicados:
								</Text>
							)}
							{parsedCsv.duplicatedColumns.map((value, index) =>
								index === 0 ? (
									<ListItem key={value.rowId}>
										{Object.keys(value).map((key) => (
											<Text color="red" key={key}>
												{key}
											</Text>
										))}
									</ListItem>
								) : null
							)}
						</UnorderedList>
					)}
				</Center>
			</main>
		</ChakraProvider>
	);
}
