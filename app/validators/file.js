export default function validateFile() {
  /* eslint-disable no-unused-vars */
  return (key, newValue, oldValue, changes, content) => {
    if (newValue === oldValue) {
      return true;
    } else if (newValue && 'id' in newValue && 'storage' in newValue) {
      return true;
    } else {
      return 'Upload is not complete yet';
    }
  };
  /* eslint-enable no-unused-vars */
}