/** @format */

import React, { useState } from "react";
import {
	Button,
	Input,
	InputGroup,
	InputLeftAddon,
	VStack,
	useToast,
	Box,
} from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

const PipelineTester = () => {
	// Existing state variables
	const [uri, setUri] = useState("");
	const [pipelineString, setPipelineString] = useState("");
	const [collection, setCollection] = useState("");
	const [serviceAccountKey, setServiceAccountKey] = useState<File | null>(null);
	const [pipelineFile, setPipelineFile] = useState<File | null>(null); // New state variable for pipeline JSON file
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();
	const handleRunExplain = async () => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append("uri", uri);
		formData.append("collectionName", collection);
		if (serviceAccountKey) {
			formData.append(
				"serviceAccountKey",
				serviceAccountKey,
				serviceAccountKey.name
			);
		}
		if (pipelineFile) {
			formData.append("pipeline", pipelineFile, pipelineFile.name);
		}

		try {
			const response = await fetch(
				"https://server.tadeasfort.eu/api/runExplain",
				{
					method: "POST",
					body: formData,
				}
			);

			const data = await response.json();

			if (response.ok) {
				// Show toast on success
				toast({
					title: "Request Sent.",
					description: "Your request was successfully sent!",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			} else {
				// Show toast on failure
				toast({
					title: "An error occurred.",
					description: data.message || "Unable to send your request.",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}

			console.log(data);
		} catch (error) {
			// Show toast on failure
			toast({
				title: "An error occurred.",
				description: "Unable to send your request.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFileState: React.Dispatch<React.SetStateAction<File | null>>
	) => {
		if (e.target.files) {
			const file = e.target.files[0];
			setFileState(file);
		}
	};

	return (
		<Box maxW="600px" mx="auto">
			{" "}
			<p style={{ fontSize: "2.5rem" }}>
				<strong>Test MongoDB aggregations</strong>
			</p>
			{/* <-- Add this Box */}
			<VStack spacing={4} align="stretch">
				<InputGroup>
					<InputLeftAddon children="URI" />
					<Input
						type="text"
						variant="filled"
						placeholder="URI"
						onChange={(e) => setUri(e.target.value)}
					/>
				</InputGroup>
				{/* ...Existing InputGroups... */}
				<p style={{ fontSize: "0.8rem" }}>
					<strong>Upload Service Account Key</strong>
				</p>
				<input
					type="file"
					accept=".json"
					onChange={(e) => handleFileChange(e, setServiceAccountKey)}
				/>
				<InputGroup>
					<InputLeftAddon children="Collection" />
					<Input
						type="text"
						variant="filled"
						placeholder="Collection Name"
						onChange={(e) => setCollection(e.target.value)}
					/>
				</InputGroup>
				<p style={{ fontSize: "0.8rem" }}>
					<strong>Upload JSON with pipeline</strong>
				</p>
				<input
					type="file"
					accept=".json"
					onChange={(e) => handleFileChange(e, setPipelineFile)}
				/>{" "}
				{/* New input for pipeline JSON file */}
				<Button
					isLoading={isLoading}
					colorScheme="blue"
					spinner={<BeatLoader size={8} color="white" />}
					onClick={handleRunExplain}
				>
					Run Explain
				</Button>
			</VStack>
		</Box>
	);
};

export default PipelineTester;
