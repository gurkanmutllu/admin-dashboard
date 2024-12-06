export const useErrorHandler = () => {
  const handleError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    alert(errorMessage);
  };

  return { handleError };
}; 