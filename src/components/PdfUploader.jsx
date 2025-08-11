import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Text,
    IconButton,
    useToast,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../components/AuthContext';
const PdfUploader = ({api}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const toast = useToast();
    const { user } = useAuth();

    // Process incoming files and add valid PDFs to the list.
    const handleFiles = (files) => {
        const newFiles = [];
        Array.from(files).forEach((file) => {
            if (file.type === 'application/pdf') {
                newFiles.push(file);
            } else {
                toast({
                    title: 'Invalid file',
                    description: `File "${file.name}" is not a PDF.`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        });
        if (newFiles.length > 0) {
            setSelectedFiles((prev) => [...prev, ...newFiles]);
            toast({
                title: 'Files Added',
                description: `Added ${newFiles.length} PDF(s).`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Drag event handlers to update the UI.
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    // Handles file selection via the hidden input.
    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    // Click anywhere on the drop zone to open the file picker.
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Remove a file from the selectedFiles list.
    const removeFile = (index) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // Simulated submission function (replace URL with your API endpoint).
    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            toast({
                title: 'No files selected',
                description: 'Select at least one PDF file before submitting.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Replace this with your actual project id
        const projectId = user.currentProject;
        if (!projectId) {
            toast({
                title: 'Project ID missing',
                description: 'Please select a project before uploading files.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        // console.log('Project ID:', projectId);
        setIsUploading(true);

        // Create a new FormData instance and append required parameters
        const formData = new FormData();

        // Append each file using the name 'reports' (or 'reports[]' for multiple files)
        selectedFiles.forEach((file) => {
            formData.append('reports[]', file);
        });

        // Append the project id as required by your API
        formData.append('project_id', projectId);

        try {
            // Replace '/api/upload-pdf' with the actual URL pointing to your PHP API
            const response = await fetch(api, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                toast({
                    title: 'Upload Successful',
                    description: 'Your PDF files have been uploaded.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setTimeout(() => {
                    window.location.reload(); // Reload the page after a successful upload
                }, 750);
                setSelectedFiles([]); // Clear uploaded files after a successful submission
            } else {
                toast({
                    title: 'Upload Failed',
                    description: data.message || 'An error occurred.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message || 'Upload error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        setIsUploading(false);
    };

    return (
        <>
            {/* Hidden file input supporting multiple file selection */}
            <input
                type="file"
                accept="application/pdf"
                multiple
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleChange}
            />

            {/* Always display the drop zone which supports clicking and drag-drop */}
            <Box
                width='80%'
                mx="auto"
                border="2px dashed"
                borderColor={dragActive ? 'blue.400' : 'gray.300'}
                borderRadius="md"
                p={8}
                textAlign="center"
                cursor="pointer"
                onClick={handleClick}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
            >
                {selectedFiles.length > 0 && (
                    <Box mb={4}>
                        <Text fontWeight="bold" mb={2}>
                            Selected PDF(s):
                        </Text>
                        {selectedFiles.map((file, index) => (
                            <Box
                                key={index}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >
                                <Text>{file.name}</Text>
                                {/* Stop propagation to prevent triggering the file picker */}
                                <IconButton
                                    size="sm"
                                    icon={<CloseIcon />}
                                    aria-label="Remove file"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index);
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
                <Text>
                    {selectedFiles.length > 0
                        ? 'Add reports, Drag and drop more PDFs here or click to add more'
                        : 'Add reports, Drag and drop your PDF files here or click to choose files'}
                </Text>
            </Box>

            {/* If there are files added, display submission buttons */}
            {selectedFiles.length > 0 && (
                <Box mt={4} textAlign="center">
                    <Button
                        colorScheme="blue"
                        onClick={handleUpload}
                        isLoading={isUploading}
                        mr={2}
                    >
                        Submit PDFs
                    </Button>
                    <Button variant="outline" onClick={handleClick}>
                        Add More PDFs
                    </Button>
                </Box>
            )}
        </>
    );
};

export default PdfUploader;