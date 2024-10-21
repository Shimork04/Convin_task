import axios from 'axios';
import '../App.css' 


const DownloadBalanceSheet = () => {
  const handleDownload = async (format) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/balance-sheet?format=${format}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `balance-sheet.${format}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert('Error downloading balance sheet: ' + error.message);
    }
  };

  return (
    <div>
      <button onClick={() => handleDownload('pdf')}>Download PDF</button>
      <button onClick={() => handleDownload('csv')}>Download CSV</button>
    </div>
  );
};

export default DownloadBalanceSheet;
