export const isFileSizeInValid = (file,allowedFileSizeInMB) => Math.round(file.size / 1024000) > allowedFileSizeInMB;
export const navigateToPreviousPage = (navigate) => navigate(-1);

